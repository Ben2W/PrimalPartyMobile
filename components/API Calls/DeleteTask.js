const DeleteTask = async(curEventID, curTaskID) =>{
    const url = 'https://primalpartybackend.azurewebsites.net/events/' + curEventID + '/tasks/' + curTaskID;

    try {
        const res = await fetch(url,
            {
                method: 'DELETE',
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

export default DeleteTask