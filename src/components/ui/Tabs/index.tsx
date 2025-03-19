import React, { ReactElement } from 'react'
import { Tab as ITab } from 'src/shared/types/ui-components'
import { ChildrenProp } from 'src/shared/types/common-props'
import { TabProps } from './Tab'

interface TabsProps<T extends string> extends ChildrenProp {
  onChange: (tab: ITab<T>) => void
}

const Tabs = <T extends string>({
  onChange,
  children: childrenProp,
}: TabsProps<T>) => {
  const handleTabClick = (tab: ITab<T>) => {
    onChange && onChange(tab)
  }

  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) {
      return null
    }

    return React.cloneElement(child as ReactElement<TabProps>, {
      onChange() {
        handleTabClick(child.props)
      },
    })
  })

  return <div className='flex gap-2 border-b border-main'>{children}</div>
}

export default Tabs
