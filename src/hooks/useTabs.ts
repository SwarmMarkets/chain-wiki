import { TokenTabs } from '@src/shared/enums'
import queryString from 'query-string'
import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

interface UseTabsOptions {
  defaultTab?: string
}

const useTabs = (options?: UseTabsOptions) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const initialTab = searchParams.get('tab') || TokenTabs.READ
  const [activeTab, setActiveTab] = useState(initialTab)

  const changeTab = (tab: string) => {
    setActiveTab(tab)

    if (tab === options?.defaultTab) {
      const params = queryString.exclude(location.search, ['tab'])

      navigate({ search: params })
      return
    }

    const params = queryString.stringify({ tab: tab })

    navigate({ search: `?${params}` })
  }

  return {
    activeTab,
    changeTab,
  }
}

export default useTabs
