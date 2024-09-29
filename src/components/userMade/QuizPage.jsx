import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Timer from '../timer/Timer';
import Loading from '../loading/Loading';

const QuizPage = () => {
    const { quiz_id } = useParams();
    const navigate = useNavigate();

    const [hasAttempted, setHasAttempted] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentAnswer, setCurrentAnswer] = useState(null);
    const [score, setScore] = useState(0);
    const [timeStarted, setTimeStarted] = useState(null);

    const username = localStorage.getItem('username');
    const [quizStarted, setQuizStarted] = useState(false);
    const [timerLimit, setTimerLimit] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkIfAttempted = async () => {
            try {
                const response = await fetch(`https://mindwarsai.onrender.com/api/quiz/${quiz_id}/attempted/${username}`);
                const data = await response.json();
                if (data.attempted) {
                    setHasAttempted(true);
                    alert('You have already attempted the quiz!');
                    navigate(`/`);
                }
            } catch (error) {
                console.error("Error checking quiz attempt status:", error);
            }
        };

        checkIfAttempted();
        const fetchQuiz = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://mindwarsai.onrender.com/api/quiz/${quiz_id}`);
                setQuestions(response.data.questions);
                const timeInSeconds = response.data.time_limit * 60; 
                setTimerLimit(timeInSeconds);
                setQuizStarted(true);
                setTimeStarted(Date.now());
            } catch (error) {
                console.error('Error fetching quiz:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuiz();
    }, [quiz_id, username, navigate]);

    const handleAnswerClick = (option) => {
        setCurrentAnswer(option);
    };

    const handleNextQuestion = async () => {
        const questionDetails = {
            question: questions[currentQuestionIndex].question,
            correctAnswer: questions[currentQuestionIndex].answer,
            userAnswer: currentAnswer,
            explanation: questions[currentQuestionIndex].explanation,
            quiz_id: quiz_id,
            username: username,
        };

        if (currentAnswer === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        try {
            await axios.post(`https://mindwarsai.onrender.com/api/questionattempted/`, questionDetails);
        } catch (error) {
            console.error('Error submitting answers:', error);
        }

        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setCurrentAnswer(null);
    };

    const handleSubmitQuiz = async () => {
        let finalScore = score;

        const questionDetails = {
            question: questions[currentQuestionIndex].question,
            correctAnswer: questions[currentQuestionIndex].answer,
            userAnswer: currentAnswer,
            explanation: questions[currentQuestionIndex].explanation,
            quiz_id: quiz_id,
            username: username,
        };

        if (currentAnswer === questions[currentQuestionIndex].answer) {
            finalScore += 1;
        }

        try {
            setLoading(true);
            await axios.post(`https://mindwarsai.onrender.com/api/questionattempted/`, questionDetails);
            const timeTaken = (Date.now() - timeStarted) / 1000; 
            await axios.post(`https://mindwarsai.onrender.com/api/quiz/${quiz_id}/submit`, {
                username: username,
                score: finalScore,
                time_taken: timeTaken,
            });
            setLoading(false);
            navigate(`/result/${quiz_id}/${username}`);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    useEffect(() => {
        if (quizStarted) {
            const timerId = setInterval(() => {
                if (timerLimit <= 0) {
                    clearInterval(timerId);
                    handleSubmitQuiz();
                } else {
                    setTimerLimit((prev) => prev - 1);
                }
            }, 1000);
            return () => clearInterval(timerId);
        }
    }, [quizStarted, timerLimit]);

    return (
        <div className='flex flex-col items-center justify-center h-screen p-4 md:p-8'>
            {loading && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
                    <Loading type="bars" color="#3565EC" />
                </div>
            )}
            {quizStarted && <Timer initialTime={timerLimit} />}
            {currentQuestionIndex < questions.length ? (
                <div className='flex flex-col items-center w-full max-w-lg'>
                    <h2 className="text-2xl md:text-4xl font-semibold text-center mt-4">
                        {questions[currentQuestionIndex].question}
                    </h2>
                    <ul className="mt-7 space-y-2 w-full">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <li
                                className={`block mx-auto p-2 bg-gray-200 hover:bg-gray-400 font-bold rounded cursor-pointer transition-all duration-300 ${currentAnswer === option ? 'bg-blue-300' : ''}`}
                                key={index}
                                onClick={() => handleAnswerClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                    <button
                        disabled={currentAnswer === null}
                        className={`font-bold py-2 px-4 mt-12 rounded-md transition-all duration-100 ${currentAnswer === null ? 'bg-gray-300 cursor-not-allowed opacity-50' : 'bg-green-400 hover:bg-green-600 cursor-pointer'}`}
                        onClick={currentQuestionIndex === questions.length - 1 ? handleSubmitQuiz : handleNextQuestion}
                    >
                        {currentQuestionIndex === questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
                    </button>
                </div>
            ) : (
                <div className='flex items-center justify-center w-full'>
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-5"
                        onClick={handleSubmitQuiz}
                    >
                        Submit Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizPage;
