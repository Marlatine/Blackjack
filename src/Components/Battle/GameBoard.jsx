import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import { randomIntFromInterval } from "../Settings/randomCard";
import { randomDealerDeck, randomDeck } from "../AllDecks/randomDeck";
import Deck from "../../data";
import "./gameBoard.css";
import Button from "../Button/Button";
import { calculateScore } from "./CalculateScore";

const GameBoard = () => {
  const [hand, setHand] = useState(randomDeck);
  const [dealerDeck, setDealerDeck] = useState(randomDealerDeck);
  const [score, setScore] = useState(0);
  const [dealerScore, setDealerScore] = useState(0);
  const [message, setMessage] = useState("");
  
  const [name, setName] = useState([]);
  useEffect(() => {
    const names = localStorage.getItem("Name");
    if (names) {
      setName(names);
    }
  }, []);

  let handSum = calculateScore(hand);
  let dealerHandSum = calculateScore(randomDealerDeck);

  useEffect(() => {
    setScore(handSum);
    setDealerScore(dealerHandSum);
  }, [handSum, dealerHandSum]);

  const handleHit = () => {
    const randomNumber = randomIntFromInterval(0, 51);
    setHand((hand) => [...hand, Deck[randomNumber[0]]]);

    const newPlayerCards = [...hand, Deck[randomNumber[0]]];
    const newHandScore = calculateScore(newPlayerCards);
    setScore(newHandScore);

    if (newHandScore > 21) {
      setMessage("You lose!");
    }
  };
  
  const handleHold = () => {
    let newDealerCards = dealerDeck;
    let newDealerScore = dealerHandSum;

    while (newDealerScore < 17) {
      const randomNumber = randomIntFromInterval(0, 51);
      newDealerCards = [...dealerDeck, Deck[randomNumber[1]]];
      setDealerDeck((dealerDeck) => [...dealerDeck, Deck[randomNumber[1]]]);

      newDealerScore = calculateScore(newDealerCards);
      setDealerDeck(newDealerCards);
      setDealerScore(newDealerScore);
    }
    if (newDealerScore === 21) {
      setMessage("You lose!");
      return;
    }
    if (newDealerScore > 21) {
      setMessage("You win!");
      return;
    }
    if (newDealerScore === handSum) {
      setMessage("It's a tie!");
      return;
    }
    if (newDealerScore > handSum) {
      setMessage("You lose!");
    }
  };


  return (
    <>
      <div className="header-wrapper">
        <h3>Player: {name}</h3>
        <h1 className="title">Blackjack</h1>
        <button className="highscore">Highscore</button>
      </div>
      <div className="main-wrapper">
        <div className="your-hand-wrapper">
          <h2 className="deck-title">Your hand ({score})</h2>
          <div className="hand-deck">
            {hand.map((index, value) => {
              return <Card key={value} card={index.card} suits={index.suits} />;
            })}
          </div>
        </div>
        <div className="button-wrapper">
          <div className="message-wrapper">
            <h3 className="message-text">Results: {message}</h3>
          </div>
          <Button onClick={handleHit} disabled={""} text="Hit" />
          <Button onClick={handleHold} disabled={""} text="Hold" />
        </div>
        <div className="deck-title">
          <div className="dealer-hand-wrapper">
            <h2 className="deck-title">Dealer's hand ({dealerScore})</h2>
            <div className="dealer-deck">
              {dealerDeck.map((index, value) => {
                return (
                  <Card key={value} card={index.card} suits={index.suits} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
