export type OptionSubheaderProps = React.HTMLAttributes<HTMLDivElement>

const OptionSubheader: React.FC<OptionSubheaderProps> = ({
  children,
  ...props
}) => {
  return (
    <div className='ui-options-header' {...props}>
      {children}
    </div>
  )
}

export default OptionSubheader
  