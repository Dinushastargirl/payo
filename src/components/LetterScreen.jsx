/**
 * LetterScreen — Birthday letter with elegant glassmorphism card
 * Soft floating hearts continue in background
 */
import { motion } from 'framer-motion';
import FloatingHearts from './FloatingHearts';

const LetterScreen = () => {
  return (
    <motion.div
      className="screen letter-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <FloatingHearts count={12} />

      <motion.div
        className="glass-card letter-card"
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.h1
          className="letter-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Happy Birthday, Payoja! ✨
        </motion.h1>

        <motion.div
          className="letter-body"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          <p>Happy Birthday, Payoja!</p>

          <p>
            You bring so much happiness wherever you go. Your creativity, kindness,
            and beautiful imagination make every day brighter.
          </p>

          <p>
            Keep believing in your dreams of becoming an incredible chef and creating
            beautiful fashion designs. I know one day you'll inspire so many people
            with your talent.
          </p>

          <p>
            Never stop smiling, never stop learning, and always remember how loved you are.
          </p>

          <p>
            Wishing you a year filled with laughter, unforgettable memories, and dreams
            coming true.
          </p>

          <p style={{ fontWeight: 500, color: '#f8a4c8' }}>
            Happy Birthday, Little Star.
          </p>
        </motion.div>

        <motion.div
          className="letter-sign"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          Love,<br />
          Your Sister <span className="letter-heart">❤️</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LetterScreen;
