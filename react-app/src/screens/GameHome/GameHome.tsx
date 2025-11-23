import React, { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { LockIcon, UnlockIcon, TrophyIcon, RefreshCwIcon } from "lucide-react";

// Application states
type AppState = "LOCKED" | "QUIZ" | "UNLOCKED";

// Math operation types
type Operation = "+" | "-" | "×";

interface Question {
  num1: number;
  num2: number;
  operation: Operation;
  correctAnswer: number;
}

export const GameHome = (): JSX.Element => {
  // State management
  const [appState, setAppState] = useState<AppState>("LOCKED");
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0); // in seconds
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  // Generate random math question
  // Logic: Creates simple arithmetic problems with numbers 1-20
  // Operations: addition, subtraction, multiplication
  const generateQuestion = (): Question => {
    const operations: Operation[] = ["+", "-", "×"];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    
    let num1: number, num2: number, correctAnswer: number;

    switch (operation) {
      case "+":
        // Addition: numbers between 1-20
        num1 = Math.floor(Math.random() * 20) + 1;
        num2 = Math.floor(Math.random() * 20) + 1;
        correctAnswer = num1 + num2;
        break;
      case "-":
        // Subtraction: ensure positive result
        num1 = Math.floor(Math.random() * 20) + 10;
        num2 = Math.floor(Math.random() * num1) + 1;
        correctAnswer = num1 - num2;
        break;
      case "×":
        // Multiplication: smaller numbers for easier calculation
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 * num2;
        break;
      default:
        num1 = 0;
        num2 = 0;
        correctAnswer = 0;
    }

    return { num1, num2, operation, correctAnswer };
  };

  // Start quiz
  const startQuiz = () => {
    setAppState("QUIZ");
    setProgress(0);
    setError("");
    setUserAnswer("");
    setCurrentQuestion(generateQuestion());
  };

  // Handle answer submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentQuestion || userAnswer.trim() === "") {
      setError("Please enter an answer");
      return;
    }

    const answer = parseInt(userAnswer);
    
    if (isNaN(answer)) {
      setError("Please enter a valid number");
      return;
    }

    // Check if answer is correct
    if (answer === currentQuestion.correctAnswer) {
      const newProgress = progress + 1;
      
      if (newProgress >= 5) {
        // Quiz completed successfully
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setAppState("UNLOCKED");
          setTimeRemaining(30 * 60); // 30 minutes in seconds
        }, 2000);
      } else {
        // Move to next question
        setProgress(newProgress);
        setCurrentQuestion(generateQuestion());
        setUserAnswer("");
        setError("");
      }
    } else {
      // Wrong answer - reset progress
      setError(`Wrong! The correct answer was ${currentQuestion.correctAnswer}. Starting over...`);
      setTimeout(() => {
        setProgress(0);
        setCurrentQuestion(generateQuestion());
        setUserAnswer("");
        setError("");
      }, 2000);
    }
  };

  // Countdown timer effect
  useEffect(() => {
    if (appState === "UNLOCKED" && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            setAppState("LOCKED");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [appState, timeRemaining]);

  // Format time as MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Relock function
  const relock = () => {
    setAppState("LOCKED");
    setTimeRemaining(0);
    setProgress(0);
  };

  // LOCKED STATE
  if (appState === "LOCKED") {
    return (
      <main className="bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 w-full h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-sm bg-slate-800/50 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-slate-700">
          <div className="flex flex-col items-center space-y-6">
            <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
              <LockIcon className="w-10 h-10 text-slate-400" />
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center">
              Entertainment Locked
            </h1>
            
            <p className="text-slate-300 text-center leading-relaxed text-sm">
              Access to entertainment is currently blocked. Complete the mathematical challenge to unlock 30 minutes of entertainment time.
            </p>
            
            <Button
              onClick={startQuiz}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl text-base shadow-lg transition-all active:scale-95"
            >
              Unlock Time
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // QUIZ STATE
  if (appState === "QUIZ") {
    if (showSuccess) {
      return (
        <main className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 w-full h-screen flex items-center justify-center p-4 overflow-hidden">
          <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex flex-col items-center space-y-4 animate-fade-in">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <TrophyIcon className="w-10 h-10 text-yellow-700" />
              </div>
              
              <h1 className="text-3xl font-bold text-green-700 text-center">
                Success!
              </h1>
              
              <p className="text-green-600 text-center text-base">
                You've unlocked 30 minutes of entertainment time!
              </p>
            </div>
          </div>
        </main>
      );
    }

    return (
      <main className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 w-full h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-800">Math Challenge</h2>
              <span className="text-base font-semibold text-purple-600">
                {progress}/5
              </span>
            </div>
            
            <Progress value={(progress / 5) * 100} className="h-2" />
            
            {currentQuestion && (
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 my-4">
                <p className="text-4xl font-bold text-center text-gray-800">
                  {currentQuestion.num1} {currentQuestion.operation} {currentQuestion.num2} = ?
                </p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer"
                className="w-full px-4 py-3 text-xl text-center border-2 border-purple-300 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                autoFocus
              />
              
              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-xl text-center text-sm">
                  {error}
                </div>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl text-base shadow-lg transition-all active:scale-95"
              >
                Submit Answer
              </Button>
            </form>
            
            <Button
              onClick={() => setAppState("LOCKED")}
              variant="ghost"
              className="w-full text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </Button>
          </div>
        </div>
      </main>
    );
  }

  // UNLOCKED STATE
  return (
    <main className="bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 w-full h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
            <UnlockIcon className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            Entertainment Unlocked!
          </h1>
          
          <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-2xl p-6 w-full">
            <p className="text-xs text-gray-600 text-center mb-2">Time Remaining</p>
            <p className="text-5xl font-bold text-center text-green-700 font-mono">
              {formatTime(timeRemaining)}
            </p>
          </div>
          
          <p className="text-gray-600 text-center text-sm">
            Enjoy your entertainment time! The timer will automatically lock when it reaches zero.
          </p>
          
          <Button
            onClick={relock}
            className="w-full bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold py-4 rounded-xl text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RefreshCwIcon className="w-5 h-5" />
            Relock Now
          </Button>
        </div>
      </div>
    </main>
  );
};
