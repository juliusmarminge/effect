/**
 * Reads the value associated with the current fiber. Returns initial value if
 * no value was `set` or inherited from parent.
 *
 * @tsplus fluent effect/core/io/FiberRef get
 */
export function get<A, P>(self: FiberRef<A, P>, __tsplusTrace?: string): Effect<never, never, A> {
  return self.modify((a) => Tuple(a, a))
}
