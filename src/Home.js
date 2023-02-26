import {useState} from 'react'

const Home = () => {
    const [book, setBook] = useState([{txt: 'read here'}])
    const [argument, setArgument] = useState('a trip')
    const [environments, setEnvironment] = useState('london')
    const [time, setTime] = useState('industrial revolution')
    const [characters, setCharacters] = useState('sherlock holmes, mammeta')
    return (<div className='Home'>
        <input placeholder='a trip' onChange={(e) => {
            setArgument(e.target.value ? e.target.value : argument)
        }}/>
        <input placeholder='london' onChange={(e) => {
            setEnvironment(e.target.value ? e.target.value : environments)
        }}/>
        <input placeholder='industrial revolution' onChange={(e) => {
            setTime(e.target.value ? e.target.value : time)
        }}/>
        <input placeholder='sherlock holmes, mammeta' onChange={(e) => {
            setCharacters(e.target.value ? e.target.value : characters)
        }}/>
        <button
            onClick={() => {
                setBook([{txt: '... generating ...'}])
                submit(argument, environments, time, characters)
                    .then(res => res.json()
                        .then(json => setBook(json['data']))
                    )
            }}>submit
        </button>
        <br/>
        <Book book={book}/>
    </div>)
}

const Book = (props) => {
    const [pageNumber, setPageNumber] = useState(0)
    return (<div className='Book'>
        <div>
            <h3>{props.book[pageNumber]['txt']}</h3>
            <button
                onClick={() => pageNumber > 0 ?
                    setPageNumber(pageNumber - 1) : setPageNumber(pageNumber)}>&lt;
            </button>
            <img src={props.book[pageNumber]['url']} alt=''/>
            {pageNumber}
            <button
                onClick={() => pageNumber < props.book.length - 1 ?
                    setPageNumber(pageNumber + 1) : setPageNumber(pageNumber)}>&gt;
            </button>
        </div>
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
