import { integer, pgTable, primaryKey } from 'drizzle-orm/pg-core';
import { user } from './user.model';
import { business } from './business.model';

export const rateToBusiness = pgTable(
  'rate_to_business',
  {
    valuerId: integer('valuer_id')
      .notNull()
      .references(() => user.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    businessId: integer('business_id')
      .notNull()
      .references(() => business.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade'
      }),
    rating: integer('rating').notNull()
  },
  table => ({
    ratesOnBusinessesPkey: primaryKey(table.valuerId, table.businessId)
  })
);
