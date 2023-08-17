import React from "react";
import {EventCardProps} from "../../interfaces/EvenetCardProps.ts";
import {Link} from "react-router-dom";

const OngoingEventCard: React.FC<EventCardProps> = ({ event, deleteEvent }) => {
    return (
        <div className="card" key={event.id}>
            <div className="card-details">
                <div className="card-header">
                    {event.name}
                </div>
                <div className='card-body'>
                    {event.date}
                </div>
            </div>
            <div className="card-buttons">
                <button className='card-button' onClick={() => deleteEvent(event.id)} >Delete</button>
                <Link to={`/event-details/${event.id}`}><button className='card-button'>Show Event</button></Link>
            </div>
        </div>
    );
};

export default OngoingEventCard