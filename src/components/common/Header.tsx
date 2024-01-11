import styled from 'styled-components';
import Container from '../ui/Container';
import Flex from '../ui/Flex';
import TextField from '../ui/TextField';
import logo from '@src/assets/logo.png';
import SearchIcon from '../icons/SearchIcon';
import Button from '../ui/Button';

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
      <Flex $gap="60px">
        <img src={logo} alt="ChainWiki" />
        <TextField
          prependIcon={<SearchIcon />}
          placeholder="Search ChainWiki"
        />
      </Flex>

      <Button
        onClick={() => {
          alert('click!');
        }}
      >
        Log in
      </Button>
    </HeaderContainer>
  );
};

export default Header;
