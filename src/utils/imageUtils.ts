/**
 * Utility functions for client-side image processing, downscaling, and compression.
 * Ensures uploaded profile avatars stay under 20-40KB to prevent localStorage quota exhaustion.
 */

export interface ResizeOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number; // 0.1 to 1.0
}

/**
 * Compresses an image File or Data URL into a lightweight Base64 JPEG data URL.
 * Resizes the image to fit within maxWidth x maxHeight (default 256x256) at specified quality.
 */
export const compressImageToAvatar = (
  input: File | Blob | string,
  options: ResizeOptions = {}
): Promise<string> => {
  const { maxWidth = 256, maxHeight = 256, quality = 0.8 } = options;

  return new Promise((resolve) => {
    // If empty input, resolve immediately
    if (!input) {
      resolve('');
      return;
    }

    const img = new Image();

    const processImage = () => {
      try {
        const naturalWidth = img.naturalWidth || img.width || maxWidth;
        const naturalHeight = img.naturalHeight || img.height || maxHeight;

        // Calculate aspect ratio preserving bounds
        let targetWidth = naturalWidth;
        let targetHeight = naturalHeight;

        if (targetWidth > targetHeight) {
          if (targetWidth > maxWidth) {
            targetHeight = Math.round((targetHeight * maxWidth) / targetWidth);
            targetWidth = maxWidth;
          }
        } else {
          if (targetHeight > maxHeight) {
            targetWidth = Math.round((targetWidth * maxHeight) / targetHeight);
            targetHeight = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, targetWidth);
        canvas.height = Math.max(1, targetHeight);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // If 2D context unavailable, fallback
          resolve(typeof input === 'string' ? input : '');
          return;
        }

        // Enable smooth scaling
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

        // Convert to lightweight JPEG data URL
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (err) {
        console.warn('Image resizing failed, falling back:', err);
        resolve(typeof input === 'string' ? input : '');
      }
    };

    img.onload = processImage;
    img.onerror = (e) => {
      console.warn('Failed to load image for compression:', e);
      resolve(typeof input === 'string' ? input : '');
    };

    if (typeof input === 'string') {
      img.src = input;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          img.src = result;
        } else {
          resolve('');
        }
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(input);
    }
  });
};
