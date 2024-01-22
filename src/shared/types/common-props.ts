interface ChildrenProp {
  children?: React.ReactNode
}

interface BasicModalProps extends ChildrenProp {
  isOpen: boolean
  onClose(): void
}

export type {
  ChildrenProp,
  BasicModalProps,
}