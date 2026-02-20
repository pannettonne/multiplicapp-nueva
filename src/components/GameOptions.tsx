import React from 'react';
import './GameOptions.css';

interface GameOptionsProps {
  question: number;
  multiplier: number;
  options: number[];
  onSelectOption: (answer: number) => void;
  isCorrect?: boolean;
}

export const GameOptions: React.FC<GameOptionsProps> = ({ 
  question, 
  multiplier, 
  options, 
  onSelectOption 
}) => {
  return (
    <div className="game-options">
      <div className="question-display">
        <span className="operation">{question} × {multiplier}</span>
        <span className="equals">=</span>
        <span className="question-mark">?</span>
      </div>

      <div className="options-grid">
        {options.map((option, idx) => (
          <button
            key={idx}
            className="option-btn"
            onClick={() => onSelectOption(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
