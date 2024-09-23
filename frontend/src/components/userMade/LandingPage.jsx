import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";



const LandingPage = ({notify}) => {

  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();


  const handleBattlePage = ()=>{
    if(isAuthenticated){
      navigate('/battlepage');
    }
    else{
      console.log('Not authenticated. Showing toast...');
      notify();
    }
  }
  return (
    <>
    <div className='flex items-center flex-row gap-[1.5vw] pt-[3vw] w-[90%] mx-auto'>
    <h1 className='text-[#3565EC] w-[70%] text-[5vw] font-[900] leading-[5vw]'>
      Challenge your friend in <br />
      <span className='text-yellow-500'>real-time battles.</span> <br />
      Learn as you play with <br />
      <span className='text-yellow-500'>AI-driven </span>quizzes.
    </h1>
    <img src="./images/battle.png" className='h-[70%] w-[25%]' alt="" />
  </div>

  <div className='w-[90%] pt-[2vw] mx-auto gap-[2vw] flex'>
    <Button onClick ={handleBattlePage} className='rounded-2xl font-semibold px-[3vw] text-[1.5vw] py-[1.5vw] bg-[#F47F2F] '>Start Battle</Button>
    <Sheet>
      <SheetTrigger asChild>
        <Button className='rounded-2xl font-semibold px-[3vw] text-[1.5vw] py-[1.5vw] bg-[#F47F2F] '>How to Play</Button>
      </SheetTrigger>
      <SheetContent className='w-[80vw]'>
        <SheetHeader>
          <SheetTitle>How to Play?</SheetTitle>
          <SheetDescription>
            How to Play MindWars AI Quiz Battle:
            {/* Description omitted for brevity */}
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

  <div className='flex flex-col items-center mt-[11vw]'> 
    <h1 className="text-[#3565EC] font-bold text-[3vw]">Tired of <span className='text-yellow-500'>Manual Quizzes?</span></h1>
    <p className='text-[1.2vw]'>Try automated AI generated quality quizzes to improve your performance with any topic, and have a quiz battle with your friend</p>
  </div>


    <div className="flex mt-[5vw] flex-row gap-[2.5vw] w-[90%] justify-center mx-auto max-w-screen h-[20vw]">

        <div className="hover:scale-105 duration-100 transition-all ease-out w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center items-center bg-[#3764EF] rounded-3xl">
            <h2 className="font-bold text-[1.5vw]">Challenge Your Friend for 1v1 Battle</h2>
            <p className="text-[1vw]">Engage in real-time quiz battles and see who comes out on top with unique, AI-crafted questions.</p>
        </div>
        <div className="hover:scale-105 duration-100 transition-all ease-out w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center  bg-[#FE6376] rounded-3xl">
        <h2 className="font-bold text-[1.5vw]">Analyze Your Answers and Performance  </h2>
        <p className="text-[1vw]">Get detailed feedback on your quiz answers and track your progress after every battle..</p>
        </div>
        <div className="hover:scale-105 duration-100 transition-all ease-out w-[24%] h-[100%] text-white flex flex-col gap-2 justify-center p-[1vw] text-center   bg-[#01DBAB] rounded-3xl">
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

  </>
  )
}

export default LandingPage