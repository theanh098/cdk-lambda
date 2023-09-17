import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { user } from './user.model';
import { business } from './business.model';

export const followerToBusiness = pgTable(
  'follower_to_business',
  {
    followerId: integer('follower_id')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    businessId: integer('business_id')
      .notNull()
      .references(() => business.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade'
      })
  },
  table => ({
    followersOnBusinessesPkey: primaryKey(table.followerId, table.businessId)
  })
);
