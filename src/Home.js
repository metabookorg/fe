import {useState} from 'react'
import {savePdf, submitWithParams, submitWithPrompt} from "./services";

const Home = () => {
    const [book, setBook] = useState([{txt: 'read here', url: ''}])
    const [argument, setArgument] = useState('')
    const [environments, setEnvironment] = useState('')
    const [time, setTime] = useState('')
    const [characters, setCharacters] = useState('')
    const [prompt, setPrompt] = useState('')
    return (<div className='Home'>
        <input placeholder='tell me a story about a dark night' onChange={(e) => {
            setPrompt(e.target.value ? e.target.value : prompt)
        }}/>
        <button
            onClick={() => {
                setBook([{txt: '... generating ...', url: ''}])
                // setBook(stubbedRes)
                submitWithPrompt(prompt)
                    .then(res => res.json()
                        .then(json => setBook(json['data'])))
            }}>submit
        </button>
        <br/>
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
                setBook([{txt: '... generating ...', url: ''}])
                // setBook(stubbedRes)
                submitWithParams(argument, environments, time, characters)
                    .then(res => res.json()
                        .then(json => setBook(json['data'])))
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
            {pageNumber + 1}/{props.book.length}
            <button
                onClick={() => pageNumber < props.book.length - 1 ?
                    setPageNumber(pageNumber + 1) : setPageNumber(pageNumber)}>&gt;
            </button>
            <br/>
            <button
                onClick={() => {
                    savePdf(props.book)
                        .then(res => console.log(res + 'should be a pdf to download'))
                }}>save pdf
            </button>
        </div>
    </div>)
}

export default Home

const stubbedRes = [
    {
        txt: 'cat 1',
        url: 'https://imgs.search.brave.com/Vfd9LLPXQcz6zyLUX4qoNltzJGN5yB2sakLr_JhFoUc/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5N/TWlmUDRaNmhEWTBN/Q3JzYUtSUlBBSGFF/OCZwaWQ9QXBp'
    },
    {
        txt: 'cat 2',
        url: 'https://imgs.search.brave.com/aWKaQgY2nwt0L_4Ij01XjPq0IKdbXcfQKYrAyvlTlc8/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Z/QUdYZ1ZnY1VEWWNm/ak1MYXpaZmJnSGFF/NyZwaWQ9QXBp'
    },
    {
        txt: 'cat 3',
        url: 'https://imgs.search.brave.com/ZBb2YoiK2IPYnsexYY-LTCrtC4Wi7zVk7dCiOHL8zCY/rs:fit:532:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4t/Q293QlRjeXR1NFhK/OGtNUXRQc0dnSGFH/bSZwaWQ9QXBp'
    }]
