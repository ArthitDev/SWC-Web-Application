import { Editor } from '@tinymce/tinymce-react';
import React, { useCallback } from 'react';

// Define the props interface for the TinyMCEEditor component
interface TinyMCEEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value: editorValue,
  onEditorChange,
}) => {
  // Memoize the editor change handler to prevent unnecessary re-renders
  const handleEditorChange = useCallback(
    (content: string) => {
      onEditorChange(content);
    },
    [onEditorChange]
  );

  return (
    <Editor
      tinymceScriptSrc={'/libs/tinymce/tinymce.min.js'}
      value={editorValue}
      onEditorChange={handleEditorChange}
      init={{
        height: 500,
        menubar: false,
        branding: false,
        content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&display=swap');
          body {
            font-family: 'Prompt', sans-serif;
          }
        `,
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontsize | align lineheight bold italic underline checklist numlist bullist indent outdent | link image | removeformat',
        automatic_uploads: false,
        paste_data_images: true,

        images_upload_handler: (blobInfo) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blobInfo.blob());
            reader.onload = () => {
              resolve(reader.result as string);
            };
            reader.onerror = () => {
              reject(new Error('Failed to convert image to base64.'));
            };
          });
        },

        file_picker_callback: (callback, value, meta) => {
          if (meta.filetype === 'image') {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            // eslint-disable-next-line func-names
            input.onchange = function () {
              const file = (input.files as FileList)[0];
              const reader = new FileReader();
              // eslint-disable-next-line func-names
              reader.onload = function (e) {
                callback(e.target?.result as string, { alt: file.name });
              };
              reader.readAsDataURL(file);
            };
            input.click();
          }
        },
      }}
    />
  );
};

export default TinyMCEEditor;
