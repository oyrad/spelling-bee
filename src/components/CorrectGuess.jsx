export default function CorrectGuess({
    setIsGuessMade,
    setGuess,
    setIsWordReset,
    isWordReset,
    currentWord
}) {
    return (
        <>
            <p>you win!</p>
            <button
                onClick={() => {
                    setIsGuessMade(false);
                    setGuess('');
                    setIsWordReset(!isWordReset);
                }}
            >
                Play again
            </button>
            <a href={`https://www.thefreedictionary.com/${currentWord}`} target="_blank" rel="noreferrer">LINK</a>
        </>
    );
}
