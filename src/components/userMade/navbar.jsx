import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../AuthContext'; // Adjust the path as necessary
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

const Navbar = ({ isAuthenticated, username, toggleLoginModal, handleLogout }) => {
    const navigate = useNavigate();
    
    const handleImageClick = () => {
        navigate('/');
    };

    return (
        <div className='flex justify-between items-center px-4 w-full bg-[#F2F3F3] h-[12vw] sm:h-[8vw] md:h-[6vw] lg:h-[5vw]'>
<div className='flex items-center gap-3'>
    <img onClick={handleImageClick} src="./images/mindwars.png" className='hover:cursor-pointer h-[10px] sm:h-[10px] md:h-[20px] lg:h-[30px]' alt="" />
    <img onClick={handleImageClick} className='h-[10px] sm:h-[10px] md:h-[20px] lg:h-[30px] hover:cursor-pointer' src="https://see.fontimg.com/api/rf5/DGRW/MTNmYjZiN2U1NjRlNDM1MGE1OTgzOWRiZGFmMzgxNTIudHRm/TWluZFdhcnMgQWk/star-jedi.png?r=fs&h=81&w=1250&fg=0C0B0B&bg=FFFFFF&tb=1&s=65" alt="Star Wars fonts" />
</div>


            {isAuthenticated ? (
                <div className='flex font-bold text-[3vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] items-center gap-2'>
                    <span className='text-black px-3 flex items-center gap-4'>
                        <Avatar className='h-[10vw] w-[10vw] sm:h-[8vw] sm:w-[8vw] md:h-[6vw] md:w-[6vw] lg:h-[4vw] lg:w-[4vw]'>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        {username || 'User'}
                    </span> {/* Display username */}
                    <button onClick={handleLogout} className='px-2 py-1 text-[2.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] bg-[#3565EC] text-white hover:text-black hover:bg-gray-200 hover:drop-shadow-lg opacity-90 font-bold rounded-xl'>
                        Logout
                    </button>
                </div>
            ) : (
                <button onClick={toggleLoginModal} className='px-2 py-1 text-[2.5vw] sm:text-[2vw] md:text-[1.5vw] lg:text-[1vw] bg-[#3565EC] text-white hover:text-black hover:bg-gray-200 hover:drop-shadow-lg opacity-90 font-bold rounded-xl'>
                    Login
                </button>
            )}
        </div>
    );
};

export default Navbar;
