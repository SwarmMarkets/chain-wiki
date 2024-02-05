import styled from 'styled-components';
import Text from '../ui/Text';
import Button from '../ui/Button/Button';

export const TextDescription = styled(Text.p)`
  font-size: 1.05rem;
  margin-bottom: 2rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.nearBlack}
`

export const RetryButton = styled(Button)`
  font-size: 0.9rem;
  height: 35px;
`
