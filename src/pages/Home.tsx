import { Link } from "react-router-dom"
import "../style/home.css"

const Home = () => {
    return (<>
        <h2>Welcome</h2>
        <p className="homePageIWantTo">I want to...</p>
        <p><Link to="/project/add">
            <button className="homePageButton">
                <h3 className="homePageButtonTitle">Submit Projects</h3>
                <p className="homePageButtonDesc">I want to create an application for one or more new projects.</p>
            </button>
        </Link></p>
        <p><Link to="/project/search">
            <button className="homePageButton">
            <h3 className="homePageButtonTitle">Search Projects</h3>
            <p className="homePageButtonDesc">I want to search projects that are already created.</p>
            </button>
        </Link></p>
    </>)
}

export default Home