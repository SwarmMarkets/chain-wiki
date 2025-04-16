import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import React, { useRef } from 'react'

import '@mdxeditor/editor/style.css'

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
  const onEditorChange = (content: string) => {
    onChange && onChange(content)
  }
  const mdxRef = useRef<MDXEditorMethods>(null)

  return (
    <MDXEditor
      className='w-full'
      contentEditableClassName='prose'
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
