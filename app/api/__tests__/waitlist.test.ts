import { NextRequest } from 'next/server';
import { POST } from '../waitlist/route';
import { mockFormData } from '@/tests/utils';

// Mock Supabase client
jest.mock('@/lib/server-utils', () => ({
  checkRateLimit: jest.fn().mockResolvedValue({ allowed: true, remaining: 4 }),
  insertWaitlistSubmission: jest.fn().mockResolvedValue(undefined),
  getClientInfo: jest.fn().mockReturnValue({
    ip: '127.0.0.1',
    userAgent: 'test-agent',
    utmSource: null,
    utmMedium: null,
    utmCampaign: null,
  }),
}));

describe('POST /api/waitlist', () => {
  it('handles valid submission', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(mockFormData.validSubmission),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.message).toMatch(/success/i);
  });

  it('validates required fields', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/invalid/i);
  });

  it('validates email format', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(mockFormData.invalidData),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toMatch(/invalid/i);
  });

  it('handles duplicate email', async () => {
    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(mockFormData.duplicateEmail),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toMatch(/already on the waitlist/i);
  });

  it('handles rate limiting', async () => {
    // Mock rate limit check to return not allowed
    const { checkRateLimit } = require('@/lib/server-utils');
    checkRateLimit.mockResolvedValueOnce({
      allowed: false,
      remaining: 0,
      reset: Date.now() + 15 * 60 * 1000,
    });

    const request = new NextRequest('http://localhost/api/waitlist', {
      method: 'POST',
      body: JSON.stringify(mockFormData.validSubmission),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.error).toMatch(/too many requests/i);
    expect(data.reset).toBeDefined();
  });
}); 