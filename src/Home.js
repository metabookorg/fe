import {useEffect, useState} from 'react'
import {getStyles, savePdf, submitWithParams, submitWithPrompt} from './services'
import './index.css'
import Book from './components/Book'

const Home = () => {
    useEffect(() => {
        if (first) {
            getStyles().then(res => res.json()
                .then(json => {
                    isFirst(false)
                    stylesOptions[0] = <option key={json.length}></option>
                    for (let i = 1; i < json.length + 1; i++) {
                        stylesOptions[i] = <option key={i - 1}>{json[i - 1]}</option>
                    }
                }))
        }
    })
    let [stylesOptions, setStylesOptions] = useState([])
    const [first, isFirst] = useState(true)
    const [book, setBook] = useState([{txt: '_default_', idx: -1, url: ''}])
    const [bookPlaceholder, setBookPlaceholder] = useState('read here')
    const [argument, setArgument] = useState('')
    const [environments, setEnvironment] = useState('')
    const [time, setTime] = useState('')
    const [characters, setCharacters] = useState('')
    const [style, setStyle] = useState('')
    const [prompt, setPrompt] = useState('')
    return (<div>
        <input style={{width: 200}} placeholder='tell me a story about a dark night' onChange={(e) => {
            setPrompt(e.target.value ? e.target.value : prompt)
        }}/>
        <button
            onClick={() => {
                setBookPlaceholder('...generating...')
                // setBook(stubbedRes)
                submitWithPrompt(prompt, style)
                    .then(res => res.json()
                        .then(json => setBook(json['data'])))
            }}>submit
        </button>
        <br/>
        <input placeholder='a trip' onChange={e => {
            setArgument(e.target.value ? e.target.value : argument)
        }}/>
        <br/>
        <input placeholder='london' onChange={e => {
            setEnvironment(e.target.value ? e.target.value : environments)
        }}/>
        <br/>
        <input placeholder='industrial revolution' onChange={e => {
            setTime(e.target.value ? e.target.value : time)
        }}/>
        <br/>
        <input placeholder='sherlock holmes, mammeta' onChange={e => {
            setCharacters(e.target.value ? e.target.value : characters)
        }}/>
        <br/>
        <select onChange={e => {
            setStyle(e.target.value)
        }}>{stylesOptions}
        </select>
        <button
            onClick={() => {
                setBookPlaceholder('...generating...')
                // setBook(stubbedRes)
                submitWithParams(argument, environments, time, characters, style)
                    .then(res => res.json()
                        .then(json => setBook(json['data'])))
            }}>submit
        </button>
        <br/>
        {book[0].txt !== '_default_' && <Book book={book}/>}
        {book[0].txt === '_default_' && bookPlaceholder}
        <br/>
        <button
            onClick={() => {
                savePdf(book)
                    .then(res => res.blob()
                        .then(blob => {
                            let link = document.createElement('a')
                            link.href = window.URL.createObjectURL(new Blob([blob], {type: 'application/pdf'}))
                            // link.download = book[0].txt + '.pdf'
                            link.click()
                        }))
            }}>save pdf
        </button>
    </div>)
}

export default Home

const stubbedStyles = ['vaporwave', 'post apocaliptic', 'gothic', 'fantasy', 'sci-fi', 'cyber', 'cybernetic',
    'cyberpunk', 'biopunk', 'steampunk', 'dieselpunk', 'afrofuturism', 'memphis', 'stencil', 'pencil drawing',
    'pencil sketch', 'ballpoint pen art', 'political cartoon from U.S. newspaper', 'charcoal sketch', 'woodcut',
    'coloring-in sheet', 'etching', 'crayon', 'child\'s drawing', 'acrylic on canvas', 'water color', 'coloured pencil',
    'coloured pencil, detailed', 'oil painting', 'airbrush', 'pastels', 'ukiyo-e', 'chinese watercolor', 'alegria',
    'collage', 'vector art', 'watercolor & pen', 'screen printing', 'low poply', 'layered paper', 'story book',
    'digital painting', 'sticker illustration', 'comic book', 'Anime', 'Pixar', 'vintage Disney', 'Disney 1990s',
    ' cel shading', 'Studio Ghibli', 'Hanna Barbera, 1990s', 'pixel art', '1970s grainy vintage illustration']
const stubbedRes = [
    {
        'txt': 'The knight and the princess',
        'idx': 0,
        'url': 'https://imgs.search.brave.com/PJYkFE3_wFpx2GrmYdDb8nav9tfctO9zsAI53ryttJI/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4x/WU01M21HMTBIX1Uy/NWlQam9wODNRSGFF/byZwaWQ9QXBp'
    },
    {
        'txt': 'once upon a time, there lived a beautiful princess in a faraway kingdom',
        'idx': 1,
        'url': 'https://imgs.search.brave.com/PJYkFE3_wFpx2GrmYdDb8nav9tfctO9zsAI53ryttJI/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4x/WU01M21HMTBIX1Uy/NWlQam9wODNRSGFF/byZwaWQ9QXBp'
    },
    {
        'txt': ' she was beloved by all who knew her, and she had a kind heart',
        'idx': 2,
        'url': 'https://imgs.search.brave.com/PJYkFE3_wFpx2GrmYdDb8nav9tfctO9zsAI53ryttJI/rs:fit:759:225:1/g:ce/aHR0cHM6Ly90c2Ux/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC4x/WU01M21HMTBIX1Uy/NWlQam9wODNRSGFF/byZwaWQ9QXBp'
    }
]
