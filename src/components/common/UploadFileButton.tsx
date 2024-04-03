import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import LoadingButton from '../ui/Button/LoadingButton'
import { storage } from '@src/firebase'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonProps } from '../ui/Button/Button'
import { ChildrenProp } from '@src/shared/types/common-props'

interface UploadFileButtonProps extends ButtonProps, ChildrenProp {
  onUpload: (url: string) => void
}

const UploadFileButton: React.FC<UploadFileButtonProps> = ({
  onUpload,
  children,
  ...props
}) => {
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
        id='fileInput'
        type='file'
        onChange={handleFileChange}
        style={{ display: 'none' }} // Скрытый элемент визуально
        accept='.png, .jpg, .jpeg' // Принимаемые типы файлов
      />
      <LoadingButton
        {...props}
        loading={loading}
        type='button'
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        {children || t('chooseFile')}
      </LoadingButton>
    </>
  )
}

export default UploadFileButton
