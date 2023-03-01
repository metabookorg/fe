import {useEffect, useState} from 'react'
import {getStyles, savePdf, submitWithParams, submitWithPrompt} from './services'
import './index.css'

const Home = () => {
    useEffect(() => {
        if (first) {
            setStyles(stubbedStyles)
            getStyles().then(res => res.json()
                .then(json => {
                    setStyles(json)
                    isFirst(false)
                }))
        }
    })
    const [first, isFirst] = useState(true)
    const [book, setBook] = useState([{txt: '_default_'}])
    const [bookPlaceholder, setBookPlaceholder] = useState('read here')
    const [argument, setArgument] = useState('')
    const [environments, setEnvironment] = useState('')
    const [time, setTime] = useState('')
    const [characters, setCharacters] = useState('')
    const [styles, setStyles] = useState([])
    const [style, setStyle] = useState('')
    const [prompt, setPrompt] = useState('')
    return (<div>
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
        {styles}
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
        {/*dropdown with styles options which sets style on change*/}
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
        <br/>
        <button
            onClick={() => {
                savePdf(book)
                    .then(res => console.log(res + 'should be a pdf to download'))
            }}>save pdf
        </button>
    </div>)
}

const Book = (props) => {
    const [pageNumber, setPageNumber] = useState(0)
    return (<div>
        <span className='Pages'>
            {pageNumber === 0 && <Page idx={props.book[pageNumber]['idx']}
                                       url={props.book[pageNumber]['url']}
                                       txt={props.book[pageNumber]['txt']}
                                       numberOfPages={props.book.length}/>}
            {pageNumber !== 0 && <Page idx={props.book[pageNumber - 1]['idx']}
                                       url={props.book[pageNumber - 1]['url']}
                                       txt={props.book[pageNumber - 1]['txt']}
                                       numberOfPages={props.book.length}/>}
            {pageNumber !== 0 && props.book[pageNumber] !== undefined &&
                <Page idx={props.book[pageNumber]['idx']}
                      url={props.book[pageNumber]['url']}
                      txt={props.book[pageNumber]['txt']}
                      numberOfPages={props.book.length}/>}
        </span>
        <span className='Browser'>
            <button
                onClick={() => pageNumber > 1 ?
                    setPageNumber(pageNumber - 2) : setPageNumber(pageNumber)}>&lt;
            </button>
            <button
                onClick={() => pageNumber < props.book.length - 1 ?
                    setPageNumber(pageNumber + 2) : setPageNumber(pageNumber)}>&gt;
            </button>
        </span>
    </div>)
}

