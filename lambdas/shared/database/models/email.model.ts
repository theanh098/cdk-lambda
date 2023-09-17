import {
  pgTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core';
import {
  InferSelectModel,
  InferInsertModel,
  InferColumnsDataTypes,
  InferModelFromColumns
} from 'drizzle-orm';

export const email = pgTable(
  'email',
  {
    id: serial('id').primaryKey().notNull(),
    createdAt: timestamp('created_at', { precision: 6, mode: 'string' })
      .defaultNow()
      .notNull(),
    email: varchar('email').notNull().unique()
  },
  table => ({
    emailKey: uniqueIndex().on(table.email)
  })
);

const x = {
  dbColumnNames: true
};

export type Email = InferSelectModel<typeof email>;
