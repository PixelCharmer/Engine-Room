import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { motion } from 'framer-motion';

const nodes = [
    { id: 'node1', weight: 2, image: '/images/node1.png' },
    { id: 'node2', weight: 4, image: '/images/node2.png' },
    { id: 'node3', weight: 3, image: '/images/node3.png' },
    { id: 'node4', weight: 5, image: '/images/node4.png' },
    { id: 'node5', weight: 2, image: '/images/node5.png' },
    { id: 'node6', weight: 6, image: '/images/node6.png' },
    { id: 'node7', weight: 3, image: '/images/node7.png' },
    { id: 'node8', weight: 5, image: '/images/node8.png' },
];

export default function GameBoard() {
    const [crateA, setCrateA] = useState([]);
    const [crateB, setCrateB] = useState([]);
    const [unassigned, setUnassigned] = useState(nodes);

    const resetGame = () => {
        setUnassigned(nodes);
        setCrateA([]);
        setCrateB([]);
    };

    const handleDrop = (event, crateSetter, crateState) => {
        const nodeId = event.active.id;
        const node = unassigned.find(n => n.id === nodeId)
            || crateA.find(n => n.id === nodeId)
            || crateB.find(n => n.id === nodeId);

        if (!node) return;

        // Remove from all
        setCrateA(prev => prev.filter(n => n.id !== nodeId));
        setCrateB(prev => prev.filter(n => n.id !== nodeId));
        setUnassigned(prev => prev.filter(n => n.id !== nodeId));

        crateSetter([...crateState, node]);
    };

    const Crate = ({ items, setItems, title }) => {
        const { setNodeRef } = useDroppable({ id: title });
        const totalWeight = items.reduce((sum, node) => sum + node.weight, 0);

        return (
            <motion.div
                ref={setNodeRef}
                className="crate"
                initial={{ rotate: 0 }}
                animate={{ rotate: totalWeight * 2 }}
            >
                <h3>{title} (Weight: {totalWeight})</h3>
                <div className="crate-items">
                    {items.map(item => (
                        <DraggableNode key={item.id} node={item} />
                    ))}
                </div>
            </motion.div>
        );
    };

    const DraggableNode = ({ node }) => {
        const { attributes, listeners, setNodeRef, transform } = useDraggable({
            id: node.id,
        });

        const style = transform
            ? {
                transform: `translate(${transform.x}px, ${transform.y}px)`,
            }
            : undefined;

        return (
            <img
                ref={setNodeRef}
                {...listeners}
                {...attributes}
                style={{ ...style, width: 50, margin: 5 }}
                src={node.image}
                alt={node.id}
            />
        );
    };

    const handleSubmit = () => {
        const totalWeightA = crateA.reduce((sum, node) => sum + node.weight, 0);
        const totalWeightB = crateB.reduce((sum, node) => sum + node.weight, 0);
        const totalUsed = crateA.length + crateB.length;

        if (totalUsed !== 8) {
            alert('You must use exactly 8 nodes!');
        } else if (totalWeightA !== totalWeightB) {
            alert('The crates are unbalanced! Try again.');
        } else {
            alert('Success! The warp core access code is: 80302');
        }
    };

    return (
        <DndContext
            onDragEnd={(event) => {
                const over = event.over?.id;
                if (over === 'Crate A') handleDrop(event, setCrateA, crateA);
                else if (over === 'Crate B') handleDrop(event, setCrateB, crateB);
                else {
                    // put back into unassigned
                    const nodeId = event.active.id;
                    const node =
                        crateA.find(n => n.id === nodeId) || crateB.find(n => n.id === nodeId);
                    if (node) setUnassigned(prev => [...prev, node]);
                    setCrateA(prev => prev.filter(n => n.id !== nodeId));
                    setCrateB(prev => prev.filter(n => n.id !== nodeId));
                }
            }}
        >
            <div className="game-wrapper">
                <div className="game-board">
                    <h2>The Engineering Bay - Fixing the Engine</h2>
                    <div className="crates-container">
                        <Crate items={crateA} setItems={setCrateA} title="Crate A" />
                        <Crate items={crateB} setItems={setCrateB} title="Crate B" />
                    </div>
                    <h4>Available Nodes</h4>
                    <div className="unassigned">
                        {unassigned.map(node => (
                            <DraggableNode key={node.id} node={node} />
                        ))}
                    </div>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={resetGame}>Reset</button>
                </div>
            </div>
        </DndContext>
    );
}
