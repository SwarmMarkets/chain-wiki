import styled from 'styled-components';
import Container from '../ui/Container';

const HeaderContainer = styled(Container)`
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <header>
        <h1>ChainWiki</h1>
      </header>
    </HeaderContainer>
  );
};

export default Header;
