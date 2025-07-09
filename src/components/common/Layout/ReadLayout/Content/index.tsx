import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ContentItemChild, ContentItemParent } from 'src/shared/types/content'
import { buildContentHierarchy } from 'src/shared/utils'
import SidebarTree from '../SidebarTree'
import SidebarTreeNode, { ISidebarTreeNode } from '../SidebarTreeNode'

interface ContentProps {
  contentElem: HTMLDivElement | null
  className?: string
}

const Content: React.FC<ContentProps> = ({ contentElem, className }) => {
  const { t } = useTranslation('contents')

  const [headingsInView, setHeadingsInView] = useState<number[]>([])
  const [beginningActive, setBeginningActive] = useState(window.scrollY === 0)
  const firstHeadingInView = Math.min(...headingsInView)

  const addHeadingInView = (id: number) =>
    setHeadingsInView(prev => [...prev, id])
  const removeHeadingInView = (id: number) =>
    setHeadingsInView(prev => prev.filter(item => item !== id))

  const headings = contentElem?.querySelectorAll('h1, h2')

  const contentData = useMemo(
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

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // Replace any non-alphanumeric chars with dash
      .replace(/^-+|-+$/g, '') // Remove leading/trailing dashes
      .replace(/-+/g, '-') // Replace multiple dashes with single dash
  }

  if (!contentElem) {
    return <div className={className}>{t('contentNotFound')}</div>
  }

  const buildTreeData = (
    data: (Partial<ContentItemParent> & ContentItemChild)[]
  ): ISidebarTreeNode[] => {
    return data.map(item => ({
      tokenId: item.id.toString(),
      title: item.title,
      slug: generateSlug(item.title),
      children: item.childs ? buildTreeData(item.childs) : [],
    }))
  }

  const findItemRecursive = (
    items: (ContentItemParent | ContentItemChild)[],
    id: string
  ): ContentItemChild | ContentItemParent | undefined => {
    for (const item of items) {
      if (item.id.toString() === id) return item
      if ('childs' in item && item.childs) {
        const found = findItemRecursive(item.childs, id)
        if (found) return found
      }
    }
    return undefined
  }

  return (
    <div className={className}>
      <SidebarTreeNode
        className='mb-1'
        onSelect={onClickBeginning}
        selectedId={beginningActive ? 'beginning' : null}
        node={{
          tokenId: 'beginning',
          title: t('beginning'),
          slug: 'beginning',
          children: [],
        }}
      />
      <SidebarTree
        data={buildTreeData(contentData)}
        onSelect={node => {
          const found = findItemRecursive(contentData, node.tokenId)
          if (found && 'childs' in found) {
            onClickTitle(found as ContentItemParent)
          } else {
            onClickItem(found as ContentItemChild)
          }
        }}
        selectedId={beginningActive ? '' : firstHeadingInView.toString()}
      />
    </div>
  )
}

export default Content
