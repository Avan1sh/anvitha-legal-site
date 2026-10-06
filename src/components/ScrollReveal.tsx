import { Children, useRef, type ReactNode } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function ScrollReveal({ children, className }: ScrollRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <motion.section
      ref={sectionRef}
      className={className}
      data-scroll-reveal
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariants}>{child}</motion.div>
      ))}
      <noscript>
        <style>
          {'[data-scroll-reveal] > div { opacity: 1 !important; transform: none !important; }'}
        </style>
      </noscript>
    </motion.section>
  );
}
