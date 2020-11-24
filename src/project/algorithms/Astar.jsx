export default function a_star(grid,start,end,heuristic=f) {
    const visited = [];
    start.distance = 0;
    const to_visit = grid.flat();
    while (to_visit.length > 0) {
        to_visit.sort((n1,n2) => (heuristic(n1,end)-heuristic(n2,end)));
        const closest = to_visit.shift();
        if (closest.is_wall) continue;
        if (closest.distance === Infinity) return visited;
        closest.searched = true;
        visited.push(closest);
        if (closest === end) return visited;
        update_distances(closest,grid);

    }
}
function update_distances(node,grid) {
    const neighbors = [];
    const {row,col} = node;

    if (row > 0) neighbors.push(grid[row-1][col])
    if (col > 0) neighbors.push(grid[row][col-1])
    if (row < grid.length-1) neighbors.push(grid[row+1][col])
    if (col < grid[0].length-1) neighbors.push(grid[row][col+1])

    let j=0;
    for(let i = 0; i < neighbors.length;i++) {
        const node = neighbors[i];
        if(!node.searched){
            neighbors[j] = node;
            j++;
        }
    }
    neighbors.length = j;
    for(let i = 0;i<neighbors.length;i++) {
        const neighbor = neighbors[i];
        neighbor.distance = node.distance + 1;
        neighbor.previous = node;
    }
}
/*
Current heuristic: Manhattan distance
Feel free to change it however you like!
*/
function heuristic(node,endNode) {
    return Math.abs(node.row-endNode.row) + Math.abs(node.col-endNode.col);
}
function f(node,endNode){
    return node.distance + heuristic(node,endNode);
}