import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import ScrollToTop from './components/utils/scroll-to-top.jsx';
import ComingSoon from './components/utils/coming-soon/coming-soon.jsx';
import Popup from './components/utils/popup/popup.jsx';

import { setupGoogleAnalytics } from './components/utils/analytics.jsx';

// Páginas
import Home from './Home';
import Contact from './components/contact-page/contact.jsx';
import Seletivo from './components/seletivo-page/seletivo.jsx';
import Exposicoes from './components/exposicoes-page/exposicoes.jsx';
import Projetos from './components/projetos-page/projetos.jsx';
import Competicoes from './components/competicoes-page/competicoes.jsx';
import Sobre from './components/sobre-page/sobre.jsx';

import './App.css';
import logoIcon from './assets/logos/icon.webp';

import useLaunchTimer from './components/utils/timer.jsx';

const isPopupEnabled = true;

function App() {
  const targetLaunchDate = '2025-08-04T16:04:00';
  
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();

  // 1. Carrega o script do Analytics apenas uma vez
  useEffect(() => {
    setupGoogleAnalytics();
  }, []);

  // 2. Envia um evento de 'pageview' a cada mudança de rota
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location.pathname, location.search]);
  
  const handleLaunch = () => {
    if (!isPopupEnabled || location.pathname !== '/') {
      return; 
    }

    const lastClosedTime = localStorage.getItem('lastPopupClosedTime');
    const fiveMinutesInMs = 5 * 60 * 1000;
    if (!lastClosedTime || (Date.now() - parseInt(lastClosedTime, 10) > fiveMinutesInMs)) {
      setTimeout(() => setShowPopup(true), 1000);
    }
  };

  const { isLoading, isLaunched, initialSeconds } = useLaunchTimer(targetLaunchDate, handleLaunch);

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('lastPopupClosedTime', Date.now().toString());
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <img src={logoIcon} alt="Carregando..." className="loading-logo" />
      </div>
    );
  }

  if (!isLaunched) {
    return (
      <ComingSoon
        initialSeconds={initialSeconds}
        targetLaunchDate={targetLaunchDate}
        onLaunch={() => {}}
      />
    );
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contact />} />
          <Route path="/seletivo" element={<Seletivo />} />
          <Route path="/exposicoes" element={<Exposicoes />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/competicoes" element={<Competicoes />} />
        </Routes>
      </main>
      <Footer />
      {showPopup && <Popup onClose={handleClosePopup} />}
    </div>
  );
}

const AppWrapper = () => (
  <Router>
    <ScrollToTop />
    <App />
  </Router>
);

export default AppWrapper;