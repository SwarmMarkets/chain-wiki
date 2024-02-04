import styled from 'styled-components';
import Text from '../ui/Text';

export const TextDescription = styled(Text.p)`
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.nearBlack}
`
