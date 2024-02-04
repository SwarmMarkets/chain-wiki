import React from 'react';

const icons = {
  chevronRight: React.lazy(() => import('@src/assets/icons/chevronRight.svg?react')),
  search: React.lazy(() => import('@src/assets/icons/search.svg?react')),
  loader: React.lazy(() => import('@src/assets/icons/loader.svg?react')),
  checkbox: React.lazy(() => import('@src/assets/icons/checkbox.svg?react')),
  emptyCircle: React.lazy(() => import('@src/assets/icons/emptyCircle.svg?react')),
};

export default icons;