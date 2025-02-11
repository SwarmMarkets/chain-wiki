import { DependencyList, EffectCallback, useEffect, useRef } from 'react'
import isEqual from 'lodash/isEqual'

const useEffectCompare = (
  callback: EffectCallback,
  dependencies: DependencyList
): void => {
  const previousDependenciesRef = useRef<DependencyList>()

  useEffect(() => {
    if (previousDependenciesRef.current) {
      // Only run the callback if the dependencies have changed
      const hasChanged = !isEqual(previousDependenciesRef.current, dependencies)

      if (hasChanged) {
        callback()
      }
    }

    // Update the previous dependencies reference after effect execution
    previousDependenciesRef.current = dependencies
  }, [callback, dependencies])
}

export default useEffectCompare
