import React, {useState, useEffect} from 'react';
import EventCard from "../../components/card/EventCard.tsx";
import {Event} from "../../utils/interfaces.ts";


const UpcomingEvents: React.FC = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);


    async function getData() {
        const response: Response = await fetch('/event');
        return response.json();
    }

    function refreshData() {
        getData().then(
            (data) => {
                setEvents(data);
                console.log(events);
            }
        )
    }


    async function deleteEvent(eventId: number) {
        try {
            const response = await fetch(`/event/delete/${eventId}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (response.ok) {
                console.log("Event deleted successfully.");
                setRefresh(true);
            } else {
                console.error("Cannot delete this event.");
            }
        } catch (error) {
            console.error(error);
        }
    }


    useEffect(() => {
        refreshData();
        setRefresh(false);
    }, [refresh])

    if (events.length == 0) {
        return (
            <div className="content">
                <h1 className="page-title">Upcoming Events</h1>
                <h2 className="message">No Events</h2>
            </div>
        )
    }

    return (
        <div className="content">
            <h1 className="page-title">Upcoming Events</h1>
            <div className="event-list">
                {events.map((event) => (
                    <EventCard event={event} deleteEvent={deleteEvent}/>
                ))}
            </div>

        </div>
    )
}

export default UpcomingEvents;
