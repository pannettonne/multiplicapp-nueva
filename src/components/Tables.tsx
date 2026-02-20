import React, { useState } from 'react';
import './Tables.css';

interface TablesProps {
  onBack: () => void;
}

export const Tables: React.FC<TablesProps> = ({ onBack }) => {
  const [selectedTable, setSelectedTable] = useState(1);

  const generateTable = (num: number) => {
    return Array.from({ length: 12 }, (_, i) => ({
      multiplier: i + 1,
      result: num * (i + 1)
    }));
  };

  return (
    <div className="tables-container">
      <button className="back-btn" onClick={onBack}>← Volver</button>
      
      <div className="tables-header">
        <h2>📊 Tabla de Multiplicación</h2>
      </div>

      <div className="table-selector">
        {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`table-btn ${selectedTable === num ? 'active' : ''}`}
            onClick={() => setSelectedTable(num)}
          >
            {num}
          </button>
        ))}
      </div>

      <div className="table-display">
        <h3>Tabla del {selectedTable}</h3>
        <div className="table-grid">
          {generateTable(selectedTable).map((item, idx) => (
            <div key={idx} className="table-item">
              <span className="operation">{selectedTable} × {item.multiplier}</span>
              <span className="equals">=</span>
              <span className="result">{item.result}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
