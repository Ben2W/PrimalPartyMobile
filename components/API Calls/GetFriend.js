const GetEvents = async (friendID) => {
    const url = 'https://primalpartybackend.azurewebsites.net/friends/' + friendID

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

export default GetFriend;
