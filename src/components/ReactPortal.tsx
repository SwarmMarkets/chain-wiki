import React from 'react'
import { createPortal } from 'react-dom'

interface ReactPortalProps extends React.PropsWithChildren {
  wrapperId: string
}

const ReactPortal: React.FC<ReactPortalProps> = ({ children, wrapperId }) => {
  const wrapper =
    typeof document !== 'undefined' && document.getElementById(wrapperId)

  if (!wrapper) {
    return null
  }

  return createPortal(children, wrapper)
}
export default ReactPortal
