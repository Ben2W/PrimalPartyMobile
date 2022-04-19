
const EditEvent = async ({formData}, eventID) => {
    const url = 'https://primalpartybackend.azurewebsites.net/events/' + eventID;

    const details = {
        name: formData.name,
        description: formData.description,
        date: formData.date,
        address: formData.location,
        tags: [],
    }

    let formBody = [];
    for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    try {
        const res = await fetch(url,
            {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include',
                body: formBody
            })
        let bread = await res.json();
        return bread;
    } catch (e) {
        return e
    }

}

export default EditEvent;