import { SettingView } from '@src/components/Settings/enums'
import { Link, useSearchParams } from 'react-router-dom'
import Divider from '../ui/Divider'
import Icon from '../ui/Icon'
import useSettingsLinks from './useSettingsLinks'
import Box from '../ui/Box'
import Text from '../ui/Text'
import { useTheme } from 'styled-components'
import {
  StyledNav,
  StyledNavList,
  StyledTab,
  StyledTitle,
} from './styled-components'

const SettingsNavigation = () => {
  const [searchParams] = useSearchParams()
  const activeTab = searchParams.get('setting') || SettingView.GENERAL
  const settingsLinks = useSettingsLinks()
  const theme = useTheme()
  const getSearchParams = (newValue: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('setting', newValue)
    return newSearchParams.toString()
  }

  return (
    <Box mt={1}>
      <StyledNav>
        {Object.values(settingsLinks).map(group => (
          <div key={group.title}>
            <StyledTitle>{group.title}</StyledTitle>
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
                    <Icon name={navItem.icon} size={14} />
                    <Text.span ml={1}>{navItem.label}</Text.span>
                  </Link>
                  {navItem.link !== SettingView.CONTENT}
                </StyledTab>
              ))}
            </StyledNavList>
            <Divider color={theme.palette.borderPrimary} my={2} />
          </div>
        ))}
      </StyledNav>
    </Box>
  )
}

export default SettingsNavigation
