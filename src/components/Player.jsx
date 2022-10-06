import play from '../images/play.svg';
import speaker from '../images/speaker.svg';

export default function Player({ currentWord, isLoading }) {
    const speech = new SpeechSynthesisUtterance();

    return (
        <div className={isLoading ? 'play play-loading' : 'play'}>
            <img
                src={play}
                onClick={() => {
                    speech.text = currentWord.word;
                    window.speechSynthesis.speak(speech);
                }}
                className="play__btn"
                alt="play-button"
            />
            <span
                onClick={() => {
                    speech.text = currentWord.results[0].definition;
                    window.speechSynthesis.speak(speech);
                }}
                disabled={isLoading}
                className="play__definition"
            >
                <img src={speaker} className="play__speaker" />
                <p>Definition</p>
            </span>
        </div>
    );
}
