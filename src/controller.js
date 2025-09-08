const directions = [
  [1, 0], 
  [-1, 0],
  [0, 1], 
  [0, -1] // baixo, cima, direita, esquerda
];

//Função para localizar início/fim
const findPoint = (grid, value) => {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === value) return [i, j];
    }
  }
  return null;
};

//BFS recebe grid e size como parâmetros

/*
  A ideia por trás dessa bfs é um pouco diferente. É mais 
  parecida com o FLOOD FILL por considerar o grafo como implícito.
  Ela sempre vai ter um ponto inicial que é o marcado pelo
  usuário. Por isso "findPoint(grid, 2);" que é a marcação 
  de início.

  A partir do ponto inicial, a busca começa vendo em quais direções
  é possível seguir e vai adicionando o nó do qual se sai como parent
  pra guardar o caminho. A movimentação é feita adicionando 1 no eixo x
  ouu y dependendo se o caminho é ou não uma parede. Se a busca conseguir
  chegar no fim, ela retornará um o vetor de pontos [x,y] que foi salvo no 
  parent só que invertido pra conseguir fazer o caminho de volta colorindo.
  E se a busca não conseguir a partir do ponto inicial chegar no ponto final,
  então o labirinto é sem solução e a busca retorna null.

  OBS: O vetor parent é invertido só porque quando adiciona o pŕoximo nó que 
  foi visitado nele, ele é adicionado na frente do anterior.
*/
const bfs = (grid, size) => {
  const start = findPoint(grid, 2);
  const end = findPoint(grid, 3);

  if (!start || !end) return null; //Se nem o início nem o fim foram marcados, não tem como achar o caminho

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
