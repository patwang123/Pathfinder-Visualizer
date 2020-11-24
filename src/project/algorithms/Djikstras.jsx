import a_star from './Astar.jsx';
export default function djikstras(grid,start,end,heuristic=f){
    return a_star(grid,start,end,f);
}

function f(node) {
    return node.distance;
}