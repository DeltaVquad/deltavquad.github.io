import { useState, useEffect } from 'react';

const VERCEL_API_URL = 'https://time-seven-ruddy.vercel.app/api/getServerTime';

const timeService = {
  getCurrentDateTime: async () => {
    try {
      const response = await fetch(VERCEL_API_URL);
      if (!response.ok) throw new Error(`API Error: ${response.statusText}`);
      const data = await response.json();
      return data.timestamp;
    } catch (error) {
      console.error("Falha ao buscar a data/hora do servidor.", error);
      return null;
    }
  }
};

/**
 * Hook personalizado para gerenciar a lógica de contagem regressiva para o lançamento.
 * @param {string} targetLaunchDate - A data de lançamento no formato ISO.
 * @param {Function} onLaunch - Função de callback a ser chamada quando o lançamento ocorrer.
 * @returns {{isLoading: boolean, isLaunched: boolean, initialSeconds: number | null}}
 */
const useLaunchTimer = (targetLaunchDate, onLaunch) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLaunched, setIsLaunched] = useState(false);
  const [initialSeconds, setInitialSeconds] = useState(null);

  useEffect(() => {
    const checkLaunchStatus = async () => {
      const currentServerTimestamp = await timeService.getCurrentDateTime();
      if (currentServerTimestamp !== null) {
        const now = new Date(currentServerTimestamp);
        const launch = new Date(targetLaunchDate);
        const diffMs = launch.getTime() - now.getTime();
        
        if (diffMs > 0) {
          setIsLaunched(false);
          setInitialSeconds(Math.floor(diffMs / 1000));
        } else {
          setIsLaunched(true);
          onLaunch();
        }
      } else {
        setIsLaunched(false);
        setInitialSeconds(null);
      }
      setIsLoading(false);
    };
    checkLaunchStatus();
  }, [targetLaunchDate, onLaunch]);

  return { isLoading, isLaunched, initialSeconds };
};

export default useLaunchTimer;