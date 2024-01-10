import styled from 'styled-components';
import Container from '../ui/Container';
import logo from '@src/assets/logo.png';
import { Link } from 'react-router-dom';

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
`;

const Header = () => {
  return (
    <HeaderContainer as="header">
      <img src={logo} alt="ChainWiki" />
      <Link to="/">Log in</Link>
    </HeaderContainer>
  );
};

export default Header;
