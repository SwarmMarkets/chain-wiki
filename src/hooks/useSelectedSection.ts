import { useCallback, useState } from 'react'

export interface SelectedSection {
  id: string
  htmlContent: string
}

const useSelectedSection = () => {
  const [selectedSection, setSelectedSection] = useState<SelectedSection | null>(
    null
  )

  const openSection = useCallback((sectionId: string) => {
    const htmlContent = document.getElementById(sectionId)?.outerHTML || ''
    setSelectedSection({ id: sectionId, htmlContent })
  }, [])

  const closeSection = useCallback(() => {
    setSelectedSection(null)
  }, [])

  return {
    selectedSection,
    isOpen: Boolean(selectedSection),
    openSection,
    closeSection,
  }
}

export default useSelectedSection
