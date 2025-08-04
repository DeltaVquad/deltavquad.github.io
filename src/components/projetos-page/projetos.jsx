// src/components/projetos-page/projetos.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './projetos.css';
import { handleAnimationAndAction } from '../utils/animation-handler';

// Importando imagens placeholder
import imgLogan from '../../assets/projetos-page/logan.webp';
import imgKwid from '../../assets/projetos-page/suspense.webp';

const projetos = [
  {
    titulo: "LOGAN",
    descricao: "O LOGAN é nosso principal projeto, um drone desenvolvido para missões de reconhecimento e mapeamento autônomo. Equipado com sistemas de navegação avançados e visão computacional, ele é a base de nossas pesquisas e participação em competições nacionais, como a Eletroquad SAE Brasil.",
    tecnologias: ["DroneKit", "Ardupilot", "Python", "Visão Computacional", "Webots"],
    imagem: imgLogan,
  },
  {
    titulo: "...",
    descricao: "Nosso mais novo projeto, novas ideias, novos desafios e oportunidades de colocar em prática tudo que se aprende na teoria. Se você tem interesse por drones, tecnologia e quer fazer parte de algo inovador, o seu momento pode estar mais perto do que imagina. Inscreva-se no nosso processo seletivo e venha descobrir o que está por trás.",
    tecnologias: ["Processo Seletivo"],
    /*descricao: "O KWID é nosso drone voltado para formação e inovação. Ele serve como plataforma de treinamento para novos membros, permitindo a familiarização com os principais sistemas embarcados e práticas de voo. Além disso, é utilizado para testar e explorar novas tecnologias, ferramentas e estratégias de desenvolvimento, fortalecendo a base técnica da equipe e impulsionando a experimentação contínua.",
    tecnologias: ["C++", "Multiwii", "Esp32", "Sensores"],*/
    imagem: imgKwid,
  }
];

const Projetos = () => {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  return (
    <section className="projetos-section">
      <div className="projetos-container">
        <div className="projetos-header">
          <h1 className="projetos-title">Nossos Projetos</h1>
          <p className="projetos-subtitle">
            Da concepção à otimização, cada projeto é uma jornada de inovação. Aqui você conhece os drones e as tecnologias que desenvolvemos na fronteira da engenharia.
          </p>
        </div>

        <div className="projetos-list">
          {projetos.map((projeto, index) => (
            <div key={index} className="projeto-card">
              <div className="projeto-imagem-wrapper">
                <img src={projeto.imagem} alt={projeto.titulo} className="projeto-imagem" />
              </div>
              <div className="projeto-info">
                <h2 className="projeto-titulo">{projeto.titulo}</h2>
                <p className="projeto-descricao">{projeto.descricao}</p>
                <div className="projeto-tecnologias">
                  {projeto.tecnologias.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="projetos-cta">
          <h2>Gostou dos nossos projetos?</h2>
          <p>Se você tem interesse em colaborar, patrocinar ou saber mais sobre nossa tecnologia, entre em contato!</p>
          <button onClick={handleContactClick} className="cta-button">
            <span className="button-text">Fale Conosco</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projetos;