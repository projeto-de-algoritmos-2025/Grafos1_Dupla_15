import { useState } from "react";
import labirintoController from "./controller.js"
import "./App.css";

export default function App() {
  const size = 20; // tamanho da grade (20x20)
  const [grid, setGrid] = useState(
    Array.from({ length: size }, () => Array(size).fill(0))
  );

  const [mode, setMode] = useState("wall"); 
  // "wall" = parede, "start" = início, "end" = fim

  const handleClick = (row, col) => {
    const newGrid = grid.map((r) => [...r]); // cópia profunda

    if (mode === "wall") {
      newGrid[row][col] = newGrid[row][col] === 1 ? 0 : 1; // alterna parede
    } else if (mode === "start") {
      // limpa outro ponto de início
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (newGrid[i][j] === 2) newGrid[i][j] = 0;
        }
      }
      newGrid[row][col] = 2;
    } else if (mode === "end") {
      // limpa outro ponto de fim
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          if (newGrid[i][j] === 3) newGrid[i][j] = 0;
        }
      }
      newGrid[row][col] = 3;
    }

    setGrid(newGrid);
  };

  // 🔹 Gera labirinto aleatório
  const generateRandomMaze = () => {
    const newGrid = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => (Math.random() < 0.3 ? 1 : 0)) // 30% chance de parede
    );
    setGrid(newGrid);
  };

  return (
    <div className="app">
      <h1 style={{ marginBottom: "3vh" }}>Construtor de Labirinto</h1>

      <div style={{ marginBottom: "2vh" }}>
        <button onClick={() => setMode("wall")}>Parede</button>
        <button onClick={() => setMode("start")}>Início (verde)</button>
        <button onClick={() => setMode("end")}>Fim (vermelho)</button>
        <button onClick={generateRandomMaze}>Gerar Labirinto Aleatório</button>
        <button onClick={() => labirintoController.findPath(grid, setGrid, size)}>
          Encontrar Caminho
        </button>
      </div>

      <div className="grid">
        {grid.map((row, i) =>
          row.map((cell, j) => (
            <div
              key={`${i}-${j}`}
              className={`cell ${
                cell === 1 ? "wall"
                : cell === 2 ? "start"
                : cell === 3 ? "end"
                : cell === 4 ? "pathFound"
                : "path"
              }`}
              onClick={() => handleClick(i, j)}
            />
          ))
        )}
      </div>
    </div>
  );
}
