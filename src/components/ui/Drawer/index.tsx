import useScrollBlock from '@src/hooks/useScrollBlock'
import { ChildrenProp } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import { useLayoutEffect } from 'react'
import styled from 'styled-components'
import { LayoutProps, layout } from 'styled-system'
import ReactPortal from '../../ReactPortal'
import Divider from '../Divider'
import Flex from '../Flex'
import Icon from '../Icon'
import Text from '../Text'

interface DrawerProps extends ChildrenProp, LayoutProps {
  isOpen: boolean
  onClose?: () => void
  title?: string
}

interface DrawerContainerProps extends LayoutProps {
  open: boolean
}

const DrawerContainer = styled(Flex).withConfig({
  shouldForwardProp,
})<DrawerContainerProps>`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-100%')};
  transition: all 0.3s;
  ${layout}
  background: white;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
`

const DrawerBackdrop = styled.div<DrawerContainerProps>`
  ${props =>
    props.open &&
    `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 1000;
    `}
`

const XmarkIcon = styled(Icon)`
  cursor: pointer;
`

const ChildrenWrapper = styled(Flex)`
  box-sizing: border-box;
`

const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  children,
  onClose,
  title,
  ...props
}) => {
  const { updateIsBlock } = useScrollBlock()

  useLayoutEffect(() => {
    updateIsBlock(isOpen)
  }, [isOpen, updateIsBlock])

  return (
    <ReactPortal wrapperId='drawers'>
      <DrawerBackdrop onClick={onClose} open={isOpen}>
        <DrawerContainer
          flexDirection='column'
          onClick={e => e.stopPropagation()}
          open={isOpen}
          {...props}
        >
          <Flex justifyContent='space-between' p='30px'>
            <Text.h2>{title}</Text.h2>
            <XmarkIcon name='xmark' onClick={onClose} />
          </Flex>
          <Divider />
          <ChildrenWrapper p='30px' flex={1}>
            {children}
          </ChildrenWrapper>
        </DrawerContainer>
      </DrawerBackdrop>
    </ReactPortal>
  )
}

export default Drawer
