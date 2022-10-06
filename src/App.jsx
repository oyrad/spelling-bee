import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';
import CorrectGuess from './components/CorrectGuess';
import GuessList from './components/GuessList';
import Navbar from './components/Navbar';
import Player from './components/Player';

import { getOptions } from './util/getOptions';

export default function App() {
    const [currentWord, setCurrentWord] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [guess, setGuess] = useState('');

    const [isGuessMade, setIsGuessMade] = useState(false);
    const [isGuessCorrect, setIsGuessCorrect] = useState(undefined);
    const [hasConceded, setHasConceded] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isWordReset, setIsWordReset] = useState(false);

    const [pastGuesses, setPastGuesses] = useState([]);
    const [pastGuessIndex, setPastGuessIndex] = useState(null);

    const [winCounter, setWinCounter] = useState(
        localStorage.getItem('wins') || 0
    );

    useEffect(() => {
        setIsLoading(true);
        setGuess('');
        setIsGuessMade(false);
        setIsGuessCorrect(false);
        setHasConceded(false);
        setPastGuesses([]);

        const options = getOptions(difficulty);
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
        if (pastGuesses.includes(guess))
            setPastGuessIndex(pastGuesses.indexOf(guess));
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
            setWinCounter(prevCount => prevCount + 1);
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
                        hasConceded={hasConceded}
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
                        <div className="form__buttons">
                            <button
                                className="button form__button-guess"
                                type="submit"
                                disabled={isDisabled}
                            >
                                GUESS
                            </button>
                            <button
                                className="button form__button-concede"
                                type="button"
                                onClick={() => {
                                    setHasConceded(true);
                                    setIsGuessCorrect(true);
                                }}
                            >
                                CONCEDE
                            </button>
                        </div>
                    </form>
                )}
                <GuessList
                    previousGuesses={pastGuesses}
                    previousGuessIndex={pastGuessIndex}
                    setPreviousGuessIndex={setPastGuessIndex}
                    isGuessCorrect={isGuessCorrect}
                    hasConceded={hasConceded}
                />
            </div>
        </div>
    );
}
