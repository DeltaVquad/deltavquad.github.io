// src/components/seletivoPage/seletivo.jsx

import React from 'react';
import './seletivo.css';
import { handleAnimationAndAction } from '../utils/animation-handler';
import { useNavigate } from 'react-router-dom';

const seletivo = () => {
  const inscriptionLink = "https://forms.gle/2bmosPNKtzEshQQS9"; // Link de Inscrição (Placeholder)
  const editalLink = "https://drive.google.com/file/d/1OH65NQcs6KkRVW5O_A9kRWkT2cSM5wxO/view?usp=sharing";       // Link do Edital (Placeholder)
  const navigate = useNavigate();

  const handleInscriptionClick = (e) => {
    handleAnimationAndAction(e, () => window.open(inscriptionLink, '_blank'));
  };

  const handleEditalClick = (e) => {
    handleAnimationAndAction(e, () => window.open(editalLink, '_blank'));
  };

  return (
    <section id="seletivo" className="selective-process-section">
      <div className="selective-process-container">
        <div className="selective-process-header">
          <h1 className="selective-process-title">ENTRE NA DELTAV!</h1>
          <p className="selective-process-subtitle">Faça parte da nossa história e do nosso futuro.</p>
        </div>
        <div className="selective-process-content">
          <p>
            Nossos processos seletivos ocorrem de acordo com a necessidade da equipe e a disponibilidade
            para treinar novos membros, portanto, não possuem uma frequência semestral fixa.
            O número de vagas varia a cada seleção, buscando candidatos com habilidades que
            complementem nosso time.
          </p>
          <p>
            Para entender como funcionam nossas seleções, confira o edital mais recente.
            Se o período de inscrições estiver aberto, não perca a chance de se candidatar!
            Qualquer dúvida, entre em contato conosco.
          </p>
        </div>
        <div className="selective-process-buttons">
          <button onClick={handleInscriptionClick} className="sp-button primary">
            <span className="button-text">INSCREVA-SE</span>
          </button>
          <button onClick={handleEditalClick} className="sp-button secondary">
            <span className="button-text">EDITAL MAIS RECENTE</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default seletivo;