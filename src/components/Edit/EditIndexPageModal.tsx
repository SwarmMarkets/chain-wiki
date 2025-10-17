'use client'

import React from 'react'
import Modal from '../ui-kit/Modal'
import EditIndexPageForm from './EditIndexPageForm'
import { EditIndexPageFormInputs } from 'src/hooks/forms/useEditIndexPageForm'

interface EditIndexPageModalProps {
  open: boolean
  onClose: () => void
  name: string
  slug: string
  onSave: (data: EditIndexPageFormInputs) => void
}

const EditIndexPageModal: React.FC<EditIndexPageModalProps> = ({
  open,
  onClose,
  name,
  slug,
  onSave,
}) => {
  const handleSubmit = (data: EditIndexPageFormInputs) => {
    onSave(data)
    onClose()
  }

  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex flex-col gap-4'>
        <EditIndexPageForm
          initialValues={{ name, slug }}
          onSubmit={handleSubmit}
          onCancel={onClose}
        />
      </div>
    </Modal>
  )
}

export default EditIndexPageModal
