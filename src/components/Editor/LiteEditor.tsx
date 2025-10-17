'use client'

import {
  BoldItalicUnderlineToggles,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor'

import '@mdxeditor/editor/style.css'
import { forwardRef } from 'react'

interface EditorProps {
  initialContent?: string
  content?: string
  onChange: (content: string) => void
  onEditorInit?: (editorInit: boolean) => void
}

const Editor = forwardRef<MDXEditorMethods, EditorProps>(
  ({ content = '', onChange }, ref) => {
    const onEditorChange = (content: string) => {
      onChange && onChange(content)
    }

    const allPlugins = [
      toolbarPlugin({
        toolbarClassName: 'bg-gray-100',
        toolbarContents: () => (
          <>
            <UndoRedo />
            <BoldItalicUnderlineToggles />
            <ListsToggle />
          </>
        ),
      }),
      listsPlugin(),
      markdownShortcutPlugin(),
    ]

    return (
      <MDXEditor
        className='w-full'
        contentEditableClassName='prose font-[Inter] font-sans max-w-full h-40 overflow-y-auto'
        ref={ref}
        markdown={content}
        onChange={onEditorChange}
        plugins={allPlugins}
      />
    )
  }
)

export default Editor
