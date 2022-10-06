export default function CorrectGuess({
    setIsGuessMade,
    setGuess,
    setIsWordReset,
    setIsGuessCorrect,
    isWordReset,
    currentWord,
}) {
    return (
        <div className="correct">
            <p className="correct__message">
                Correct, the word was{' '}
                <a
                    href={`https://www.thefreedictionary.com/${currentWord}`}
                    target="_blank"
                    rel="noreferrer"
                    className="correct__link"
                >
                    {currentWord}
                </a>
                .
            </p>
            <button
                onClick={() => {
                    setIsGuessMade(false);
                    setGuess('');
                    setIsWordReset(!isWordReset);
                    setIsGuessCorrect(undefined);
                }}
                className="button"
            >
                Play again
            </button>
        </div>
    );
}
