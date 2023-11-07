const boardSize = 8;
class Knight {
    constructor() {
        this.possibleMoves = [
            [-2, -1], [-2, 1],
            [-1, -2], [-1, 2],
            [1, -2], [1, 2],
            [2, -1], [2, 1]
        ];
    }

    getLegalMoves(currentX, currentY) {
        const validMoves = [];
        for (const [possibleX, possibleY] of this.possibleMoves) {
            const newX = currentX + possibleX;
            const newY = currentY + possibleY;
            if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
                validMoves.push([newX, newY]);
            }
        }
        return validMoves;
    }
}

function createChessboardGraph(boardSize) {
    const graph = new Map();
    const knight = new Knight();
    for (let x = 0; x < boardSize; x++) {
        for (let y = 0; y < boardSize; y++) {
            const node = `${[x, y]}`;
            graph.set(node, knight.getLegalMoves(x, y));
        }
    }
    return graph;
}

function findFastestRoute([startX, startY], [targetX, targetY]) {
    const boardSize = 8;
    const graph = createChessboardGraph(boardSize);

    const startNode = [startX, startY];
    const targetNode = [targetX, targetY];

    const visited = new Set();
    const queue = [[startNode]];
    visited.add(startNode);

    while (queue.length > 0) {
        const path = queue.shift();
        const currentNode = path[path.length - 1];

        if (currentNode[0] === targetNode[0] && currentNode[1] === targetNode[1]) {
            return path;
        }

        for (const neighbor of graph.get(`${currentNode}`)) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                const newPath = path.slice(); // Clone the path array
                newPath.push(neighbor);
                queue.push(newPath);
            }
        }
    }

    return [];
}

// Usage:
const startX = 0;
const startY = 0;
const targetX = 2;
const targetY = 1;
const path = findFastestRoute([startX, startY], [targetX, targetY]);
console.log("Fastest path:", path);
