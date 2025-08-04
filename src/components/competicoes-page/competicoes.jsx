// src/components/competicoes-page/competicoes.jsx

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './competicoes.css';
import { handleAnimationAndAction } from '../utils/animation-handler';

// Importando imagens
import imgSAE20251 from '../../assets/competicoes-page/eletroquad2025/SAE1.webp';
import imgSAE20252 from '../../assets/competicoes-page/eletroquad2025/SAE2.webp';
import imgSAE20253 from '../../assets/competicoes-page/eletroquad2025/SAE3.webp';
import imgSAE20254 from '../../assets/competicoes-page/eletroquad2025/SAE4.webp';
import imgSAE20255 from '../../assets/competicoes-page/eletroquad2025/SAE5.webp';
import imgSAE20256 from '../../assets/competicoes-page/eletroquad2025/SAE6.webp';
import imgSAE20257 from '../../assets/competicoes-page/eletroquad2025/SAE7.webp';
import imgSuspense from '../../assets/competicoes-page/suspense.webp';

const competicoes = [
  {
    nome: "Eletroquad SAE Brasil 2025",
    ano: "2025",
    descricao: "Em 2025, marcamos presença na Eletroquad SAE Brasil, a principal competição nacional de drones autônomos. Representando Pernambuco e a POLI-UPE, levamos nosso projeto à prova com orgulho e espírito inovador. A participação foi uma oportunidade de validar nossas soluções em um ambiente técnico desafiador, além de fortalecer nosso compromisso com a engenharia, a pesquisa aplicada e o trabalho em equipe.",
    colocacao: ["6º Lugar Nacional", "1º Lugar Apresentação Oral", "2º Lugar Relatório Técnico"],
    imagens: [imgSAE20251, imgSAE20252, imgSAE20253, imgSAE20254, imgSAE20255, imgSAE20256, imgSAE20257],
  },
  {
    nome: "Eletroquad SAE Brasil 2026",
    ano: "2026",
    descricao: "Estamos nos preparando para mais uma edição da Eletroquad SAE Brasil. Com base na experiência de 2025, seguimos evoluindo nossos sistemas de navegação, visão computacional e estratégias de missão. O objetivo é levar um projeto ainda mais robusto, inteligente e competitivo, reafirmando nosso papel na vanguarda da mobilidade aérea autônoma.",
    colocacao: "Participação Futura",
    imagens: [imgSuspense],
  },
  {
    nome: "CBR 2026",
    ano: "2026",
    descricao: "Estamos nos preparando para nossa estreia na CBR, uma das maiores competições de robótica da América Latina. O desafio será projetar e construir uma aeronave autônoma capaz de executar missões complexas de forma precisa e confiável. Com essa participação, buscamos expandir nossos horizontes técnicos, explorar novas soluções em robótica aérea e competir ao lado das principais equipes do país.",
    colocacao: "Participação Futura",
    imagens: [imgSuspense],
  },
];

