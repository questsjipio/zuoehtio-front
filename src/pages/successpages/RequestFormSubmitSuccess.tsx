import { ErrorList } from '../../utils/ErrorList';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import "../../style/simplepage.css"

const RequestFormSubmitSuccess = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state === null || location.state?.status !== ErrorList.SUCCESS_001.code) {
            navigate('/NotFound')
        }
    }, [])

    return (<>
        <h2>Create Request</h2>
        <p className="simplePageParagraph">Submission successful</p>
        <p className="simplePageParagraph"><Link to="/">Go to Home</Link></p>
    </>)
}

export default RequestFormSubmitSuccess