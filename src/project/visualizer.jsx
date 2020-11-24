/* eslint-disable no-extend-native */
import React from 'react';
import './visualizer.css';
import Node from './node/node.jsx';
import a_star from './algorithms/Astar.jsx';
import {ROWS, COLS,
        START_ROW,START_COL,
        FINISH_ROW,FINISH_COL,new_node}
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
            nodes: [],
            mouse_press: false
        }
    }
    componentDidMount() {
        
        this.setState({nodes: initiate_nodes()});
    }

    handleMouseDown(row,col) {
        this.setState({nodes: new_wall(this.state.nodes,row,col),mouse_press: true})
    }
    handleMouseUp(row,col) {
        this.setState({mouse_press: false})
    }
    handleMouseEnter(row,col) {
        if (this.state.mouse_press) {
            this.setState({nodes: new_wall(this.state.nodes,row,col)})
        }
    }
    render() {
        const {nodes} = this.state
        return (
            <div className='grid'>
                {nodes.map((row,row_idx) => {
                    return <div key={row_idx}>
                        {row.map((node,node_idx) => {
                            const {row,col,is_start,is_finish,is_wall,searched} = node;
                            return (
                            <Node 
                                key={node_idx}
                                row={row}
                                col={col}
                                is_start = {is_start}
                                is_finish = {is_finish}
                                is_wall = {is_wall}
                                searched = {searched}
                                onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                                onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                                onMouseUp={(row,col) => this.handleMouseUp(row,col)}
                                >
                            </Node>)
                            })
                        }
                    </div>

                })}
            </div>
        )
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
    console.log(grid);
    const res = grid.slice();
    const node = res[row][col];
    res[row][col] = {...node,is_wall: !node.is_wall};
    return res;
}

Array.prototype.get_shortest_path = () => {
    const self = this;
    const res = [];
    var last = self[FINISH_ROW][FINISH_COL]
    while (last.previous !== null) {
        res.unshift(last);
        last = last.previous;
    }
    return res;
}