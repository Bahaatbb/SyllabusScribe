import { motion } from 'framer-motion';

const Loader = () => {
  const mainColor = "rgb(29, 6, 207)";

  const pathVariants = {
    hidden: {
      opacity: 0,
      pathLength: 0,
      stroke: `${mainColor}00`,
    },
    visible: {
      opacity: 1,
      pathLength: 1,
      stroke: mainColor,
    },
  };

  const pathTransition = {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
  };

  return (
    <svg width="118" height="100" viewBox="0 0 118 118" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M58.0413 97.923L72.9601 118H43.1273L28.2134 97.923H58.0413Z"
        fill="#557AFF"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        transition={pathTransition}
      />
      <motion.path
        d="M29.8328 59.8774L74.3121 0H44.4793L0 59.8774H29.8328Z"
        fill="#2951DC"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        transition={pathTransition}
      />
      <motion.path
        d="M51.4087 88.9208H21.5759L0 59.8774H29.8328L51.4087 88.9208Z"
        fill="#557AFF"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        transition={pathTransition}
      />
      <motion.path
        d="M87.4706 58.3106L43.1275 118H72.9603L117.299 58.3106H87.4706ZM51.4087 88.9208L95.7227 29.2628L65.8947 29.2672L21.5759 88.9208H51.4087Z"
        fill="#2951DC"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        transition={pathTransition}
      />
      <motion.path
        d="M117.299 58.3106H87.4708L65.89 29.2627H95.7228L117.299 58.3106ZM74.3123 0L89.2262 20.077H59.3934L44.4795 0H74.3123Z"
        fill="#557AFF"
        initial="hidden"
        animate="visible"
        variants={pathVariants}
        transition={pathTransition}
      />
    </svg>
  );
};

export { Loader };
