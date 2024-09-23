import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WaitingRoom = () => {
    const { battleId } = useParams();
    const [opponentJoined, setOpponentJoined] = useState(false);

    useEffect(() => {
        // Poll the server or set up a socket connection to listen for opponent joining

        // Example: Check for opponent every few seconds
        const interval = setInterval(() => {
            // Call API to check if opponent has joined
            // If joined, update the state
        }, 5000);

        return () => clearInterval(interval);
    }, [battleId]);

    return (
        <div>
            <h1>Waiting for an Opponent</h1>
            <p>Creator: {localStorage.getItem('username')}</p>
            {opponentJoined ? (
                <p>Opponent has joined!</p>
            ) : (
                <p>Waiting for an opponent to join...</p>
            )}
        </div>
    );
};

export default WaitingRoom;
