import Tesseract from 'tesseract.js';

/**
 * Run OCR on a base64/URL image.
 * @param {string} imageSource - base64 data URL or image URL
 * @param {function} onProgress - optional callback(fraction 0–1)
 * @returns {Promise<string>} raw OCR text
 */
export const recognizeCode = async (imageSource, onProgress) => {
  try {
    const { data: { text } } = await Tesseract.recognize(imageSource, 'eng', {
      logger: (m) => {
        if (m.status === 'recognizing text' && onProgress) {
          onProgress(m.progress);
        }
      },
    });
    return text;
  } catch (err) {
    console.error('OCR recognition error:', err);
    return '';
  }
};
