// src/Home.jsx

import React from 'react';

import Hero from './components/home-page/hero/hero';
import Intro from './components/home-page/intro/intro';
import Blocks from './components/home-page/blocks/blocks';

const Home = () => {
  return (
    <>
      <Hero />
      <Intro />
      <Blocks />
    </>
  );
};

export default Home;