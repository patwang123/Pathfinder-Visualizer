export function djikstras(grid,start,end) {
    const visited = [];
    start.distance = 0;
    const to_visit = grid.flat();
    while (to_visit.length > 0) {
        to_visit.sort((n1,n2) => n1.distance-n2.distance);
        const closest = to_visit.shift();
        if (closest.is_wall) continue;
        if (closest.distance === Infinity) return visited;
        closest.searched = true;
        visited.push(closest);
        if (closest === end) return visited;
        
    }
}
