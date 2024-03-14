import React from 'react'
import ExpandableList from './ui/ExpandableList'
import { ExpandableListItem } from '@src/shared/types/expandedList'
import { ContentItemParent } from '@src/shared/types/content'
import { buildContentHierarchy } from '@src/shared/utils'
import { useTranslation } from 'react-i18next'
import Text from './ui/Text'
import Divider from './ui/Divider'

interface ContentProps {
  contentElem: HTMLDivElement | null
  className?: string
}

const Content: React.FC<ContentProps> = ({ contentElem, className }) => {
  const { t } = useTranslation('contents')

  if (!contentElem) {
    return (
      <div className={className}>
        <Text.h3>{t('title')}</Text.h3>
        <Divider my='10px' />
        <Text.p>{t('contentNotFound')}</Text.p>
      </div>
    )
  }

  const headings = contentElem?.querySelectorAll('h1, h2')

  const contentData: ContentItemParent[] = buildContentHierarchy(headings)

  const onClickTitle = (elem: Element) => {
    elem.scrollIntoView({ behavior: 'smooth' })
  }

  const onClickItem = (elem?: Element) => {
    elem?.scrollIntoView({ behavior: 'smooth' })
  }

  const onClickBeginning = () => {
    document.body.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className={className}>
      <Text.h3>{t('title')}</Text.h3>
      <Divider my='10px' />
      <ExpandableList title={t('beginning')} onClickTitle={onClickBeginning} />
      {contentData.map(item => (
        <ExpandableList
          initialExpanded={true}
          onClickTitle={() => onClickTitle(item.elem)}
          onClickItem={(listItem: ExpandableListItem) =>
            onClickItem(
              item.childs?.find(child => child.id === listItem.id)?.elem
            )
          }
          key={item.id}
          title={item.title}
          items={item.childs?.map(child => ({
            id: child.id,
            value: child.title,
          }))}
        />
      ))}
    </div>
  )
}

export default Content
