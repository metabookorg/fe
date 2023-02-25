import {useState} from 'react'

const Home = () => {
    const [book, setBook] = useState([{txt: 'read here'}])
    const [argument, setArgument] = useState('a trip')
    const [environments, setEnvironment] = useState('london')
    const [time, setTime] = useState('industrial revolution')
    const [characters, setCharacters] = useState('sherlock holmes, mammeta')
    return (<div className='Home'>
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
            onClick={() => submit(argument, environments, time, characters)
                .then(res => res.json()
                    .then(json => setBook(json['data']))
                )}>submit
        </button>
        <br/>
        <Book book={book}/>
    </div>)
}

const Book = (props) => {
    let pages = []
    for (let page of props.book) {
        // tried to add key prop to list item but didn't work
        pages.push(<Page txt={page['txt']} url={page['url']}/>)
    }
    return (<div className='Book'>
        <ul>{pages}</ul>
    </div>)
}

const Page = (props) => {
    return (<div className='Page'>
        <h3>{props.txt}</h3>
        <img src={props.url} alt=''/>
    </div>)
}

const submit = (argument, environments, time, characters) => {
    characters = characters.split(',')
    let body = {
        argument: argument,
        environments: environments,
        time: time,
        characters: characters
    }
    return fetch('http://localhost:1312/metabook/new', {
        method: 'POST',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(body)
    })
}

export default Home
