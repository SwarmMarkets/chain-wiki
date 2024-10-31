import React, { useEffect, useMemo, useState } from 'react'
import ExpandableList from '../ui/ExpandableList'
import { ContentItemChild, ContentItemParent } from '@src/shared/types/content'
import { buildContentHierarchy } from '@src/shared/utils'
import { useTranslation } from 'react-i18next'
import Text from '../ui/Text'
import { useTheme } from 'styled-components'

interface ContentProps {
  contentElem: HTMLDivElement | null
  className?: string
}

const Content: React.FC<ContentProps> = ({ contentElem, className }) => {
  const { t } = useTranslation('contents')
  const theme = useTheme()

  const [headingsInView, setHeadingsInView] = useState<number[]>([])
  const [activeItemId, setActiveItemId] = useState<string | null>(null)
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

  const onClickTitle = (elem: Element) => {
    elem.scrollIntoView({ behavior: 'smooth' })
  }
  const onClickItem = (elem?: Element) => {
    elem?.scrollIntoView({ behavior: 'smooth' })
  }
  const onClickBeginning = () => {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }
  console.log(contentData)
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
      <ExpandableList title={t('beginning')} onClickTitle={onClickBeginning} />
      {contentData.map(item => (
        <ExpandableList
          initialExpanded={true}
          onClickTitle={() => onClickTitle(item)}
          onClickItem={() => onClickItem(item)}
          key={item.id}
          title={item.title}
          highlightTitle={firstHeadingInView === item.id}
          items={item.childs?.map(child => ({
            id: child.id,
            value: child.title,
            highlight: firstHeadingInView === child.id,
          }))}
          activeItemId={activeItemId}
        />
      ))}
    </div>
  )
}

export default Content
