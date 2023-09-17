import { pipe } from 'fp-ts/function';
import { db } from './lambdas/shared/database/pool';
import { BusinessRepository } from './lambdas/shared/database/repositories/business.repository';
import * as TE from 'fp-ts/TaskEither';

async function main() {
  const b = new BusinessRepository(db);
  const k = await pipe(
    b.findByCategories({
      sort: 'bestRating',
      page: 1,
      pageSize: 10
    }),
    TE.matchW(
      err => err,
      data => data
    )
  )();

  console.log('k: ', k);
}

main();
