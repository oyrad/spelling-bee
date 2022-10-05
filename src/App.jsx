import { useEffect, useState } from 'react';

import axios from 'axios';

import './App.css';
import CorrectGuess from './components/CorrectGuess';
import Navbar from './components/Navbar';
import play from './images/play.svg';

const App = () => {
    const [currentWord, setCurrentWord] = useState('');
    const [difficulty, setDifficulty] = useState('medium');
    const [guess, setGuess] = useState('');
    const [isGuessMade, setIsGuessMade] = useState(false);
    const [isGuessCorrect, setIsGuessCorrect] = useState(undefined);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isWordReset, setIsWordReset] = useState(false);

    const spokenWord = new SpeechSynthesisUtterance();

    useEffect(() => {
        let minLength;
        let maxLength;
        switch (difficulty) {
            case 'beginner':
                minLength = 4;
                maxLength = 6;
                break;
            case 'easy':
                minLength = 7;
                maxLength = 10;
                break;
            case 'medium':
                minLength = 11;
                maxLength = 14;
                break;
            case 'hard':
                minLength = 15;
                maxLength = 19;
                break;
            case 'veryHard':
                minLength = 20;
                maxLength = 24;
                break;
            case 'impossible':
                minLength = 25;
                maxLength = 75;
                break;
        }

        const options = {
            method: 'GET',
            url: 'https://wordsapiv1.p.rapidapi.com/words/',
            params: {
                letterPattern: `^[a-zA-Z]{${minLength},${maxLength}}$`,
                random: true,
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
                setCurrentWord(response.data.word);
                console.log(response.data.word);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, [difficulty, isWordReset]);

    const handleSubmit = e => {
        e.preventDefault();
        setIsGuessMade(true);
        if (guess.toLowerCase() === currentWord) {
            setIsGuessCorrect(true);
        } else {
            setIsGuessCorrect(false);
        }
    };

    useEffect(() => {
        if (guess.length > 0) setIsDisabled(false);
        else setIsDisabled(true);
    }, [guess]);

    return (
        <div className="container">
            <Navbar setDifficulty={setDifficulty} />
            <span className="play">
                <img
                    src={play}
                    onClick={() => {
                        spokenWord.text = currentWord;
                        window.speechSynthesis.speak(spokenWord);
                    }}
                    className="play__btn"
                />
                <p className="play__text">PLAY THE WORD</p>
            </span>
            <form onSubmit={handleSubmit} className="form">
                <input
                    name="guess"
                    placeholder="Type your answer here..."
                    value={guess}
                    onChange={e => setGuess(e.target.value)}
                    className="form__input"
                />
                <button className="form__button" disabled={isDisabled}>
                    GUESS
                </button>
            </form>
            {isGuessMade &&
                (isGuessCorrect ? (
                    <CorrectGuess
                        setGuess={setGuess}
                        setIsGuessMade={setIsGuessMade}
                        setIsWordReset={setIsWordReset}
                        isWordReset={isWordReset}
                    />
                ) : (
                    <p>incorrect</p>
                ))}
        </div>
    );
};

export default App;
