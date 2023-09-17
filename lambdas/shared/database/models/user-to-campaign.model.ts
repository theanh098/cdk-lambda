import {
  integer,
  pgTable,
  varchar,
  primaryKey,
  boolean
} from 'drizzle-orm/pg-core';
import { user } from './user.model';
import { campaign } from './campaign.model';

export const userToCampaign = pgTable(
  'user_to_campaign',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    campaignId: integer('campaign_id')
      .notNull()
      .references(() => campaign.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      }),
    claimed: boolean('claimed').default(false).notNull(),
    amount: integer('amount').notNull(),
    txnHash: varchar('txnHash')
  },
  table => ({
    usersOnCampaignsPkey: primaryKey(table.userId, table.campaignId)
  })
);
