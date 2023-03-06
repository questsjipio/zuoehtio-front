import { Link } from "react-router-dom"
import "../style/navbar.css"

const NavBar = () => {
    return (<>
        <div className="navBarOuter">
            <div className="navBarInner">
                <Link className="link" to="/">
                    <div className="logo">ZuoEhTio</div>
                </Link>
                <div className="navigation">
                    <Link className="link" to="/project/add">Submit Projects</Link>
                    <Link className="link" to="/project/search">Search Projects</Link>
                </div>
            </div>
        </div>
    </>)
}

export default NavBar