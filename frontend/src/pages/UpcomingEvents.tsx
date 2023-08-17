import React, {useState, useEffect} from 'react';
import EventCard from "../components/cards/EventCard.tsx";
import {Event} from "../interfaces/Event.ts";
import {apiGet} from "../utils/apiCalls.ts";
import "./../styles/upcoming-events-page.css"
import "./../styles/styles.css"


const UpcomingEvents: React.FC = () => {


    const [events, setEvents] = useState<Event[]>([]);
    const [refresh, setRefresh] = useState<boolean>(false);
    const testData:Event[] = [
        {
            "date": "2022-12-27T18:00",
            "id": 2,
            "name": "FIFA"
        },
        {
            "date": "2022-12-27T18:00",
            "id": 3,
            "name": "TEKKEN"
        },
        {
            "date": "2022-12-27T18:00",
            "id": 5,
            "name": "Smash Bros"
        },
        {
            "date": "2023-08-14T13:53",
            "id": 6,
            "name": "Wind Jammers"
        },
        {
            "date": "2023-08-14T13:53",
            "id": 7,
            "name": "Mario Kart"
        },
        {
            "date": "2023-08-14T13:53",
            "id": 8,
            "name": "Foosball"
        }
    ]


    async function getData(){

        try {
            const response = await apiGet("https://localhost:8080/event");
            if (response && response.ok) {
                const data = await response.json();
                return data;
            } else {
                console.log("Bad response at UpcomingEvents.getData")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function refreshData() {
        try {
            const data = await getData();
            setEvents(data);
            console.log(events);
        } catch (error) {
            console.log("Error in refreshing data on the UpComingEvents page:", error)
        }
    }

    function addTestData() {
        setEvents(testData);
    }

    useEffect(() => {
        // refreshData().then(() => {
        //     setRefresh(false);
        // });
        addTestData();
    }, [refresh]);



    if (events.length == 0) {
        return (
            <div className="content">
                <h2 className="message">No Upcoming Events</h2>
            </div>
        )
    }

    return (
        <div className="upcoming-events-container">
            <h1 className="page-title">Upcoming Events</h1>
            <div className="event-cards-container">
                {events.map(event => (
                    <EventCard key={event.id} event={event}/>
                ))}
            </div>

        </div>
    )
}

export default UpcomingEvents;
