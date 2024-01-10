import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  max-width: 1492px;
  margin: 0 auto;
  padding: 0 52px;
  background: ${({ theme }) => theme.palette.bgColorWhite};
`;

export default Container;
