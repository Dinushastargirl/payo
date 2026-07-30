/**
 * RoomScreen — Interactive Dream Room with 7 clickable objects
 * Each object triggers a unique animation/interaction
 * Features: fairy lights, curtain, plants with ambient animation
 */
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import GlowButton from './GlowButton';

// Outfit designs for wardrobe
const OUTFITS = [
  { emoji: '👗', label: 'Elegant Evening Gown' },
  { emoji: '👘', label: 'Traditional Kimono' },
  { emoji: '🥻', label: 'Beautiful Saree' },
  { emoji: '👚', label: 'Chic Blouse' },
  { emoji: '🧥', label: 'Designer Jacket' },
];

// Window time states
const WINDOW_STATES = ['day', 'sunset', 'night'];

// Room objects configuration
const ROOM_OBJECTS_CONFIG = [
  { id: 'cake', emoji: '🎂', label: 'Cake', x: '15%', y: '58%' },
  { id: 'wardrobe', emoji: '👗', label: 'Wardrobe', x: '78%', y: '40%' },
  { id: 'chef', emoji: '👩‍🍳', label: 'Chef Hat', x: '65%', y: '60%' },
  { id: 'gift', emoji: '🎁', label: 'Gift Box', x: '40%', y: '68%' },
  { id: 'frame', emoji: '🖼️', label: 'Photo Frame', x: '25%', y: '30%' },
  { id: 'window', emoji: '🪟', label: 'Window', x: '55%', y: '22%' },
  { id: 'plant', emoji: '🌿', label: 'Plants', x: '8%', y: '42%' },
];

