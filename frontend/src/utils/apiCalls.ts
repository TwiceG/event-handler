

export async function apiGet(URL: string) {
    try {
        const response: Response = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            return response.json()
        }
    } catch (error) {
        console.error('error')
    }
}


export async function apiPost(payload: any, URL: string, message: string) {
    try {
        const response: Response = await fetch(URL, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            alert(message);
        } else {
            alert('OOPS! Something went wrong.')
        }
    } catch (error) {
        console.log(error);
    }
}