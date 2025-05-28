import React from 'react';
import './card.css';

const Card = ({ card, onClick, flipped }) => {
  return (
    <div
      className={`card ${flipped ? 'flipped' : ''}`}
      onClick={!flipped ? onClick : undefined}
      role="button"
      aria-label={flipped ? `Carte ${card.name} visible` : 'Carte face cachée'}
      tabIndex={0}
      onKeyDown={(e) => { if(e.key === 'Enter') !flipped && onClick() }}
    >
      <div className="card-inner">
        <div className="card-front">❓</div>
        <div className="card-back">{card.name}</div>
      </div>
    </div>
  );
};

export default Card;


