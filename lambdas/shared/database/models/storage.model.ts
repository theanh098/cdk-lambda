import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const storage = pgTable('storage', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  url: varchar('url').notNull(),
  tag: varchar('tag')
});
