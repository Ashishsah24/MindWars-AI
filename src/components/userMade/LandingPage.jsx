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
} from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/AuthContext";

const LandingPage = ({ notify }) => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleContestPage = () => {
    if (isAuthenticated) {
      navigate('/battlepage');
    } else {
      console.log('Not authenticated. Showing toast...');
      notify();
    }
  };

  return (
    <>
      <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-12 py-10 px-4 lg:px-16 mx-auto w-full lg:w-11/12'>
        <h1 className='text-blue-600 text-4xl lg:text-6xl font-extrabold leading-snug lg:leading-[4.5rem] w-full lg:w-2/3 text-center lg:text-left'>
          Join the ultimate AI Quiz Contest! <br />
          <span className='text-yellow-500'>Test your knowledge</span> and <br />
          <span className='text-yellow-500'>show off your skills</span> against others.
        </h1>
        <img src="./images/battle.png" className='w-3/4 lg:w-1/3' alt="Quiz Contest" />
      </div>

      <div className='flex flex-col lg:flex-row gap-4 lg:gap-8 justify-center w-full lg:w-11/12 mx-auto py-6 lg:py-12'>
        <Button onClick={handleContestPage} className='rounded-full font-semibold px-5 lg:px-12 py-4 text-lg bg-orange-500 hover:bg-orange-600'>
          Start Contest
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button className='rounded-full font-semibold px-5 lg:px-12 py-4 text-lg bg-orange-500 hover:bg-orange-600'>
              Learn More
            </Button>
          </SheetTrigger>
          <SheetContent className='w-full lg:w-4/5'>
            <SheetHeader>
              <SheetTitle>Learn More</SheetTitle>
              <SheetDescription>
                Join the MindWars AI Quiz Contest: Compete with friends and other participants, answer AI-generated questions, and see how you rank!
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

      <div className='text-center mt-16'>
        <h2 className='text-blue-600 text-3xl font-bold'>
          Tired of <span className='text-yellow-500'>Traditional Quizzes?</span>
        </h2>
        <p className='text-lg mt-4'>
          Join our AI-generated quiz contest, improve your knowledge, and compete against others in a fun and engaging way!
        </p>
      </div>

      <div className='flex flex-col px-5 lg:flex-row gap-8 justify-center w-full lg:w-11/12 mx-auto mt-12'>
        <div className='hover:scale-105 transition-transform bg-blue-600 text-white rounded-3xl p-6 lg:p-8 w-full lg:w-1/4 text-center'>
          <h3 className='font-bold text-xl'>Join a Competitive Quiz</h3>
          <p className='mt-2'>Test your knowledge against participants and climb the ranks with unique, AI-generated questions.</p>
        </div>
        <div className='hover:scale-105 transition-transform bg-pink-500 text-white rounded-3xl p-6 lg:p-8 w-full lg:w-1/4 text-center'>
          <h3 className='font-bold text-xl'>Analyze Your Performance</h3>
          <p className='mt-2'>Receive detailed feedback on your answers and track your progress after every contest.</p>
        </div>
        <div className='hover:scale-105 transition-transform bg-teal-500 text-white rounded-3xl p-6 lg:p-8 w-full lg:w-1/4 text-center'>
          <h3 className='font-bold text-xl'>Personalized Learning Experience</h3>
          <p className='mt-2'>Get tailored quiz recommendations based on your strengths and weaknesses.</p>
        </div>
      </div>

      <div className='bg-gray-100 mt-16 py-10 px-6'>
        <div className='flex flex-col lg:flex-row justify-center gap-8 w-full lg:w-11/12 mx-auto'>
          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src="./images/arun_avatar2.png" alt="Arun" />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <h2 className='font-bold text-lg'>Hey, This is Arun</h2>
            </div>
            <p>We're thrilled to introduce MindWars AI! This contest is all about pushing your limits and testing your knowledge against friends and others. Get ready for a fun and engaging experience with quizzes tailored to your interests!</p>
          </div>

          <div className='flex flex-col gap-4 w-full lg:w-1/2'>
            <div className='flex items-center gap-4'>
              <Avatar className='h-16 w-16'>
                <AvatarImage src="./images/ashish_avatar2.png" alt="Ashish" />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <h2 className='font-bold text-lg'>It's me, Ashish here!</h2>
            </div>
            <p>MindWars AI is for everyone who enjoys a friendly challenge. Our AI-driven quizzes make learning fun and competitive, allowing you to test your skills and gain valuable knowledge. Join us for an exciting journey of learning!</p>
          </div>
        </div>
      </div>

      <div className='flex flex-col hidden lg:contents lg:flex-row items-center justify-center gap-8 mt-16 w-full lg:w-11/12 mx-auto'>
        <h2 className='lg:ml-[60px] lg:mt-[10px] text-blue-600 text-3xl font-bold text-center lg:text-left'>
          Test Your Knowledge, <span className='text-yellow-500'>Challenge Your Friends!</span>
        </h2>
        <div className='flex items-center justify-center gap-8'>
          <img className='w-full lg:w-1/2 h-auto' src="./images/desktop.png" alt="Desktop" />
          <p className='text-lg'>Experience the thrill of competition with MindWars AI, where you can challenge your friends and expand your knowledge through engaging, AI-generated quizzes. Whether you're looking to boost your skills or enjoy some friendly rivalry, our platform makes it easy to connect with others while enhancing your understanding. Gather your friends, embrace your curiosity, and let the quiz battles begin!</p>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
