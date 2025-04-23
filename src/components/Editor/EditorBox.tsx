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
import { useStorageUpload } from '@thirdweb-dev/react'
import { ipfsToHttp } from 'src/shared/utils'

interface EditorBoxProps {
  initialContent?: string
  content?: string
  onChange: (content: string) => void
  onEditorInit?: (editorInit: boolean) => void
}

const EditorBox: React.FC<EditorBoxProps> = ({ content = '', onChange }) => {
  const mdxRef = useRef<MDXEditorMethods>(null)
  const initialContent = useRef(content)

  const { mutateAsync: upload } = useStorageUpload()

  useEffect(() => {
    if (mdxRef.current && content !== undefined) {
      mdxRef.current.setMarkdown(content)
    }
  }, [content])

  const onEditorChange = (content: string) => {
    onChange && onChange(content)
  }

  const handleImageUpload = async (image: File): Promise<string> => {
    try {
      const uris = await upload({ data: [image] })
      const ipfsUri = uris[0]

      return ipfsToHttp(ipfsUri)
    } catch (err) {
      console.error('Failed to upload image with useStorageUpload', err)
      throw err
    }
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
          <DiffSourceToggleWrapper children={<></>} />
        </>
      ),
    }),
    listsPlugin(),
    quotePlugin(),
    headingsPlugin(),
    linkPlugin(),
    linkDialogPlugin(),
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
