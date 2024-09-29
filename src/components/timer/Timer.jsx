import React, { useEffect, useState } from 'react';

const Timer = ({ initialTime }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    if (timeLeft === 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft]);

  const percentage = (timeLeft / initialTime) * 100;
  const strokeDashoffset = (percentage / 100) * circumference - circumference;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className='absolute right-5 top-5 md:right-[50px] md:top-[120px]'>
      <div className="relative w-24 h-24 md:w-36 md:h-36  flex justify-center items-center">
        <svg width="100%" height="100%">
          <circle
            className="fill-none"
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="10"
          />
          <circle
            className="fill-none stroke-linecap-round transform rotate-[-90deg] origin-center transition-all duration-1000"
            cx="50%"
            cy="50%"
            r={radius}
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
          />
        </svg>
        <div className="absolute text-xl md:text-2xl font-bold text-gray-800">
          {formatTime(timeLeft)}
        </div>
      </div>
    </div>
  );
};

export default Timer;
