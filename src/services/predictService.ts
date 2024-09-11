/* eslint-disable camelcase */
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_IMAGE_PREDICT_URL;

export interface WoundPrediction {
  wound_type: string;
  confidence: number;
  additional_data?: {
    id: string;
    wound_cover: string;
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
    // เรียก API เพื่อวิเคราะห์ภาพ
    const response = await axios.post(`${API_URL}/predict/`, imageData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    // ดึงข้อมูลจาก response
    let { predictions, image_url } = response.data;

    // ตรวจสอบว่าข้อมูลที่ต้องการอยู่ในรูปแบบที่ถูกต้อง
    if (!predictions || !Array.isArray(predictions) || !image_url) {
      throw new Error('Invalid response data format.');
    }

    // ตรวจสอบโครงสร้างของแต่ละ prediction
    predictions.forEach((prediction) => {
      if (!prediction.wound_type || typeof prediction.confidence !== 'number') {
        throw new Error('Invalid prediction format.');
      }
    });

    // เรียงลำดับ predictions ตาม confidence จากมากไปน้อย
    predictions = predictions.sort(
      (a: WoundPrediction, b: WoundPrediction) => b.confidence - a.confidence
    );

    // ปรับ URL สำหรับ image_url
    image_url = `${API_URL}${image_url}`;

    // ส่งข้อมูลที่จัดการแล้วกลับเป็น PredictResponse
    return { predictions, image_url };
  } catch (error: any) {
    // การจัดการข้อผิดพลาด
    const errorMessage =
      error.response?.data?.detail ||
      'An error occurred while predicting the image.';
    throw new Error(errorMessage);
  }
};
