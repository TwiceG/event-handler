import { Link } from 'react-router-dom';
import './../../styles/event-card.css'; // Import the CSS file for styling

interface EventDetailsButtonProps {
    eventId: number; // or whatever type your event IDs are
}

function EventDetailsButton({ eventId }: EventDetailsButtonProps) {
    return (
        <Link to={`/event/${eventId}`} className="event-details-button">
            View Details
        </Link>
    );
}

export default EventDetailsButton;
