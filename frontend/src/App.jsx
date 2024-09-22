import { useEffect, useState } from 'react';
import './App.css';
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

import LoginSignupModal from './components/userMade/loginSignupModal';
import Page2 from './components/userMade/page2';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Adjust the path as necessary

const App = () => { 
  const { login, logout, isAuthenticated } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [passwordLogin, setPasswordLogin] = useState('');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [email, setEmail] = useState('');
  const [passwordSignup, setPasswordSignup] = useState('');
  const [loginValue, setLoginValue] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:5000/login', {
            identifier,
            password: passwordLogin,
        });
        alert(response.data.message);
        // Use the login function from context
        login(response.data.token, response.data.username); 
        setLoginValue(false);
    } catch (error) {
        alert(error.response?.data?.message || "An error occurred");
    }
  };
  

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', {
        username,
        email,
        password: passwordSignup,
      });
      alert(response.data.message);
      setLoginValue(false);
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const toggleLoginModal = () => {
    setLoginValue(prev => !prev);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername(''); // Reset username state on logout
        logout(); // Call the logout function from context
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [isAuthenticated]); // You can remove this if you rely entirely on context
  

  return (
    <div className="main min-h-screen max-w-screen pt-[0.1px]">
      <div className='flex justify-between items-center px-7 w-[100%] mx-auto bg-[#F2F3F3] h-[6vw] '>
        <div className='h-full w-full flex items-center gap-3'>
          <img src="./images/mindwars.png" className='h-[50%]' alt="" />
          <img className='h-[30%] ' src="https://see.fontimg.com/api/rf5/DGRW/MTNmYjZiN2U1NjRlNDM1MGE1OTgzOWRiZGFmMzgxNTIudHRm/TWluZFdhcnMgQWk/star-jedi.png?r=fs&h=81&w=1250&fg=0C0B0B&bg=FFFFFF&tb=1&s=65" alt="Star Wars fonts"/>
        </div>

        {isAuthenticated ? (
          <div className='flex font-bold text-[1.5vw] items-center gap-2'>
            <span className='text-black px-5 flex items-center gap-4'>
                  <Avatar className='h-[3vw] w-[3vw]'>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
              {username || 'User'}</span> {/* Display username */}
            <button onClick={handleLogout} className='px-4 py-2 text-[1vw] bg-[#3565EC] text-white hover:text-black hover:bg-gray-200 hover:drop-shadow-lg opacity-90 font-bold rounded-xl'>Logout</button>
          </div>
        ) : (
          <button onClick={toggleLoginModal} className='px-4 py-2 text-[1vw] bg-[#3565EC] text-white hover:text-black hover:bg-gray-200 hover:drop-shadow-lg opacity-90 font-bold rounded-xl'>Login</button>
        )}
      </div>

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
        <Button className='rounded-2xl font-semibold px-[3vw] text-[1.5vw] py-[1.5vw] bg-[#F47F2F] '>Start Battle</Button>
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

      <Page2 />

      {loginValue && <LoginSignupModal 
        handleLogin={handleLogin} 
        setPasswordLogin={setPasswordLogin} 
        setIdentifier={setIdentifier} 
        handleSignup={handleSignup} 
        setPasswordSignup={setPasswordSignup} 
        setUsername={setUsername} 
        setEmail={setEmail} 
        setlogin={setLoginValue}
      />}
    </div>
  );
};

export default App;
