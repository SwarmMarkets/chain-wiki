import React from 'react';

const icons = {
  chevronRight: React.lazy(() => import('@src/assets/icons/chevronRight.svg?react')),
  search: React.lazy(() => import('@src/assets/icons/search.svg?react')),
  loader: React.lazy(() => import('@src/assets/icons/loader.svg?react')),
  checkbox: React.lazy(() => import('@src/assets/icons/checkbox.svg?react')),
  emptyCircle: React.lazy(() => import('@src/assets/icons/emptyCircle.svg?react')),
  plus: React.lazy(() => import('@src/assets/icons/plus.svg?react')),
  document: React.lazy(() => import('@src/assets/icons/document.svg?react')),
  externalLink: React.lazy(() => import('@src/assets/icons/externalLink.svg?react')),
  empty: React.lazy(() => import('@src/assets/icons/empty.svg?react')),
};

export default icons;