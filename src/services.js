export const submitWithParams = (argument, environments, time, characters) => {
    characters = characters.split(',')
    let body = {
        argument: argument,
        environments: environments,
        time: time,
        characters: characters
    }
    return fetch('http://localhost:1312/metabook/new/from_params', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const submitWithPrompt = (prompt) => {
    let body = {
        prompt: prompt
    }
    return fetch('http://localhost:1312/metabook/new/from_prompt', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const savePdf = (book) => {
    return fetch('http://localhost:1312/metabook/pdf', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(book)
    })
}
