import { Container, Units } from '@/components';
import { motion } from 'framer-motion';
import React from 'react';

export const Unit = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <Container title="Syllabus Scriber" has_parent>
        <Units />
      </Container>
    </motion.div>
  );
};
