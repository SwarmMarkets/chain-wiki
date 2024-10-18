import React from 'react'

const icons = {
  chevronRight: React.lazy(
    () => import('@src/assets/icons/chevronRight.svg?react')
  ),
  chevronLeft: React.lazy(
    () => import('@src/assets/icons/chevronLeft.svg?react')
  ),
  search: React.lazy(() => import('@src/assets/icons/search.svg?react')),
  loader: React.lazy(() => import('@src/assets/icons/loader.svg?react')),
  checkbox: React.lazy(() => import('@src/assets/icons/checkbox.svg?react')),
  emptyCircle: React.lazy(
    () => import('@src/assets/icons/emptyCircle.svg?react')
  ),
  plus: React.lazy(() => import('@src/assets/icons/plus.svg?react')),
  document: React.lazy(() => import('@src/assets/icons/document.svg?react')),
  externalLink: React.lazy(
    () => import('@src/assets/icons/externalLink.svg?react')
  ),
  empty: React.lazy(() => import('@src/assets/icons/empty.svg?react')),
  checkmark: React.lazy(() => import('@src/assets/icons/checkmark.svg?react')),
  xmark: React.lazy(() => import('@src/assets/icons/xmark.svg?react')),
  comment: React.lazy(() => import('@src/assets/icons/comment.svg?react')),
  copy: React.lazy(() => import('@src/assets/icons/copy.svg?react')),
  settings: React.lazy(() => import('@src/assets/icons/settings.svg?react')),
  roles: React.lazy(() => import('@src/assets/icons/roles.svg?react')),
  contentEditor: React.lazy(() => import('@src/assets/icons/contentEditor.svg?react')),
  layout: React.lazy(() => import('@src/assets/icons/layout.svg?react')),
}

export default icons
