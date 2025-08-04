// src/components/utils/analytics.jsx

// Função para configurar o Google Analytics
export const setupGoogleAnalytics = () => {
  // Cria o script principal do Google Analytics
  const scriptGtag = document.createElement('script');
  scriptGtag.async = true;
  scriptGtag.src = "https://www.googletagmanager.com/gtag/js?id=G-E99N245LTE";
  document.head.appendChild(scriptGtag);

  // Inicializa o dataLayer e a função gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-E99N245LTE');

  // Adiciona a função gtag ao escopo global (caso o script seja carregado tardiamente)
  window.gtag = gtag;
};