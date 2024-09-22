import { useEffect, useState } from 'react';
import './App.css';
import LoginSignupModal from './components/modals/loginSignupModal';
import axios from 'axios';

import { useAuth } from './AuthContext'; // Adjust the path as necessary
import Navbar from './components/userMade/navbar';

import Footer from './components/userMade/Footer';
import LandingPage from './components/userMade/LandingPage';
import { Routes, Route } from 'react-router-dom'; // No need for Router now
import BattlePage from './components/userMade/BattlePage';

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
      
      <Navbar 
      isAuthenticated={isAuthenticated}
      toggleLoginModal={toggleLoginModal}
      username={username}
      handleLogout={handleLogout}
      />

          <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/battlepage" element={<BattlePage />} />
        </Routes>

    {loginValue && 
    <LoginSignupModal handleLogin={handleLogin} 
        setPasswordLogin={setPasswordLogin} 
        setIdentifier={setIdentifier} 
        handleSignup={handleSignup} 
        setPasswordSignup={setPasswordSignup} 
        setUsername={setUsername} 
        setEmail={setEmail} 
        setlogin={setLoginValue}
      />}

      <Footer/>
    </div>
  );
};

export default App;
