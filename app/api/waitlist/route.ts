import { NextRequest, NextResponse } from 'next/server';
import { waitlistFormSchema } from '@/lib/validation';
import {
  checkRateLimit,
  getClientInfo,
  insertWaitlistSubmission,
} from '@/lib/server-utils';
import { z } from 'zod';

const RATE_LIMIT = {
  MAX_REQUESTS: 5,
  WINDOW_MS: 1000 * 60 * 15, // 15 minutes
};

export async function POST(request: NextRequest) {
  try {
    // Check rate limit
    const clientInfo = getClientInfo(request);
    const rateLimit = await checkRateLimit(clientInfo.ip);

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          error: 'Too many requests',
          reset: new Date(rateLimit.reset).toISOString(),
        },
        {
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.reset.toString(),
          },
        }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    console.log('Request body:', body);
    
    const validatedData = waitlistFormSchema.parse(body);
    console.log('Validated data:', validatedData);

    // Submit to database
    await insertWaitlistSubmission({
      ...validatedData,
      ip_address: clientInfo.ip,
      user_agent: clientInfo.userAgent,
      utm_source: clientInfo.utmSource,
      utm_medium: clientInfo.utmMedium,
      utm_campaign: clientInfo.utmCampaign,
    });

    return NextResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Waitlist submission error:', error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid form data', details: error.format() },
        { status: 400 }
      );
    }

    // Handle known database errors
    if (error instanceof Error) {
      if (error.message === 'This email is already on the waitlist') {
        return NextResponse.json(
          { error: error.message },
          { status: 409 } // Conflict
        );
      }

      // Log detailed error information
      console.error('Detailed error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
      });
    }

    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
} 