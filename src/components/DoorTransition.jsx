/**
 * DoorTransition — Animated door opening before entering the room
 * Uses Framer Motion for the door swing animation
 */
import { motion } from 'framer-motion';

const DoorTransition = ({ onComplete }) => {
  return (
    <motion.div
      className="door-container"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1.5 }}
    >
      <div className="door-frame">
        {/* Light behind door */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(135deg, rgba(248, 164, 200, 0.15), rgba(200, 168, 233, 0.15))',
            borderRadius: '12px 12px 0 0',
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />

        {/* Door panel */}
        <motion.div
          className="door"
          initial={{ rotateY: 0 }}
          animate={{ rotateY: -85 }}
          transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => {
            setTimeout(onComplete, 400);
          }}
        >
          <div className="door-knob" />
          <div className="door-light" />

          {/* Door decorative panel */}
          <div
            style={{
              position: 'absolute',
              top: '15%',
              left: '20%',
              right: '20%',
              height: '30%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '55%',
              left: '20%',
              right: '20%',
              height: '25%',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '6px',
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DoorTransition;
