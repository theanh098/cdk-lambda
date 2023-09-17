import {
  integer,
  pgTable,
  serial,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { review } from './review.model';
import { user } from './user.model';

export const reply = pgTable('reply', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  desc: varchar('desc').notNull(),
  reviewId: integer('review_id')
    .notNull()
    .references(() => review.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  likes: integer('likes').array().default([]),
  dislikes: integer('dislikes').array().default([]),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' })
});
