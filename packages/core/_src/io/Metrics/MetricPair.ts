import type { _Out } from "@effect/core/io/Metrics/MetricKeyType";

/**
 * @tsplus type ets/Metrics/MetricPair
 */
export interface MetricPair<Type extends MetricKeyType<any, any>> {
  readonly metricKey: MetricKey<Type>;
  readonly metricState: MetricState<
    [Type] extends [{ [_Out]: () => infer Out; }] ? Out : never
  >;
}

/**
 * @tsplus type ets/Metrics/MetricPair/Ops
 */
export interface MetricPairOps {}
export const MetricPair: MetricPairOps = {};

export declare namespace MetricPair {
  export type Untyped = MetricPair<MetricKeyType<any, any>>;
}

/**
 * @tsplus static ets/Metrics/MetricPair/Ops make
 */
export function make<Type extends MetricKeyType<any, any>>(
  metricKey: MetricKey<Type>,
  metricState: MetricState<
    [Type] extends [{ [_Out]: () => infer Out; }] ? Out : never
  >
): MetricPair.Untyped {
  return { metricKey, metricState };
}

/**
 * @tsplus static ets/Metrics/MetricPair/Ops unsafeMake
 */
export function unsafeMake<Type extends MetricKeyType<any, any>>(
  metricKey: MetricKey<Type>,
  metricState: MetricState.Untyped
): MetricPair.Untyped {
  return { metricKey, metricState };
}
