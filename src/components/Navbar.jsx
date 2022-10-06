import bee from '../images/bee.svg';

export default function Navbar({ setDifficulty }) {
    return (
        <navbar className="navbar">
            <span className="navbar__logo">
                <p className="navbar__text">SPELLING BEE</p>
                <img src={bee} className="navbar__icon" alt="bee" />
            </span>
            <span>
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
            </span>
        </navbar>
    );
}
