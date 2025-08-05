// src/components/Header/Header.jsx

import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { handleAnimationAndAction } from '../utils/animation-handler';
import './header.css';
import logoDeltaV from '../../assets/logos/logo.webp';
import { FaBars, FaTimes, FaHome } from 'react-icons/fa';

const Header = () => {
  const [menuAberto, setMenuAberto] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Adicionada a página de projetos à lógica do header
    if (['/sobre', '/contato', '/seletivo', '/exposicoes', '/projetos', '/competicoes'].includes(pathname)) { // <<< ADICIONADO '/sobre'
      setScrolled(true);
      return;
    }
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  const handleLinkClick = (e, to, isRouterLink = false) => {
    const actionCallback = () => {
      fecharMenu();
      if (isRouterLink) {
        navigate(to);
      } else {
        // Para links de âncora na mesma página (se houver)
        window.location.href = to;
      }
    };
    handleAnimationAndAction(e, actionCallback, 300);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <Link to="/" onClick={fecharMenu}>
          <img src={logoDeltaV} alt="Logo da DeltaV" className="logo" />
        </Link>
      </div>

      <button
        className="menu-icon"
        onClick={toggleMenu}
        aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
      >
        <span className={`icon-wrapper ${menuAberto ? 'hidden' : 'visible'}`}><FaBars /></span>
        <span className={`icon-wrapper ${menuAberto ? 'visible' : 'hidden'}`}><FaTimes /></span>
      </button>

      <nav id="nav-links-mobile" className={`nav-container ${menuAberto ? 'aberto' : ''}`}>
        <ul className="nav-links">
          <li><Link to="/sobre" onClick={(e) => handleLinkClick(e, '/sobre', true)}>Quem Somos</Link></li>
          <li><Link to="/competicoes" onClick={(e) => handleLinkClick(e, '/competicoes', true)}>Competições</Link></li>
          <li><Link to="/exposicoes" onClick={(e) => handleLinkClick(e, '/exposicoes', true)}>Exposições</Link></li>
          <li><Link to="/projetos" onClick={(e) => handleLinkClick(e, '/projetos', true)}>Projetos</Link></li>
          <li><Link to="/seletivo" onClick={(e) => handleLinkClick(e, '/seletivo', true)}>Processo Seletivo</Link></li>
          <li><Link to="/contato" onClick={(e) => handleLinkClick(e, '/contato', true)}>Contato</Link></li>
          <li className="home-link-item">
            <Link to="/" onClick={(e) => handleLinkClick(e, '/', true)}>
              <FaHome aria-label="Início" className="home-icon" />
              <span className="home-text">Início</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;