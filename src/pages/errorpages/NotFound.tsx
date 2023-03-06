import { Link } from "react-router-dom"
import "../../style/simplepage.css"

const NotFound = () => {
    return (<>
        <h2>Page Not Found</h2>
        <p className="simplePageParagraph">The page which you tried to enter does not exist.</p>
        <p className="simplePageParagraph"><Link to="/">Go to Home</Link></p>
    </>)
}

export default NotFound