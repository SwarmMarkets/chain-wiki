import { ChildrenProp } from 'src/shared/types/common-props'
import Icon from '../ui-kit/Icon/Icon'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import {
  LayoutProps,
  SpaceProps,
  BackgroundProps,
  layout,
  background,
  space,
} from 'styled-system'
import shouldForwardProp from '@styled-system/should-forward-prop'
import Button from './Button/Button'

interface ListProps extends LayoutProps, SpaceProps, BackgroundProps {}

export interface ActionStateItemProps extends ChildrenProp {
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

const ActionStateWrap = styled.ul.withConfig({ shouldForwardProp })<ListProps>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${layout}
  ${background}
  ${space}
`

const ActionStateItem: React.FC<ActionStateItemProps> = ({
  loading,
  success,
  error,
  retry,
  children,
}) => {
  const { t } = useTranslation('buttons')
  const iconName = loading ? 'loader' : success ? 'checkbox' : 'emptyCircle'

  return (
    <StyledLi>
      <Icon mr={2} name={iconName} size={25} />
      {children}

      {error && retry ? (
        <Button ml={3} fontSize='0.9rem' px='12px' onClick={retry} size='small'>
          {t('retry')}
        </Button>
      ) : null}
    </StyledLi>
  )
}

export { ActionStateWrap, ActionStateItem }
