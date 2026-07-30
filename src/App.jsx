/**
 * Payoja App — Dream Room
 * Four-screen flow: Entry → Door → Room → Letter
 * Uses AnimatePresence for smooth transitions
 */
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import EntryScreen from './components/EntryScreen';
import DoorTransition from './components/DoorTransition';
import RoomScreen from './components/RoomScreen';
import LetterScreen from './components/LetterScreen';
import './App.css';

const App = () => {
  // Screen state: 'entry' | 'door' | 'room' | 'letter'
  const [screen, setScreen] = useState('entry');

  return (
    <AnimatePresence mode="wait">
      {screen === 'entry' && (
        <EntryScreen
          key="entry"
          onOpen={() => setScreen('door')}
        />
      )}

      {screen === 'door' && (
        <DoorTransition
          key="door"
          onComplete={() => setScreen('room')}
        />
      )}

      {screen === 'room' && (
        <RoomScreen
          key="room"
          onLetter={() => setScreen('letter')}
        />
      )}

      {screen === 'letter' && (
        <LetterScreen key="letter" />
      )}
    </AnimatePresence>
  );
};

export default App;
