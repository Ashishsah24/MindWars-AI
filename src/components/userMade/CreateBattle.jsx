import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input"
import React, { useState } from 'react';
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
import axios from 'axios';  // Assuming you're using Axios to make API requests


import { useAuth } from "@/AuthContext";
import Loading from '../loading/Loading';



const CreateBattle = () => {
    const [battleName, setBattleName] = useState('');
    const [battleDescription, setBattleDescription] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [timeLimit, setTimeLimit] = useState(30);
    const [deadline, setDeadline] = useState(1);

    const {isAuthenticated} = useAuth();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false); // Add loading state
    
    const handleBackButton = () => {
        if(!isAuthenticated){
            navigate('/');
          }
        else{
            navigate('/battlepage');
        }
    }

    const creatorUsername = localStorage.getItem('username');  
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields (simple validation)
        if (!battleName || !battleDescription || numQuestions <= 0 || timeLimit <= 0) {
            alert('Please fill out all fields correctly.');
            return;
        }

        setLoading(true);

        // Battle creation logic (API request to backend)
        try {
            const response = await axios.post('http://localhost:5000/api/create_battle', {
                battleName :battleName,
                battleDescription :battleDescription,
                numQuestions :numQuestions,
                timeLimit :timeLimit,
                creatorUsername :creatorUsername,
                deadline: deadline,
            });
            if (response.status === 201) {
                console.log(response.data.battle_id);
                navigate('/joinbattle')
            } else {
                alert('Failed to create battle');
            }
        } catch (error) {
            console.error('Error creating battle:', error);
            alert('An error occurred while creating the battle.');
        } finally{
            setLoading(false);
        }
    }

    return (
        <div className="max-w-screen">
            
            {loading && (
                // Loading spinner overlay
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <Loading type="bars" color="#3565EC" />
                </div>
            )}
            
            <div className='flex flex-col lg:flex-row h-auto lg:h-[43vw] my-[1vw]'>
                {/* Left Section */}
                <div className='w-full lg:w-[50%] h-full relative'>
                    <div onClick={handleBackButton} className='p-4 active:scale-105 rounded-full transition-all hover:ease-in duration-150 hover:bg-gray-100 text-[8vw] sm:text-[3vw] lg:text-[2vw] absolute left-[1vw] top-[1vw]'>
                        <BiArrowBack />
                    </div>
                    <div className='h-full justify-center flex flex-col items-center p-[5vw]'>
                        <h2 className="leading-[8vw] pt-[30px] sm:leading-[5vw] flex flex-col justify-center items-center text-[8vw] sm:text-[5vw] lg:text-[4vw] w-full font-bold text-[#3565EC]">
                            Create your <span className='text-yellow-500'>Quiz Contest.</span>
                        </h2>
                        <p className='text-[4vw] sm:text-[2vw] lg:text-[1.5vw] font-semibold text-center mt-[2vw]'>
                            Set up a quiz contest and challenge your friends!
                        </p>
                    </div>
                </div>

                {/* Right Section */}
                <div className='w-full lg:w-[50%] flex justify-center p-[5vw] lg:p-0'>
                    <Card className='w-full lg:w-[80%] h-auto border-none drop-shadow-none'>
                        <CardHeader>
                            <CardTitle className='text-[6vw] sm:text-[3vw] lg:text-[2vw]'>
                                Enter the following details for a contest
                            </CardTitle>
                            <CardDescription>Make sure to fill valid values</CardDescription>
                        </CardHeader>
                        <CardContent className=''>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-[4vw] sm:gap-[2vw]'>
                                <div>
                                    <Label htmlFor="battletitle" className='drop-shadow-sm'>Quiz Title</Label>
                                    <Input 
                                        type="text" 
                                        placeholder="Enter Quiz Title"
                                        value={battleName}
                                        onChange={(e) => setBattleName(e.target.value)} 
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="battledesc" className='drop-shadow-sm'>Quiz Description</Label>
                                    <Textarea 
                                        placeholder="Describe your Quiz"
                                        value={battleDescription}
                                        onChange={(e) => setBattleDescription(e.target.value)} 
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="NumberOfQuestions" className='drop-shadow-sm'>No. of Questions</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="Enter number of questions"
                                        value={numQuestions}
                                        onChange={(e) => setNumQuestions(Number(e.target.value))} 
                                        min={1}
                                        required
                                    />
                                </div>


                                <div>
                                    <Label htmlFor="timelimit" className='drop-shadow-sm'>Set the time duration of quiz (in minutes)</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="Enter time duration"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(Number(e.target.value))} 
                                        min={1}
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="deadline" className='drop-shadow-sm'>Set the Contest Deadline (in hours)</Label>
                                    <Input 
                                        type="number" 
                                        placeholder=""
                                        value={deadline}
                                        onChange={(e) =>(setDeadline(e.target.value))} 
                                        min={1}
                                        required
                                    />
                                </div>

                                <Button type='submit' className="mt-4 sm:mt-2">Create Quiz Contest</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CreateBattle;
