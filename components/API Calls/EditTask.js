
const EditTask = async ({formData}, eventID, taskID) => {
    const url = 'https://primalpartybackend.azurewebsites.net/events2/' + eventID + '/tasks/' + taskID

    // console.log(formData.assignees);

    const details = {
        name: formData.name,
        description: formData.description,
        assignees: formData.assignees.map(obj => obj._id),
        done: formData.done,
    }

    let formBody = [];
    for (let property in details) {
        if (property == 'assignees'){
            for (let i = 0; i < details.assignees.length; i++){
                let encodedKey = encodeURIComponent(`assignees[${i}]`);
                let encodedValue = encodeURIComponent(details.assignees[i]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
        }
        else {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
    }
    formBody = formBody.join("&");
    // console.log(formBody)
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
        // console.log(bread);
        return bread
    } catch (e) {
        return e
    }

}

export default EditTask;