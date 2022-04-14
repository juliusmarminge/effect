/**
 * Returns an aspect that will update this metric with the duration that the
 * effect takes to execute. To call this method, the input type of the metric
 * must be `Duration`.
 *
 * @tsplus getter ets/Metrics/Metric trackDuration
 */
export function trackDuration<Type, Out>(
  self: Metric<Type, Duration, Out>
): <R, E, A>(effect: Effect<R, E, A>, __tsplusTrace?: string) => Effect<R, E, A> {
  return self.trackDurationWith(identity);
}
