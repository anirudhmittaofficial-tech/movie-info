// ===== App Component =====
// The root component that defines the app layout.
//
// Syllabus Concepts Used:
// - Functional Components (Module-I)
// - useState (Module-II): managing search overlay state
// - JSX Layout (Module-I)
//
// Layout Structure:
// Navbar (fixed top) → SearchOverlay (modal) → AppRoutes (page content) → Footer

import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SearchOverlay from './components/SearchOverlay/SearchOverlay';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  // State for controlling the search overlay visibility
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <div className="app">
      {/* Navigation bar — always visible */}
      <Navbar onSearchOpen={() => setSearchOpen(true)} />

      {/* Search overlay — conditional rendering based on searchOpen state */}
      <SearchOverlay
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      {/* Main page content — rendered by AppRoutes based on current URL */}
      <div className="app__content">
        <AppRoutes />
      </div>

      {/* Footer — always visible */}
      <Footer />
    </div>
  );
}

export default App;
