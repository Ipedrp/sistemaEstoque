import React, { useState, useEffect } from 'react';
import './popup.css'; // Estilos CSS do popup


const Popup = ({ message }) => {
    const [visible, setVisible] = useState(true);
  
    // Quando o componente é montado, define um timeout para esconder o popup após 4 segundos
    useEffect(() => {
      const timer = setTimeout(() => {
        setVisible(false);
      }, 4000);
  
      // Limpa o timeout quando o componente é desmontado para evitar vazamentos de memória
      return () => clearTimeout(timer);
    }, []);
  
    // Renderiza o componente do popup apenas se visible for true
    return (
      <div className={`popup ${visible ? 'show' : 'hide'}`}>
        <p>{message}</p>
        <div className="progressBar">
          <div className="progress"></div>
        </div>
      </div>
    );
  };
  
  export default Popup;
