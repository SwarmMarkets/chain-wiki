import shouldForwardProp from '@styled-system/should-forward-prop';
import styled from 'styled-components';
import { ColorProps, LayoutProps, SpaceProps, TypographyProps, color, layout, space, typography } from 'styled-system';

// Extend styled-system props to use with styled-components
type TableProps = SpaceProps & LayoutProps;
type TableCellProps = TypographyProps & SpaceProps & ColorProps;

// Table container that applies spacing and layout styles from styled-system
export const Table = styled.table.withConfig({ shouldForwardProp })<TableProps>`
  ${space}
  ${layout}
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #e1e1e1;
`;

// TableRow with hover effect
export const TableRow = styled.tr`
  &:hover {
    background-color: #f5f5f5;
  }
`;

// TableHeader with improved typography and spacing
export const TableHeader = styled.th.withConfig({ shouldForwardProp })<TableCellProps>`
  ${typography}
  ${space}
  ${color}
  text-align: left;
  background-color: #fafafa;
  border-bottom: 2px solid #e1e1e1;
  padding: 12px 15px;
`;

// TableCell with consistent styling and padding
export const TableCell = styled.td.withConfig({ shouldForwardProp })<TableCellProps>`
  ${typography}
  ${space}
  ${color}
  padding: 12px 15px;
  border-bottom: 1px solid #e1e1e1;
`;