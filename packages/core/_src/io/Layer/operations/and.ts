import { ILayerZipWithPar } from "@effect/core/io/Layer/definition"

/**
 * Combines this layer with the specified layer, producing a new layer that
 * has the inputs and outputs of both.
 *
 * @tsplus pipeable-operator effect/core/io/Layer +
 * @tsplus static effect/core/io/Layer.Aspects and
 * @tsplus pipeable effect/core/io/Layer and
 */
export function and<RIn2, E2, ROut2>(that: LazyArg<Layer<RIn2, E2, ROut2>>) {
  return <RIn, E, ROut>(self: Layer<RIn, E, ROut>): Layer<RIn | RIn2, E | E2, ROut | ROut2> =>
    Layer.suspend(new ILayerZipWithPar(self, that(), (a, b) => a.merge(b)))
}
