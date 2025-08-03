import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extrai o 'pathname' do objeto de localização, que é a URL atual.
  const { pathname } = useLocation();

  // O useEffect será executado toda vez que o 'pathname' mudar.
  useEffect(() => {
    // A função window.scrollTo(0, 0) move a visualização da página para as coordenadas x=0 e y=0.
    window.scrollTo(0, 0);
  }, [pathname]); // O array de dependências garante que o efeito só rode quando a URL mudar.

  // Este componente não renderiza nenhum elemento visual.
  return null;
};

export default ScrollToTop;