import styled from 'styled-components';
import Container from '../ui/Container';
import Flex from '../ui/Flex';
import TextField from '../ui/TextField';
import logo from '@src/assets/logo.png';
import SearchIcon from '../icons/SearchIcon';
import Button from '../ui/Button';
import { Link } from 'react-router-dom';
import RoutePaths from '@src/shared/enums/routes-paths';

const HeaderContainer = styled(Container)`
  width: 100%;
  width: -moz-available;
  width: -webkit-fill-available;
  width: fill-available;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Header = () => {
  return (
    <HeaderContainer as="header">
      <Flex $gap="60px">
        <Link to={RoutePaths.HOME}>
          <img src={logo} alt="ChainWiki" />
        </Link>
        <TextField
          prependIcon={<SearchIcon />}
          placeholder="Search ChainWiki"
        />
      </Flex>

      <Button>Log in</Button>
    </HeaderContainer>
  );
};

export default Header;
