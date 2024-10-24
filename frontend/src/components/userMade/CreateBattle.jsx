import { Label } from '@radix-ui/react-label';
import { Input } from "@/components/ui/input"
import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { io } from "socket.io-client"; // Import Socket.IO client

const CreateBattle = () => {
    const [battleName, setBattleName] = useState('');
    const [battleDescription, setBattleDescription] = useState('');
    const [numQuestions, setNumQuestions] = useState(5);
    const [timeLimit, setTimeLimit] = useState(30);
    const [difficulty, setDifficulty] = useState(1);
    const [socket, setSocket] = useState(null);  // To handle the socket connection

    const navigate = useNavigate();
    const creatorUsername = localStorage.getItem('username');

    // Initialize Socket.IO client
    useEffect(() => {
        const newSocket = io('http://localhost:5000');  // Connect to your Socket.IO server
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    const handleBackButton = () => {
        navigate('/battlepage');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form fields (simple validation)
        if (!battleName || !battleDescription || numQuestions <= 0 || timeLimit <= 0) {
            alert('Please fill out all fields correctly.');
            return;
        }
        // Battle creation logic (API request to backend)
        try {
            const response = await axios.post('http://localhost:5000/api/create_battle', {
                battleName: battleName,
                battleDescription: battleDescription,
                numQuestions: numQuestions,
                timeLimit: timeLimit,
                difficulty: difficulty,
                creatorUsername: creatorUsername,
            });

            if (response.status === 201) {
                const battleId = response.data.battle_id;
                alert('Battle created successfully!');

                // Emit an event to join the waiting room using Socket.IO
                if (socket) {
                    socket.emit('join_waiting_room', {
                        battle_id: battleId,
                        username: creatorUsername
                    });

                    // Listen for the matchmaking started event
                    socket.on('user_joined', () => {
                        navigate(`/waiting-room/${battleId}`);
                        // Navigate to the battle page once matchmaking starts
                    });


                    //jese hi creator join hoga
                    // socket.on("waiting for opponent", ())

                    // Listen for the matchmaking started event
                    socket.on('matchmaking_started', () => {

                        //timer start {tomorrow 5 min}
                        // Navigate to the battle page once matchmak'ing starts
                    });
                }

            } else {
                alert('Failed to create battle');
            }
        } catch (error) {
            console.error('Error creating battle:', error);
            alert('An error occurred while creating the battle.');
        }
    };

    return (
        <div className="max-w-screen">
            <div className='flex h-[42vw]'>
                <div className='w-[50%] h-full relative'>
                    <div onClick={handleBackButton} className='p-4 active:scale-105 rounded-full transition-all hover:ease-in duration-150 hover:bg-gray-100 text-[2vw] absolute'>
                        <BiArrowBack />
                    </div>
                    <div className='h-full justify-center flex flex-col items-center'>
                        <h2 className="leading-[5vw] flex flex-col justify-center items-center text-[5vw] w-full font-bold text-[#3565EC]">Create your <span className='text-yellow-500'>Battle Arena.</span></h2>
                        <p className='text-[1.5vw] font-semibold'>Set up a quiz battle and challenge your friends!</p>
                    </div>
                </div>

                <div className='w-[50%] flex justify-center'>
                    <Card className='w-[80%] py-[1vw] border-none drop-shadow-none m-5'>
                        <CardHeader>
                            <CardTitle className='text-[2vw]'>Enter the following details for a battle</CardTitle>
                            <CardDescription>Make sure to fill valid values</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className='flex flex-col gap-[1vw]'>
                                <div>
                                    <Label htmlFor="battletitle" className='drop-shadow-sm'>Battle Title</Label>
                                    <Input 
                                        type="text" 
                                        placeholder="Enter Battle Title"
                                        value={battleName}
                                        onChange={(e) => setBattleName(e.target.value)} 
                                        required
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="battledesc" className='drop-shadow-sm'>Battle Description</Label>
                                    <Textarea 
                                        placeholder="Describe your battle"
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
                                    <Label htmlFor="difficulty" className='drop-shadow-sm'>Level of Difficulty</Label>
                                    <Select
                                        value={difficulty}  // Set the difficulty state
                                        onValueChange={(value) => setDifficulty(value)}  // Update difficulty state
                                        required
                                    >
                                        <SelectTrigger aria-label="Select difficulty">
                                            <SelectValue placeholder="Select difficulty level" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">1 (Beginner)</SelectItem>
                                            <SelectItem value="2">2 (Intermediate)</SelectItem>
                                            <SelectItem value="3">3 (Advanced)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <Label htmlFor="timelimit" className='drop-shadow-sm'>Set the time duration (in minutes)</Label>
                                    <Input 
                                        type="number" 
                                        placeholder="Enter time duration"
                                        value={timeLimit}
                                        onChange={(e) => setTimeLimit(Number(e.target.value))} 
                                        min={1}
                                        required
                                    />
                                </div>

                                <Button type='submit'>Start</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateBattle;
