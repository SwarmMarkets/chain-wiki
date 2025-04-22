import { Link } from 'react-router-dom'
import useBreakpoint from 'src/hooks/ui/useBreakpoint'
import Icon from './Icon/Icon'

const Logo = () => {
  const isSm = useBreakpoint('sm')

  return (
    <Link to='/trade'>
      {isSm ? (
        <Icon cdn name='SwarmMobileLogo' color='primary' size={35} />
      ) : (
        <Icon cdn name='SwarmXLogo' color='primary' size={35} />
      )}
    </Link>
  )
}

export default Logo
