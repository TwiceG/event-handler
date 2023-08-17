import { NavLink, useLocation } from 'react-router-dom';
import './../styles/styles.css';

function Header() {
    const location = useLocation();

    return (
        <header className="header">
            <div className="app-name">
                <h1>Tournament Organiser</h1>
            </div>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <NavLink to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/upcoming-events" className={`nav-link ${location.pathname === '/upcoming-events' ? 'active' : ''}`}>Upcoming Events</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/ongoing-events" className={`nav-link ${location.pathname === '/ongoing-events' ? 'active' : ''}`}>Ongoing Events</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-event" className={`nav-link ${location.pathname === '/add-event' ? 'active' : ''}`}>Add New Event</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/add-player" className={`nav-link ${location.pathname === '/add-player' ? 'active' : ''}`}>Add Player</NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
