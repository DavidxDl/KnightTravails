const boardSize = 8

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

function knightTraveils([startX, startY], [targetX, targetY]) {
    const knight = new Knight();
    const queue = [[startX, startY]];
    const visited = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));
    visited[startX][startY] = true;
    
    const paths = {}; // Use an object to store the path to each position

    while (queue.length > 0) {
        const [currentX, currentY] = queue.shift();
        if (currentX === targetX && currentY === targetY) {
            // Reconstruct the path from the target position to the starting position
            const path = [];
            let x = targetX, y = targetY;
            while (x !== startX || y !== startY) {
                path.unshift([x, y]);
                const [prevX, prevY] = paths[`${x}-${y}`];
                x = prevX;
                y = prevY;
            }
            path.unshift([startX, startY]);

            //output results
            console.log(`You Made it in ${path.length -1} moves! Here's your path:`);
            for (const move of path) {
                console.log(move)
            }
            return
        }

        const validMoves = knight.getLegalMoves(currentX, currentY);

        for (const [newX, newY] of validMoves) {
            if (!visited[newX][newY]) {
                visited[newX][newY] = true;
                queue.push([newX, newY]);
                paths[`${newX}-${newY}`] = [currentX, currentY]; // Store the previous position
            }
        }
    }

    // If no path is found, return an empty array or some other value to indicate failure.
    return [];
}



