import React from 'react';
import { Editor as TinyEditor } from '@tinymce/tinymce-react';
import { Editor as TinyEditorType } from 'tinymce';

interface EditorProps {
  content: string;
  onChange?: (content: string, editor: TinyEditorType) => void;
}

const Editor: React.FC<EditorProps> = ({ onChange, content }) => {
  const onEditorChange = (content: string, editor: TinyEditorType) => {
    onChange && onChange(content, editor);
  };

  const handleImageUpload = () => {
    return Promise.resolve(
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg'
    );
  };

  return (
    <TinyEditor
      apiKey="osr60izccxxfs99zbrmmbiqk16ux1fas0muug1e2hvh16kgg"
      onEditorChange={onEditorChange}
      init={{
        plugins:
          'tinycomments mentions anchor autolink charmap codesample emoticons image link lists searchreplace table visualblocks wordcount mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
        toolbar:
          'undo redo | blocks fontsize | bold italic underline strikethrough | link image media table mergetags | align | tinycomments | numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        font_size_formats: '10px 12px 14px 16px 18px 24px 36px 48px',
        menubar: '',
        image_description: true, // Включаем поле описания для изображений
        image_caption: true, // Включаем подписи для изображений
        images_upload_url: 'host',
        automatic_uploads: true,
        images_reuse_filename: true,
        images_upload_handler: handleImageUpload,
        content_style:
          'body { font-family: "Roboto", sans-serif; font-size: 14px; }',
      }}
      value={content}
    />
  );
};

export default Editor;
