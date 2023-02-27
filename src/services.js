const baseUrl = 'http://localhost:1312/metabook'

export const submitWithParams = (argument, environments, time, characters, style) => {
    characters = characters.split(',')
    let body = {
        txt_request: {
            argument: argument,
            environments: environments,
            time: time,
            characters: characters
        },
        style: style
    }
    return fetch(baseUrl + '/new/from_params', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const submitWithPrompt = (prompt, style) => {
    let body = {
        txt_request: {
            prompt: prompt
        },
        style: style
    }
    return fetch(baseUrl + '/new/from_prompt', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export const savePdf = (book) => {
    return fetch(baseUrl + '/export/pdf', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(book)
    })
}

export const getStyles = () => {
    return fetch(baseUrl + '/static/img_styles', {
        method: 'GET'
    })
}
