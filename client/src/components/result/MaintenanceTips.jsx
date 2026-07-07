function MaintenanceTips({ tips }) {

    return (
        <div className="card">

            <div className="card-title">
                🌿 Maintenance Tips
            </div>

            <div className="card-sub">
                Key practices for yield
            </div>

            <ul className="tip-list">
                {tips.map((tip, index) => (
                    <li
                        key={index}
                        className="tip-item"
                    >
                        🌿 {tip}
                    </li>
                ))}
            </ul>

        </div>
    );
}

export default MaintenanceTips;