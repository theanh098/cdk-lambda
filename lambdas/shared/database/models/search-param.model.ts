import {
  integer,
  pgTable,
  serial,
  text,
  uniqueIndex
} from 'drizzle-orm/pg-core';

export const searchParam = pgTable(
  'search_param',
  {
    id: serial('id').primaryKey().notNull(),
    businessName: text('business_name').notNull().unique(),
    times: integer('times').notNull()
  },
  table => ({
    businessNameKey: uniqueIndex().on(table.businessName)
  })
);
