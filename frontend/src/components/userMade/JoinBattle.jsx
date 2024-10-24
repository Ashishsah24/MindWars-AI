import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input";
import { TbRefresh } from "react-icons/tb";
import React, { useEffect, useState } from 'react';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IoTimerOutline } from "react-icons/io5";
import axios from 'axios';

import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { io } from 'socket.io-client';



const JoinBattle = () => {
    const [battles, setBattles] = useState([]);
    const navigate = useNavigate();
    
    const socket = io('http://localhost:5000');
    
    // Save opponent's username
    // Fetch battles from API
    useEffect(() => {
        const fetchBattles = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/battles');
                setBattles(response.data);
            } catch (error) {
                console.error('Error fetching battles:', error);
            }
        };

        fetchBattles();
    }, []);


    const notify = () => toast("Page refreshed!");
    const handleRefreshButton = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/battles');
            setBattles(response.data);
            notify();
        } catch (error) {
            console.error('Error fetching battles:', error);
        }
    }

    const handleBackButton = () => {
        navigate('/battlepage');
    }

    // Function to handle joining a battle
    const handleJoinBattle = async (battleId) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/join_battle/${battleId}`, { username: localStorage.getItem('username') });
            
            // Correct the console log to use the string 'username'
    
            if (response.status === 200) {

                socket.emit('join_waiting_room', {
                    battle_id: battleId,
                    username: localStorage.getItem('Opponentusername')
                });

                socket.on('matchmaking_started', () => {
                    // Navigate to the battle page once matchmaking starts
                    navigate(`/waiting-room/${battleId}`);
                });
                
            }
        } catch (error) {
            console.error('Error joining battle:', error);
            toast.error('Failed to join battle! Please try again.');
        }
    };
    
    

    return (
        <div className="max-w-screen">
            <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <div className='flex h-[42vw]'>
                <div className='w-[50%] h-full relative'>
                    <div onClick={handleBackButton} className='p-4 active:scale-105 rounded-full transition-all hoverease-in duration-150 hover:bg-gray-100 text-[2vw] absolute'><BiArrowBack /></div>
                    <div className='h-full justify-center flex flex-col items-center'>
                        <h2 className="leading-[5vw] flex flex-col justify-center items-center text-[5vw] w-full font-bold text-[#3565EC]">Join the <span className='text-yellow-500'>Battle Arena.</span></h2>
                        <p className='text-[1.5vw] font-semibold w-[65%] text-center'>Step into the action! Join your friends' quiz battles and prove your skills!</p>
                    </div>
                </div>

                <div className='w-[50%] flex justify-center'>
                    <Card className='w-[80%] py-[1vw] border-none drop-shadow-none m-5 '>
                        <CardHeader>
                            <div className='flex justify-between items-center'>
                                <CardTitle className='text-[2vw]'>Active Battles to Join</CardTitle>
                                <TbRefresh onClick={handleRefreshButton} className='text-[2vw] active:scale-[0.9] rounded-full hover:bg-gray-100 p-1' />
                            </div>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            {battles && battles.length > 0 ? (
                                battles.map((battle, index) => (
                                    <Card key={index} className='flex flex-col p-[1vw] mb-[1vw]'>
                                        <div className='flex justify-end'>
                                            <div className='flex font-bold items-center justify-center'>
                                                <IoTimerOutline className='' />
                                                <h2>{battle.time || 'Time'}</h2>
                                            </div>
                                        </div>
                                        <div className='flex gap-[1vw] font-bold flex-row'>
                                            <div>
                                                <img className='h-[5vw]' src='./images/username.png' alt='User Avatar' />
                                                <h2>@{battle.username}</h2>
                                            </div>
                                            <div>
                                                <h2 className='text-[2vw]'>{battle.title}</h2>
                                                <h2 className='text-[1.5vw]'>{battle.description}</h2>
                                                <h2 className='text-[1vw]'>No. of Questions: {battle.num_questions}</h2>
                                            </div>
                                        </div>
                                        <div className='flex justify-end'>
                                            <Button 
                                                className='bg-[#F47F2F] px-[1.5vw] py-[0.2vw] rounded-full'
                                                onClick={() => handleJoinBattle(battle.battleid)}
                                            >
                                                Join
                                            </Button>
                                        </div>
                                    </Card>
                                ))
                            ) : (
                                <Card className='flex justify-center items-center'>
                                    <h2 className='text-[1vw]'>No Active Battles!</h2>
                                </Card>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default JoinBattle;
