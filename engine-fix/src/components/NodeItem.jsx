import React from 'react';

export default function NodeItem({ node, onMove }) {
    return (
        <div className="node-item">
            <img src={node.image} alt={`Node ${node.id}`} />
            <div className="node-controls">
                <button onClick={() => onMove(node, 'A')}>To A</button>
                <button onClick={() => onMove(node, 'B')}>To B</button>
                <button onClick={() => onMove(node, 'U')}>Back</button>
            </div>
        </div>
    );
}
