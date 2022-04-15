const SearchUsers = async (input) => {
    input = input.trim()
    let url = 'https://primalpartybackend.azurewebsites.net/users' + '?q=' + input;
    console.log(url)
    // return url.json();

    try {
        const res = await fetch(url,
            {
                method: 'GET',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
                },
                credentials: 'include',
            })
            let people = await res.json();
            // console.log(people.users)
            return people.users
    } catch (e) {
        return e
    }
}

export default SearchUsers