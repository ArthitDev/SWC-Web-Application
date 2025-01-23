import { Editor } from '@tinymce/tinymce-react';
import useImageResizer from 'hooks/useImageResizer';
import React, { useCallback } from 'react';

interface TinyMCEEditorProps {
  value: string;
  onEditorChange: (content: string) => void;
}

const TinyMCEEditor: React.FC<TinyMCEEditorProps> = ({
  value: editorValue,
  onEditorChange,
}) => {
  const { resizeImage } = useImageResizer();

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
        height: 700,
        menubar: false,
        branding: false,
        license_key: 'gpl',
        content_style: `
          @import url('https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;700&display=swap');
          body {
            font-family: 'Prompt', sans-serif;
          }
        `,
        plugins:
          'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
        toolbar:
          'undo redo | blocks fontsize | forecolor | align lineheight bold italic underline checklist numlist bullist indent outdent | link image | removeformat',
        automatic_uploads: false,
        paste_data_images: true,

        images_upload_handler: (blobInfo) => {
          return new Promise<string>((resolve, reject) => {
            resizeImage(blobInfo.blob(), 800, 600, 0.8) // Resize the image before converting to base64
              .then((resizedBase64) => {
                resolve(resizedBase64);
              })
              .catch(() => {
                reject(new Error('Failed to resize image.'));
              });
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
              resizeImage(file, 800, 600, 0.8) // Resize the image before converting to base64
                .then((resizedBase64) => {
                  callback(resizedBase64, { alt: file.name });
                })
                .catch(() => {
                  //
                });
            };
            input.click();
          }
        },
      }}
    />
  );
};

export default TinyMCEEditor;
