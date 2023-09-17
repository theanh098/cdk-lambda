import { integer, pgTable, serial, timestamp } from 'drizzle-orm/pg-core';
import { storage } from './storage.model';

export const banner = pgTable('banner', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  expriedTime: timestamp('expried_time', {
    precision: 6,
    mode: 'string'
  }).notNull(),
  sourceId: integer('source_id')
    .notNull()
    .references(() => storage.id, { onDelete: 'cascade' })
});