const Page = (props) => {
    if (props.idx % 2 !== 0) {
        return (<div style={{padding: 10}}>
            <div style={{textAlign: 'center'}}>
                <h3 style={{width: 400, height: 50}}>{props.txt}</h3>
            </div>
            <div className='Pages'>
                <img src={props.url} alt=''/>
            </div>
            <br/>
            {props.idx + 1}/{props.numberOfPages}
        </div>)
    } else {
        return (<div style={{padding: 10}}>
            <div style={{textAlign: 'center'}}>
                <h3 style={{width: 400, height: 50}}>{props.txt}</h3>
            </div>
            <div className='Pages'>
                <img src={props.url} alt=''/>
            </div>
            <div style={{textAlign: 'right'}}>
                {props.idx + 1}/{props.numberOfPages}
            </div>
        </div>)
    }
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
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-igLnz1y19QySpjxWfvMKTBzt.png?st=2023-03-01T17%3A06%3A11Z&se=2023-03-01T19%3A06%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T13%3A31%3A59Z&ske=2023-03-02T13%3A31%3A59Z&sks=b&skv=2021-08-06&sig=lgpP46EGTYy21V8x6AaN5PBzXvtTwRu1jYq3C7cvV5k%3D'
    },
    {
        'txt': 'once upon a time, there lived a beautiful princess in a faraway kingdom',
        'idx': 1,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-t0OZfBJZCoEz60pQ22EVZrGy.png?st=2023-03-01T17%3A06%3A17Z&se=2023-03-01T19%3A06%3A17Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A11%3A48Z&ske=2023-03-02T02%3A11%3A48Z&sks=b&skv=2021-08-06&sig=fgAs5ZPeMaT1OCauzZZ5IR%2BqbVRq4qDj3BzsWjLc%2BvA%3D'
    },
    {
        'txt': ' she was beloved by all who knew her, and she had a kind heart',
        'idx': 2,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-RjEkvewzUOoiGppJpqNWDiH4.png?st=2023-03-01T17%3A06%3A22Z&se=2023-03-01T19%3A06%3A22Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A12%3A13Z&ske=2023-03-02T02%3A12%3A13Z&sks=b&skv=2021-08-06&sig=5kROc7qzPM4wOVuWAPPjhu0rkgCBlr1JvvV6XZOhDh4%3D'
    },
    {
        'txt': ' one day, however, her kingdom was threatened by a fierce dragon that had been terrorizing the countryside',
        'idx': 3,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-9b1lPTqJZJfujo4Hw7dv9i4Z.png?st=2023-03-01T17%3A06%3A28Z&se=2023-03-01T19%3A06%3A28Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T11%3A31%3A14Z&ske=2023-03-02T11%3A31%3A14Z&sks=b&skv=2021-08-06&sig=2iIsdS0mo%2BjeaqW2vUXxCXtqy4xTz9xL3BQLaGRnjpY%3D'
    },
    {
        'txt': ' the king and queen were desperate to protect their daughter, so they called upon the bravest knight they knew to slay the dragon',
        'idx': 4,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-zQcGwQjrZHxfzuDFFCXI5ZEW.png?st=2023-03-01T17%3A06%3A32Z&se=2023-03-01T19%3A06%3A32Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A10%3A43Z&ske=2023-03-02T02%3A10%3A43Z&sks=b&skv=2021-08-06&sig=9Y/3%2BZNBCJDNnRNZeR9VO3PxMuItzV7DGP6BcWrAJUA%3D'
    },
    {
        'txt': 'the knight, a brave and noble warrior, was determined to protect the princess and her kingdom',
        'idx': 5,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-cacsWaozaZcMA4lbfizv6d11.png?st=2023-03-01T17%3A06%3A37Z&se=2023-03-01T19%3A06%3A37Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A10%3A36Z&ske=2023-03-02T02%3A10%3A36Z&sks=b&skv=2021-08-06&sig=%2BHMObGAe9HIeINmS0dPelwLDWKN4xElAiUdnxmQ7PxA%3D'
    },
    {
        'txt': ' he set off on his quest, and soon he came face to face with the dragon',
        'idx': 6,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-RlfIxbn5Rz4l97hzLBl0ff5D.png?st=2023-03-01T17%3A06%3A41Z&se=2023-03-01T19%3A06%3A41Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A10%3A55Z&ske=2023-03-02T02%3A10%3A55Z&sks=b&skv=2021-08-06&sig=3GGwdJwEsGnIJaIQVJxwfMZbRq9WaZD9mVKxzrEujlQ%3D'
    },
    {
        'txt': ' the knight and the dragon fought fiercely, and the knight was nearly defeated',
        'idx': 7,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-kBi6HBxk2FSaTFI4uiLT1ipW.png?st=2023-03-01T17%3A06%3A46Z&se=2023-03-01T19%3A06%3A46Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A11%3A25Z&ske=2023-03-02T02%3A11%3A25Z&sks=b&skv=2021-08-06&sig=CbjC%2Brm79AE6MnRLReL1FKj2AWaZPXAbof6kTbQE47o%3D'
    },
    {
        'txt': ' but just as he was about to give up, the princess ran out and threw herself in between the knight and the dragon',
        'idx': 8,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-q0diF0xcyiJjuZ0chQrWyJwt.png?st=2023-03-01T17%3A06%3A51Z&se=2023-03-01T19%3A06%3A51Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A11%3A28Z&ske=2023-03-02T02%3A11%3A28Z&sks=b&skv=2021-08-06&sig=ox%2BjtTiPapdScgKSQClGPtxtUz8LL5y7T0utkuhMS/A%3D'
    },
    {
        'txt': 'the dragon was so taken aback by the princess courage that it decided to spare the knight and the kingdom',
        'idx': 9,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-YNP4P0icXIjnSFUfM94aDn5h.png?st=2023-03-01T17%3A06%3A55Z&se=2023-03-01T19%3A06%3A55Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A12%3A22Z&ske=2023-03-02T02%3A12%3A22Z&sks=b&skv=2021-08-06&sig=4qZeDOTtbe78THlhW8Vy4GU3AEm9Kg%2BhY5dxmsgQ8qM%3D'
    },
    {
        'txt': ' the dragon flew away, never to be seen again',
        'idx': 10,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-53bNJLtPpd4WBDG74BpwN7Fd.png?st=2023-03-01T17%3A07%3A00Z&se=2023-03-01T19%3A07%3A00Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A11%3A02Z&ske=2023-03-02T02%3A11%3A02Z&sks=b&skv=2021-08-06&sig=YvQ1BcCd/ywimy%2BQEwxDJbXNU88qp5MQC%2Bh2VYIB8ns%3D'
    },
    {
        'txt': ' the knight, the princess, and the kingdom were all saved',
        'idx': 11,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-85SggQ6yv2FnywBu0XeoXIKk.png?st=2023-03-01T17%3A07%3A05Z&se=2023-03-01T19%3A07%3A05Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A10%3A53Z&ske=2023-03-02T02%3A10%3A53Z&sks=b&skv=2021-08-06&sig=25LhQnZ1ofeV/xkuH8A3zwIiwv5oiZwsqLWbIv6TKuM%3D'
    },
    {
        'txt': ' the knight and the princess were married shortly after, and they lived happily ever after',
        'idx': 12,
        'url': 'https://oaidalleapiprodscus.blob.core.windows.net/private/org-13YPDfor9scTreCbnHWJ73Ey/user-O6PtK9QmZTL6P61xwOaVlCiK/img-j65SVIWmVz3Xhhn5LM0T5ZDk.png?st=2023-03-01T17%3A07%3A11Z&se=2023-03-01T19%3A07%3A11Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-03-01T02%3A11%3A07Z&ske=2023-03-02T02%3A11%3A07Z&sks=b&skv=2021-08-06&sig=1WeSrn3z6l47NPvk9JyCrn85XSV%2BwLyKPLhZDETYmxQ%3D'
    }
]
