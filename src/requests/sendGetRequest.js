const sendGetRequest = async (path) => {
    return (await fetch(path, {
        method: "GET",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
    })).json();
}

export default sendGetRequest;