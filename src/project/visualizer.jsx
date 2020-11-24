import React from 'react';
import './visualizer.css';
import Node from './node/node.jsx'

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
            nodes: []
        }
    }
    componentDidMount() {
        const nodes = [];
        for(let i = 0;i<15;i++){
            const row = [];
            for (let j = 0; j<50; j++){
                const node = {
                    is_start: false,
                    row:i,
                    col:j,
                    is_finish: false,
                    searched: true,
                    dist: Infinity};
                row.push(node);
            }
            nodes.push(row);
        }
        this.setState({nodes});
    }

    render() {
        const {nodes} = this.state
        return (
            <div className='grid'>
                {nodes.map((row,row_idx) => {
                    return <div key={row_idx}>
                        {row.map((node,node_idx) => {
                            const {row,col,is_start,is_finish,searched} = node;
                            return (
                            <Node 
                                key={node_idx}
                                row={row}
                                col={col}
                                is_start = {is_start}
                                is_finish = {is_finish}
                                searched = {searched}
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