import queryString from 'query-string'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface UseTabsOptions {
  defaultTab?: string
}

const useTabs = <T>(options?: UseTabsOptions) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || options?.defaultTab
  const [activeTab, setActiveTab] = useState<T | null>(
    (initialTab as T) || null
  )

  const changeTab = (tab: T) => {
    setActiveTab(tab)

    if (tab === options?.defaultTab) {
      const params = queryString.exclude(location.search, ['tab'])

      navigate({ search: params })
      return
    }

    const params = queryString.stringify({ tab })

    navigate({ search: `?${params}` })
  }

  const resetTab = () => {
    setActiveTab((options?.defaultTab as T) || null)
  }
  return {
    activeTab,
    changeTab,
    resetTab,
  }
}

export default useTabs
