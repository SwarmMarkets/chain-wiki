import { useState, useCallback, useRef, useEffect } from 'react'
import {
  closeImageDialog$,
  imageDialogState$,
  saveImage$,
  useCellValues,
  usePublisher,
} from '@mdxeditor/editor'
import Modal from '../ui-kit/Modal'
import clsx from 'clsx'
import Button from '../ui-kit/Button/Button'

const CustomInsertImageDialog = () => {
  const saveImage = usePublisher(saveImage$)
  const closeImageDialog = usePublisher(closeImageDialog$)

  const [imageDialogState] = useCellValues(imageDialogState$)
  // const { isOpen, open, close } = useModalState()

  const [file, setFile] = useState<FileList | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (f: FileList) => {
    setFile(f)
    const url = URL.createObjectURL(f[0])
    setPreviewUrl(url)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files)
    }
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFile(e.target.files)
    }
  }

  const handleSave = () => {
    if (file) {
      saveImage({ file })
      setFile(null)
      setPreviewUrl(null)
      closeImageDialog()
    }
  }

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
      }
    }
  }, [previewUrl])

  const handleClose = () => {
    setFile(null)
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    closeImageDialog()
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  return (
    <Modal onClose={handleClose} open={imageDialogState.type !== 'inactive'}>
      <div className='flex flex-col items-center gap-4 p-4'>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className={clsx(
            'h-64 w-full flex items-center justify-center border-[3px] border-primary border-dashed rounded-xl overflow-hidden'
          )}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt='Preview'
              className='max-h-full max-w-full object-contain p-4'
            />
          ) : (
            <div className='flex flex-col items-center gap-3'>
              <p className='text-center px-2'>Drop an image here</p>
              <Button variant='outlined' onClick={handleClick}>
                Browse for an image
              </Button>
            </div>
          )}
          <input
            ref={inputRef}
            type='file'
            accept='image/*'
            className='hidden'
            onChange={handleInputChange}
          />
        </div>

        <Button onClick={handleSave} disabled={!file} className='mt-2 w-full'>
          Save
        </Button>
      </div>
    </Modal>
  )
}

export default CustomInsertImageDialog
