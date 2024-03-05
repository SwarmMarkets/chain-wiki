import { storage } from '@src/firebase'
import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Editor as TinyEditorType } from 'tinymce'
import UpdateContentButton from '../UpdateContent'
import RequirePermissions from '../common/RequirePermissions'
import Flex from '../ui/Flex'
import EditorSkeleton from './EditorSkeleton'

interface EditorProps {
  projectAddress: string
  articleId?: number
  initialContent: string
  onChange?: (content: string, editor: TinyEditorType) => void
  onSuccessUpdate?: () => void
}

interface EditorWrapperProps {
  $editorInit: boolean
}

const EditorWrapper = styled.div<EditorWrapperProps>`
  display: ${({ $editorInit }) => ($editorInit ? 'block' : 'none')};
`

const Editor: React.FC<EditorProps> = ({
  onChange,
  initialContent,
  articleId,
  projectAddress,
  onSuccessUpdate,
}) => {
  const [editorInit, setEditorInit] = useState(false)
  const [currContent, setCurrContent] = useState(initialContent)

  const onEditorChange = (content: string, editor: TinyEditorType) => {
    onChange && onChange(content, editor)
    setCurrContent(content)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleImageUpload = (image: any) => {
    const imageBlob = image.blob()
    const storageRef = ref(storage, `images/${imageBlob.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageBlob)

    return new Promise<string>((resolve, reject) => {
      uploadTask.on('state_changed', {
        error: error => {
          console.error('Error uploading image: ', error)
          reject(error)
        },
        complete: async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        },
      })
    })
  }
  const onInitEdiror = () => {
    setEditorInit(true)
  }

  return (
    <>
      <EditorWrapper $editorInit={editorInit}>
        <TinyEditor
          apiKey='osr60izccxxfs99zbrmmbiqk16ux1fas0muug1e2hvh16kgg'
          onEditorChange={onEditorChange}
          onInit={onInitEdiror}
          init={{
            plugins:
              'anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount',
            toolbar:
              'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align | tinycomments | numlist bullist indent outdent | emoticons charmap | removeformat',
            tinycomments_mode: 'embedded',
            tinycomments_author: 'Author name',
            mergetags_list: [
              { value: 'First.Name', title: 'First Name' },
              { value: 'Email', title: 'Email' },
            ],
            height: 650,
            font_size_formats: '10px 12px 14px 16px 18px 24px 36px 48px',
            menubar: false,
            image_description: true, // Включаем поле описания для изображений
            image_caption: true, // Включаем подписи для изображений
            // automatic_uploads: true,
            // images_reuse_filename: true,
            images_upload_handler: handleImageUpload,
            content_style:
              'body { font-family: "Roboto", sans-serif; font-size: 14px; }',
          }}
          initialValue={initialContent}
          value={currContent}
        />
        <Flex justifyContent='flex-end'>
          <RequirePermissions projectAddress={projectAddress} canUpdateContent>
            {articleId ? (
              <UpdateContentButton
                onSuccess={onSuccessUpdate}
                articleId={articleId}
                contentType='article'
                projectAddress={projectAddress}
                content={currContent}
              />
            ) : (
              <UpdateContentButton
                onSuccess={onSuccessUpdate}
                contentType='project'
                projectAddress={projectAddress}
                content={currContent}
              />
            )}
          </RequirePermissions>
        </Flex>
      </EditorWrapper>
      {!editorInit && <EditorSkeleton height={650} />}
    </>
  )
}

export default Editor
