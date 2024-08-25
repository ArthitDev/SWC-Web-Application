// Animation สำหรับ fadeIn เมื่อเข้าสู่หน้า
export const fadeInVariants = {
  initial: {
    opacity: 0,
  },
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const fadeInTransition = {
  duration: 1.3,
  ease: 'easeInOut',
};

// Animation สำหรับการ scroll ภายในเนื้อหา
export const scrollVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export const scrollTransition = {
  duration: 0.75,
  ease: 'easeOut',
};
