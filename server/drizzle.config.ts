import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/models/*',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}); 