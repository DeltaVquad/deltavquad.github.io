import React, { useState, useEffect } from 'react';
import './coming-soon.css';

const secondsToDhms = (totalSeconds) => {
  if (totalSeconds <= 0) {
    return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
  }
  const dias = Math.floor(totalSeconds / 86400);
  const horas = Math.floor((totalSeconds % 86400) / 3600);
  const minutos = Math.floor((totalSeconds % 3600) / 60);
  const segundos = Math.floor(totalSeconds % 60);
  
  return { dias, horas, minutos, segundos };
};

const ComingSoon = ({ initialSeconds, targetLaunchDate, onLaunch }) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  
  useEffect(() => {
    if (secondsLeft === null) return;

    if (secondsLeft <= 0) {
      window.location.reload();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft(prevSeconds => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, onLaunch]);

  let launchDateString = "Carregando...";
  if (targetLaunchDate) {
    const launchDate = new Date(targetLaunchDate);
    const options = {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
        timeZone: 'America/Sao_Paulo'
    };
    launchDateString = new Intl.DateTimeFormat('pt-BR', options).format(launchDate);
  }

  const timeLeft = secondsToDhms(secondsLeft);
  const timerComponents = Object.keys(timeLeft).map(interval => (
    <div key={interval} className="countdown-item">
      <span className="countdown-number">{String(timeLeft[interval]).padStart(2, '0')}</span>
      <span className="countdown-label">{interval.toUpperCase()}</span>
    </div>
  ));
  
  return (
    <div className="coming-soon-container">
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">...</h1>
        <div className="countdown-timer">
          {initialSeconds === null 
            ? <span>API Error</span>
            : (secondsLeft > 0 ? timerComponents : <span>atualizando...</span>)
          }
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;