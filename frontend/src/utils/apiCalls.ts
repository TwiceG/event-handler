export async function apiGet(URL: string) {
    try {
        const response: Response = await fetch(URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (response.ok) {
            return response;
        } else {
            console.log("Bad response at apiCalls.apiGet()");
            console.log(response.headers);
        }
    } catch (error) {
        console.log(error);
    }
}

export async function apiPost(payload: any, URL: string, message: string) {
    try {
        const response: Response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (response.ok) {
            alert(message);
        } else {
            alert('Bad response at apiCalls.apiPost()')
        }
    } catch (error) {
        console.log(error);
    }
}