const getEvents = async () => {
    const url = 'http://localhost:8080/events'

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

export default getEvents()
