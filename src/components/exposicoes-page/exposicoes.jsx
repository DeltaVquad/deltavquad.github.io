// src/components/exposicoes-page/exposicoes.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './exposicoes.css';
import { handleAnimationAndAction } from '../utils/animation-handler';

// Importando as imagens placeholder
import fotoETEPAM1 from '../../assets/exposicoes-page/ETEPAM/ete1.jpg';
import fotoETEPAM2 from '../../assets/exposicoes-page/ETEPAM/ete2.jpg';
import fotoETEPAM3 from '../../assets/exposicoes-page/ETEPAM/ete3.jpg';
import fotoIFPE1 from '../../assets/exposicoes-page/IFPE/ifpe1.jpg';
import fotoIFPE2 from '../../assets/exposicoes-page/IFPE/ifpe2.jpg';
import fotoIFPE3 from '../../assets/exposicoes-page/IFPE/ifpe3.jpg';


const Exposicoes = () => {
  const navigate = useNavigate();

  const handleContactClick = (e) => {
    handleAnimationAndAction(e, () => navigate('/contato'));
  };

  const visitas = [
    {
      local: "IFPE Campus Recife (Instituto Federal de Pernambuco)",
      descricao: "No dia 8 de julho, nossa equipe teve a oportunidade de conhecer os estudantes do primeiro período do curso técnico em Mecânica do IFPE Campus Recife. A visita foi uma excelente oportunidade para mostrar como a teoria se aplica na prática, além de inspirar os alunos com as possibilidades que a engenharia e a tecnologia oferecem.",
      fotos: [
        fotoIFPE1,
        fotoIFPE2,
        fotoIFPE3,
      ]
    },
    {
      local: "ETE-PAM (Escola Técnica Estadual Professor Agamenon Magalhães)",
      descricao: "No dia 4 de julho, nossa equipe esteve na ETEPAM para apresentar nosso drone e compartilhar com estudantes do ensino técnico um pouco da nossa trajetória em competições universitárias. Foi uma oportunidade valiosa de troca, divulgação científica e incentivo às áreas tecnológicas, reafirmando nosso compromisso com a formação de novos talentos e a conexão entre universidade e sociedade.",
      fotos: [
        fotoETEPAM1,
        fotoETEPAM2,
        fotoETEPAM3,
      ]
    }
  ];

  return (
    <section className="exposicoes-section">
      <div className="exposicoes-container">
        <div className="exposicoes-header">
          <h1 className="exposicoes-title">Nossas Exposições</h1>
          <p className="exposicoes-subtitle">
            Acreditamos que a engenharia tem o poder de transformar o futuro. Por isso, a DeltaV leva
            a nossa paixão por drones e tecnologia a escolas e eventos. Nosso objetivo é fomentar
            novas mentes, despertar a curiosidade em jovens e mostrar na prática como a inovação
            pode decolar.
          </p>
        </div>

        <div className="visitas-grid">
          {visitas.map((visita, index) => (
            <div key={index} className="visita-card">
              <h2 className="visita-local">{visita.local}</h2>
              <p className="visita-descricao">{visita.descricao}</p>
              <div className="fotos-container">
                {visita.fotos.length > 0 ? (
                  visita.fotos.map((foto, idx) => (
                    <img key={idx} src={foto} alt={`Visita a ${visita.local}`} className="visita-foto" />
                  ))
                ) : (
                  <div className="foto-placeholder">
                    <p>Espaço reservado para fotos da visita.</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="exposicoes-cta">
          {/* FRASE ATUALIZADA */}
          <h2>Leve a DeltaV para sua escola ou evento.</h2>
          <p>Leve nossa equipe para sua instituição. Será um prazer compartilhar conhecimento e inspirar futuros talentos!</p>
          <button onClick={handleContactClick} className="cta-button">
            <span className="button-text">Fale Conosco</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Exposicoes;