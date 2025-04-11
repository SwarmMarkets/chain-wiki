import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef } from 'react'
import { storage } from 'src/firebase'
import { Editor as TinyEditorType } from 'tinymce'

interface EditorBoxProps {
  initialContent?: string
  content?: string
  onChange: (content: string, editor: TinyEditorType) => void
  onEditorInit?: (editorInit: boolean) => void
}

const EditorBox: React.FC<EditorBoxProps> = ({
  initialContent,
  content,
  onChange,
  onEditorInit,
}) => {
  const editorRef = useRef<TinyEditor | null>(null)

  const onEditorChange = (content: string, editor: TinyEditorType) => {
    onChange && onChange(content, editor)
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
    onEditorInit?.(true)
  }

  return (
    <TinyEditor
      tinymceScriptSrc='https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js'
      ref={editorRef}
      // apiKey='osr60izccxxfs99zbrmmbiqk16ux1fas0muug1e2hvh16kgg'
      onEditorChange={onEditorChange}
      onInit={onInitEdiror}
      value={content}
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
    />
  )
}

export default EditorBox
