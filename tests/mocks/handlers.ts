import { http, HttpResponse } from 'msw';
import type { WaitlistFormData } from '@/lib/validation';

export const handlers = [
  // Waitlist submission handler
  http.post('/api/waitlist', async ({ request }) => {
    const data = (await request.json()) as WaitlistFormData;

    // Simulate duplicate email error
    if (data.email === 'duplicate@example.com') {
      return HttpResponse.json(
        { error: 'This email is already on the waitlist' },
        { status: 409 }
      );
    }

    // Simulate rate limit error
    if (data.email === 'ratelimited@example.com') {
      return HttpResponse.json(
        {
          error: 'Too many requests',
          reset: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
        },
        { status: 429 }
      );
    }

    // Successful submission
    return HttpResponse.json(
      { message: 'Successfully joined the waitlist!' },
      { status: 201 }
    );
  }),

  // Waitlist count handler
  http.get('/api/waitlist-count', () => {
    return HttpResponse.json({ count: 42 }, { status: 200 });
  }),
]; 