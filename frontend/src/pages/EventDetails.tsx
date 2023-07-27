import  {useEffect, useState} from 'react';
import {Event} from "../utils/interfaces.ts";
import {useParams} from 'react-router-dom';
import {apiGet} from "../utils/apiCalls.ts";
import {Player} from "../utils/interfaces.ts";
import MachDataOrganizer from "../components/MachDataOrganizer.tsx";

interface EventDetailsParams {
    id: string;
}

const EventDetails = () => {
    const [details, setDetails] = useState<Event | undefined>();
    const [players, setPlayers] = useState<Player[] | undefined>()
    const {id} = useParams<EventDetailsParams>();

    const fetchPlayers = async () => {
        const response = await apiGet(`/event/${id}/players`)
        const players = response as Player[]
        console.log(players)
        setPlayers(players)

    }

    const fetchEvent = async () => {
        try {
            const response = await fetch(`/event/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                const event: Event = data as Event;
                setDetails(event);
            } else {
                console.error('Event not found!!');
            }
        } catch (error) {
            console.error('Error occurred while fetching event:', error);
        }
    };

    useEffect(() => {
        fetchEvent();
        fetchPlayers()
    }, []);

    if (details === undefined && players === undefined) {
        return <div>LOOOOAAADIIIING</div>;
    }

    return (
        <div>
            <h1>{details.name}</h1>
            <h3>{details.date}</h3>
            <h3>Blalalblaa</h3>

              {players.map((player) => (
                  <div key={player.id}>{player.name}</div>
              )) }

            <MachDataOrganizer/>
        </div>
    );
};

export default EventDetails;
