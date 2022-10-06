export default function GuessList({
    previousGuesses,
    previousGuessIndex,
    setPreviousGuessIndex,
    isGuessCorrect,
    hasConceded,
}) {
    return (
        previousGuesses.length > 0 && (
            <div className="incorrect">
                <p className="incorrect__title">Your Guesses</p>
                {previousGuesses.map((guess, index) => (
                    <p
                        key={index}
                        className={`${
                            previousGuessIndex === index
                                ? 'incorrect__pastGuess'
                                : undefined
                        } ${
                            isGuessCorrect &&
                            index === previousGuesses.length - 1 &&
                            !hasConceded
                                ? 'incorrect__correct'
                                : undefined
                        }`}
                        onAnimationEnd={() => setPreviousGuessIndex(null)}
                    >
                        {guess}
                    </p>
                ))}
            </div>
        )
    );
}
