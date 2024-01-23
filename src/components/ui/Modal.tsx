import { BasicModalProps } from '@src/shared/types/common-props'
import shouldForwardProp from '@styled-system/should-forward-prop'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { LayoutProps, SpaceProps, layout, space } from 'styled-system'

const ModalBackdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContainer = styled.div.withConfig({ shouldForwardProp })`
  background: white;
  padding: 20px;
  min-width: 420px;
  min-height: 360px;
  border-radius: 5px;
  position: relative;
  ${layout}
  ${space}
`

const CloseButton = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 30px;
`

interface ModalProps extends BasicModalProps, LayoutProps, SpaceProps {}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, ...props }) => {
  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContainer onClick={e => e.stopPropagation()} {...props}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </ModalContainer>
    </ModalBackdrop>
  )
}

export default Modal
