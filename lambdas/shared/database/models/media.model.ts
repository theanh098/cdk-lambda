import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { business } from './business.model';

export const mediaSoucres = pgEnum('MediaSoucres', [
  'Blog',
  'Twitter',
  'Discord',
  'Telegram',
  'Photo'
]);

export const media = pgTable('media', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  url: varchar('url').notNull(),
  businessId: integer('business_id')
    .notNull()
    .references(() => business.id, {
      onDelete: 'cascade'
    }),
  path: text('path'),
  source: mediaSoucres('source').notNull()
});
