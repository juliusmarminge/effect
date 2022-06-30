import { isChannelError } from "@effect/core/io/Cause/errors"

/**
 * @tsplus static effect/core/stream/Channel.Aspects pipeToOrFail
 * @tsplus pipeable effect/core/stream/Channel pipeToOrFail
 */
export function pipeToOrFail<
  Env2,
  OutElem,
  OutDone,
  OutErr2,
  OutElem2,
  OutDone2
>(
  that: LazyArg<Channel<Env2, never, OutElem, OutDone, OutErr2, OutElem2, OutDone2>>
) {
  return <Env, InErr, InElem, InDone, OutErr>(
    self: Channel<Env, InErr, InElem, InDone, OutErr, OutElem, OutDone>
  ): Channel<Env | Env2, InErr, InElem, InDone, OutErr2, OutElem2, OutDone2> => {
    const reader: Channel<Env, OutErr, OutElem, OutDone, never, OutElem, OutDone> = Channel.readWith(
      (outElem) => Channel.write(outElem) > reader,
      (outErr) => Channel.failCause(Cause.die(new ChannelError(outErr))),
      (outDone) => Channel.succeedNow(outDone)
    )

    const writer: Channel<
      Env2,
      OutErr2,
      OutElem2,
      OutDone2,
      OutErr2,
      OutElem2,
      OutDone2
    > = Channel.readWithCause(
      (outElem) => Channel.write(outElem) > writer,
      (cause) =>
        cause.isDieType() && isChannelError(cause.value)
          ? Channel.fail(cause.value.error as OutErr2)
          : Channel.failCause(cause),
      (outDone) => Channel.succeedNow(outDone)
    )

    return ((self >> reader) >> that()) >> writer
  }
}
