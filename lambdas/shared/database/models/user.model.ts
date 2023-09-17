import {
  boolean,
  integer,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core';
import { did } from './did.model';

export const user = pgTable(
  'user',
  {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
      .defaultNow()
      .notNull(),
    walletAddress: varchar('wallet_address').notNull(),
    notiAccepted: boolean('noti_accepted').default(true).notNull(),
    spamAccepted: boolean('spam_accepted').default(true).notNull(),
    email: varchar('email'),
    nickname: varchar('nickname'),
    avatarUrl: varchar('avatar_url'),
    refreshToken: varchar('refresh_token'),
    isAdmin: boolean('isAdmin').default(false).notNull(),
    password: varchar('password'),
    backgroundUrl: varchar('background_url'),
    didId: integer('didId').references(() => did.id),
    lastSyncIbt: timestamp('last_sync_ibt', { precision: 6, mode: 'string' }),
    lastUpdate: timestamp('last_update', { precision: 6, mode: 'string' })
  },
  table => ({
    walletAddressKey: uniqueIndex().on(table.walletAddress)
  })
);
