import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';
import CorrectGuess from './components/CorrectGuess';
import Navbar from './components/Navbar';

import { wordLengths } from './util/wordLengths';
import Player from './components/Player';
import Guesses from './components/Guesses';

export default function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [guess, setGuess] = useState('');

    const [isGuessMade, setIsGuessMade] = useState(false);
    const [isGuessCorrect, setIsGuessCorrect] = useState(undefined);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isWordReset, setIsWordReset] = useState(false);

    const [pastGuesses, setPastGuesses] = useState([]);

    const [winCounter] = useState(localStorage.getItem('wins') || 0);

    useEffect(() => {
        setIsLoading(true);
        setGuess('');
        setIsGuessMade(false);
        setIsGuessCorrect(false);
        setPastGuesses([]);

        const [minLength, maxLength] = wordLengths(difficulty);

        const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/',
            params: {
                letterPattern: `^[a-zA-Z]{${minLength},${maxLength}}$`,
                random: true,
                hasDetails: 'definitions',
            },
            headers: {
                'X-RapidAPI-Key':
                    '60cbe4ea68mshab924fcc87ae084p1b19dejsnf5759fb86e28',
                'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setCurrentWord(response.data);
                setIsLoading(false);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [difficulty, isWordReset]);

    const handleSubmit = e => {
        e.preventDefault();
        setIsGuessMade(true);
        if (pastGuesses.includes(guess)) return;
        else setPastGuesses(prevGuesses => [...prevGuesses, guess]);
        if (guess.toLowerCase() === currentWord.word) {
            if (winCounter === 0) {
                localStorage.setItem('wins', 1);
            } else {
                localStorage.setItem(
                    'wins',
                    parseInt(localStorage.getItem('wins')) + 1
                );
            }
            setIsGuessCorrect(true);
        } else {
            setIsGuessCorrect(false);
        }
    };

    useEffect(() => {
        setIsGuessMade(false);
        if (guess.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [guess]);

    return (
        <div className="container">
            <Navbar
                setDifficulty={setDifficulty}
                wins={localStorage.getItem('wins') || 0}
            />
            <div className="content-container">
                <Player currentWord={currentWord} isLoading={isLoading} />
                {isGuessCorrect ? (
                    <CorrectGuess
                        setGuess={setGuess}
                        setIsGuessMade={setIsGuessMade}
                        setIsWordReset={setIsWordReset}
                        setIsGuessCorrect={setIsGuessCorrect}
                        isWordReset={isWordReset}
                        currentWord={currentWord.word}
                    />
                ) : (
                    <form onSubmit={handleSubmit} className="form">
                        <input
                            name="guess"
                            placeholder="Type your answer here..."
                            autoComplete="off"
                            spellCheck="false"
                            value={guess}
                            onChange={e => setGuess(e.target.value)}
                            onAnimationEnd={() => setIsGuessMade(false)}
                            className={`form__input ${
                                isGuessMade && 'form__input-incorrect'
                            }`}
                        />
                        <button className="button" disabled={isDisabled}>
                            GUESS
                        </button>
                    </form>
                )}
                <Guesses previousGuesses={pastGuesses} />
            </div>
        </div>
    );
}
