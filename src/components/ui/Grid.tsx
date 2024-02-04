import styled from 'styled-components';
import shouldForwardProp from '@styled-system/should-forward-prop';
import {
  layout,
  LayoutProps,
  space,
  SpaceProps,
  grid,
  GridProps,
} from 'styled-system';
import { ChildrenProp } from '@src/shared/types/common-props';

interface Props extends ChildrenProp, LayoutProps, SpaceProps, GridProps {
  columns?: number;
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  minColumnWidth?: string;
}

const Grid = styled.div.withConfig({ shouldForwardProp })<Props>`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns || 'auto-fit'},
    minmax(${(props) => props.minColumnWidth || '200px'}, 1fr)
  );
  box-sizing: border-box;
  row-gap: ${(props) => props.rowGap || props.gap || '16px'};
  column-gap: ${(props) => props.columnGap || props.gap || '16px'};
  ${grid}
  ${layout}
  ${space}
`;

export default Grid;
