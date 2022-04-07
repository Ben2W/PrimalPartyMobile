const FetchEventData = async(curEventID) =>{
    const url = 'http://localhost:8080/events/' + curEventID

    try {
        const res = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include'
            })
        return await res.json()
    } catch (e) {
        return e
    }
}

export default FetchEventData