import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useRef } from 'react'
import { storage } from 'src/firebase'
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  markdownShortcutPlugin,
  linkPlugin,
  tablePlugin,
  codeBlockPlugin,
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  MDXEditorMethods,
  ListsToggle,
  InsertImage,
  BlockTypeSelect,
  imagePlugin,
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import { BulletList } from 'react-content-loader'

interface EditorBoxProps {
  initialContent?: string
  content?: string
  onChange: (content: string) => void
  onEditorInit?: (editorInit: boolean) => void
}

const EditorBox: React.FC<EditorBoxProps> = ({
  initialContent,
  content,
  onChange,
  onEditorInit,
}) => {
  const editorRef = useRef<TinyEditor | null>(null)

  const onEditorChange = (content: string) => {
    onChange && onChange(content)
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

  const mdxRef = useRef<MDXEditorMethods>(null)

  return (
    <MDXEditor
      className='w-full'
      contentEditableClassName='prose prose-sm md:prose-base lg:prose-lg'
      ref={mdxRef}
      markdown={content || ''}
      onChange={onEditorChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <BlockTypeSelect />
              <ListsToggle options={['bullet', 'number']} />
              {/* <InsertImage /> */}
            </>
          ),
        }),
        markdownShortcutPlugin(),
        linkPlugin(),
        tablePlugin(),
        codeBlockPlugin(),
        // imagePlugin({ imageUploadHandler: handleImageUpload }),
      ]}
    />
  )
}

export default EditorBox
