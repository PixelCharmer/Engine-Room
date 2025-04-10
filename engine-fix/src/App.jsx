import React from 'react';
import GameBoard from './components/GameBoard';
import './styles.css';

function App() {
    return (
        <div className="app">
            <h1>Engineering Bay - Balance the Engine</h1>
            <GameBoard />
        </div>
    );
}

export default App;
