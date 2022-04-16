const GetTasks = async () => {
    const url = 'https://primalpartybackend.azurewebsites.net/tasks'

    try {
        const res = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include'
            })
        const tasks = await res.json()
        return tasks.tasks
    } catch (e) {
        return e
    }
}

export default GetTasks()
