import React from 'react';
import './node.css';

export default class Node extends React.Component {
    render(){
        const {
            row,
            col,
            is_start,
            is_finish,
            searched,
            is_wall,
            onMouseDown,
            onMouseUp,
            onMouseEnter
            } = this.props;
        const class_name = is_start ? 'node-start' :
                            is_finish ? 'node-finish' :
                            is_wall ? 'node-wall' : 
                            searched ? 'node-searched' :
                            '';
        return <div
                id={`node ${row} ${col}`}
                className={`node ${class_name}`}
                onMouseDown={() => onMouseDown(row,col)}
                onMouseUp={() => onMouseUp(row,col)}
                onMouseEnter={() => onMouseEnter(row,col)}
                >
                </div>
    }
}