export default function CorrectGuess({
    setIsGuessMade,
    setGuess,
    setIsWordReset,
    isWordReset,
}) {
    return (
        <span>
            <p>ou win!</p>
            <button
                onClick={() => {
                    setIsGuessMade(false);
                    setGuess('');
                    setIsWordReset(!isWordReset);
                }}
            >
                Play again
            </button>
        </span>
    );
}
