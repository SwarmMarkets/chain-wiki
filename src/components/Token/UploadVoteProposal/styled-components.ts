import Box from 'src/components/ui/Box'
import Button from 'src/components/ui/Button/Button'
import TextField from 'src/components/ui/TextField/TextField'
import styled from 'styled-components'

export const StyledTextField = styled(TextField)`
  width: 100%;

  input {
    height: 40px;
  }
`

export const StepBack = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;

  color: ${({ theme }) => theme.palette.linkPrimary};
  padding: 0;
  height: auto;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

export const StyledList = styled.ul`
  max-width: 380px;
  list-style-type: disc;
  list-style-color: black;
  margin-left: 20px;
  margin-bottom: 20px;
`

export const StyledListItem = styled.li`
  color: ${({ theme }) => theme.palette.darkGray};
  line-height: 1.3;
  margin-bottom: 7px;
  font-weight: 500;
`

export const VoteProposalWrap = styled(Box)`
  width: 100%;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.palette.nearWhite};
  padding: 15px;
`

export const VoteProposalVariant = styled(Box)`
  border: solid 2px;
  border-radius: 10px;
  background: ${({ theme }) => theme.palette.white};
  padding: 10px 20px;
`
