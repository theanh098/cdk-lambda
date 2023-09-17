import {
  pgEnum,
  pgTable,
  serial,
  uniqueIndex,
  varchar
} from 'drizzle-orm/pg-core';

export const superUserRoles = pgEnum('SuperUserRoles', ['editor', 'admin']);

export const superUser = pgTable(
  'super_user',
  {
    id: serial('id').primaryKey().notNull(),
    role: superUserRoles('role').notNull(),
    refreshToken: varchar('refresh_token'),
    username: varchar('username').notNull().unique(),
    password: varchar('password').notNull(),
    avatar: varchar('avatar')
  },
  table => ({
    usernameKey: uniqueIndex().on(table.username)
  })
);
