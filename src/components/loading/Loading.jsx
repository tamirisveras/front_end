import React from 'react';
import './Loading.css'; // Arquivo de estilos CSS (veja abaixo)

const Loading = () => {
  return (
    <div className="loading-container">
        <h3>Carregando dados...</h3>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
