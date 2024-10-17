import { SettingView } from '@src/components/Settings/enums'
import { Link, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import { FaCog, FaUserShield, FaEdit, FaThLarge } from 'react-icons/fa'
import Divider from '../ui/Divider'

const settingsNavLinks = {
  generalSettings: {
    title: 'General Settings',
    links: [{ label: 'General', link: SettingView.GENERAL, icon: <FaCog /> }],
  },
  accessControl: {
    title: 'Access Control',
    links: [
      { label: 'Roles', link: SettingView.ROLES, icon: <FaUserShield /> },
    ],
  },
  layoutPreferences: {
    title: 'Preferences and Layout',
    links: [
      { label: 'Content Editor', link: SettingView.CONTENT, icon: <FaEdit /> },
      { label: 'Layout', link: SettingView.LAYOUT, icon: <FaThLarge /> },
    ],
  },
}

const StyledNav = styled.nav`
  padding-right: 25px;
  font-size: 12px;
`

const StyledNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
`

const StyledTab = styled.div<{ active: boolean }>`
  margin-top: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  color: ${props =>
    props.active
      ? props.theme.palette.borderBlue
      : props.theme.palette.textPrimary};
`

const Box = styled.div`
  margin-top: 5px;
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
                  <Link
                    to={`?${getSearchParams(navItem.link)}`}
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {navItem.icon}
                    <span style={{ marginLeft: '8px' }}>{navItem.label}</span>
                  </Link>
                  {navItem.link !== SettingView.CONTENT && (
                    <Divider color='#a2a9b1' mt={2} mb={2} />
                  )}
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
