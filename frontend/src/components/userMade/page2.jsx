import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import { FaGithub } from "react-icons/fa";
const Page2 = () => {
  return (
    <>
    
    <div className='flex flex-col items-center mt-[11vw]'> 
    <h1 className="text-[#3565EC] font-bold text-[3vw]">Tired of <span className='text-yellow-500'>Manual Quizzes?</span></h1>
    <p className='text-[1.2vw]'>Try automated AI generated quality quizzes to improve your performance with any topic, and have a quiz battle with your friend</p>
  </div>


    <div className="flex mt-[5vw] flex-row gap-[2.5vw] w-[90%] justify-center mx-auto max-w-screen h-[20vw]">

        <div className="w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center items-center bg-[#3764EF] rounded-3xl">
            <h2 className="font-bold text-[1.5vw]">Challenge Your Friend for 1v1 Battle</h2>
            <p className="text-[1vw]">Engage in real-time quiz battles and see who comes out on top with unique, AI-crafted questions.</p>
        </div>
        <div className="w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center  bg-[#FE6376] rounded-3xl">
        <h2 className="font-bold text-[1.5vw]">Analyze Your Answers and Performance  </h2>
        <p className="text-[1vw]">Get detailed feedback on your quiz answers and track your progress after every battle..</p>
        </div>
        <div className="w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center   bg-[#01DBAB] rounded-3xl">
        <h2 className="font-bold text-[1.5vw]">Personalized Learning Path</h2>
        <p className="text-[1vw]">Receive tailored learning recommendations based on your performance to boost your knowledge and skills.</p>
        </div>
    </div>

    <div className="mt-[10vw] bg-[#F2F3F3]  max-w-screen p-[3vw]">
      
      <div className="w-[90%] mx-auto flex flex-row  gap-[3vw] justify-center items-center ">

          <div className="flex flex-col gap-2 w-[40%]">

            <div className="flex gap-2 items-center">
            <Avatar className='h-[4vw] w-[4vw]'>
            <AvatarImage src="./images/arun_avatar2.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            <h2>Hey, This is Arun</h2>
            </div>

            <p>
            We're super excited to bring MindWars AI to life. It's all about pushing your limits while having fun challenges with your friends, sharpen your knowledge, and let AI surprise you with quizzes that match your own ideas. Dive in and show what you've got!
            </p>
          </div>

          <div className="flex flex-col gap-2 w-[40%]">

            <div className="flex gap-2 items-center">
            <Avatar className='h-[4vw] w-[4vw]'>
            <AvatarImage src="./images/ashish_avatar2.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2>It's me, Ashish here!</h2>
            </div>

            <p>
            MindWars AI is for everyone who loves a bit of friendly competition. We're using AI to make learning fun and personalized, so you can battle it out in real-time quizzes while gaining some serious knowledge. Let's make education a fun, competitive experience!
            </p>
            </div>

      </div>

    </div>
    
    <div className="mt-[5vw] max-w-screen h-[90]">

      <div className="flex justify-center w-full flex-col">
          <h2 className="text-[#3565EC] font-bold text-[3vw] text-center">Analyze your knowledge, <span className='text-yellow-500'>Challenge your friend!</span></h2>
          <div className="flex items-center w-[80%]">
          <img className=" px-[3vw] scale-50 h-[30vw]" src="./images/desktop.png" alt="" />
          <p>Unlock the thrill of learning and competition with our app, where you can challenge your friends and test your knowledge like never before! Dive into AI-generated quizzes tailored to your interests, creating a fun and engaging way to enhance your understanding of various topics. Whether you're seeking to boost your skills or simply enjoy some friendly rivalry, our platform makes it easy to connect with others while expanding your horizons. So gather your friends, unleash your curiosity, and let the battles of wits begin!</p>

          </div>
      </div>

    </div>
    <footer className="p-[5vw] bg-[#F2F3F3]  max-w-screen flex items-center justify-between h-[10vw]">

          <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
          <img src="./images/mindwars.png" className='h-[3vw]' alt="" />
          <img className='h-[2vw]' src="https://see.fontimg.com/api/rf5/DGRW/MTNmYjZiN2U1NjRlNDM1MGE1OTgzOWRiZGFmMzgxNTIudHRm/TWluZFdhcnMgQWk/star-jedi.png?r=fs&h=81&w=1250&fg=0C0B0B&bg=FFFFFF&tb=1&s=65" alt="Star Wars fonts"/>
          </div>
          
          <h2 className="text-black opacity-90">Copyright © 2024 - All rights reserved</h2>
          </div>


          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-[1.2vw]"> Creators</h2>
            <div className="flex flex-col gap-1">
            <div className="">
              <HoverCard>
              <HoverCardTrigger className="hover:underline flex gap-2 items-center"><FaGithub />Arun Chandra</HoverCardTrigger>
              <HoverCardContent>
              A creative thinker who loves coming up with solutions to tricky tech challenges
              </HoverCardContent>
            </HoverCard>

            </div>
            <div className="">
            <HoverCard>
              <HoverCardTrigger className="hover:underline flex gap-2 items-center"><FaGithub />Ashish Sah</HoverCardTrigger>
              <HoverCardContent>
              An explorer in the tech world who loves taking on challenges and learning along the way.
              </HoverCardContent>
            </HoverCard>

            </div>
            </div>

          </div>



      </footer>
    </> 

  )
}

export default Page2