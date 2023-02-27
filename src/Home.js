import {useEffect, useState} from 'react'
import {getStyles, savePdf, submitWithParams, submitWithPrompt} from "./services";

const Home = () => {
    useEffect(() => {
        getStyles().then(res => res.json().then(json => setStyles(json)))
    })

    const [book, setBook] = useState([{txt: '_default_'}])
    const [bookPlaceholder, setBookPlaceholder] = useState('read here')
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
                setBookPlaceholder('...generating...')
                setBook(stubbedRes)
                submitWithPrompt(prompt, style)
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
                setBookPlaceholder('...generating...')
                setBook(stubbedRes)
                submitWithParams(argument, environments, time, characters, style)
                    .then(res => res.json()
                        .then(json => setBook(json['data'])))
            }}>submit
        </button>
        <br/>
        {book[0].txt !== '_default_' && <Book book={book}/>}
        {book[0].txt === '_default_' && bookPlaceholder}
    </div>)
}

const Book = (props) => {
    const [pageNumber, setPageNumber] = useState(0)
    return (<div className='Book'>
        {/*span not working*/}
        <span>
            <Page idx={props.book[pageNumber]['idx']}
                  url={props.book[pageNumber]['url']}
                  txt={props.book[pageNumber]['txt']}
                  numberOfPages={props.book.length}/>
            {props.book[pageNumber + 1] !== undefined && <Page idx={props.book[pageNumber + 1]['idx']}
                                                               url={props.book[pageNumber + 1]['url']}
                                                               txt={props.book[pageNumber + 1]['txt']}
                                                               numberOfPages={props.book.length}/>}
        </span>
        <button
            onClick={() => pageNumber > 1 ?
                setPageNumber(pageNumber - 2) : setPageNumber(pageNumber)}>&lt;
        </button>
        <button
            onClick={() => pageNumber < props.book.length - 2 ?
                setPageNumber(pageNumber + 2) : setPageNumber(pageNumber)}>&gt;
        </button>
        <br/>
        <button
            onClick={() => {
                savePdf(props.book)
                    .then(res => console.log(res + 'should be a pdf to download'))
            }}>save pdf
        </button>
    </div>)
}

const Page = (props) => {
    if (props.idx % 2 !== 1) {
        return (<div className='Page'>
            <h3>{props.txt}</h3>
            {props.idx + 1}/{props.numberOfPages}
            <img src={props.url} alt=''/>
        </div>)
    } else {
        return (<div className='Page'>
            <h3>{props.txt}</h3>
            <img src={props.url} alt=''/>
            {props.idx + 1}/{props.numberOfPages}
        </div>)
    }
}

export default Home

const stubbedRes = [
    {
        txt: 'cat 1',
        url: 'https://imgs.search.brave.com/Vfd9LLPXQcz6zyLUX4qoNltzJGN5yB2sakLr_JhFoUc/rs:fit:711:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5N/TWlmUDRaNmhEWTBN/Q3JzYUtSUlBBSGFF/OCZwaWQ9QXBp',
        idx: 0
    },
    {
        txt: 'cat 2',
        url: 'https://imgs.search.brave.com/aWKaQgY2nwt0L_4Ij01XjPq0IKdbXcfQKYrAyvlTlc8/rs:fit:713:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5Z/QUdYZ1ZnY1VEWWNm/ak1MYXpaZmJnSGFF/NyZwaWQ9QXBp',
        idx: 1
    },
    {
        txt: 'cat 3',
        url: 'https://imgs.search.brave.com/ZBb2YoiK2IPYnsexYY-LTCrtC4Wi7zVk7dCiOHL8zCY/rs:fit:532:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4t/Q293QlRjeXR1NFhK/OGtNUXRQc0dnSGFH/bSZwaWQ9QXBp',
        idx: 2
    },
    {
        txt: 'cat 4',
        url: 'https://imgs.search.brave.com/qJ0VKpQgK3-Q7tAOo2dygHw8ejlb84F1yR73KlgEMTM/rs:fit:471:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5O/US03c2pham0wNmxR/QWw0WGlwdFB3SGFI/ZCZwaWQ9QXBp',
        idx: 3
    },
    {
        txt: 'cat 5',
        url: 'https://imgs.search.brave.com/3toBn0n8iKr38CyOrp3-eSFu8lJ8tF-cNflAb1aLFkg/rs:fit:474:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC5H/VWdFNGJRNDMwbWxG/Z3VyZUw0amRRSGFI/YSZwaWQ9QXBp',
        idx: 4
    }]
