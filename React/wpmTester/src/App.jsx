import { wpmWords } from '../composables/wordList';
import { WordContainer } from './components/wordContainer';
import { InputUser } from './components/userInput';
import { Timer } from './components/timer';
import { StartGame } from './components/startGame';
import { shuffleList, breakWord } from '../composables/methodes';
import './App.css';
import { useState, useEffect } from 'react';

const listShuffled = shuffleList(wpmWords);

function App() {
  const [userReady, setUserReady] = useState(false);
  function handleClickUserReady() {
    setUserReady(!userReady);
  }

  const [timeRemaining, setTimeRemaining] = useState(null);
  function updateTimer(newTimer) {
    setTimeRemaining(newTimer);
  }

  const [isFirstInput, setIsFirstInput] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const [isSyntaxeCorrect, setIsSyntaxeCorrect] = useState(true);
  function handleInputChange(newInput) {
    setUserInput(newInput);
    checkWord(newInput);
    if (!isFirstInput) {
      if(newInput.trim().length > 0) {
        setIsFirstInput(true);
      }
    }
    setIsSyntaxeCorrect(checkSyntaxe(newInput.split(''), breakWord(listShuffled[currentWord])));
  }

  function checkSyntaxe(input, word) {
    for(let i = 0; i < input.length; i++) {
      if(input[i] !== word[i]) {
        return false;
      }
    }
    return true
  }

  const [userInput, setUserInput] = useState('');
  function checkWord(input) {
    if (input.trim() === listShuffled[currentWord]) {
      setCurrentWord((current) => current + 1);
      setUserInput('');
    }
  }

  function reset() {
    setUserReady(false);
    setTimeRemaining(null);
    setCurrentWord(0);
    setUserInput('');
    setIsFirstInput(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl p-4 bg-white shadow-lg rounded-lg">
        <h1 className="font-bold text-center text-4xl mb-4">Typing Test</h1>
        {!userReady && (
          <div className="flex-col justify-center">
            <StartGame clickUser={handleClickUserReady} />
          </div>
        )}

        {userReady && timeRemaining !== 0 && (
          <div className="space-y-4">
            <Timer isReady={userReady} onTimerChange={updateTimer} isFirstInput={isFirstInput}/>
            <WordContainer words={listShuffled} start={currentWord} limit={currentWord + 5} isSyntaxeCorrect={isSyntaxeCorrect}/>
            <InputUser value={userInput} placeholder="Start here" onInputChange={handleInputChange} />
            <button className='ml-4' onClick={reset}>Reset</button>
          </div>
        )}

        {timeRemaining === 0 && (
          <div className="text-center mt-4">
            <h1 className="text-xl font-semibold">Your WPM: {currentWord}</h1>
            <button 
              onClick={reset} 
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Replay ?
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
