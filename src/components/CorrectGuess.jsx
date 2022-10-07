export default function CorrectGuess({
    setIsGuessMade,
    setGuess,
    setIsWordReset,
    setIsGuessCorrect,
    isWordReset,
    currentWord,
    hasConceded,
}) {
    return (
        <div className="correct">
            <p className="correct__message">
                {hasConceded ? 'The word was ' : 'Correct, the word is '}
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
                className="button correct__reload"
            >
                PLAY AGAIN
            </button>
        </div>
    );
}
