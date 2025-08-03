// src/components/Homepage/Intro/Intro.jsx

import React from 'react';
import './Intro.css';
import { handleAnimationAndAction } from '../../utils/animation-handler';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate

const Intro = () => {
  const navigate = useNavigate(); // Inicializar o hook

  // Ação para navegar para a página /sobre
  const navigateToAbout = () => {
    navigate('/sobre');
  };

  return (
    <section id="sobre" className="intro-section">
      <div className="intro-content">
        <div className="intro-left">
          <div className="pernambuco-bar"></div>
          <div className="intro-text-content">
            <h2 className="intro-title">
              SOMOS A<br/>DELTAV
            </h2>
            <p className="intro-subtitle">A PRIMEIRA EXTENSÃO DE <br/> DRONES EM PERNAMBUCO</p>
            
            {/* Atualizar o onClick para usar a nova função de navegação */}
            <button className="intro-button" onClick={(e) => handleAnimationAndAction(e, navigateToAbout)}>
              <span className="button-text">Sobre nós</span>
              <span className="button-icon">→</span>
            </button>
          </div>
        </div>
        <div className="intro-right">
          <p className="intro-description">
            A DeltaV Drones é a primeira extensão universitária dedicada ao desenvolvimento de drones 
            autônomos em Pernambuco, formada por estudantes da POLI/UPE. Atuamos na fronteira entre 
            pesquisa acadêmica e aplicação prática, combinando inovação, engenharia e propósito. 
            Por meio de projetos desafiadores, competições nacionais e colaboração multidisciplinar, 
            cultivamos uma cultura de foco em resultados, impulsionando o futuro da mobilidade aérea 
            inteligente e conectada.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Intro;