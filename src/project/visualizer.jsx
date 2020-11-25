/* eslint-disable no-extend-native */
import React from 'react';

import './visualizer.css';

import Node from './node/node.jsx';

/*
handled by constants ALGO
import a_star from './algorithms/Astar.jsx';
import djikstras from './algorithms/Djikstras.jsx';
*/

import {ROWS, COLS,
        START_ROW,START_COL,
        FINISH_ROW,FINISH_COL,new_node,ALGOS}
        from './constants.jsx';
/* ME TRYING TO FIGURE OUT HOW TO MAKE A DROPDOWN MENU
class Dropdown extends React.Component {
    render() {
        return (
            <div class='navbar navbar-inverse'>
                <nav>
                    <div class='container-fluid'>
                        <div>
                            <a id='refreshButton' class='navbar-brand' href='/#'>Pathfinding Visualizer</a>
                        </div>
                        <ul class='nav navbar-nav'>
                            <li class='dropdown'>
                                <a class='dropdown-toggle' data-toggle='dropdown' href='/#'> Algorithms <span class='caret'></span></a>
                                <ul class='dropdown-menu'>
                                    <li id='Dijkstra'><a href='/#'>Dijkstra's Algorithm</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }
}*/

export default class Visualizer extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            nodes: initiate_nodes(),
            mouse_press: false,
            reset_id: 0,
            pathfinding: false
        }
    }
    componentDidMount() {
        const nodes = initiate_nodes();
        this.setState({nodes: nodes, mouse_press: false,count: 0})
    }
    /*
    Handles to toggle mouse press for selecting wall tiles
    */
    handleMouseDown(row,col) {
        this.setState({nodes: new_wall(this.state.nodes,row,col),mouse_press: true})
    }
    handleMouseUp(row,col) {
        this.setState({mouse_press: false})
    }
    handleMouseOver(row,col) {
        if (this.state.mouse_press) {
            this.setState({nodes: new_wall(this.state.nodes,row,col)})
        }
    }

    reset() {
        const {reset_id,pathfinding} = this.state
        if(pathfinding) {
            /*do stuff*/
            return
        }
        this.setState({nodes: initiate_nodes(),reset_id: reset_id+1});
    }
    render() {
        const {nodes,reset_id} = this.state
        return (
            <div key={reset_id + 'd'}>
                <button onClick={ () => this.pathfind()}>Start it up!</button>
                <br/>
                <button onClick = { () => this.reset()}>Reset the board</button>
                <br/>
                Algorithm:&nbsp;&nbsp;
                <select name="algorithm" id="algorithm">
                    {/*<option value={0} defaultValue>A* Search</option>
                    <option value={1}>Djikstra's</option>*/}
                    {Object.entries(ALGOS).map(([k,v]) => {
                        return (
                            <option value={k} key={k}>{v[1]}</option>
                        )
                    })}
                </select>
                <div className='grid' key={reset_id}>
                    {nodes.map((row,row_idx) => {
                        return <div key={row_idx}>
                            {row.map((node,node_idx) => {
                                const {row,col,is_start,is_finish,is_wall,searched, distance} = node;
                                return (
                                <Node 
                                    key={node_idx + 'hello' + reset_id}
                                    row={row}
                                    col={col}
                                    is_start = {is_start}
                                    is_finish = {is_finish}
                                    is_wall = {is_wall}
                                    searched = {searched}
                                    distance = {distance}
                                    onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                    onMouseOver={(row, col) => this.handleMouseOver(row, col)}
                                    onMouseUp={(row,col) => this.handleMouseUp(row,col)}
                                    >
                                </Node>)
                                })
                            }
                        </div>

                    })}
                </div>
            </div>
        )
    }
    /*
    Main pathfind function
    will start up a certain pathfinding algorithm based on dropdown selection, but has not been implemented yet
    */
    pathfind() {
        this.setState({pathfinding: true})
        const {nodes} = this.state;
        const start = nodes[START_ROW][START_COL];
        const end = nodes[FINISH_ROW][FINISH_COL];

        const algo = ALGOS[document.getElementById('algorithm').value][0];
        const visited = algo(nodes,start,end);
        const path = this.get_shortest_path();

        this.animate_algorithm(visited, path);
    }
    animate_algorithm(visited,path){
        visited.shift();
        for (let i = 0; i < visited.length; i++) {
            if (i === visited.length-1){
                setTimeout(() => {
                    this.animate_shortest_path(path)
                }, 8*i)
                return;
            }
            const node = visited[i];
            setTimeout(() => { document.getElementById(`node ${node.row} ${node.col}`).className = 'node node-searched' }, 8 * i);
        }
    }
    animate_shortest_path(path) {
        for(let i = 0;i<=path.length;i++){
            
            if(i === path.length){
                setTimeout(() => this.setState({pathfinding: false}), 20 * i)
                return;
            }
            const node = path[i];
            setTimeout(() => document.getElementById(`node ${node.row} ${node.col}`).className = 'node node-shortest-path', 20 * i)
        }
    }
    get_shortest_path = () => {
        const {nodes} = this.state;
        const res = [];
        var last = nodes[FINISH_ROW][FINISH_COL].previous;
        while (last.previous !== null) {
            res.unshift(last);
            last = last.previous;
        }
        return res;
    }
}

const initiate_nodes = () => {
    const nodes = [];
    for (let i = 0; i < ROWS; i++) {
        const row = [];
        for (let j = 0; j < COLS; j++) {
            const node = {...new_node,row:i,col:j};
            row.push(node);
        }
        nodes.push(row);
    }
    nodes[START_ROW].splice(START_COL,1,{...new_node,
                                            row: START_ROW,
                                            col:START_COL,
                                            is_start: true})
    nodes[FINISH_ROW].splice(FINISH_COL, 1, {...new_node,
                                                row: FINISH_ROW,
                                                col: FINISH_COL,
                                                is_finish:true,})
    return nodes;
}

const new_wall = (grid,row,col) => {
    const res = grid.slice();
    const node = res[row][col];
    res[row][col] = {...node,searched: false,is_wall: !node.is_wall};
    return res;
}