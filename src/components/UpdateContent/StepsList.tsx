import { ChildrenProp } from '@src/shared/types/common-props'
import Icon from '../ui/Icon'
import styled from 'styled-components'
import { RetryButton } from './styled-components'
import { useTranslation } from 'react-i18next'

export interface ListItemProps extends ChildrenProp {
  success: boolean
  loading: boolean
  error?: boolean
  retry?(): void
}

const StyledLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ListItem: React.FC<ListItemProps> = ({
  loading,
  success,
  error,
  retry,
  children,
}) => {
  const { t } = useTranslation('updateContent')
  const iconName = loading ? 'loader' : success ? 'checkbox' : 'emptyCircle'

  return (
    <StyledLi>
      <Icon mr={2} name={iconName} size={25} />
      {children}

      {error ? (
        <RetryButton ml={2} onClick={retry}>
          {t('actions.retry')}
        </RetryButton>
      ) : null}
    </StyledLi>
  )
}

export { List, ListItem }
