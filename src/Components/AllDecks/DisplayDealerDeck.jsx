import React from "react";
import Card from "../Cards/Card";
import { randomDealerDeck } from "./randomDeck";

const DisplayDealerDeck = () => {
  return (
    <>
      {randomDealerDeck.map((index, value) => {
        return <Card key={value} card={index.card} suits={index.suits} />;
      })}
    </>
  );
};

export default DisplayDealerDeck;
