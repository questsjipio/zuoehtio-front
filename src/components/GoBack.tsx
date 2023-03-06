import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useNavigate } from "react-router-dom";
import "../style/form.css"

const GoBack = () => {
    const navigate = useNavigate()

    return (
        <div style={{marginBottom:"20px"}}>
            <button className={"secondaryButton1 goBackOrForwardButton"} onClick={() => navigate(-1)}>
                <div><ChevronLeftIcon/></div>
                <div>Back</div>
            </button>
        </div>
    )
}

export default GoBack