import { drizzle } from 'drizzle-orm/node-postgres';
import { business } from '../models/business.model';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import {
  InferSelectModel,
  arrayContains,
  arrayOverlaps,
  desc,
  eq,
  gt,
  sql
} from 'drizzle-orm';
import { pipe } from 'fp-ts/function';
import { infrastructureError } from '../../error';
import { user } from '../models/user.model';
import * as B from 'fp-ts/boolean';
import { rateToBusiness } from '../models/rate-to-business.model';
import { review } from '../models/review.model';

export class PaginatedQuery {
  page: number;
  pageSize: number;
}

export class BusinessCategoriesQuery extends PaginatedQuery {
  subCategories?: string[];

  mainCategory?: string;

  chain?: string;

  sort?: 'bestRating' | 'mostReview' | 'lastest';
}

export class BusinessRepository {
  constructor(private readonly db: ReturnType<typeof drizzle>) {}

  public async findByCategories({
    page,
    pageSize,
    chain,
    mainCategory,
    sort,
    subCategories
  }: BusinessCategoriesQuery) {
    const r = pipe(
      this.db
        .select({
          id: business.id,
          name: business.name,
          rating: sql<string>`avg(${rateToBusiness.rating})`
        })
        .from(business)
        .leftJoin(rateToBusiness, eq(business.id, rateToBusiness.businessId))
        .groupBy(business.id),
      query =>
        pipe(
          mainCategory,
          O.fromNullable,
          O.match(
            () => query,
            value => query.where(eq(business.mainCategory, value))
          )
        ),
      query =>
        pipe(
          chain,
          O.fromNullable,
          O.match(
            () => query,
            value => query.where(arrayContains(business.tags, [value]))
          )
        ),
      query =>
        pipe(
          subCategories,
          O.fromNullable,
          O.match(
            () => query,
            value =>
              query.where(
                arrayOverlaps(
                  sql`array_cat(${business.tags},${business.type})`,
                  value
                )
              )
          )
        ),
      query =>
        pipe(
          sort,
          O.fromNullable,
          O.match(
            () => query,
            value => {
              switch (value) {
                case 'bestRating':
                  return query.orderBy(
                    sql`avg(${rateToBusiness.rating}) desc nulls last`
                  );
                case 'lastest':
                  return query.orderBy(desc(business.createdAt));
                case 'mostReview':
                  return query.orderBy(
                    sql`(select count(*) from ${review} 
                    where ${review.status} = ${'approved'} 
                    and ${review.businessId} = ${business.id}) desc`
                  );
                default:
                  return query;
              }
            }
          )
        )
    );

    return r.toSQL();
  }
}

// E.chain(query =>
//     pipe(
//       O.fromNullable(mainCategory),
//       O.match(
//         () => query,
//         value => query.where(eq(business.mainCategory, value))
//       ),
//       query => E.right(query)
//     )
//   )
