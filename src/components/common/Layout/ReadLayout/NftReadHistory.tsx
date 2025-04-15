import React from 'react'
import HistoryToken from 'src/components/History/HistoryToken'
import { useNavigate } from 'react-router-dom'
import Button from 'src/components/ui-kit/Button/Button'

interface NftReadHistoryProps {
  className?: string
}

const NftReadHistory: React.FC<NftReadHistoryProps> = ({ className }) => {
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate(-1)
  }

  return (
    <div className={className}>
      <div className='flex justify-end mb-4'>
        <Button
          onClick={handleBackClick}
          variant='contained'
          size='sm'
          color='primary'
        >
          Back
        </Button>
      </div>
      <HistoryToken />
    </div>
  )
}

export default NftReadHistory
