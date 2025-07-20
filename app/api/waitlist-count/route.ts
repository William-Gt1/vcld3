import { NextResponse } from 'next/server';
import { getWaitlistCount } from '@/lib/server-utils';

export const revalidate = 300; // Cache response for 5 minutes

export async function GET() {
  try {
    const count = await getWaitlistCount();

    return NextResponse.json(
      { count },
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