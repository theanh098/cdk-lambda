import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp
} from 'drizzle-orm/pg-core';
import { user } from './user.model';
import { review } from './review.model';
import { campaign } from './campaign.model';

export const activityKind = pgEnum('ActivityKind', [
  'reward',
  'join_telegram',
  'join_discord',
  'share',
  'reply',
  'reactdownful',
  'reacthelpful',
  'reviewapproved'
]);

export const activity = pgTable('activity', {
  id: serial('id').primaryKey().notNull(),
  createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
    .defaultNow()
    .notNull(),
  kind: activityKind('kind').notNull(),
  userId: integer('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  reviewId: integer('review_id').references(() => review.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  }),
  point: integer('point').notNull(),
  campaignId: integer('campaign_id').references(() => campaign.id, {
    onDelete: 'set null',
    onUpdate: 'cascade'
  }),
  platformId: text('platform_id')
});
