import { NextResponse } from 'next/server';
import { getWaitlistCount } from '@/lib/server-utils';

export const revalidate = 300; // Cache response for 5 minutes

export async function GET() {
  try {
    // For initial development, return a mock count
    // Later, we'll replace this with actual database count
    return NextResponse.json(
      { count: 42 },
      {
        status: 200,
        headers: {
          'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching waitlist count:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch waitlist count' },
      { status: 500 }
    );
  }
} 