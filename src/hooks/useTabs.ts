import queryString from 'query-string'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface UseTabsOptions<T> {
  defaultTab?: T
}

const useTabs = <T>(options?: UseTabsOptions<T>) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const activeTab = (searchParams.get('tab') ||
    options?.defaultTab ||
    null) as T | null

  const changeTab = (tab: T | null) => {
    if (tab === options?.defaultTab) {
      const params = queryString.exclude(location.search, ['tab'])

      navigate({ search: params }, { replace: true })
      return
    }

    const params = queryString.stringify({ tab })

    navigate({ search: `?${params}` }, { replace: true })
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
