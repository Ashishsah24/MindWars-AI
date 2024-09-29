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

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

import { Button } from '../ui/button';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IoTimerOutline } from "react-icons/io5";
import axios from 'axios';

import { Bounce, toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "@/AuthContext";

const JoinBattle = () => {
    const [battles, setBattles] = useState([]);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const username = localStorage.getItem('username');  // Get the username from local storage

    useEffect(() => {
        const fetchBattles = async () => {
            try {
                const response = await axios.get('https://mindwarsai.onrender.com/api/battles');
                console.log(response.data);
                setBattles(response.data); 
            } catch (error) {
                console.error('Error fetching battles:', error);
            }
        };
        fetchBattles();
    }, []);

    const notify = () => toast("Page refreshed!");
    const notifyJoin = () => toast("You have already attempted the quiz!");

    const handleRefreshButton = async () => {
        try {
            const response = await axios.get('https://mindwarsai.onrender.com/api/battles');
            setBattles(response.data);
            notify();
            navigate('/joinbattle');
        } catch (error) {
            console.error('Error fetching battles:', error);
        }
    };

    const handleBackButton = () => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            navigate('/battlepage');
        }
    };

    const handleLeaderBoard = (quizId) => {
        if (!isAuthenticated) {
            navigate('/');
        } else {
            navigate(`/leaderboard/${quizId}`);
        }
    };

    const handleJoinButton = async (battleId) => {
        try {
            const response = await axios.get(`https://mindwarsai.onrender.com/api/quiz/${battleId}/attempted/${username}`);
            if (response.data.attempted) {
                notifyJoin();
            } else {
                navigate(`/quiz/${battleId}`);
            }
        } catch (error) {
            console.error("Error checking quiz attempt:", error);
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

            <div className='flex flex-col md:flex-row h-auto md:h-[42vw]'>
                
                {/* Left Section */}
                <div className='w-full md:w-[50%] h-full relative'>
                    <div onClick={handleBackButton} className='p-4 active:scale-105 rounded-full transition-all hover:bg-gray-100 text-[5vw] md:text-[2vw] absolute'>
                        <BiArrowBack />
                    </div>
                    <div className='h-full pt-[30px] lg:pt-0 justify-center flex flex-col items-center'>
                        <h2 className="leading-[10vw] md:leading-[5vw] flex flex-col justify-center items-center text-[8vw] md:text-[5vw] w-full font-bold text-[#3565EC]">
                            Join the <span className='text-yellow-500'>Quiz Contest.</span>
                        </h2>
                        <p className='text-[4vw] md:text-[1.5vw] font-semibold w-[85%] md:w-[65%] text-center'>
                            Step into the action! Join the competitive quiz contest and prove your skills!
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-full md:w-[50%] flex justify-center'>

                    <Card className='w-[90%] md:w-[80%]  h-[142vw] lg:h-auto md:h-[38vw] py-[5vw] md:py-[1vw] border-none drop-shadow-none m-5'>
                        <CardHeader>
                            <div className='flex justify-between items-center'>
                                <CardTitle className='text-[6vw] md:text-[2vw]'>Active Contests to Join</CardTitle>
                                <TbRefresh onClick={handleRefreshButton} className='text-[6vw] md:text-[2vw] active:scale-[0.9] rounded-full hover:bg-gray-100 p-1' />
                            </div>
                            <CardDescription className="text-[3vw] md:text-[1vw]">
                                Click on the quiz card to see the contest leaderboard.
                            </CardDescription>
                        </CardHeader>   

                        <CardContent className='h-[102vw] lg:h-[30vw] overflow-y-scroll'>
                            {battles && battles.length > 0 ? (
                                battles.map((battle, index) => (
                                    <TooltipProvider key={index}>
                                        <Tooltip>
                                            <TooltipTrigger className='w-full'>
                                                <Card onClick={() => handleLeaderBoard(battle.id)} className='flex flex-col p-[3vw] md:p-[1vw] mb-[3vw] md:mb-[1vw] hover:cursor-pointer active:scale-[0.98] hover:scale-[0.99] transition-all duration-100 hover:bg-gray-50'>
                                                    <div className='relative flex justify-end'>
                                                        <div className='absolute flex font-bold items-center justify-center'>
                                                            <IoTimerOutline />
                                                            <h2 className="text-[4vw] md:text-[1vw]">{battle.time || 'Time'}</h2>
                                                        </div>
                                                    </div>
                                                    <div className='flex gap-[2vw] md:gap-[1vw] font-bold flex-row'>
                                                    <div className='flex flex-col gap-[0.7vw]'>
                                                            <Avatar className='h-[10vw] md:h-[4vw] w-[10vw] md:w-[4vw]'>
                                                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                                    <AvatarFallback>CN</AvatarFallback>
                                                                </Avatar>
                                                                <h2>@{battle.username}</h2>
                                                            </div>
       
                                                        <div className='flex flex-col items-start text-start'>
                                                            <h2 className='text-[5vw] md:text-[2vw]'>{battle.title}</h2>
                                                            <h2 className='text-[4vw] md:text-[1.5vw]'>{battle.description}</h2>
                                                            <h2 className='text-[3vw] md:text-[1vw]'>No. of Questions: {battle.num_questions}</h2>
                                                        </div>
                                                    </div>
                                                    <div className='flex justify-between items-center'>
                                                        <h2 className='text-[3vw] md:text-[1vw]'>Ends at: {new Date(battle.deadline).toLocaleString() || 'N/A'}</h2>
                                                        <Button onClick={(e) => {
                                                            e.stopPropagation(); // Prevent the card's click handler from being triggered
                                                            handleJoinButton(battle.id);
                                                        }} className='bg-[#F47F2F] px-[4vw] md:px-[1.5vw] py-[1vw] md:py-[0.2vw] rounded-full'>
                                                            Join
                                                        </Button>
                                                    </div>
                                                </Card>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>Click to see the leaderboard!</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                ))
                            ) : (
                                <Card className='flex justify-center items-center'>
                                    <h2 className='text-[3vw] md:text-[1vw]'>No Active Contests!</h2>
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
