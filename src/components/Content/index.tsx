import React, { useEffect, useMemo, useState } from 'react'
import ExpandableList from '../ui/ExpandableList'
import { ContentItemChild, ContentItemParent } from '@src/shared/types/content'
import { buildContentHierarchy } from '@src/shared/utils'
import { useTranslation } from 'react-i18next'
import Text from '../ui/Text'
import { useTheme } from 'styled-components'
import { ExpandableListItem } from '@src/shared/types/expandedList'

interface ContentProps {
  contentElem: HTMLDivElement | null
  className?: string
}

const Content: React.FC<ContentProps> = ({ contentElem, className }) => {
  const { t } = useTranslation('contents')
  const theme = useTheme()

  const [headingsInView, setHeadingsInView] = useState<number[]>([])
  const [beginningActive, setBeginningActive] = useState(window.scrollY === 0)
  const firstHeadingInView = Math.min(...headingsInView)
  const addHeadingInView = (id: number) =>
    setHeadingsInView(prev => [...prev, id])
  const removeHeadingInView = (id: number) =>
    setHeadingsInView(prev => prev.filter(item => item !== id))

  const headings = useMemo(
    () => contentElem?.querySelectorAll('h1, h2'),
    [contentElem]
  )

  const contentData: ContentItemParent[] = useMemo(
    () => (headings ? buildContentHierarchy(headings) : []),
    [headings]
  )

  useEffect(() => {
    const handleScroll = () => {
      setBeginningActive(window.scrollY === 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const observers: { observer: IntersectionObserver; elem: Element }[] = []

    contentData.forEach(contentItem => {
      const observe = (ci: ContentItemParent | ContentItemChild) => {
        const callback = (entries: IntersectionObserverEntry[]): void => {
          entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.isIntersecting) {
              addHeadingInView(ci.id)
            } else {
              removeHeadingInView(ci.id)
            }
          })
        }

        const observer: IntersectionObserver = new IntersectionObserver(
          callback,
          { root: null, rootMargin: '0px', threshold: 0.1 }
        )

        if (ci?.elem) {
          observer.observe(ci?.elem)
          observers.push({ observer, elem: ci?.elem })
        } else {
          console.error('Target element not found')
        }
      }

      observe(contentItem)
      contentItem.childs?.forEach(child => observe(child))
    })

    return () => {
      observers.forEach(item => {
        if (item?.elem) {
          item.observer.unobserve(item?.elem)
        }
      })
    }
  }, [contentData])

  const onClickTitle = (item: ContentItemParent) => {
    item.elem.scrollIntoView({ behavior: 'smooth' })
  }
  const onClickItem = (childItem?: ContentItemChild) => {
    childItem?.elem.scrollIntoView({ behavior: 'smooth' })
  }
  const onClickBeginning = () => {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  if (!contentElem) {
    return (
      <div className={className}>
        <Text.p
          textAlign='center'
          fontWeight={theme.fontWeights.medium}
          color={theme.palette.gray}
        >
          {t('contentNotFound')}
        </Text.p>
      </div>
    )
  }

  return (
    <div className={className}>
      <ExpandableList
        title={t('beginning')}
        onClickTitle={onClickBeginning}
        isActive={beginningActive}
      />
      {contentData.map(item => (
        <ExpandableList
          id={item.id}
          initialExpanded={true}
          onClickTitle={() => onClickTitle(item)}
          onClickItem={(listItem: ExpandableListItem) =>
            onClickItem(item.childs?.find(child => child.id === listItem.id))
          }
          key={item.id}
          title={item.title}
          isActive={!beginningActive && firstHeadingInView === item.id}
          items={item.childs?.map(child => ({
            id: child.id,
            value: child.title,
            isActive: !beginningActive && firstHeadingInView === child.id,
          }))}
        />
      ))}
    </div>
  )
}

export default Content
