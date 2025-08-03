// src/components/Contactpage/Contact/Contact.jsx

import React, { useState } from 'react';
import './contact.css';
// Ícone do GitHub importado
import { FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('');

  // --- FUNÇÃO DE ENVIO CORRIGIDA PARA USAR FORMSPREE ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Enviando...');
    
    try {
      const response = await fetch("https://formspree.io/f/xkgzvoya", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Mensagem enviada com sucesso!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      setStatus('Ocorreu um erro ao enviar. Tente novamente mais tarde.');
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <section id="contato" className="contact-section">
      <div className="contact-container">
        {/* Coluna da Esquerda: Informações de Contato */}
        <div className="contact-info">
          <h2 className="contact-title">CONTATO</h2>
          <p>Escola Politécnica de Pernambuco (POLI/UPE)<br/>
            R. Benfica, 455 - Madalena, Recife - PE
            <br />
            CEP: 50720-001
          </p>
          <p className="contact-email">
            deltav.quad@poli.br
          </p>
          
          <div className="contact-social-links">
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

        {/* Coluna da Direita: Formulário */}
        <div className="contact-form-container">
          <form className="contact-form" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Nome" 
              value={formData.name}
              onChange={handleChange}
              required 
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
            <textarea 
              name="message" 
              placeholder="Adicione uma mensagem" 
              rows="5" 
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className="form-submit-button">
              <span className="button-text">Enviar</span>
            </button>
            {status && (
              <p className={`form-status ${status.includes('sucesso') ? 'success' : 'error'}`}>
                {status}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;