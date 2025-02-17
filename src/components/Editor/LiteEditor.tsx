import { Editor as TinyEditor } from '@tinymce/tinymce-react'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Editor as TinyEditorType } from 'tinymce'
import EditorSkeleton from './EditorSkeleton'

interface LiteEditorProps {
  onChange?: (content: string, editor: TinyEditorType) => void
  height?: number
  value: string
}

interface EditorWrapperProps {
  $editorInit: boolean
}

const EditorWrapper = styled.div<EditorWrapperProps>`
  display: ${({ $editorInit }) => ($editorInit ? 'block' : 'none')};
`

const LiteEditor: React.FC<LiteEditorProps> = ({
  height = 650,
  onChange,
  value,
}) => {
  const [editorInit, setEditorInit] = useState(false)

  const onEditorChange = (content: string, editor: TinyEditorType) => {
    onChange && onChange(content, editor)
  }

  const onInitEdiror = () => {
    setEditorInit(true)
  }

  return (
    <>
      <EditorWrapper $editorInit={editorInit}>
        <TinyEditor
          apiKey='osr60izccxxfs99zbrmmbiqk16ux1fas0muug1e2hvh16kgg'
          onEditorChange={onEditorChange}
          onInit={onInitEdiror}
          init={{
            height: height,
            content_style:
              'body { font-family: "Inter", sans-serif; font-size: 14px; }',
            menubar: false,
            resize: false,
          }}
          value={value}
        />
      </EditorWrapper>
      {!editorInit && <EditorSkeleton height={height} />}
    </>
  )
}

export default LiteEditor
