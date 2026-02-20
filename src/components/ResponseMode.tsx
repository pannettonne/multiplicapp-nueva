import React from 'react';
import './ResponseMode.css';

interface ResponseModeProps {
  onSelectMode: (mode: 'multiple-choice' | 'write') => void;
  onBack: () => void;
}

export const ResponseMode: React.FC<ResponseModeProps> = ({ onSelectMode, onBack }) => {
  return (
    <div className="response-mode-container">
      <button className="back-btn" onClick={onBack}>← Volver</button>
      
      <div className="mode-header">
        <h2>¿Cómo quieres responder?</h2>
        <p>Elige el tipo de respuesta que prefieres</p>
      </div>

      <div className="response-options">
        <button 
          className="response-option multiple-choice"
          onClick={() => onSelectMode('multiple-choice')}
        >
          <span className="option-icon">🎯</span>
          <span className="option-title">Opción Múltiple</span>
          <span className="option-desc">Elige entre 4 opciones</span>
          <span className="option-features">
            ✓ Más fácil
            ✓ 4 opciones
          </span>
        </button>

        <button 
          className="response-option write"
          onClick={() => onSelectMode('write')}
        >
          <span className="option-icon">✏️</span>
          <span className="option-title">Escritura Libre</span>
          <span className="option-desc">Escribe tu respuesta</span>
          <span className="option-features">
            ✓ Más desafiante
            ✓ Escribe el número
          </span>
        </button>
      </div>
    </div>
  );
};
