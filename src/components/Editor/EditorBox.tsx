import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  directivesPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  StrikeThroughSupSubToggles,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import React, { useEffect, useRef } from 'react'

import '@mdxeditor/editor/style.css'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from 'src/firebase'

interface EditorBoxProps {
  initialContent?: string
  content?: string
  onChange: (content: string) => void
  onEditorInit?: (editorInit: boolean) => void
}

const EditorBox: React.FC<EditorBoxProps> = ({ content = '', onChange }) => {
  const onEditorChange = (content: string) => {
    onChange && onChange(content)
  }

  const mdxRef = useRef<MDXEditorMethods>(null)
  const initialContent = useRef(content)

  useEffect(() => {
    if (mdxRef.current && content !== undefined) {
      mdxRef.current.setMarkdown(content)
    }
  }, [content])

  const handleImageUpload = async (image: File) => {
    const imageBuffer = await image.arrayBuffer()
    const storageRef = ref(storage, `images/${image.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageBuffer)

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

  const allPlugins = (diffMarkdown: string) => [
    toolbarPlugin({
      toolbarContents: () => (
        <>
          <UndoRedo />
          <BoldItalicUnderlineToggles />
          <CodeToggle />
          <StrikeThroughSupSubToggles />
          <ListsToggle />
          <BlockTypeSelect />
          <CreateLink />
          <InsertImage />
          <InsertTable />
          <InsertThematicBreak />
          <InsertCodeBlock />
          {/* <InsertAdmonition /> */}
          <DiffSourceToggleWrapper children={<></>} />
        </>
      ),
    }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
    // eslint-disable-next-line @typescript-eslint/require-await
    imagePlugin({ imageUploadHandler: handleImageUpload }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        js: 'JavaScript',
        css: 'CSS',
        txt: 'text',
        tsx: 'TypeScript',
      },
    }),
    directivesPlugin({ directiveDescriptors: [AdmonitionDirectiveDescriptor] }),
    diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
    markdownShortcutPlugin(),
  ]

  return (
    <MDXEditor
      className='w-full'
      contentEditableClassName='prose font-[Inter] font-sans max-w-full'
      ref={mdxRef}
      markdown={content}
      onChange={onEditorChange}
      plugins={allPlugins(initialContent.current)}
    />
  )
}

export default EditorBox
