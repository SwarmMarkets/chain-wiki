'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import queryString from 'query-string'

interface UseTabsOptions<T> {
  defaultTab?: T
}

const useTabs = <T>(options?: UseTabsOptions<T>) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const activeTab = (searchParams.get('tab') ||
    options?.defaultTab ||
    null) as T | null

  const changeTab = (tab: T | null) => {
    const currentParams = Object.fromEntries(searchParams.entries())

    if (tab === options?.defaultTab || tab === null) {
      delete currentParams.tab
    } else {
      currentParams.tab = String(tab)
    }

    const newQuery = queryString.stringify(currentParams)
    router.replace(`${pathname}${newQuery ? `?${newQuery}` : ''}`)
  }

  const resetTab = () => {
    changeTab((options?.defaultTab as T) || null)
  }

  return {
    activeTab,
    changeTab,
    resetTab,
  }
}

export default useTabs
