export const StreamTimeoutErrorSym = Symbol.for(
  "@effect/core/stream/Stream/StreamTimeoutError"
)

export class StreamTimeoutError {
  readonly [StreamTimeoutErrorSym] = "StreamTimeoutError"
  constructor(readonly message?: string) {}
}

export function isStreamTimeoutError(u: unknown): u is StreamTimeoutError {
  return (
    u instanceof StreamTimeoutError && u[StreamTimeoutErrorSym] === "StreamTimeoutError"
  )
}

/**
 * Switches the stream if it does not produce a value after the spcified
 * duration.
 *
 * @tsplus static effect/core/stream/Stream.Aspects timeoutTo
 * @tsplus pipeable effect/core/stream/Stream timeoutTo
 */
export function timeoutTo<R2, E2, A2>(
  duration: LazyArg<Duration>,
  that: LazyArg<Stream<R2, E2, A2>>,
  __tsplusTrace?: string
) {
  return <R, E, A>(self: Stream<R, E, A>): Stream<R | R2, E | E2, A | A2> =>
    self
      .timeoutFailCause(Cause.die(new StreamTimeoutError()), duration)
      .catchSomeCause((cause) =>
        cause.isDieType() && isStreamTimeoutError(cause.value)
          ? Maybe.some(that())
          : Maybe.none
      )
}
