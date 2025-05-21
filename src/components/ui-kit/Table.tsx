import { FC, PropsWithChildren } from 'react'

const TableRoot: FC<PropsWithChildren> = ({ children }) => (
  <div className='w-full overflow-x-auto'>
    <table className='w-full border-collapse'>{children}</table>
  </div>
)

const TableHeader: FC<PropsWithChildren> = ({ children }) => (
  <thead className='border-b border-main'>{children}</thead>
)

const TableHeaderRow: FC<PropsWithChildren> = ({ children }) => (
  <tr>{children}</tr>
)

const TableBody: FC<PropsWithChildren> = ({ children }) => (
  <tbody>{children}</tbody>
)

const TableRow: FC<PropsWithChildren> = ({ children }) => (
  <tr className='hover:bg-primary-muted border-b border-main'>{children}</tr>
)

const TableHeadCell: FC<PropsWithChildren> = ({ children }) => (
  <th className='p-3 text-left font-semibold'>{children}</th>
)

const TableCell: FC<PropsWithChildren> = ({ children }) => (
  <td className='p-3'>{children}</td>
)

const Table = {
  Root: TableRoot,
  Header: TableHeader,
  HeaderRow: TableHeaderRow,
  HeadCell: TableHeadCell,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
}

export default Table
