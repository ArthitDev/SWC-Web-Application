import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { scrollTransition, scrollVariants } from 'utils/pageTransition';

type ScrollFadeInProps = {
  children: React.ReactNode;
};

const ScrollFadeIn: React.FC<ScrollFadeInProps> = ({ children }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      variants={scrollVariants}
      initial="hidden"
      animate={controls}
      transition={scrollTransition}
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;
