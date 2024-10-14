import { SettingView } from '@src/components/Settings/enums'
import { Link, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'

const settingsNavLinks = {
  generalSettings: {
    title: 'General Settings',
    links: [{ label: 'General', link: SettingView.GENERAL }],
  },
  accessControl: {
    title: 'Access Control',
    links: [{ label: 'Roles', link: SettingView.ROLES }],
  },
  layoutPreferences: {
    title: 'Preferences and Layout',
    links: [
      { label: 'Content Editor', link: SettingView.CONTENT },
      { label: 'Layout', link: SettingView.LAYOUT },
    ],
  },
}

const StyledNav = styled.nav`
  padding: 16px;
  border-bottom: 1px solid #e0e0e0;
`

const StyledNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`

const StyledTab = styled.div<{ active: boolean }>`
  padding: 10px 15px;
  cursor: pointer;
  color: ${props =>
    props.active
      ? props.theme.palette.borderBlue
      : props.theme.palette.textPrimary};
`

const Box = styled.div`
  margin-top: 16px;
`

const SettingsNavigation = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('setting') || SettingView.GENERAL

  const getSearchParams = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('setting', newValue)
    return newSearchParams.toString()
  }

  return (
    <Box>
      <StyledNav>
        {Object.values(settingsNavLinks).map(group => (
          <div key={group.title}>
            <h4>{group.title}</h4>
            <StyledNavList>
              {group.links.map(navItem => (
                <StyledTab
                  key={navItem.label}
                  active={activeTab === navItem.link}
                >
                  <Link to={`?${getSearchParams(navItem.link)}`}>
                    {navItem.label}
                  </Link>
                </StyledTab>
              ))}
            </StyledNavList>
          </div>
        ))}
      </StyledNav>
    </Box>
  )
}

export default SettingsNavigation
