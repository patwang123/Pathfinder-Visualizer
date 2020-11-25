import React from 'react';
import './node.css';

export default class Node extends React.Component {
    render(){
        const {
            row,
            col,
            is_start,
            is_finish,
            is_wall,
            onMouseDown,
            onMouseOver,
            onMouseUp,
            } = this.props;
        const class_name = is_start ? 'node-start' :
                            is_finish ? 'node-finish' :
                            is_wall ? 'node-wall' : 
                            'node-basic';
        return <div
                id={`node ${row} ${col}`}
                className={`node ${class_name}`}
                onMouseDown={() => onMouseDown(row,col)}
                onMouseOver={() => onMouseOver(row,col)}
                onMouseUp={() => onMouseUp(row,col)}
                >
                </div>
    }
}