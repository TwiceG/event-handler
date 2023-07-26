import {apiPost} from "../../utils/apiCalls.ts";
import {Event} from "../../interfaces/Event.ts";


export interface EventCardProps {
    event: Event;
    deleteEvent: (id: number) => void;
}

const EventCard = ({ event, deleteEvent }: EventCardProps) => {

    const startEvent = async (eventId: number) => {
        const url = "/event/start"
        const message = "Event Started"
        apiPost(eventId, url, message)
    }

    return (
        <div className="card" key={event.id}>
            <div className="card-details">
                <div className="card-header">{event.name}</div>
                <div className="card-body">{event.date}</div>
            </div>
            <div className="card-buttons">
                <button
                    className="card-button"
                    onClick={() => deleteEvent(event.id)}
                >Delete</button>
                <button className="card-button"
                        onClick={() => startEvent(event.id)}
                >Start Event</button>
            </div>
        </div>
    );
};

export default EventCard;
