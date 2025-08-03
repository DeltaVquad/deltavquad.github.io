// src/components/Homepage/Blocks/Blocks.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Blocks.css';
import { handleAnimationAndAction } from '../../utils/animation-handler';

import imagemQuemSomos from '../../../assets/home-page/sobre.jpg';
import imagemCompeticoes from '../../../assets/home-page/competicoes.jpg';
import imagemExposicoes from '../../../assets/home-page/exposicoes.jpg';
import imagemProjetos from '../../../assets/home-page/projetos.jpg';
import imagemSeletivo from '../../../assets/home-page/seletivo.jpg';
import imagemContato from '../../../assets/home-page/contato.jpg';

const blockData = [
  { title: 'Quem somos', link: '/sobre', isInternal: false, image: imagemQuemSomos },
  { title: 'Competições', link: '/competicoes', isInternal: false, image: imagemCompeticoes },
  { title: 'Exposições', link: '/exposicoes', isInternal: false, image: imagemExposicoes },
  { title: 'Projetos', link: '/projetos', isInternal: false, image: imagemProjetos },
  { title: 'Processo Seletivo', link: '/seletivo', isInternal: false, image: imagemSeletivo }, 
  { title: 'Contato', link: '/contato', isInternal: false, image: imagemContato }
];


const Blocks = () => {
  const navigate = useNavigate();

  const handleBlockClick = (e, item) => {
    const navigateAction = () => {
      if (item.isInternal) {
        window.location.href = item.link;
      } else {
        navigate(item.link);
      }
    };
    
    handleAnimationAndAction(e, navigateAction);
  };

  return (
    <section className="blocks-section">
      <div className="blocks-grid">
        {blockData.map((item, index) => {
          const blockContent = (
            <div className="block-item" style={{ backgroundImage: `url(${item.image})` }}>
              <div className="block-content">
                <h3 className="block-title">{item.title}</h3>
                <span className="block-link">Saiba mais →</span>
              </div>
            </div>
          );

          return item.isInternal ? (
            <a href={item.link} key={index} onClick={(e) => handleBlockClick(e, item)}>
              {blockContent}
            </a>
          ) : (
            <Link to={item.link} key={index} onClick={(e) => handleBlockClick(e, item)}>
              {blockContent}
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Blocks;