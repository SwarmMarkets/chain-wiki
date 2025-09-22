import { Link, useLocation, LinkProps } from 'react-router-dom'

const LinkPreserveSearch: React.FC<LinkProps> = ({ to, ...props }) => {
  const location = useLocation()

  let finalTo = to
  if (typeof to === 'string') {
    finalTo = to + location.search
  } else {
    finalTo = {
      ...to,
      search: location.search,
    }
  }

  return <Link to={finalTo} {...props} />
}

export default LinkPreserveSearch
