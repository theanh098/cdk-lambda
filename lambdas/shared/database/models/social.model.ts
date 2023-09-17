import {
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  text
} from 'drizzle-orm/pg-core';
import { user } from './user.model';

export const social = pgTable(
  'social',
  {
    id: serial('id').primaryKey().notNull(),
    lastUpdate: timestamp('last_update', { precision: 6, mode: 'string' }),
    twitterId: text('twitterId'),
    twitter: text('twitter'),
    discordId: text('discordId'),
    discord: text('discord'),
    telegramId: text('telegramId'),
    telegram: text('telegram'),
    userId: integer('user_id')
      .notNull()
      .unique()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' })
  },
  table => ({
    userIdKey: uniqueIndex().on(table.userId)
  })
);
