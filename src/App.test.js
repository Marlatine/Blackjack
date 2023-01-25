import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import GameBoard from "./Components/GameBoard/GameBoard";

test("renders learn react link", () => {
  render(<GameBoard onStartClick={() => console.log("highscore")} />);
  const linkElement = screen.getByText("Deal Cards");
  expect(linkElement).toBeInTheDocument();
});
