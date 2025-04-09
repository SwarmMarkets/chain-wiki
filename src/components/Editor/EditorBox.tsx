import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef } from 'react'
import { storage } from 'src/firebase'

import './editor.css'

interface EditorBoxProps {
  initialContent?: string
  content?: string
  onChange: (content: string, editor: TinyEditor) => void
  onEditorInit?: (editorInit: boolean) => void
}

const EditorBox: React.FC<EditorBoxProps> = ({
  initialContent,
  content,
  onChange,
  onEditorInit,
}) => {
  const editorRef = useRef<TinyEditor | null>(null)

  const onEditorChange = (content: string, editor: TinyEditor) => {
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

  console.log(content)

  return (
    <TinyEditor
      // tinymceScriptSrc='https://cdnjs.cloudflare.com/ajax/libs/tinymce/7.6.0/tinymce.min.js'
      ref={editorRef}
      apiKey='eq9n6yyh5256xn3u2dihjv9n2cjd2g4tb15cwa50xidbrmgh'
      onEditorChange={onEditorChange}
      onInit={onInitEdiror}
      value={content}
      init={{
        plugins:
          'markdown anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount',
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
          'body { font-family: "Inter", sans-serif; font-size: 14px; }',
      }}
      initialValue={initialContent}
    />
  )
}

export default EditorBox
