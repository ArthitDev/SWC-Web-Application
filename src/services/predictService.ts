/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_IMAGE_PREDICT_URL;

export interface WoundPrediction {
  wound_type: string;
  confidence: number;
  additional_data?: {
    id: number;
    wound_covers: string[];
  };
}

export interface PredictResponse {
  predictions: WoundPrediction[];
  image_url: string;
}

export const predictImage = async (
  imageData: FormData
): Promise<PredictResponse> => {
  try {
    // เรียก API เพื่อวิเคราะห์ภาพ พร้อมตั้ง timeout ที่ 10 วินาที
    const response = await axios.post(`${API_URL}/predict/`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 20000, // ตั้ง timeout ไว้ที่ 10 วินาที
    });

    // ดึงข้อมูลจาก response
    const { predictions, image_url } = response.data;

    // ตรวจสอบว่าข้อมูลที่ต้องการอยู่ในรูปแบบที่ถูกต้อง
    if (!predictions || !Array.isArray(predictions) || !image_url) {
      throw new Error('Invalid response data format.');
    }

    // ตรวจสอบโครงสร้างของแต่ละ prediction
    predictions.forEach((prediction: WoundPrediction) => {
      if (!prediction.wound_type || typeof prediction.confidence !== 'number') {
        throw new Error('Invalid prediction format.');
      }
    });

    // เรียงลำดับ predictions ตาม confidence จากมากไปน้อย
    const sortedPredictions = predictions.sort(
      (a: WoundPrediction, b: WoundPrediction) => b.confidence - a.confidence
    );

    // ส่งข้อมูลที่จัดการแล้วกลับเป็น PredictResponse โดยไม่ปรับแต่ง image_url
    return { predictions: sortedPredictions, image_url };
  } catch (error: any) {
    // การจัดการข้อผิดพลาด
    if (error.code === 'ECONNABORTED') {
      // จัดการกรณี timeout
      throw new Error(
        'The server took too long to respond. Please try again later.'
      );
    }

    const errorMessage =
      error.response?.data?.detail ||
      'An error occurred while predicting the image.';
    throw new Error(errorMessage);
  }
};
