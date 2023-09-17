import {
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
  text
} from 'drizzle-orm/pg-core';
import { business } from './business.model';
import { user } from './user.model';

export const reviewStatuses = pgEnum('ReviewStatuses', [
  'rejected',
  'pending',
  'approved'
]);

export const review = pgTable(
  'review',
  {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
      .defaultNow()
      .notNull(),
    rate: integer('rate').notNull(),
    businessId: integer('business_id')
      .notNull()
      .references(() => business.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade'
      }),
    userId: integer('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    status: reviewStatuses('status').default('pending').notNull(),
    likes: integer('likes').array().default([]),
    dislikes: integer('dislikes').array().default([]),
    headline: varchar('headline'),
    comment: varchar('comment'),
    txnHash: text('txn_hash').unique(),
    sharings: integer('sharings').array().default([]),
    analysis: text('analysis'),
    pointAnalysis: integer('point_analysis')
  },
  table => ({
    txnHashKey: uniqueIndex().on(table.txnHash)
  })
);
