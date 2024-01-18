"use client";
import { motion } from "framer-motion";

interface TransitionProps extends React.ComponentProps<"div"> {
  delay?: number;
}
export const UpTransition = ({ children, delay }: TransitionProps) => {
  return (
    <motion.div
      initial={{
        y: 10,
        opacity: 0,
      }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

export const InitialShow = ({ children, delay }: TransitionProps) => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {
          opacity: 0,
        },
        animate: {
          opacity: 1,
        },
      }}
    >
      {children}
    </motion.div>
  );
};
