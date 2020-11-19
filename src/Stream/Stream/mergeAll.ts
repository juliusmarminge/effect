import type { Stream } from "./definitions"
import { flattenPar_ } from "./flattenPar"
import { fromIterable } from "./fromIterable"

/**
 * Merges a variable list of streams in a non-deterministic fashion.
 * Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` chunks may be buffered by this operator.
 */
export function mergeAll(n: number, outputBuffer = 16) {
  return <R, E, O>(...streams: Stream<R, E, O>[]): Stream<R, E, O> =>
    flattenPar_(fromIterable(streams), n, outputBuffer)
}
