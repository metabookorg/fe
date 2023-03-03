import {useState} from 'react'
import Page from "./Page";

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

export default Book
