export const submitWithParams = (argument, environments, time, characters) => {
    characters = characters.split(',')
    let body = {
        txt_request: {
            argument: argument,
            environments: environments,
            time: time,
            characters: characters
        },
        style: 'comic book' // should be taken from be service
    }
    return fetch('http://localhost:1312/metabook/new/from_params', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const submitWithPrompt = (prompt) => {
    let body = {
        txt_request: {
            prompt: prompt
        },
        style: 'comic book' // should be taken from be service
    }
    return fetch('http://localhost:1312/metabook/new/from_prompt', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const savePdf = (book) => {
    return fetch('http://localhost:1312/metabook/export/pdf', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(book)
    })
}
