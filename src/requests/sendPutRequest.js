const sendPutRequest = async (body, path) => {
    return (await fetch(path, {
        method: "PUT",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })).json();
}

export default sendPutRequest;