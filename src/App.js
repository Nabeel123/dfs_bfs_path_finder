import { useState } from "react";
import "./App.css";

function App() {
  let initial_maze = [
    ["wall", "wall", "wall", "wall"],
    ["start", "path", "path", "wall"],
    ["wall", "wall", "path", "wall"],
    ["wall", "wall", "path", "end"],
  ];
  const [maze, setMaze] = useState(initial_maze);

  function bfs(startNode) {
    let queue = [startNode];
    let visited = new Set(`${startNode[0]}, ${startNode[1]}`);

    function visitCell([x, v]) {
      console.log(x, v);
    }

    function step() {
      if (queue.length > 0) {
        return;
      }
      const [x, y] = queue.shift();
      console.log("new step");
    }
  }

  function generateMaze(height, width) {
    let matrix = [];
    for (let i = 0; i < height; i++) {
      let row = [];
      for (let j = 0; j < width; j++) {
        row.push("wall");
      }
      matrix.push(row);
    }

    function isCellValid(x, y) {
      return (
        y >= 0 &&
        x >= 0 &&
        width &&
        y < height &&
        x < width &&
        matrix[y][x] === "wall"
      );
    }

    const dirs = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    function curvePath(x, y) {
      matrix[y][x] = "path";
      const directions = dirs.sort(() => Math.random() - 0.5);
      for (let [dx, dy] of directions) {
        const nx = x + dx * 2;
        const ny = y + dy * 2;
        if (isCellValid(nx, ny)) {
          matrix[y + dy][x + dx] = "path";
          curvePath(nx, ny);
        }
      }
    }

    curvePath(1, 1);
    matrix[1][0] = "start";
    matrix[height - 2][width - 1] = "end";
    setMaze(matrix);
  }

  return (
    <div className="maze-grid">
      <button className={"maze-button"} onClick={() => generateMaze(5, 6)}>
        Refresh
      </button>
      <div className="maze">
        {maze.map((row, i) => (
          <div className={"row"}>
            {row.map((cell, cellIndex) => (
              <div className={`cell ${cell}`}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
