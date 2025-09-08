const directions = [
  [1, 0], [-1, 0], [0, 1], [0, -1] // baixo, cima, direita, esquerda
];

// 🔹 Função para localizar início/fim
const findPoint = (grid, value) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === value) return [i, j];
    }
  }
  return null;
};

// 🔹 BFS recebe grid e size como parâmetros
const bfs = (grid, size) => {
  const start = findPoint(grid, 2);
  const end = findPoint(grid, 3);
  if (!start || !end) return null;

  const queue = [start];
  const visited = new Set([start.toString()]);
  const parent = {};

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    if (x === end[0] && y === end[1]) {
      let path = [];
      let cur = end.toString();
      while (cur) {
        const [px, py] = cur.split(",").map(Number);
        path.push([px, py]);
        cur = parent[cur];
      }
      return path.reverse();
    }

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 && nx < size &&
        ny >= 0 && ny < size &&
        grid[nx][ny] !== 1 &&
        !visited.has([nx, ny].toString())
      ) {
        queue.push([nx, ny]);
        visited.add([nx, ny].toString());
        parent[[nx, ny]] = [x, y].toString();
      }
    }
  }

  return null;
};

const findPath = (grid, setGrid, size) => {
  const path = bfs(grid, size);
  if (!path) {
    alert("Nenhum caminho encontrado!");
    return;
  }

  const newGrid = grid.map((r) => [...r]);
  for (const [x, y] of path) {
    if (newGrid[x][y] === 0) newGrid[x][y] = 4;
  }
  setGrid(newGrid);
};

export default {
  bfs,
  findPath,
};
