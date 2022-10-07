import { useEffect, useState } from 'react';

import sun from "../images/sun.svg"
import moon from "../images/moon.svg"

export default function Navbar({ setDifficulty, wins }) {
    const [isLightTheme, setIsLightTheme] = useState(undefined)

    useEffect(() => {
        const detectDarkTheme = window.matchMedia("(prefers-color-scheme: dark)")
        detectDarkTheme.matches ? setIsLightTheme(false) : setIsLightTheme(true)
    }, [])

    useEffect(() => {
        if (isLightTheme) {
            if (document.body.classList.contains("dark-theme")) { document.body.classList.remove("dark-theme") }
        } else {
            document.body.classList.add("dark-theme")
        }
    }, [isLightTheme])

    return (
        <nav className="navbar">
            <span className="navbar__logo">
                <p className="navbar__text">SPELLING BEE</p>
            </span>
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
                <p className="navbar__stats">Wins: {wins}</p>
                <img src={isLightTheme ? moon : sun} onClick={() => setIsLightTheme(!isLightTheme)} className="navbar__toggle" alt="toggle" />
            </span>
        </nav>
    );
}
