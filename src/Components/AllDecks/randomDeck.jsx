import Data from "../../data";

export let randomDeck = [];
let randomCard = Data[Math.floor(Math.random() * Data.length)];
let randomCardTwo = Data[Math.floor(Math.random() * Data.length)];
randomDeck.push(randomCard, randomCardTwo);

export let randomDealerDeck = [];
let randomDealerCard = Data[Math.floor(Math.random() * Data.length)];
randomDealerDeck.push(randomDealerCard);

export let deckOfCards = [];
deckOfCards.push(Data);
