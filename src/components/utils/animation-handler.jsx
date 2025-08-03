// src/utils/animationHandler.js

/**
 * Lida com eventos de clique para executar uma animação antes de uma ação de callback.
 * @param {Event} event - O objeto do evento de clique.
 * @param {Function} callback - A função a ser executada após a animação.
 * @param {number} duration - A duração da animação em milissegundos. O padrão é 400ms.
 */
export const handleAnimationAndAction = (event, callback, duration = 400) => {
  // Previne a ação padrão do elemento (ex: navegar em um link)
  event.preventDefault();

  const element = event.currentTarget;

  // Adiciona a classe para iniciar a animação CSS
  element.classList.add('animate');

  // Aguarda o término da animação
  setTimeout(() => {
    // Executa a ação de callback (ex: navegar, rolar a página, etc.)
    if (callback) {
      callback();
    }

    // Remove a classe para permitir que a animação possa ser reativada no futuro.
    // Usamos um pequeno delay para garantir que a ação de callback não seja interrompida.
    setTimeout(() => {
      element.classList.remove('animate');
    }, 100);
    
  }, duration);
};