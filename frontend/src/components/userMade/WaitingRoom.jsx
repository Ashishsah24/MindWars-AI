import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const WaitingRoom = () => {
    const { battleId } = useParams();
    const [opponentJoined, setOpponentJoined] = useState(false);
    const [battleStatus, setBattleStatus] = useState('waiting_for_opponent');
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    useEffect(() => {
        // Poll the server every 5 seconds to check if the opponent has joined
        const interval = setInterval(async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/check_battle_status/${battleId}`);
                const { status, opponentJoined: opponentStatus } = response.data;
        
                setBattleStatus(status);
        
                if (opponentStatus) {
                    setOpponentJoined(true);
                    clearInterval(interval);
                }
        
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

        // Cleanup function to remove the battle when the component unmounts
        return () => {
            clearInterval(interval);
            // Call the API to delete or update the battle status
            axios.delete(`http://localhost:5000/api/battles/${battleId}`)  // Adjust API endpoint as needed
                .then(response => {
                    console.log('Battle discarded:', response.data);
                })
                .catch(error => {
                    console.error('Error discarding battle:', error);
                });
        };
    }, [battleId, navigate]);

    return (
        <div className='max-w-screen h-[42vw]'>

<h2 className="leading-[5vw] flex flex-row gap-[1vw] justify-center items-center text-[5vw] w-full font-bold text-[#3565EC]">Waiting<span className='text-yellow-500'>Lobby</span></h2>

            <div className='h-[20vw] w-[80%] mx-auto flex justify-center pt-[5vw] gap-[3vw]'>
            
                <div className='flex flex-col items-center gap-[0.5vw]'>
                <img className='h-[15vw] rounded-full' src='https://github.com/shadcn.png' alt='User Avatar' />
                <h2 className='font-bold text-[2vw] '>@{username}</h2>
                </div>
                <div>

                <img className='h-[15vw] rounded-full' src='https://res.cloudinary.com/dbqc2qimw/image/upload/v1727190107/ggwvbsriyhw9gxshhp0v.png' alt='User Avatar' />
                </div>

                <div className='flex flex-col items-center gap-[0.5vw]'>
                <img className='h-[15vw] rounded-full' src='https://github.com/shadcn.png' alt='User Avatar' />
                {opponentJoined ? (
                    <h2 className='font-bold text-[2vw] w-[70%] text-center'>@{Opponentusername}</h2>
                ) : (
                    
                <h2 className='font-bold text-[2vw] w-[70%] text-center'>"Waiting for Opponent{username}</h2>
                )}
                </div>
            </div>
            
            <div className=''>
                Timer:
            </div>
            <p>Creator: {username}</p>
            {opponentJoined ? (
                <p>Opponent has joined! Get ready for the battle!</p>
            ) : (
                <p>Waiting for an opponent to join...</p>
            )}
            <p>Battle Status: {battleStatus}</p>
        </div>
    );
};

export default WaitingRoom;
