import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from 'socket.io-client';


const WaitingRoom = () => {
    const { battleId } = useParams();
    const [opponentJoined, setOpponentJoined] = useState(false);
    const [opponentUsername, setOpponentUsername] = useState(''); // State to hold opponent's username
    const [countdown, setCountdown] = useState(100); // Initialize countdown timer with 15 seconds

    const navigate = useNavigate();
    const username = localStorage.getItem('username');


    // Initialize Socket.io client
    const socket = io('http://localhost:5000', {
        transports: ['polling', 'websocket'] // Use polling and fall back to WebSocket
    });
    
    useEffect(() => {
        console.log("Connecting to socket...");


        socket.emit('join_waiting_room', { battle_id: battleId, username });
            

        console.log("I'm abovee set Ineerval Function")
        const interval = setInterval(() => {
            socket.emit('get_opponent_info', { battle_id: battleId });
        }, 1000); // Polling every second
        
        console.log("I'm abovee Opponent Info Function")
        //Not working
        socket.on('opponent_info', (data) => {
            console.log("Received opponent info:", data);
            console.log("hello");
            setOpponentUsername(data.opponent_username);
            setOpponentJoined(true);
        });
        
        console.log("I'm abovee STart countdown Function")
        socket.on('start_countdown', (data) => {
            console.log("Countdown started:", data);
            setCountdown(data.countdown);
        });
        
        console.log("I'm abovee countdown Interval Function")
        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    navigate(`/quiz/${battleId}`);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => {
            clearInterval(countdownInterval);
            clearInterval(interval);
            socket.off('opponent_info');
            socket.disconnect();
        };
    }, [battleId, username, navigate]);

    

    useEffect(() => {
        // Poll the server every 5 seconds to check if the opponent has joined
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/check_battle_status/${battleId}`);
                const { status } = response.data;

                if (status === 'discarded') {
                    clearInterval(interval);
                    alert('No one joined the battle. The battle was discarded.');
                    navigate('/');
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    clearInterval(interval);
                    alert('No one joined the battle. The battle was discarded.');
                    navigate('/createbattle');
                } else {
                    console.error('Error checking battle status:', error);
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [battleId, navigate]);

    return (
        <div className='max-w-screen h-[42vw]'>
            <h2 className="leading-[5vw] flex flex-row gap-[1vw] justify-center items-center text-[5vw] w-full font-bold text-[#3565EC]">
                Waiting<span className='text-yellow-500'>Lobby</span>
            </h2>
            <div className='h-[20vw] w-[80%] mx-auto flex justify-center pt-[5vw] gap-[3vw]'>
                <div className='flex flex-col items-center gap-[0.5vw]'>
                    <img className='h-[15vw] rounded-full' src='https://github.com/shadcn.png' alt='User Avatar' />
                    <h2 className='font-bold text-[2vw]'>@{username}</h2>
                </div>
                <div>
                    <img className='h-[15vw] rounded-full' src='https://res.cloudinary.com/dbqc2qimw/image/upload/v1727190107/ggwvbsriyhw9gxshhp0v.png' alt='Opponent Avatar' />
                </div>
                <div className='flex flex-col items-center gap-[0.5vw]'>
                    <img className='h-[15vw] rounded-full' src='https://github.com/shadcn.png' alt='Opponent Avatar' />
                    {opponentJoined ? (
                        <h2 className='font-bold text-[2vw] w-[70%] text-center'>Opponent @{opponentUsername} Joined!</h2>
                    ) : (
                        <h2 className='font-bold text-[2vw] w-[70%] text-center'>Opponent</h2>
                    )}
                </div>
            </div>
            
            <div className=''>
                Timer: {countdown} seconds
            </div>
        </div>
    );
};

export default WaitingRoom;
