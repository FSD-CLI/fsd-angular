import { QueryClient, provideTanStackQuery } from '@tanstack/angular-query-experimental';

export function provideAppQuery() {
  return provideTanStackQuery(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60_000,
          retry: 1,
        },
      },
    }),
  );
}
