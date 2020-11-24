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
            } = this.props;
        const classNames = is_start ? 'node-start' :
                            is_finish ? 'node-finish' :
                            searched ? 'node-searched' :
                            '';
        return <div
                id={`node ${row} ${col}`}
                className={`node ${classNames}`}>
                </div>
    }
}