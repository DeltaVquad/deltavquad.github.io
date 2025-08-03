// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componentes
import Header from './components/header/header.jsx';
import Footer from './components/footer/footer.jsx';
import ScrollToTop from './components/utils/scroll-to-top.jsx';
import ComingSoon from './components/utils/coming-soon/coming-soon.jsx';

// Páginas
import Home from './Home';
import Contact from './components/contact-page/contact.jsx';
import Seletivo from './components/seletivo-page/seletivo.jsx';
import Exposicoes from './components/exposicoes-page/exposicoes.jsx';
import Projetos from './components/projetos-page/projetos.jsx';
import Competicoes from './components/competicoes-page/competicoes.jsx';
import Sobre from './components/sobre-page/sobre.jsx';

// --- ARQUIVOS DE ESTILO E LOGO ---
import './App.css';
import logoIcon from './assets/logos/icon.png'; // Importando a sua logo

// Serviço para buscar a hora da API (sem alterações)
const timeService = {
  getCurrentDateTime: async () => {
    try {
      const response = await fetch('https://worldtimeapi.org/api/timezone/America/Sao_Paulo');
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const data = await response.json();
      return data.datetime;
    } catch (error) {
      console.error("Falha ao buscar a data/hora do servidor.", error);
      return null;
    }
  }
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(null);

  const targetLaunchDate = '2025-08-03T01:29:40-03:00';

  const handleLaunch = () => {
    setIsLaunched(true);
  };

  useEffect(() => {
    const checkLaunchStatus = async () => {
      const currentServerDateTimeString = await timeService.getCurrentDateTime();
      if (currentServerDateTimeString) {
        const now = new Date(currentServerDateTimeString);
        const launch = new Date(targetLaunchDate);
        const diffMs = launch.getTime() - now.getTime();

        if (diffMs > 0) {
          setIsLaunched(false);
          setInitialSeconds(Math.floor(diffMs / 1000));
        } else {
          setIsLaunched(true);
        }
      } else {
        setIsLaunched(false);
        setInitialSeconds(null);
      }
      setIsLoading(false);
    };

    checkLaunchStatus();
  }, []);

  // --- TELA DE CARREGAMENTO ATUALIZADA ---
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
        onLaunch={handleLaunch}
      />
    );
  }

  return (
    <Router>
      <ScrollToTop />
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
      </div>
    </Router>
  );
}

export default App;