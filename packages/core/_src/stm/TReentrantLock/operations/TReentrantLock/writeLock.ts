/**
 * Obtains a write lock in a scoped context.
 *
 * @tsplus getter effect/core/stm/TReentrantLock writeLock
 */
export function writeLock(
  self: TReentrantLock,
  __tsplusTrace?: string
): Effect<Scope, never, number> {
  return Effect.acquireRelease(self.acquireWrite.commit, (_) => self.releaseWrite.commit, __tsplusTrace)
}
