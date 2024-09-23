import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input"

import React, { useState } from 'react'

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { IoTimerOutline } from "react-icons/io5";

const JoinBattle = () => {

    const [battleName, setBattleName] = useState('');
    const [battleTopic, setBattleTopic] = useState('Math');
    const [numQuestions, setNumQuestions] = useState(5);
    const [timeLimit, setTimeLimit] = useState(30);
    const [difficulty, setDifficulty] = useState('Medium');


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle battle creation logic here
        alert('Battle Created!');
    };
      
    const navigate = useNavigate();

    const handleBackButton = ()=>{
        navigate('/battlepage')    
    }

    const handleFormSubmit = (e)=>{
        e.preventDefault()
    }
    return (
        // <h2 className="text-[4vw] font-bold text-[#3565EC]">Create a<span className='text-yellow-500'> Battle</span></h2>
        <div className="max-w-screen">

                <div className='flex h-[42vw]'>

                    <div className='w-[50%] h-full relative'>
                        <div onClick={handleBackButton} className='p-4 active:scale-105 rounded-full transition-all hoverease-in duration-150 hover:bg-gray-100 text-[2vw] absolute'><BiArrowBack/></div>
                        <div className='h-full justify-center flex flex-col items-center'>
                        <h2 className="leading-[5vw] flex flex-col justify-center items-center text-[5vw] w-full font-bold text-[#3565EC]">Join the <span className='text-yellow-500'>Battle Arena.</span></h2>
                        <p className='text-[1.5vw] font-semibold w-[65%] text-center'>Step into the action! Join your friends' quiz battles and prove your skills!</p>
                        </div>
                    </div>

                    <div className='w-[50%] flex justify-center'>


                        <Card className='w-[80%] py-[1vw] border-none drop-shadow-none m-5 '>
                            
                            <CardHeader>
                                <CardTitle className='text-[2vw]'>Active Battles to Join</CardTitle>
                                <CardDescription></CardDescription>
                            </CardHeader>   
                        <CardContent>

                                {/* ek to yeh , no battles active */}
                                <Card className='flex flex-col p-[1vw] mb-[1vw]'>
                                
                                <div className='flex justify-end'>

                                    <div className='flex font-bold items-center justify-center'>
                                        <IoTimerOutline className='' />
                                        <h2>Time</h2>
                                    </div>

                                </div>
                                <div className='flex gap-[1vw] font-bold flex-row'>

                                        <div className=''>
                                                <img className='h-[5vw]' src='./images/username.png'></img>
                                                <h2>@username</h2>
                                        </div>

                                        <div className=''>
                                            <h2 className='text-[2vw]'>"Title of the Quiz"</h2>
                                            <h2 className='text-[1.5vw]'>"Quiz Descritipon"</h2>
                                            <h2 className='text-[1vw]'>No. of Questions: </h2>
                                        </div>

                                </div>
                                <div className='flex justify-end'>
                                        <Button className='bg-[#F47F2F] px-[1.5vw] py-[0.2vw] rounded-full '>Join</Button>
                                </div>

                                </Card>

                                <Card className='flex flex-col p-[1vw] '>
                                
                                <div className='flex justify-end'>

                                    <div className='flex font-bold items-center justify-center'>
                                        <IoTimerOutline className='' />
                                        <h2>Time</h2>
                                    </div>

                                </div>
                                <div className='flex gap-[1vw] font-bold flex-row'>

                                        <div className=''>
                                                <img className='h-[5vw]' src='./images/username.png'></img>
                                                <h2>@username</h2>
                                        </div>

                                        <div className=''>
                                            <h2 className='text-[2vw]'>"Title of the Quiz"</h2>
                                            <h2 className='text-[1.5vw]'>"Quiz Descritipon"</h2>
                                            <h2 className='text-[1vw]'>No. of Questions: </h2>
                                        </div>

                                </div>
                                <div className='flex justify-end'>
                                        <Button className='bg-[#F47F2F] px-[1.5vw] py-[0.2vw] rounded-full '>Join</Button>
                                </div>

                                </Card>
                        </CardContent>
                        </Card>

                           


                    </div>
                </div>
        </div>
  )
}

export default JoinBattle