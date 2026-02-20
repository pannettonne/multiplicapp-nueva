import React, { useState } from 'react';
import './Learn.css';

interface LearnProps {
  onBack: () => void;
}

const learningContent = [
  {
    id: 1,
    title: 'Tabla del 1: La Identidad',
    description: 'El número se mantiene igual',
    tip: '1 × cualquier número = ese número',
    fun: '¿Sabías? Es la tabla más fácil porque 1 × 5 = 5, 1 × 100 = 100',
    song: '🎵 Uno por uno es uno, uno por dos es dos... ¡El uno no cambia!'
  },
  {
    id: 2,
    title: 'Tabla del 2: El Doble',
    description: 'La tabla del 2 es simplemente duplicar',
    tip: '2 × 5 = 10, es como sumar 5 + 5',
    fun: '¿Sabías? Todos los resultados terminan en números pares (2, 4, 6, 8, 0)',
    song: '🎵 Dos, cuatro, seis, ocho, diez... ¡Pares creciendo sin fin!'
  },
  {
    id: 3,
    title: 'Tabla del 5: Los Dedos',
    description: 'Usa tus 5 dedos de la mano',
    tip: 'Todos los resultados terminan en 5 o 0 (5, 10, 15, 20, 25...)',
    fun: '¿Sabías? Los resultados alternan entre 5 y 0 al final',
    song: '🎵 Cinco, diez, quince, veinte... ¡Terminan en 5 o 0!'
  },
  {
    id: 4,
    title: 'Tabla del 9: El Truco',
    description: 'Hay un patrón mágico en la tabla del 9',
    tip: 'Si sumas los dígitos del resultado, ¡siempre da 9! (9, 1+8=9, 2+7=9)',
    fun: '¿Sabías? 9×1=9, 9×2=18, 9×3=27, 9×4=36... ¡Todos suman 9!',
    song: '🎵 Nueve, dieciocho, veintisiete... ¡El 9 es mágico!'
  },
  {
    id: 5,
    title: 'Tabla del 10: La Más Fácil',
    description: 'Solo agrega un cero',
    tip: '10 × 7 = 70, simplemente escribe el 7 y añade un 0',
    fun: '¿Sabías? Es la más fácil porque solo necesitas agregar un 0',
    song: '🎵 Diez, veinte, treinta... ¡Solo agrega un cero al número!'
  }
];

export const Learn: React.FC<LearnProps> = ({ onBack }) => {
  const [selectedContent, setSelectedContent] = useState(learningContent[0]);

  return (
    <div className="learn-container">
      <button className="back-btn" onClick={onBack}>← Volver</button>
      
      <div className="learn-header">
        <h2>🎓 Aprende Las Tablas</h2>
        <p>Trucos y curiosidades</p>
      </div>

      <div className="content-selector">
        {learningContent.map(content => (
          <button
            key={content.id}
            className={`content-btn ${selectedContent.id === content.id ? 'active' : ''}`}
            onClick={() => setSelectedContent(content)}
          >
            Tabla {content.id}
          </button>
        ))}
      </div>

      <div className="content-display">
        <h3>{selectedContent.title}</h3>
        
        <div className="content-section">
          <h4>📖 Descripción</h4>
          <p>{selectedContent.description}</p>
        </div>

        <div className="content-section">
          <h4>💡 Consejo</h4>
          <p>{selectedContent.tip}</p>
        </div>

        <div className="content-section fun-fact">
          <h4>🎯 Curiosidad</h4>
          <p>{selectedContent.fun}</p>
        </div>

        <div className="content-section song">
          <h4>{selectedContent.song}</h4>
        </div>
      </div>
    </div>
  );
};
