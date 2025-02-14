import React from 'react'
import RouterLink from '../RouterLink'
import Flex from '../Flex'
import Icon from '../../ui-kit/Icon/Icon'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <Flex as='ol' $gap='8px' alignItems='center'>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <Flex key={index}>
            {item.to ? (
              <RouterLink to={item.to}>{item.label}</RouterLink>
            ) : (
              <span>{item.label}</span>
            )}
          </Flex>
          {index < items.length - 1 && <Icon name='chevronRight' size={14} />}
        </React.Fragment>
      ))}
    </Flex>
  )
}

export default Breadcrumbs
