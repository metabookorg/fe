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

export default Page
