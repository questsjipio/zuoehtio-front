import SearchInput from "../components/SearchInput"
import SearchTable from "../components/SearchTable"
import SubmissionMessage from "../components/SubmissionMessage"
import { useState } from "react"
import { ErrorList } from "../utils/ErrorList"

export const SearchPage = () => {
    const [clickedSearch, setClickedSearch] = useState(false)
    const [apiResponseData, setApiResponseData] = useState({})
    const [apiStatusCode, setApiStatusCode] = useState("")
    const [apiMsg, setApiMsg] = useState("");
    const [openSubmissionMsg, setOpenSubmissionMsg] = useState(false)

    return (
        <div>
            <h2>Project Search</h2>
            { apiStatusCode !== ErrorList.SUCCESS_001.code ? 
                <SubmissionMessage 
                    apiStatusCode={apiStatusCode} 
                    apiMsg={apiMsg} 
                    severity={"error"} 
                    open={openSubmissionMsg} 
                    setOpen={setOpenSubmissionMsg}
                /> 
                : null 
            }
            <SearchInput 
                setClickedSearch={setClickedSearch} 
                setApiResponseData={setApiResponseData} 
                setApiStatusCode={setApiStatusCode} 
                setApiMsg={setApiMsg} 
                setOpenSubmissionMsg={setOpenSubmissionMsg}
            />
            <SearchTable 
                clickedSearch={clickedSearch} 
                apiResponseData={apiResponseData} 
                apiStatusCode={apiStatusCode} 
                apiMsg={apiMsg} 
            />
        </div>
    )
}

export default SearchPage