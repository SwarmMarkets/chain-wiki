import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/firebase'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ChildrenProp } from 'src/shared/types/common-props'
import Button, { ButtonProps } from '../ui-kit/Button/Button'

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
  const [loading, setLoading] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true)
    const imageBlob = e.target.files?.[0]
    if (!imageBlob) return

    const storageRef = ref(storage, `logos/${imageBlob?.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageBlob)

    uploadTask.on('state_changed', {
      error: error => {
        console.error('Error uploading image: ', error)
        setLoading(false)
      },
      complete: async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
        onUpload(downloadURL)
        setLoading(false)
      },
    })
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
        loading={loading || isLoading}
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
