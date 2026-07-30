/**
 * EntryScreen — Pastel gradient opening with floating hearts
 * Door opening animation transition to room
 */
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import GlowButton from './GlowButton';

const EntryScreen = ({ onOpen }) => {
  return (
    <motion.div
      className="screen entry-screen"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <FloatingHearts count={18} />

      <motion.div
        className="entry-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1rem' }}
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          ✨
        </motion.div>

        <h1 className="entry-title">Happy Birthday!</h1>
        <p className="entry-subtitle">A magical surprise awaits you</p>

        <GlowButton onClick={onOpen} delay={0.8}>
          Open My Birthday Room
        </GlowButton>
      </motion.div>
    </motion.div>
  );
};

export default EntryScreen;
