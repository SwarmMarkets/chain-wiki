import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'

type Align = 'left' | 'center' | 'right' | 'justify'

const alignmentClass = (align?: Align) => {
  switch (align) {
    case 'center':
      return 'text-center'
    case 'right':
      return 'text-right'
    case 'justify':
      return 'text-justify'
    case 'left':
    default:
      return 'text-left'
  }
}

const TableRoot: FC<PropsWithChildren & { className?: string }> = ({
  children,
  className,
}) => (
  <div className={clsx('w-full overflow-x-auto', className)}>
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

const TableHeadCell: FC<
  PropsWithChildren & { align?: Align; className?: string }
> = ({ children, align = 'left', className }) => (
  <th className={clsx('p-3 font-semibold', alignmentClass(align), className)}>
    {children}
  </th>
)

const TableCell: FC<
  PropsWithChildren & { align?: Align; className?: string }
> = ({ children, align = 'left', className }) => (
  <td className={clsx('p-3', alignmentClass(align), className)}>{children}</td>
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
