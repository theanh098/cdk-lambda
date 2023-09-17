import * as E from 'fp-ts/Either';

const infrastructureErrorTag = Symbol('infrastructureErrorTag');

export type InfrastructureError = Readonly<{
  _tag: typeof infrastructureErrorTag;
  reason: unknown;
}>;

export const infrastructureError = (reason: unknown): InfrastructureError => ({
  _tag: infrastructureErrorTag,
  reason: E.toError(reason).message
});
