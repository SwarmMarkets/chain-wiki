import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildrenProp } from 'src/shared/types/common-props'
import Button, { ButtonProps } from '../ui-kit/Button/Button'
import { useStorageUpload } from '@thirdweb-dev/react'
import { ipfsToHttp } from 'src/shared/utils'

interface UploadFileButtonProps extends ButtonProps, ChildrenProp {
  onUpload: (url: string) => void
  isLoading?: boolean
}

const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  onUpload,
  children,
  isLoading,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const { t } = useTranslation('buttons')

  const {
    mutateAsync: upload,
    isLoading: isLoadingStorage,
    reset: resetStorageState,
  } = useStorageUpload()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageBlob = e.target.files?.[0]
    if (!imageBlob) return
    const uri = await upload({ data: [imageBlob] })
    resetStorageState()

    onUpload(ipfsToHttp(uri[0]))
  }

  return (
    <>
      <input
        ref={inputRef}
        type='file'
        onChange={handleFileChange}
        onClick={e => e.stopPropagation()}
        style={{ display: 'none' }}
        accept='.png, .jpg, .jpeg'
      />
      <Button
        {...props}
        loading={isLoadingStorage || isLoading}
        type='button'
        onClick={e => {
          e.stopPropagation()
          e.preventDefault()
          inputRef.current?.click()
        }}
      >
        {children || t('chooseFile')}
      </Button>
    </>
  )
}

export default UploadFileButton
