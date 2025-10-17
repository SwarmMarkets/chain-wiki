'use client'

import { useEffect, useState } from 'react'

/**
 * Хук для безопасного получения контейнера портала в Next.js
 * @param selector - CSS-селектор контейнера (например, '#modals' или '#root')
 * @param fallback - элемент, который будет использован, если селектор не найден (по умолчанию document.body)
 * @returns HTMLElement | null — готовый контейнер для createPortal
 */
export function usePortalTarget(
  selector?: string,
  fallback?: HTMLElement
): HTMLElement | null {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    // Выполняется только на клиенте
    if (typeof document === 'undefined') return

    const el = selector ? document.querySelector(selector) : null
    if (el instanceof HTMLElement) {
      setTarget(el)
    } else {
      setTarget(fallback ?? document.body)
    }
  }, [selector, fallback])

  return target
}
