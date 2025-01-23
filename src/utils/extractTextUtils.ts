// utils/extractTextUtils.ts

export const extractTextAfterImage = (htmlString: string): string => {
  // ใช้ DOMParser เพื่อแปลง HTML string ให้เป็นเอกสาร
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');

  // ดึงเฉพาะข้อความปกติจากเอกสารที่แปลง
  return doc.body.textContent || '';
};
