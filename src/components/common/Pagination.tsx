import Button from '../ui/Button/Button'
import Flex from '../ui/Flex'

interface PaginationProps {
  next: () => void
  previous: () => void
  hasNext: boolean
  hasPrevious: boolean
}

const Pagination: React.FC<PaginationProps> = ({
  next,
  previous,
  hasNext,
  hasPrevious,
}) => {
  return (
    <Flex mt={15} justifyContent='center' $gap='10px'>
      <Button disabled={!hasPrevious} onClick={previous}>
        {'<< Previous'}
      </Button>
      <Button disabled={!hasNext} onClick={next}>
        {'Next >>'}
      </Button>
    </Flex>
  )
}

export default Pagination
