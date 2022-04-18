const GetEvents = async () => {
    const url = 'https://primalpartybackend.azurewebsites.net/events'
    console.log('im emin');

    try {
        const res = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include'
            })
        const events = await res.json()
        return events.events
    } catch (e) {
        return e
    }
}

export default GetEvents
