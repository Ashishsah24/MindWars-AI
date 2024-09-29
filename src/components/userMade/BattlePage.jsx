import { useAuth } from "@/AuthContext";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const BattlePage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCreateBattle = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigate("/createbattle");
    }
  };

  const handleJoinBattle = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigate("/joinbattle");
    }
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <div className="max-w-screen pb-[11vw]">
      {/* Header and Back Button */}
      <div className="relative text-center">
        <div
          onClick={handleBackButton}
          className="p-4 active:scale-105 rounded-full transition-all ease-in-out duration-150 hover:bg-gray-100 text-[6vw] sm:text-[3vw] lg:text-[2vw] absolute left-[2vw] top-[2vw]">
          <BiArrowBack />
        </div>
        <h2 className="pt-[50px] lg:pt-[20px] text-[8vw] sm:text-[5vw] lg:text-[4vw] font-bold text-[#3565EC]">
          Quiz Contest <span className="text-yellow-500">Arena</span>
        </h2>
      </div>

      {/* Battle Options: Create Contest & Join Contest */}
      <div className="flex flex-col lg:flex-row justify-center gap-[4vw] lg:gap-[8vw] mt-[12vw] sm:mt-[8vw]">
        {/* Create Contest */}
        <div className="flex flex-col items-center font-bold text-[5vw] sm:text-[3vw] lg:text-[2vw]">
          <img
            onClick={handleCreateBattle}
            className="h-[150px] lg:h-[300px] hover:drop-shadow-2xl active:scale-90 transition-all ease-in-out duration-200 scale-90 sm:scale-75"
            src="./images/createBattle.png"
            alt="Create Battle"
          />
          <h2 className="text-[#F47F2F] mt-2">Create Contest</h2>
        </div>

        {/* Join Contest */}
        <div className="flex flex-col items-center font-bold text-[5vw] sm:text-[3vw] lg:text-[2vw]">
          <img
            onClick={handleJoinBattle}
            className="h-[150px] lg:h-[300px] hover:drop-shadow-2xl active:scale-90 transition-all ease-in-out duration-200 scale-90 sm:scale-75"
            src="./images/joinBattle.png"
            alt="Join Battle"
          />
          <h2 className="text-[#F47F2F] mt-2">Join Contest</h2>
        </div>
      </div>
    </div>
  );
};

export default BattlePage;
