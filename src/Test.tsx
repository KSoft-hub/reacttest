import { Link } from "react-router-dom"

function Test() {
    return (
        <>
            <div>チュートリアルで作成</div>
            <ul>
                <li><Link to="/add/1">add/1に遷移</Link></li>
                <li><Link to="/add/2">add/2に遷移</Link></li>
            </ul>



        </>
    )
}

export default Test