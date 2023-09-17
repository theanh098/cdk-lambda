import { pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const campaign = pgTable('campaign', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  title: varchar('title').notNull(),
  description: varchar('description').notNull(),
  metadata: varchar('metadata')
});
