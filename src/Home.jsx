// src/Home.jsx

import React from 'react';
// Adicionado: Imports para Header e Footer
import Header from './components/header/header'; 
import Footer from './components/footer/footer';
// Corrigido: Caminhos para os componentes da Homepage
import Hero from './components/home-page/hero/hero';
import Intro from './components/home-page/intro/intro';
import Blocks from './components/home-page/blocks/blocks';

const Home = () => {
  return (
    <>
      {/* Removido: Header e Footer foram movidos para App.jsx para aparecer em todas as páginas */}
      <Hero />
      <Intro />
      <Blocks />
    </>
  );
};

export default Home;