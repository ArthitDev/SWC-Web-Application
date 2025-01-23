import { useCallback } from 'react';

// Define a hook to resize or compress an image
const useImageResizer = () => {
  const resizeImage = useCallback(
    (
      blob: Blob,
      maxWidth: number,
      maxHeight: number,
      quality: number = 0.7,
      format: 'image/jpeg' | 'image/png' = 'image/png' // Add format parameter with default 'image/png'
    ): Promise<string> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;

          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Canvas context not available.'));
              return;
            }

            let { width, height } = img;
            if (width > height) {
              if (width > maxWidth) {
                height *= maxWidth / width;
                width = maxWidth;
              }
            } else if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Convert the resized image to base64
            const dataUrl = canvas.toDataURL(format, quality); // Use selected format
            resolve(dataUrl);
          };

          img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
      });
    },
    []
  );

  return { resizeImage };
};

export default useImageResizer;
