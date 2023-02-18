import {useState} from "react"

function Home() {
    const [bookName, setBookName] = useState("book title")
    return (
        <div className="Home">
            <input placeholder={bookName} onChange={(e) => {
                setBookName(e.target.value ? e.target.value : bookName)
            }}/>
            <button onClick={() => submit(bookName)}>submit</button>
        </div>
    );
}

const submit = function submit(bookName) {
    console.log(bookName)
    fetch('http://192.168.123.72:1312/metabook', {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then(response => {
        console.log(response)
    })
}

export default Home;
