import { useState, useEffect } from 'react';


Type
function EventsList() {

    const [events, setEvents] = useState([]);
    const [refresh, setRefresh] = useState(false);


    async function getData()  {
        const response :Response = await fetch('http://localhost:5000/event');
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

    
    async function deleteEvent(eventId:number) {  
    try {
      const response = await fetch(`http://localhost:5000/event/delete/${eventId}`, {
        method: "POST",
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
    

    useEffect (()=> {
        refreshData();
        setRefresh(false);
    },[refresh])
    
    if(events.length == 0) {
        return "LOOOOOOAAAADDDIIIING";
    } 

    return (
            <div>
                <div className="event-list">
                    {events.map((event) => (
                        <div className="card" key={event.id}> 
                            <div className="card-header">
                                {event.name}
                            </div>
                            <div className='card-body'>
                                {event.date}
                            </div>
                            
                            <div className="card-footer">
                            <input type='button' onClick={() => deleteEvent(event.id)} value="Delete" />
                            </div>
                        </div>
                    ))}
            </div>
                
            </div>
    )
}

export default EventsList;