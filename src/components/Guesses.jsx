export default function Guesses({ previousGuesses }) {
    return (
        previousGuesses.length > 0 && (
            <div className="incorrect">
                <p className="incorrect__title">Your Guesses</p>
                {previousGuesses.map((guess, index) => (
                    <p key={index}>{guess}</p>
                ))}
            </div>
        )
    );
}
