import React, { useState, useEffect } from 'react';
import './MemoryGame.css';
import lugiaBg from './assets/lugia-background.jpg';

const pokemons = [
  { name: 'pikachu', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
  { name: 'bulbasaur', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png' },
  { name: 'charmander', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png' },
  { name: 'squirtle', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png' },
  { name: 'jigglypuff', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/39.png' },
  { name: 'meowth', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/52.png' },
];

const shuffleCards = () => {
  const doubled = [...pokemons, ...pokemons];
  return doubled
    .map(card => ({ ...card, id: Math.random() }))
    .sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState(shuffleCards());
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(true); // start disabled for countdown
  const [turns, setTurns] = useState(0);
  const [victory, setVictory] = useState(false);
  const [countdown, setCountdown] = useState(3); // 3 seconds countdown

  // Countdown effect before enabling clicks
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setDisabled(false);
    }
  }, [countdown]);

  const handleClick = (card) => {
    if (!disabled) {
      if (!choiceOne) {
        setChoiceOne(card);
      } else if (card.id !== choiceOne.id && !choiceTwo) {
        setChoiceTwo(card);
      }
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.name === choiceTwo.name) {
        setCards(prev =>
          prev.map(card =>
            card.name === choiceOne.name ? { ...card, matched: true } : card
          )
        );
        setTimeout(resetTurn, 800);
      } else {
        setTimeout(resetTurn, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    if (cards.every(card => card.matched)) {
      setVictory(true);
      setDisabled(true);
    }
  }, [cards]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    setTurns(prev => prev + 1);
  };

  const handleRestart = () => {
    setCards(shuffleCards());
    setChoiceOne(null);
    setChoiceTwo(null);
    setVictory(false);
    setTurns(0);
    setCountdown(3);
    setDisabled(true);
  };

  return (
    <div
      className="memory-container"
      style={{
        backgroundImage: `url(${lugiaBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <h1>Memory Pokémon</h1>

      {countdown > 0 ? (
        <p className="countdown">Prêt dans... {countdown}</p>
      ) : (
        <>{(victory || countdown > 0) && (
        <button className="restart-btn" onClick={handleRestart}>🔄 Recommencer</button>
      )}
          <p className="turns">Coups joués : {turns}</p>
          {victory && <p className="victory-message">🎉 Félicitations, tu as gagné ! 🎉</p>}
          <div className="card-grid">
            {cards.map(card => (
              <div
                key={card.id}
                className={`card ${card === choiceOne || card === choiceTwo || card.matched ? 'flipped' : ''}`}
                onClick={() => handleClick(card)}
              >
                <div className="card-inner">
                  <div className="card-front">
                    <img src={card.img} alt={card.name} />
                  </div>
                  <div className="card-back">🎴</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}






