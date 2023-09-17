import { db } from './lambdas/shared/database/pool';
import { BusinessRepository } from './lambdas/shared/database/repositories/business.repository';

async function main() {
  const b = new BusinessRepository(db);
  const k = await b.findByCategories({
    sort: 'mostReview',
    page: 1,
    pageSize: 10
  });

  console.log('k: ', k);
}

main();
