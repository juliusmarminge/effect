/**
 * Like `flattenPar`, but executes all streams concurrently.
 *
 * @tsplus static effect/core/stream/Stream.Aspects flattenParUnbounded
 * @tsplus pipeable effect/core/stream/Stream flattenParUnbounded
 */
export function flattenParUnbounded(outputBuffer = 16, __tsplusTrace?: string) {
  return <R, E, A, R1, E1>(self: Stream<R, E, Stream<R1, E1, A>>): Stream<R | R1, E | E1, A> =>
    self.flatMapPar(Number.MAX_SAFE_INTEGER, identity, outputBuffer)
}
