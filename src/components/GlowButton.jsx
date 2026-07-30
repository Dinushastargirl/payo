/**
 * GlowButton — Reusable glowing CTA button (Payoja variant)
 * Pastel color scheme with spring animations
 */
import { motion } from 'framer-motion';

const GlowButton = ({ children, onClick, variant = 'pink', size = 'large', delay = 0 }) => {
  const variants = {
    pink: {
      bg: 'linear-gradient(135deg, #f8a4c8 0%, #ffd1e8 50%, #f8a4c8 100%)',
      shadow: 'rgba(248, 164, 200, 0.4)',
      text: '#1a0f2e',
    },
    lavender: {
      bg: 'linear-gradient(135deg, #c8a8e9 0%, #e0d0f5 50%, #c8a8e9 100%)',
      shadow: 'rgba(200, 168, 233, 0.4)',
      text: '#1a0f2e',
    },
  };

  const v = variants[variant] || variants.pink;

  const sizes = {
    small: { padding: '10px 24px', fontSize: '0.85rem' },
    large: { padding: '16px 40px', fontSize: '1.05rem' },
  };

  const s = sizes[size] || sizes.large;

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.05, boxShadow: `0 0 30px ${v.shadow}` }}
      whileTap={{ scale: 0.95 }}
      style={{
        background: v.bg,
        backgroundSize: '200% 200%',
        color: v.text,
        padding: s.padding,
        fontSize: s.fontSize,
        fontWeight: 600,
        fontFamily: "'Outfit', sans-serif",
        borderRadius: '50px',
        border: 'none',
        cursor: 'pointer',
        letterSpacing: '0.1em',
        boxShadow: `0 0 15px ${v.shadow}, 0 4px 15px rgba(0,0,0,0.2)`,
        position: 'relative',
        zIndex: 10,
      }}
      aria-label={typeof children === 'string' ? children : 'Action button'}
    >
      {children}
    </motion.button>
  );
};

export default GlowButton;
