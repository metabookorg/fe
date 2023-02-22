import {useState} from 'react'

const Home = () => {
    const [argument, setArgument] = useState('a trip')
    const [environments, setEnvironment] = useState('london')
    const [time, setTime] = useState('industrial revolution')
    const [characters, setCharacters] = useState('sherlock holmes, mammeta')
    const [book, setBook] = useState('read here')

    return (
        <div className='Home'>
            <input placeholder={argument} onChange={(e) => {
                setArgument(e.target.value ? e.target.value : argument)
            }}/>
            <input placeholder={environments} onChange={(e) => {
                setEnvironment(e.target.value ? e.target.value : environments)
            }}/>
            <input placeholder={time} onChange={(e) => {
                setTime(e.target.value ? e.target.value : time)
            }}/>
            <input placeholder={characters} onChange={(e) => {
                setCharacters(e.target.value ? e.target.value : characters)
            }}/>
            <button
                onClick={() => submit(argument, environments, time, characters).then(res => setBook(res.toString()))}>submit
            </button>
            <br/>
            <h3>{book}</h3>
        </div>
    )
}

const submit = (argument, environments, time, characters) => {
    characters = characters.split(',')
    let body = {
        argument: argument,
        environments: environments,
        time: time,
        characters: characters
    }
    return fetch('http://localhost:1312/metabook', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export default Home
