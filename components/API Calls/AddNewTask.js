
const AddNewTask = async ({formData}, eventID, currentUserID) => {
    const url = 'https://primalpartybackend.azurewebsites.net/events/' + eventID + '/tasks'
    console.log(url);

    const details = {
        name: formData.name,
        description: formData.description,
        assignees: formData.assignees.map(obj => obj._id),
    }

    let formBody = [];
    for (let property in details) {
        if (property == 'assignees'){
            for (let i = 0; i < details.assignees.length; i++){
                console.log(details.assignees.length)
                let encodedKey = encodeURIComponent(`assignees[${i}]`);
                let encodedValue = encodeURIComponent(details.assignees[i]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            break;
        }
        else {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
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
        let bread = await res.json();
        // console.log(bread);
        return bread
    } catch (e) {
        return e
    }

}

export default AddNewTask;