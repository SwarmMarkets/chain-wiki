import React from 'react'
import styled from 'styled-components'
import RouterLink from '../RouterLink'
import Flex from '../Flex'
import Icon from '../Icon'

interface BreadcrumbItem {
  label: string
  to?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

const BreadcrumbsContainer = styled.nav`
  margin-bottom: 20px;
`

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <BreadcrumbsContainer>
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
    </BreadcrumbsContainer>
  )
}

export default Breadcrumbs
