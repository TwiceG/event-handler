import {useEffect, useState} from "react";
import {Event} from "../utils/interfaces.ts";
import {apiGet, apiPost} from "../utils/apiCalls.ts";


const AddPlayer = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [playerName, setPlayerName] = useState('');
    const [selectedEvents, setSelectedEvents] = useState<number[]>([]);

    const getEvents = async () => {
        const response = await apiGet('/event');
        const events = response as Event[]
        setEvents(events);
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        apiPost({name: playerName, eventIds: selectedEvents}, '/player/add', 'Player created successfully');
        window.location.reload()
    }


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const itemValue = Number(event.target.value);

        if (event.target.checked) {
            if (!selectedEvents.includes(itemValue)) {
                setSelectedEvents([...selectedEvents, itemValue]);
            }
        } else {
            const updatedItems: number[] = selectedEvents.filter((item) => item !== itemValue);
            setSelectedEvents(updatedItems);
        }
    };

    useEffect(() => {
        getEvents();
    }, [])

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={playerName}
                        onChange={(e) => setPlayerName(e.target.value)}
                        placeholder="Player name"
                    />

                    {events.map((event: Event) => (
                        <div>
                            <input type="checkbox" onChange={handleChange} value={event.id} id={event.name}/>
                            <label htmlFor={event.name}>{event.name}</label>
                        </div>
                    ))}

                    <button type="submit">Add</button>
                </form>
            </div>

        </div>
    )

}

export default AddPlayer;