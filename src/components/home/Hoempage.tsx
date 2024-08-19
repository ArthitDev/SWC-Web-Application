import { motion } from 'framer-motion';
import React from 'react';
import { fadeInTransition, fadeInVariants } from 'utils/pageTransition';

const Homepage: React.FC = () => {
  return (
    <>
      <motion.div
        initial="initial"
        animate="in"
        exit="out"
        variants={fadeInVariants}
        transition={fadeInTransition}
      ></motion.div>
    </>
  );
};

export default Homepage;
