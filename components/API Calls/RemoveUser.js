const RemoveUser = async(curEventID, curUserID) =>{
    const url = 'https://primalpartybackend.azurewebsites.net/events/' + curEventID + "/guests/" + curUserID;
    console.log(url)
    try {
        const res = await fetch(url,
            {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include'
            })
        let newRes = await res.json();
        console.log(newRes)
        return newRes;
    } catch (e) {
        return e
    }
}

export default RemoveUser