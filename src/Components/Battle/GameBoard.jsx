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
    checkAce(handSum);
  }, [handSum, dealerHandSum]);

  function checkAce() {
    for (let i = 0; i < hand.length; i++) {
      if (hand[0].card === "A" && hand[1].card === "A") {
        handSum -= 10;
      }
      if (hand[i].card === "A" && handSum > 21) {
        handSum -= 10;
      }
    }
  }

  const handleHit = () => {
    const randomNumber = randomIntFromInterval(0, 51);
    setHand((hand) => [...hand, Deck[randomNumber[0]]]);

    const newPlayerCards = [...hand, Deck[randomNumber[0]]];
    let newHandScore = calculateScore(newPlayerCards);
    setScore(newHandScore);
    if (newHandScore > 21) {
      setMessage("You lose!");
    }
  };

  const handleHold = () => {
    let newDealerCards = dealerDeck;
    let newDealerScore = dealerHandSum;

    if (newDealerScore < 17) {
      const randomNumber = randomIntFromInterval(0, 51);
      newDealerCards = [...dealerDeck, Deck[randomNumber[1]]];
      setDealerDeck((dealerDeck) => [...dealerDeck, Deck[randomNumber[1]]]);

      newDealerScore = calculateScore(newDealerCards);
      setDealerDeck(newDealerCards);
      setDealerScore(newDealerScore);
    }
    if (newDealerScore === 21 || handSum < newDealerScore) {
      setMessage("You lose!");
    }
    if (newDealerScore > 21 || handSum > newDealerScore) {
      setMessage("You win!");
    }
    if (newDealerScore === handSum) {
      setMessage("It's a tie!");
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
              return <Card key={value} image={index.image} />;
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
                return <Card key={value} image={index.image} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameBoard;
