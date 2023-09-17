import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar
} from 'drizzle-orm/pg-core';
import { business } from './business.model';
import { review } from './review.model';
import { user } from './user.model';

export const notification = pgTable('notification', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  businessId: integer('business_id').references(() => business.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  }),
  reviewId: integer('review_id').references(() => review.id, {
    onDelete: 'cascade',
    onUpdate: 'cascade'
  }),
  seen: boolean('seen').default(false).notNull(),
  to: integer('to')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
  from: integer('from').references(() => user.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  }),
  metaData: varchar('meta_data'),
  type: text('type').notNull()
});
