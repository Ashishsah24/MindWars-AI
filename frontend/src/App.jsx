import { useState } from 'react';
import './App.css'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Input } from 'postcss';
import { Label } from '@radix-ui/react-label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


const App = () => { 


  // const loadLogin = ()=>{

  //   setlogin((prev)=>!prev)

  // }

  const loadHowtoplay= ()=>{
    sethowtoPlay((prev) => !prev)
  }

  return (
    <div className="main min-h-screen max-w-screen pt-[1vw]">
      <div className='flex justify-between items-center px-7 w-[95%] mx-auto bg-[#3565EC] h-[5vw] rounded-2xl '>
        <div className='h-full w-full flex items-center gap-3'>
      <img src="./images/mindwars.png" className='h-[50%]' alt="" />
      <img className='h-[40%] drop-shadow-xl' src="https://see.fontimg.com/api/rf5/DGRW/MTNmYjZiN2U1NjRlNDM1MGE1OTgzOWRiZGFmMzgxNTIudHRm/TWluZFdhcnMgQWk/star-jedi.png?r=fs&h=81&w=1250&fg=FFF6F6&bg=FFFFFF&tb=1&s=65" alt="Star Wars fonts"/>
        </div>

      <button onClick={()=>{loadLogin}} className='px-4 py-2 text-[1vw] bg-white hover:bg-gray-200 hover:drop-shadow-lg  opacity-90 font-bold rounded-xl'>Login</button>
      </div>

      <div className='flex items-center flex-row gap-[1.5vw] pt-[3vw] w-[95%] mx-auto'>
          <h1 className=' w-[70%] text-[5vw] font-[900] leading-[5vw]'>
          Challenge your friend in <br></br>
        real-time battles. <br></br>
        Learn as you play with <br></br>
        AI-driven quizzes
          </h1>
        <img src="./images/battle.png" className='h-[70%] w-[25%]' alt="" />
      </div>

      <div className='w-[95%] pt-[2vw] mx-auto gap-[2vw] flex '>
      <Button className='font-semibold px-[3vw] text-[1.5vw] py-[1.5vw] bg-[#F47F2F] drop-shadow-md'>Start Battle</Button>
      <Sheet >
      <SheetTrigger asChild>
      <Button className='font-semibold px-[3vw] text-[1.5vw] py-[1.5vw]  bg-[#F47F2F] drop-shadow-md'>How to Play</Button>
      </SheetTrigger>
      <SheetContent  className='w-[80vw]'>
        <SheetHeader>
          <SheetTitle>How to Play?</SheetTitle>
          <SheetDescription>
          How to Play MindWars AI Quiz Battle:
          Start or Join a Battle:
          Click on "Start Battle" to create your own quiz match.
          Choose "Join Battle" to compete against a friend or a random opponent in a 1v1 real-time quiz.
          Choose Your Topic:
          Select from a variety of quiz topics based on your interests or the subject you want to master.
          Real-Time Quiz Battle:
          Answer questions in real-time as they appear.
          Both players answer the same questions, and you can see your progress as you go.
          AI-Generated Questions:
          Our AI generates challenging and fun questions tailored to your skill level. Get ready to face new challenges each time you play!
          Compete and Win:
          The faster and more accurately you answer, the more points you earn.
          See your score and compare it with your opponent's in real time.
          Personalized Feedback:
          After each battle, receive personalized feedback and explanations based on your answers.
          The system provides suggestions to help you improve your knowledge and skills.
          Climb the Leaderboard:
          Win battles, earn points, and move up the global leaderboard.
          Challenge your friends again to become the ultimate quiz master!
          </SheetDescription>
        </SheetHeader>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
      </Sheet>
      </div>

      <div className='flex flex-col items-center my-[11vw]'> 
        <h1 className="text-[#3565EC] font-bold text-[3vw]">Tired of <span className='text-yellow-500'>Manual Quizzes?</span></h1>
        <p className='text-[1.2vw]'>Try automated AI generated quality quizzes to improve your performance with any topic, and have a quiz battle with your friend</p>
      </div>


    </div>
  )
}

export default App