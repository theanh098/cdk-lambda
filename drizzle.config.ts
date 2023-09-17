import type { Config } from 'drizzle-kit';

export default {
  schema: './schema.ts',
  driver: 'pg',
  dbCredentials: {
    database: 'drizzle_c2e',
    host: 'localhost',
    password: 'vitaminc',
    user: 'postgres',
    port: 5432
  }
} satisfies Config;
