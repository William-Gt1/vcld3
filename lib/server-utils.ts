import { createClient } from '@supabase/supabase-js';
import { NextRequest } from 'next/server';
import { LRUCache } from 'lru-cache';
import { Database } from '@/types/database';

// Initialize Supabase admin client for server-side operations
const supabaseAdmin = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Cache configuration
const cache = new LRUCache<string, number>({
  max: 1, // Only store waitlist count
  ttl: 1000 * 60 * 5, // 5 minutes TTL
});

// Rate limiting configuration
const rateLimit = new LRUCache<string, number>({
  max: 10000, // Maximum number of IP addresses to track
  ttl: 1000 * 60 * 60, // 1 hour TTL
});

const RATE_LIMIT = {
  MAX_REQUESTS: 5, // Maximum requests per window
  WINDOW_MS: 1000 * 60 * 15, // 15 minutes
};

export function getClientInfo(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  
  // Extract UTM parameters from referrer or query string
  const url = new URL(request.url);
  const utmSource = url.searchParams.get('utm_source');
  const utmMedium = url.searchParams.get('utm_medium');
  const utmCampaign = url.searchParams.get('utm_campaign');

  return {
    ip,
    userAgent,
    utmSource,
    utmMedium,
    utmCampaign,
  };
}

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean;
  remaining: number;
  reset: number;
}> {
  const now = Date.now();
  const requests = rateLimit.get(ip) || 0;

  if (requests >= RATE_LIMIT.MAX_REQUESTS) {
    const reset = now + RATE_LIMIT.WINDOW_MS;
    return { allowed: false, remaining: 0, reset };
  }

  rateLimit.set(ip, requests + 1);
  return {
    allowed: true,
    remaining: RATE_LIMIT.MAX_REQUESTS - (requests + 1),
    reset: now + RATE_LIMIT.WINDOW_MS,
  };
}

export async function getWaitlistCount(): Promise<number> {
  const cachedCount = cache.get('waitlist-count');
  if (cachedCount !== undefined) {
    return cachedCount;
  }

  const { count, error } = await supabaseAdmin
    .from('waitlist_submissions')
    .select('*', { count: 'exact', head: true });

  if (error) {
    throw error;
  }

  cache.set('waitlist-count', count || 0);
  return count || 0;
}

export async function insertWaitlistSubmission(data: {
  fullName: string;
  email: string;
  acceptTerms: boolean;
  ip_address: string;
  user_agent: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
}) {
  console.log('Inserting waitlist submission:', data);
  
  const { error } = await supabaseAdmin
    .from('waitlist_submissions')
    .insert([{
      name: data.fullName,
      email: data.email,
      subscribed_to_newsletter: data.acceptTerms,
      ip_address: data.ip_address,
      user_agent: data.user_agent,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign
    }]);

  console.log('Insert result:', error || 'success');

  if (error) {
    console.error('Database error:', error);
    if (error.code === '23505') { // Unique violation
      throw new Error('This email is already on the waitlist');
    }
    throw error;
  }

  // Invalidate cache after successful insertion
  cache.delete('waitlist-count');
} 