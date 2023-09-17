import {
  index,
  integer,
  pgEnum,
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core';
import { superUser } from './super-user.model';

export const businessStatus = pgEnum('BusinessStatus', [
  'rejected',
  'pending',
  'approved'
]);

export const business = pgTable(
  'business',
  {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
      .defaultNow()
      .notNull(),
    name: varchar('name').notNull().unique(),
    overview: varchar('overview').notNull(),
    token: varchar('token'),
    logo: varchar('logo'),
    founderName: varchar('founder_name'),
    startDate: timestamp('start_date', { precision: 6, mode: 'string' }),
    address: varchar('address'),
    whitepaperUrl: varchar('whitepaper_url'),
    contractAddress: varchar('contract_address'),
    website: varchar('website'),
    type: varchar('type', { length: 26 }).array(),
    mainCategory: varchar('main_category').notNull(),
    chains: varchar('chains', { length: 26 }).array(),
    cmcId: integer('cmc_id'),
    contractChain: varchar('contract_chain'),
    status: businessStatus('status').default('pending').notNull(),
    tags: varchar('tags', { length: 26 }).array(),
    creatorId: integer('creator_id')
      .notNull()
      .references(() => superUser.id)
  },
  table => ({
    sCmcIdIdx: index().on(table.cmcId),
    sCmcIdTokenIdx: index().on(table.token, table.cmcId),
    sMainCategoryIdx: index().on(table.mainCategory),
    sMainCategoryTypeIdx: index().on(table.type, table.mainCategory),
    sNameKey: uniqueIndex().on(table.name),
    sTokenIdx: index().on(table.token),
    sTypeIdx: index().on(table.type)
  })
);
