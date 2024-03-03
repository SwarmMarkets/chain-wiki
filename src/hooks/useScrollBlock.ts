import { useEffect, useState } from 'react'

interface UseScrollBlockArg {
  initialValue?: boolean
}

const useScrollBlock = (options?: UseScrollBlockArg) => {
  const [IsBlock, setIsBlock] = useState(!!options?.initialValue)

  useEffect(() => {
    const getScrollBarWidth = () => {
      const el = document.createElement('div')
      el.style.cssText =
        'overflow:scroll; visibility:hidden; position:absolute;'
      document.body.appendChild(el)
      const width = el.offsetWidth - el.clientWidth
      el.remove()

      return width
    }

    if (!IsBlock) return
    document.body.style.paddingRight = `${getScrollBarWidth()}px`
    document.body.style.overflowY = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow-y')
      document.body.style.removeProperty('padding-right')
    }
  }, [IsBlock])

  const updateIsBlock = (ip: boolean) => {
    setIsBlock(ip)
  }

  return {
    updateIsBlock,
    IsBlock,
  }
}

export default useScrollBlock
