import { APIGatewayProxyEvent } from 'aws-lambda';
import * as TE from 'fp-ts/TaskEither';
import * as E from 'fp-ts/Either';

import { pipe } from 'fp-ts/function';
import { InfrastructureError, infrastructureError } from '../shared/error';

type Body = {
  name: string;
};

export const handler = async ({
  name
}: Body): Promise<{ data: string; status: number } | InfrastructureError> => {
  return pipe(
    TE.Do,
    TE.bindW('data', () =>
      pipe(
        E.tryCatch(
          () => name,
          err => infrastructureError(err)
        ),
        TE.fromEither
      )
    ),
    TE.bindW('status', () => TE.right(200)),
    TE.matchW(
      err => err,
      res => {
        console.log('res: ', res);
        return res;
      }
    )
  )();
};
