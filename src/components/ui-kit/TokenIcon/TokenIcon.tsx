import useActiveOrDefaultChain from 'src/common/hooks/web3/useActiveOrDefaultChain'
import { AnyToken } from 'src/common/types/models/Tokens'
import staticConfig from 'src/config'
import clsx from 'clsx'
import { ImgHTMLAttributes } from 'react'
import getTokenIconUrl from './utils'

const {
  resources: { tokenIconsCdn },
} = staticConfig

const genericIconSrc = `${tokenIconsCdn}/svg/color/generic.svg`

interface TokenIconProps extends ImgHTMLAttributes<HTMLImageElement> {
  token?: AnyToken
  size?: number | string
}

const TokenIcon: React.FC<TokenIconProps> = ({
  token,
  size = 20,
  className,
  ...rest
}) => {
  const chain = useActiveOrDefaultChain()

  const tokenIconUrl =
    !chain.name || !token ? genericIconSrc : getTokenIconUrl(chain.name, token)

  const handleError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src = genericIconSrc
  }

  return (
    <img
      onError={handleError}
      className={clsx('rounded-full', className)}
      style={{ width: size, height: size }}
      src={tokenIconUrl}
      alt={token?.symbol}
      {...rest}
    />
  )
}

export default TokenIcon
