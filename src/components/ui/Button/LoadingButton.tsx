import Button, { ButtonProps } from './Button'

interface LoadingButtonProps extends ButtonProps {
  loading?: boolean
}

const LoadingButton: React.FC<LoadingButtonProps> = ({ children, loading = false, ...props }) => {
  return (
    <Button disabled={loading} {...props}>
      {loading ? 'Loading...' : children}
    </Button>
  )
}

export default LoadingButton