// --- COMPONENTE DO SLIDER INTERNO CORRIGIDO ---
const ImageSlider = ({ imagens, isActive }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);
  const touchStartRef = useRef(null);
  const touchEndRef = useRef(null);
  const minSwipeDistance = 50; // Distância mínima para registrar um swipe

  const resetTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imagens.length);
  }, [imagens.length]);

  const prevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imagens.length) % imagens.length);
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Efeito para o autoplay
  useEffect(() => {
    if (isActive && imagens.length > 1) {
      resetTimer(); // Limpa o timer anterior
      timerRef.current = setTimeout(nextImage, 5000); // Inicia um novo timer
    }
    return () => resetTimer(); // Limpa o timer quando o componente desmonta ou o estado muda
  }, [currentIndex, isActive, imagens.length, nextImage]);

  // Funções para resetar o timer ao interagir
  const handleUserInteraction = (action) => {
    resetTimer();
    action();
  };
  
  // --- LÓGICA DE SWIPE ---
  const onTouchStart = (e) => {
      touchEndRef.current = null; // Reseta o ponto final a cada novo toque
      touchStartRef.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e) => {
      touchEndRef.current = e.targetTouches[0].clientX;
  };
  
  const onTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;
    const distance = touchStartRef.current - touchEndRef.current;
    
    // Swipe para a esquerda (próxima imagem)
    if (distance > minSwipeDistance) {
        handleUserInteraction(nextImage);
    } 
    // Swipe para a direita (imagem anterior)
    else if (distance < -minSwipeDistance) {
        handleUserInteraction(prevImage);
    }
    
    touchStartRef.current = null;
    touchEndRef.current = null;
  };

  return (
    <div 
        className="card-image-slider"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
    >
      {imagens.map((imagem, index) => (
        <img key={index} src={imagem} alt={`Competição imagem ${index + 1}`} className={`slider-image ${index === currentIndex ? 'active' : ''}`} />
      ))}
      {imagens.length > 1 && (
        <>
          <button className="image-slider-arrow left" onClick={() => handleUserInteraction(prevImage)} aria-label="Imagem anterior">‹</button>
          <button className="image-slider-arrow right" onClick={() => handleUserInteraction(nextImage)} aria-label="Próxima imagem">›</button>
          <div className="image-slider-dots">
            {imagens.map((_, index) => (
              <span key={index} className={`dot ${index === currentIndex ? 'active' : ''}`} onClick={() => handleUserInteraction(() => goToImage(index))}></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
};


const Competicoes = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const timelineContainerRef = useRef(null);
  const timelinePointsRef = useRef([]);

  useEffect(() => {
    const timeline = timelineContainerRef.current;
    const activePoint = timelinePointsRef.current[currentIndex];
    if (timeline && activePoint) {
      const timelineCenter = timeline.offsetWidth / 2;
      const pointCenter = activePoint.offsetLeft + activePoint.offsetWidth / 2;
      const scrollToPosition = pointCenter - timelineCenter;
      timeline.scrollTo({ left: scrollToPosition, behavior: 'smooth' });
    }
  }, [currentIndex]);

  const nextSlide = () => {
    if (currentIndex < competicoes.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  return (
    <section className="competicoes-section">
      <div className="competicoes-container">
        <div className="competicoes-header">
          <h1 className="competicoes-title">Nossa Jornada em Competições</h1>
          <p className="competicoes-subtitle">
            É no campo de provas que nosso conhecimento decola. Enfrentamos os maiores desafios da engenharia nacional para testar nossos limites, inovar e representar Pernambuco.
          </p>
        </div>

        <div className="horizontal-timeline" ref={timelineContainerRef}>
          <div className="timeline-track">
            <div className="timeline-line"></div>
            {competicoes.map((competicao, index) => (
              <div key={index} className={`timeline-point ${index === currentIndex ? 'active' : ''}`} ref={el => timelinePointsRef.current[index] = el}>
                <div className="timeline-year">{competicao.ano}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="competicoes-slider">
          {currentIndex > 0 && (
            <button className="slider-arrow left" onClick={prevSlide} aria-label="Competição anterior">‹</button>
          )}
          <div className="slider-content">
            {competicoes.map((competicao, index) => {
              let position = 'hidden';
              if (index === currentIndex) position = 'active';
              else if (index === currentIndex - 1) position = 'prev';
              else if (index === currentIndex + 1) position = 'next';

              return (
                <div key={index} className={`competicao-card ${position}`} data-year={competicao.ano}>
                  <div className="card-imagem-wrapper">
                    <ImageSlider imagens={competicao.imagens} isActive={index === currentIndex} />
                  </div>
                  <div className="card-info">
                    <h2 className="card-nome">{competicao.nome}</h2>
                    <div className="card-colocacoes-container">
                      {Array.isArray(competicao.colocacao) ? (
                        competicao.colocacao.map((item, idx) => (
                          <span key={idx} className="card-colocacao">{item}</span>
                        ))
                      ) : (
                        <span className="card-colocacao">{competicao.colocacao}</span>
                      )}
                    </div>
                    <p className="card-descricao">{competicao.descricao}</p>
                  </div>
                </div>
              );
            })}
          </div>
          {currentIndex < competicoes.length - 1 && (
            <button className="slider-arrow right" onClick={nextSlide} aria-label="Próxima competição">›</button>
          )}
        </div>

        <div className="competicoes-cta">
          <h2>Apoie nossa equipe na próxima competição!</h2>
          <p>Sua marca pode voar conosco. Fale com a gente e saiba como sua marca pode fazer parte dessa jornada.</p>
          <button onClick={handleContactClick} className="cta-button">
            <span className="button-text">Seja um Patrocinador</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Competicoes;