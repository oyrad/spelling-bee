import { useEffect, useState } from 'react';

import sun from '../images/sun.svg';
import moon from '../images/moon.svg';

export default function Navbar({ setDifficulty, wins, losses }) {
    const [isLightTheme, setIsLightTheme] = useState(undefined);

    useEffect(() => {
        const detectDarkTheme = window.matchMedia(
            '(prefers-color-scheme: dark)'
        );
        detectDarkTheme.matches
            ? setIsLightTheme(false)
            : setIsLightTheme(true);
    }, []);

    useEffect(() => {
        if (isLightTheme) {
            if (!document.body.classList.contains('dark-theme')) return;
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
        }
    }, [isLightTheme]);

    return (
        <nav className="navbar">
            <p className="navbar__title">SPELLING BEE</p>
            <span className="navbar__actions">
                <label className="navbar__label">Difficulty:</label>
                <select
                    onChange={e => setDifficulty(e.target.value)}
                    className="navbar__select"
                >
                    <option value="beginner">Beginner</option>
                    <option value="easy">Easy</option>
                    <option selected value="medium">
                        Medium
                    </option>
                    <option value="hard">Hard</option>
                    <option value="veryHard">Very hard</option>
                </select>
                {/*<p className="navbar__stats">{wins}/{wins + losses}</p>*/}
                <img
                    src={isLightTheme ? moon : sun}
                    onClick={() => setIsLightTheme(!isLightTheme)}
                    className="navbar__toggle"
                    alt="toggle"
                />
            </span>
        </nav>
    );
}
