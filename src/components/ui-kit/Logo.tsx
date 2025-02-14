import { Link } from 'react-router-dom'
import useBreakpoint from '../hooks/ui/useBreakpoint'
import Icon from './Icon/Icon'

const Logo = () => {
  const isSm = useBreakpoint('sm')

  return (
    <Link to='/trade'>
      {isSm ? (
        <Icon
          cdn
          name='SwarmMobileLogo'
          color='primary'
          width='35px'
          height='35px'
        />
      ) : (
        <Icon
          cdn
          name='SwarmXLogo'
          color='primary'
          width='140px'
          height='35px'
        />
      )}
    </Link>
  )
}

export default Logo
