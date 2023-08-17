import { useState } from 'react';

interface DeleteEventResult {
    deleteEvent: (eventId: number) => Promise<void>;
    isLoading: boolean;
    error: Error | null;
}

function useDeleteEvent(): DeleteEventResult {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const deleteEvent = async (eventId: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(`/api/events/${eventId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete event');
                console.log(response.json())
            }

        } catch (error: any) {
            setError(error);
            console.log(error.message)
        } finally {
            setIsLoading(false);
        }
    };

    return { deleteEvent, isLoading, error };
}

export default useDeleteEvent;
