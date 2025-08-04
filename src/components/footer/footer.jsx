// src/components/footer/footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css';

// --- LOGOS ---
import logoDeltaV from '../../assets/logos/iconbranco.webp';
import logoUPE from '../../assets/logos/upe.webp';
import logoPOLI from '../../assets/logos/poli.webp';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-content">
        
        <div className="footer-column">
          <h4 className="footer-title">Navegação</h4>
          <ul className="footer-links">
            {/* NOVO: Adicionado o botão "Início" */}
            <li><Link to="/">Início</Link></li>
            <li><Link to="/sobre">Quem Somos</Link></li>
            <li><Link to="/competicoes">Competições</Link></li>
            <li><Link to="/exposicoes">Exposições</Link></li>
            <li><Link to="/projetos">Projetos</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Participe</h4>
          <ul className="footer-links">
            <li><Link to="/seletivo">Processo Seletivo</Link></li>
            <li><Link to="/contato">Contato</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Siga-nos</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/deltav.drones/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/deltavaerospace/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/DeltaVquad" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-logos">
          <a href="/">
            <img src={logoDeltaV} alt="Logo DeltaV" className="footer-logo" />
          </a>
          <a href="https://www.upe.br/" target="_blank" rel="noopener noreferrer">
            <img src={logoUPE} alt="Logo UPE" className="footer-logo" />
          </a>
          <a href="https://poli.br/" target="_blank" rel="noopener noreferrer">
            <img src={logoPOLI} alt="Logo POLI" className="footer-logo" />
          </a>
        </div>
        <div className="footer-credits">
          <p>© {new Date().getFullYear()} DeltaV Drones. Desenvolvido por membros da extensão.</p>
          <p>Um projeto de extensão da Universidade de Pernambuco (UPE).</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;