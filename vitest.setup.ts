import { vi } from 'vitest';

// Mock Vercel Analytics
vi.mock('@vercel/analytics/next', () => ({
  Analytics: () => null,
}));

// Mock fetch for external scripts
Object.defineProperty(global, 'fetch', {
  writable: true,
  value: vi.fn(() =>
    Promise.reject(new Error('Network requests are disabled in tests'))
  ),
});