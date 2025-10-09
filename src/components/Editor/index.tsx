'use client'

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

import '@mdxeditor/editor/style.css'
import { forwardRef, useRef } from 'react'
import { ipfsToHttp } from 'src/shared/utils'
import CustomInsertImageDialog from './CustomInsertImageDialog'
import { useIpfsUpload } from 'src/hooks/web3/useIpfsUpload'

interface EditorProps {
  initialContent?: string
  content?: string
  onChange: (content: string) => void
  onEditorInit?: (editorInit: boolean) => void
}

const Editor = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content = '', onChange }, ref) => {
    const initialContent = useRef(content)

    const { mutateAsync: upload } = useIpfsUpload()

    const onEditorChange = (content: string) => {
      onChange && onChange(content)
    }

    const handleImageUpload = async (image: File): Promise<string> => {
      try {
        const uri = (await upload([image])) as string
        return ipfsToHttp(uri)
      } catch (err) {
        console.error('Failed to upload image with useStorageUpload', err)
        throw err
      }
    }

    const allPlugins = (diffMarkdown: string) => [
      toolbarPlugin({
        toolbarClassName: 'bg-gray-100',
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
      imagePlugin({
        imageUploadHandler: handleImageUpload,
        ImageDialog: CustomInsertImageDialog,
      }),
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
          json: 'JSON',
        },
      }),
      directivesPlugin({
        directiveDescriptors: [AdmonitionDirectiveDescriptor],
      }),
      diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown }),
      markdownShortcutPlugin(),
    ]

    return (
      <MDXEditor
        className='w-full'
        contentEditableClassName='prose font-[Inter] font-sans max-w-full'
        ref={ref}
        markdown={content}
        onChange={onEditorChange}
        plugins={allPlugins(initialContent.current)}
      />
    )
  }
)

export default Editor
