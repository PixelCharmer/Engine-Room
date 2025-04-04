import React from 'react';
import NodeItem from './NodeItem';

export default function Crate({ title, nodes, moveNode, crateId }) {
    return (
        <div className="crate">
            <h2>{title}</h2>
            <div className="node-container">
                {nodes.map(node => (
                    <NodeItem key={node.id} node={node} onMove={moveNode} />
                ))}
            </div>
        </div>
    );
}
