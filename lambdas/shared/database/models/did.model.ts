import { pgTable, serial, text, uniqueIndex } from 'drizzle-orm/pg-core';

export const did = pgTable(
  'did',
  {
    id: serial('id').primaryKey().notNull(),
    controller: text('controller').notNull().unique(),
    email: text('email'),
    username: text('username').unique()
  },
  table => ({
    controllerKey: uniqueIndex().on(table.controller),
    usernameKey: uniqueIndex().on(table.username)
  })
);
