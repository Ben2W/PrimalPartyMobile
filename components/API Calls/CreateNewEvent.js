
const CreateNewEvent = async ({ formData }) => {
    const url = 'https://primalpartybackend.azurewebsites.net/events'

    const details = {
        name: formData.name,
        description: formData.description,
        date: formData.date,
        address: formData.location || "TBD",
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
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include',
                body: formBody
            })
        return await res.json();
    } catch (e) {
        return e
    }

}

export default CreateNewEvent;