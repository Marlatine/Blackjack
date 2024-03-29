import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";
import { randomIntFromInterval } from "../Settings/randomCard";
import Deck from "../../data";
import "./gameBoard.css";
import Button from "../Button/Button";
import { calculateScore } from "./CalculateScore";

const GameBoard = ({ onStartClick }) => {
  const [hand, setHand] = useState([]);
  const [dealerDeck, setDealerDeck] = useState([]);
  const [dealerScore, setDealerScore] = useState(0);
  const [message, setMessage] = useState("");
  const [dealersTurn, setDealersTurn] = useState(false);
  const [button, setButton] = useState(true);
  const [dealButton, setDealButton] = useState(false);

  const [score, setScore] = useState(0);
  const [currentHighScore, setCurrentHighScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // function checkAce() {
  //   hand.forEach((card) => {
  //     if (handSum > 21 && card.card === "A") {
  //       setScore(handSum - 10);
  //     }
  //   });
  // }

  const [name, setName] = useState();

  const handleHighscoreList = () => {
    setName(name);
    setHighScore(highScore);
    const highscoreList = JSON.parse(
      window.localStorage.getItem("highscoreList") || "[]"
    );
    let highscoreArray = {
      name: name,
      score: highScore,
    };

    highscoreList.push(highscoreArray);

    window.localStorage.setItem("highscoreList", JSON.stringify(highscoreList));
  };

  useEffect(() => {
    const names = window.localStorage.getItem("currentUser");
    if (names) {
      setName(names);
    }
  }, []);

  function setNewHighscore(currentHighScore) {
    const userName = window.localStorage.getItem("currentUser");
    window.localStorage.getItem(userName);
    const currentScore = window.localStorage.getItem(userName);
    window.localStorage.setItem(
      userName,
      currentHighScore + parseInt(currentScore)
    );
    setHighScore(currentHighScore + parseInt(currentScore));
  }

  useEffect(() => {
    setNewHighscore(currentHighScore);
  }, [currentHighScore]);

  const dealCards = () => {
    let randomDeck = [];
    let randomCard = Deck[Math.floor(Math.random() * Deck.length)];
    let randomCardTwo = Deck[Math.floor(Math.random() * Deck.length)];
    randomDeck.push(randomCard, randomCardTwo);
    setHand(randomDeck);
    let randomDealerDeck = [];
    let randomDealerCard = Deck[Math.floor(Math.random() * Deck.length)];
    randomDealerDeck.push(randomDealerCard);
    setDealerDeck(randomDealerDeck);
    setMessage("");
    setDealersTurn(false);
    setButton(false);
    setDealButton(true);
  };

  let handSum = calculateScore(hand);
  let dealerHandSum = calculateScore(dealerDeck);

  useEffect(() => {
    setScore(handSum);
    setDealerScore(dealerHandSum);
    // checkAce();
  }, [handSum, dealerHandSum]);

  const handleHit = () => {
    const randomNumber = randomIntFromInterval(0, 51);
    setHand((hand) => [...hand, Deck[randomNumber[0]]]);
    const newPlayerCards = [...hand, Deck[randomNumber[0]]];
    let newHandScore = calculateScore(newPlayerCards);
    console.log(newHandScore);

    for (let i = 0; i < newPlayerCards.length; i++) {
      if (newPlayerCards[i].card === "A" && newHandScore > 21) {
        // newHandScore -= 10;
        setScore((newHandScore -= 10));
        console.log(newHandScore);
      }
      // if (newPlayerCards[i].card === "A") {
      //   newHandScore -= 10;
      //   setScore(newHandScore);
      //   console.log(newHandScore);
      // }
      // setScore(newHandScore);
      // checkAce(newHandScore);
    }
    if (newHandScore > 21) {
      setMessage("You lose!");
      setButton(true);
      setDealButton(false);
    }
  };

  useEffect(() => {
    if (dealersTurn === true) {
      let newDealerCards = dealerDeck;
      let newDealerScore = dealerHandSum;

      if (newDealerScore < 17) {
        const randomNumber = randomIntFromInterval(0, 51);
        newDealerCards = [...dealerDeck, Deck[randomNumber[1]]];
        setDealerDeck((dealerDeck) => [...dealerDeck, Deck[randomNumber[1]]]);
        newDealerScore = calculateScore(newDealerCards);
      }
      if (newDealerScore === 21 || handSum < newDealerScore) {
        setMessage("You lose!");
        setButton(true);
        setDealButton(false);
      }
      if (newDealerScore > 21 || handSum > newDealerScore) {
        setMessage("You win!");
        setButton(true);
        setDealButton(false);
        setCurrentHighScore(score);
      }
      if (newDealerScore === handSum) {
        setMessage("It's a tie!");
        setButton(true);
        setDealButton(false);
      }
    }
  }, [dealersTurn, dealerScore, dealerDeck, dealerHandSum, handSum, score]);

  const handleHold = () => {
    setDealersTurn(true);
  };

  return (
    <>
      <div className="wrapper">
        <div className="player-name-highscore-container">
          <h3 className="player-name-highscore">
            Player: {name} | Highscore: {highScore}
          </h3>
        </div>
        <div className="message-wrapper">
          <h3 className="message-text">{message}</h3>
        </div>
        <div className="gameboard-wrapper">
          <div className="dealer-hand-wrapper">
            <div className="dealer-deck">
              {dealerDeck.map((index, value) => {
                return <Card key={value} image={index.image} />;
              })}
            </div>
            <h2 className="deck-title">Dealer's hand ({dealerScore})</h2>
          </div>
          <div className="button-wrapper">
            <Button
              onClick={dealCards}
              disableBtn={dealButton}
              text="Deal Cards"
            />
            <Button onClick={handleHit} disableBtn={button} text="Hit" />
            <Button onClick={handleHold} disableBtn={button} text="Hold" />
            <Button
              onClick={() => {
                onStartClick();
                handleHighscoreList();
              }}
              text="Highscore"
            />
          </div>
          <div className="your-hand-wrapper">
            <h2 className="deck-title">Your hand ({score})</h2>
            <div className="hand-deck">
              {hand.map((index, value) => {
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
