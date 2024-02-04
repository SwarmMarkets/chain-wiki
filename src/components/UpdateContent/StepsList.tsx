import { ChildrenProp } from "@src/shared/types/common-props"
import Icon from "../ui/Icon"
import styled from "styled-components"

interface ListItemProps extends ChildrenProp {
  success: boolean
  loading: boolean
}

const StyledLi = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 1rem;
  font-weight: 500;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ListItem: React.FC<ListItemProps> = ({ loading, success, children }) => {
  const pending = !loading && !success

  if (pending) {
    return <StyledLi>
      <Icon mr={2} name="emptyCircle" size={25}/>
      {children}
    </StyledLi>
  }

  if (loading) {
    return <StyledLi>
      <Icon mr={2} name="loader" size={25}/>
      {children}
    </StyledLi>
  }

  if (success) {
    return <StyledLi>
      <Icon mr={2} name="checkbox" size={25}/>
      {children}
    </StyledLi>
  }
}

export { List, ListItem }