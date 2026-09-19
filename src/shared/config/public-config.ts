import { z } from 'zod';

const publicConfigSchema = z.object({
  apiBaseUrl: z.string().min(1),
});

export const publicConfig = publicConfigSchema.parse({
  apiBaseUrl: '/api',
});
