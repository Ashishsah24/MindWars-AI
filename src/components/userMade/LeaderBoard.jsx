import { TbRefresh } from "react-icons/tb";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "@/AuthContext";
import { IoTimerOutline } from "react-icons/io5";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const LeaderBoard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { quiz_id } = useParams();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/leaderboard/${quiz_id}`);
        setLeaderboard(response.data);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    fetchLeaderboard();
  }, [quiz_id]);

  const handleRefreshButton = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/leaderboard/${quiz_id}`);
      setLeaderboard(response.data);
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
    }
  };

  const handleBackButton = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      navigate("/joinbattle");
    }
  };

  return (
    <div className="max-w-screen p-4">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative mb-4">
          <div
            onClick={handleBackButton}
            className=" active:scale-105 rounded-full transition-all hover:bg-gray-100 text-xl absolute"
          >
            <BiArrowBack />
          </div>
          <div className="pt-[50px] lg:pt-0 h-full flex flex-col items-center justify-center">
            <h2 className="text-2xl md:text-5xl font-bold text-[#3565EC] mb-2">
              Quiz Contest <span className="text-yellow-500">Leaderboard</span>
            </h2>
            <p className="text-lg md:text-xl text-center">
              Join the AI quiz contest, challenge your skills, climb the leaderboard, and win exclusive rewards—are you up for the challenge?
            </p>
          </div>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <Card className="w-11/12 h-auto border-none m-5">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-2xl">Quiz Leaderboard 🏆🚀</CardTitle>
                <TbRefresh
                  onClick={handleRefreshButton}
                  className="text-xl active:scale-90 rounded-full hover:bg-gray-100 p-1"
                />
              </div>
            </CardHeader>
            <CardContent className="h-[80vw] lg:h-[30vw] overflow-y-scroll">
              {leaderboard.length > 0 ? (
                leaderboard.map((user, index) => (
                  <Card key={index} className="flex flex-col p-2 mb-2">
                    <div className="w-full flex items-center justify-between">
                      <div className="flex items-center gap-2 font-bold">
                        Rank {index + 1}
                        <Avatar className='h-[4vw] w-[4vw]'>
                          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <h2 className="text-lg">@{user.username}</h2>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="flex items-center">
                          <IoTimerOutline />
                          <h2 className="text-lg">{user.time_taken} secs</h2>
                        </div>
                        <h2 className="font-bold text-sm">Score: {user.score}</h2>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="flex justify-center items-center">
                  <h2 className="text-lg">No participants yet!</h2>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
