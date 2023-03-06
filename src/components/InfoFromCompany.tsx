import { apiUpdateProgress } from "../api/ApiCalls";
import InfoFromCompanyFormDefault from "../types/InfoFromCompany/InfoFromCompanyFormDefault"
import { ONGOING, InfoFromCompanyStatusOptionsList } from "../optionslists/InfoFromCompanyStatusOptionsList"
import InfoFromCompanyFormType from "../types/InfoFromCompany/InfoFromCompanyFormType"
import InfoFromCompanyPropsType from "../types/InfoFromCompany/InfoFromCompanyPropsType"
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react"
import "../style/form4.css"

const InfoFromCompany = ({projectId, originalData, setApiStatusCode, setApiMsg, setOpenSubmissionMsg} : InfoFromCompanyPropsType) => {
    // HOOKS AND VALUES
    const { register, handleSubmit, setValue } = useForm<InfoFromCompanyFormType>({ 
        mode: "onSubmit",
        reValidateMode: "onChange" 
    })
    const [editMode, setEditMode] = useState(false)
    const [data, setData] = useState(InfoFromCompanyFormDefault)

    useEffect(() => {
        if (originalData !== null) {
            setData(originalData)
        }
    }, [originalData])

    useEffect(() => {
        setOriginalValues()
    }, [data])


    // FUNCTIONS
    const setOriginalValues = () => {
        setValue("status", data.status)
        setValue("briefTechnicalRequirements", data.briefTechnicalRequirements)
        setEditMode(false)
    }

    const enableEdit = () => {
        if (data.status === ONGOING.value) {
            setEditMode(true)
        }
    }

    const checkIfAlwaysDisabled = () => {
        if (data.status === ONGOING.value) {
            return editMode
        } 
        return true
    }

    const submitApplication = (submittedData: any, e: any) => {
        e.preventDefault();
        let submittedDataWithProjectId = { projectId: projectId, project: submittedData }
        apiUpdateProgress(submittedDataWithProjectId, setApiStatusCode, setApiMsg, setOpenSubmissionMsg)
    }

    const form = () => {
        return (<>
            <form onSubmit={handleSubmit(submitApplication)}>
                <div className="formSectionGeneral4">
                    <label>Status</label>
                    <select {...register("status")} disabled={!editMode}>
                        {
                            InfoFromCompanyStatusOptionsList.map(listOption => {
                                return <option value={listOption.value} key={`infoFromCompany.status.${listOption.value}.option`}>{listOption.displayedVal}</option>
                            })
                        }
                    </select>
                    <label>Brief Technical Requirements</label>
                    <textarea 
                        className="textareaBriefTechnicalRequirements" 
                        {...register("briefTechnicalRequirements")}
                        disabled={!editMode} 
                    />
                </div>
                <div className="formFinalActionButtonsDiv">
                    <button type="button" onClick={() => {enableEdit()}} className="formEditButton4 secondaryButton1 buttonDisabled1" disabled={checkIfAlwaysDisabled()}>Edit</button>
                    <button type="button" onClick={setOriginalValues} className="formResetButton4 dangerButton buttonDisabled1" disabled={!editMode}>Cancel Changes</button>
                    <input type="submit" disabled={!editMode} className="formSubmitButton4 primaryButton buttonDisabled1" placeholder="submit" />
                </div>
            </form>
        </>)
    }

    return form()
}

export default InfoFromCompany