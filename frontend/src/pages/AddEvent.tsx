import  { useState } from 'react';

const AddEvent = () => {
  const [name, setName] = useState<string>("");
  const [date, setDate] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response: Response = await fetch('/event/add', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, date: date, ongoing: false})
      });

      console.log(name, date);

      if (response.ok) {
        console.log("Event created successfully.");
      } else {
        console.error("Failed to create event.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Event name"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddEvent;
