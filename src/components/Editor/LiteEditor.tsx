import {
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  headingsPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'
import React from 'react'

interface LiteEditorProps {
  onChange?: (content: string) => void
  height?: number
  value: string
}

const LiteEditor: React.FC<LiteEditorProps> = ({ onChange, value }) => {
  const onEditorChange = (content: string) => {
    onChange?.(content)
  }

  return (
    <MDXEditor
      className='w-full'
      contentEditableClassName='prose h-40 overflow-y-auto'
      markdown={value || ''}
      onChange={onEditorChange}
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        toolbarPlugin({
          toolbarClassName: 'bg-gray-100',
          toolbarContents: () => (
            <>
              <UndoRedo />
              <BoldItalicUnderlineToggles />
              <ListsToggle options={['bullet', 'number']} />
            </>
          ),
        }),
        markdownShortcutPlugin(),
        linkPlugin(),
        tablePlugin(),
        codeBlockPlugin(),
      ]}
    />
  )
}

export default LiteEditor
