// hooks/useMobilePermissions.ts
import toast from 'react-hot-toast';

const useMobilePermissions = () => {
  // Function to check file access permission only on mobile devices
  const checkFilePermission = async () => {
    const userAgent = navigator.userAgent || navigator.vendor;
    const isMobile =
      /android/i.test(userAgent) || /iPhone|iPad|iPod/i.test(userAgent);

    if (isMobile && navigator.permissions) {
      try {
        const result = await navigator.permissions.query({
          name: 'camera' as PermissionName,
        });
        if (result.state !== 'granted') {
          toast.error('กรุณาให้สิทธ์ในการเข้าถึงไฟล์');
        }
      } catch (error) {
        // Handle error
      }
    }
  };

  return { checkFilePermission };
};

export default useMobilePermissions;
