import { integer, pgTable, serial, text } from 'drizzle-orm/pg-core';
import { review } from './review.model';

export const criteriaReview = pgTable('criteria_review', {
  id: serial('id').primaryKey().notNull(),
  name: text('name').notNull(),
  value: integer('value').notNull(),
  reviewId: integer('review_id')
    .notNull()
    .references(() => review.id, { onDelete: 'cascade' })
});
