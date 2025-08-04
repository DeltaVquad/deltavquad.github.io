// src/components/seletivo-page/SelectiveProcessPopup.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { handleAnimationAndAction } from '../animation-handler';
import './popup.css';

// --- CONFIGURAÇÃO DO POP-UP AQUI ---
const popupConfig = {
  title: 'Processo Seletivo Aberto!',
  subtitle: 'Faça parte da nossa equipe e do nosso futuro.',
  content: `As inscrições para o processo seletivo da DeltaV estão abertas! Acreditamos que a engenharia tem o poder de transformar o futuro. Faça parte da primeira equipe de extensão de drones de Pernambuco.`,
  buttonText: 'MAIS INFORMAÇÕES',
  buttonLink: '/seletivo'
};

const SelectiveProcessPopup = ({ onClose }) => {
  const navigate = useNavigate();

  const handleInfoClick = (e) => {
    handleAnimationAndAction(e, () => {
      onClose();
      navigate(popupConfig.buttonLink);
    });
  };

  const handleCloseClick = (e) => {
    handleAnimationAndAction(e, onClose);
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <button className="popup-close-button" onClick={handleCloseClick} aria-label="Fechar">
          <FaTimes />
        </button>
        <div className="popup-header">
          <h2 className="popup-title">{popupConfig.title}</h2>
          <p className="popup-subtitle">{popupConfig.subtitle}</p>
        </div>
        <div className="popup-content">
          <p>{popupConfig.content}</p>
        </div>
        <div className="popup-buttons">
          <button onClick={handleInfoClick} className="sp-button primary animate">
            <span className="button-text">{popupConfig.buttonText}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectiveProcessPopup;