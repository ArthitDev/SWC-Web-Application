// utils/safeUrl.ts

// อนุญาตเฉพาะลิงก์ http/https เพื่อป้องกัน javascript: หรือ data: URL (XSS)
export const getSafeExternalUrl = (url: string): string | undefined => {
  try {
    const parsed = new URL(url.trim());
    return ['http:', 'https:'].includes(parsed.protocol)
      ? parsed.href
      : undefined;
  } catch {
    return undefined;
  }
};
