/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_IMAGE_PREDICT_URL;

export interface WoundPrediction {
  wound_type: string;
  confidence: number;
}

export interface PredictResponse {
  predictions: WoundPrediction[];
  image_url: string;
}

export const predictImage = async (
  imageData: FormData
): Promise<PredictResponse> => {
  try {
    // Call the API endpoint to predict image
    const response = await axios.post(`${API_URL}/predict/`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // Extract the data from response
    const { predictions, image_url } = response.data;

    // Check if the required data is available and is in the correct format
    if (!predictions || !Array.isArray(predictions) || !image_url) {
      throw new Error('Invalid response data format.');
    }

    // Validate the structure of each prediction
    predictions.forEach((prediction) => {
      if (!prediction.wound_type || typeof prediction.confidence !== 'number') {
        throw new Error('Invalid prediction format.');
      }
    });

    // Return the extracted data as PredictResponse type
    return { predictions, image_url };
  } catch (error: any) {
    // Improved error handling
    const errorMessage =
      error.response?.data?.detail ||
      'An error occurred while predicting the image.';
    // toast.error(errorMessage);
    throw new Error(errorMessage);
  }
};