const RoomScreen = ({ onLetter }) => {
  const [activePopup, setActivePopup] = useState(null);
  const [outfitIndex, setOutfitIndex] = useState(0);
  const [windowState, setWindowState] = useState(0);
  const [candleLit, setCandleLit] = useState(false);

  // Generate fairy light positions
  const fairyLights = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      left: `${5 + (i * 90) / 19}%`,
      color: ['#f8a4c8', '#c8a8e9', '#ffcba4', '#a8e6cf', '#f0d060'][i % 5],
      delay: i * 0.15,
    }));
  }, []);

  // Handle object clicks
  const handleObjectClick = (id) => {
    switch (id) {
      case 'cake':
        setCandleLit(true);
        setActivePopup('cake');
        break;
      case 'wardrobe':
        setOutfitIndex((prev) => (prev + 1) % OUTFITS.length);
        setActivePopup('wardrobe');
        break;
      case 'chef':
        setActivePopup('chef');
        break;
      case 'gift':
        // Confetti explosion
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { x: 0.5, y: 0.5 },
          colors: ['#f8a4c8', '#c8a8e9', '#ffcba4', '#a8e6cf', '#f0d060'],
          zIndex: 100,
        });
        setActivePopup('gift');
        break;
      case 'frame':
        setActivePopup('frame');
        break;
      case 'window':
        setWindowState((prev) => (prev + 1) % WINDOW_STATES.length);
        setActivePopup('window');
        break;
      case 'plant':
        setActivePopup('plant');
        break;
      default:
        break;
    }
  };

  // Render popup content based on active object
  const renderPopupContent = () => {
    switch (activePopup) {
      case 'cake':
        return (
          <>
            <div className="popup-emoji">
              <span className={candleLit ? 'candle-glow' : ''}>🎂</span>
            </div>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
              {candleLit && '🕯️✨🕯️'}
            </div>
            <p className="popup-text">
              {candleLit ? 'Make a wish! ✨' : 'Tap the cake to light the candles!'}
            </p>
          </>
        );
      case 'wardrobe':
        return (
          <>
            <div className="wardrobe-outfit">{OUTFITS[outfitIndex].emoji}</div>
            <p className="wardrobe-label">{OUTFITS[outfitIndex].label}</p>
            <p className="popup-text" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              Tap again to see more designs! ({outfitIndex + 1}/{OUTFITS.length})
            </p>
          </>
        );
      case 'chef':
        return (
          <>
            <div className="kitchen-items">
              <motion.span
                className="kitchen-item"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
              >
                🧁
              </motion.span>
              <motion.span
                className="kitchen-item"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: 'spring' }}
              >
                🍰
              </motion.span>
              <motion.span
                className="kitchen-item"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, type: 'spring' }}
              >
                🧁
              </motion.span>
            </div>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
              <span className="steam">♨️</span>
              <span className="steam" style={{ animationDelay: '0.5s' }}>♨️</span>
            </div>
            <p className="popup-text">Chef Payoja's kitchen is cooking! 👩‍🍳</p>
          </>
        );
      case 'gift':
        return (
          <>
            <div className="popup-emoji">🎁</div>
            <p className="popup-text" style={{ fontStyle: 'italic' }}>
              "Keep believing in your dreams."
            </p>
          </>
        );
      case 'frame':
        return (
          <>
            <motion.div
              style={{
                padding: '1.5rem 2rem',
                background: 'rgba(248, 164, 200, 0.1)',
                border: '2px solid rgba(248, 164, 200, 0.2)',
                borderRadius: '12px',
                marginBottom: '1rem',
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', damping: 10 }}
            >
              <p className="popup-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
                Best Sister Ever <span className="letter-heart">❤️</span>
              </p>
            </motion.div>
          </>
        );
      case 'window': {
        const state = WINDOW_STATES[windowState];
        return (
          <>
            <div className={`window-scene ${state}`}>
              {state === 'night' && (
                <div className="window-stars">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className="window-star"
                      style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 60}%`,
                        animationDelay: `${Math.random() * 2}s`,
                      }}
                    />
                  ))}
                </div>
              )}
              {state === 'day' && (
                <div style={{ position: 'absolute', top: '10%', right: '15%', fontSize: '1.5rem' }}>
                  ☀️
                </div>
              )}
              {state === 'sunset' && (
                <div style={{ position: 'absolute', top: '30%', right: '20%', fontSize: '1.5rem' }}>
                  🌅
                </div>
              )}
              {state === 'night' && (
                <div style={{ position: 'absolute', top: '10%', right: '15%', fontSize: '1.5rem' }}>
                  🌙
                </div>
              )}
            </div>
            <p className="popup-text" style={{ textTransform: 'capitalize' }}>
              {state === 'day' ? '☀️ Beautiful Day' : state === 'sunset' ? '🌅 Golden Sunset' : '🌙 Starry Night'}
            </p>
            <p style={{ fontSize: '0.8rem', color: 'rgba(200, 168, 233, 0.6)', marginTop: '0.5rem' }}>
              Tap the window again to change time
            </p>
          </>
        );
      }
      case 'plant':
        return (
          <>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>
              <span className="plant-sway">🌿</span>
              <span className="curtain-move" style={{ marginLeft: '1rem' }}>🪟</span>
              <span className="plant-sway" style={{ animationDelay: '1s', marginLeft: '1rem' }}>🌱</span>
            </div>
            <p className="popup-text">
              The leaves sway gently... <br />
              <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>Curtains move in the breeze ✨</span>
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="screen room-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="room-container">
        {/* Room background */}
        <div className="room-bg">
          <div className="room-wall" />
          <div className="room-floor" />
        </div>

        {/* Fairy lights */}
        <div className="fairy-wire" />
        <div className="fairy-lights">
          {fairyLights.map((light, i) => (
            <div
              key={i}
              className="fairy-light"
              style={{
                left: light.left,
                background: light.color,
                boxShadow: `0 0 8px ${light.color}`,
                animationDelay: `${light.delay}s`,
              }}
            />
          ))}
        </div>

        {/* Room title */}
        <motion.div
          className="room-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1>Payoja's Dream Room</h1>
          <p>Tap each object to explore</p>
        </motion.div>

        {/* Room objects */}
        <div className="room-objects">
          {ROOM_OBJECTS_CONFIG.map((obj, i) => (
            <motion.div
              key={obj.id}
              className="room-object"
              style={{ left: obj.x, top: obj.y }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15, type: 'spring', damping: 12 }}
              onClick={() => handleObjectClick(obj.id)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="room-object-inner">
                <span className="room-object-emoji">{obj.emoji}</span>
                <span className="room-object-label">{obj.label}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Letter button */}
        <motion.div
          className="letter-button-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <GlowButton onClick={onLetter} variant="lavender" size="small">
            Read My Birthday Letter
          </GlowButton>
        </motion.div>
      </div>

      {/* Object Popup */}
      <AnimatePresence>
        {activePopup && (
          <motion.div
            className="object-popup"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="popup-overlay" onClick={() => setActivePopup(null)} />
            <motion.div
              className="glass-card popup-content"
              initial={{ scale: 0.8, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 30 }}
              transition={{ type: 'spring', damping: 15 }}
            >
              {renderPopupContent()}
              <button className="popup-close" onClick={() => setActivePopup(null)}>
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoomScreen;
