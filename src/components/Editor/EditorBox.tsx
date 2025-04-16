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
import React, { useEffect, useRef } from 'react'

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
  console.log(content)
  const onEditorChange = (content: string) => {
    onChange && onChange(content)
  }

  const mdxRef = useRef<MDXEditorMethods>(null)

  useEffect(() => {
    if (mdxRef.current && content !== undefined) {
      mdxRef.current.setMarkdown(content)
    }
  }, [content])

  return (
    <MDXEditor
      className='w-full'
      contentEditableClassName='prose font-[Inter] font-sans'
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
