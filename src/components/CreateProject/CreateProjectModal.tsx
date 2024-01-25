import { BasicModalProps } from '@src/shared/types/common-props'
import Modal from '../ui/Modal'
import CreateProjectForm from './CreateProjectForm'

const CreateProjectModal = (props: BasicModalProps) => {
  return (
    <Modal {...props} maxWidth="500px" width="100%">
      <CreateProjectForm />
    </Modal>
  )
}

export default CreateProjectModal
