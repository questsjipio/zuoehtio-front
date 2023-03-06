import { apiGetProject } from "../api/ApiCalls"
import CheckIcon from '@mui/icons-material/Check';
import { checkStringHasValue, convertToBoolean } from '../utils/GeneralHelpers';
import GoBack from "../components/GoBack" 
import RequestFormType from "../types/RequestForm/RequestFormType";
import * as DiffAbledOptionsList from "../optionslists/DiffAbledOptionsList";
import * as IntentionOptionsList from "../optionslists/IntentionOptionsList";
import * as ServiceOptionsList from "../optionslists/ServiceOptionsList";
import * as BinaryChoiceOptionsList from "../optionslists/BinaryChoiceOptionsList"
import { ErrorList } from "../utils/ErrorList";
import InfoFromCompany from '../components/InfoFromCompany';
import InfoFromCompanyFormType from "../types/InfoFromCompany/InfoFromCompanyFormType"
import ResponseDataProjectDetailsDefault from "../types/SearchPage/ResponseDataProjectDetailsDefault"
import RequestFormProjectInfoType from '../types/RequestForm/RequestFormProjectInfoType';
import { SalutationOptionsList } from "../optionslists/SalutationOptionsList"
import SubmissionMessage from "../components/SubmissionMessage";
import { useState, useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import "../style/form.css"
import "../style/form3.css"

const ProjectDetails = () => {
    // HOOKS
    const [searchParams] = useSearchParams({ id: "0" }) 
    const idValue = searchParams.get("id")
    const [apiResponseData, setApiResponseData] = useState(ResponseDataProjectDetailsDefault)
    const [apiMsg, setApiMsg] = useState("");
    const [apiStatusCodeForUpdateProgress, setApiStatusCodeForUpdateProgress] = useState("");
    const [apiMsgForUpdateProgress, setApiMsgForUpdateProgress] = useState("");
    const [openSubmissionMsg, setOpenSubmissionMsg] = useState(false)

    useEffect(() => {
        sessionStorage.setItem("wentToGetPage", "true")
        apiGetProject(idValue, setApiResponseData, null, setApiMsg)
    }, [])

    useEffect(() => {
        if (apiStatusCodeForUpdateProgress === ErrorList.SUCCESS_001.code) {
            apiGetProject(idValue, setApiResponseData, null, setApiMsg)
        }
    }, [apiStatusCodeForUpdateProgress])

    useEffect(() => {
        if (apiStatusCodeForUpdateProgress === ErrorList.SUCCESS_001.code) {
            setOpenSubmissionMsg(true)
            setApiStatusCodeForUpdateProgress("")
            setApiMsgForUpdateProgress("")
            let section = document.getElementById("scrollTosubmissionMessage");
            section?.scrollIntoView( { behavior: 'smooth', block: 'start' } );
        }
    }, [apiResponseData])


    // FUNCTIONS
    const requestorTitleBar = () => {
        return <div className="formSectionTitleBar">Requestor Particulars</div>
    }

    const requestorTable = (data: RequestFormType) => {
        return (<div className="formSectionGeneral3">
            <label>Name</label>
            <div>{data.requestor.name}</div>
            <label>Salutation</label>
            <div>{SalutationOptionsList.filter((salutationOption) => salutationOption.value === data.requestor.salutation)[0]?.displayedVal}</div>
            <label>Contact No.</label>
            <div>{data.requestor.contactNo}</div>
            <label>Email</label>
            <div>{data.requestor.email}</div>
        </div>)
    }

    const requestorParticulars = (data: RequestFormType) => {
        return (<div className="formOuterSection">
            { requestorTitleBar() }
            { requestorTable(data) }
        </div>)
    }

    const companyTitleBar = () => {
        return <div className="formSectionTitleBar">Company Particulars</div>
    }

    const companyNameAndRegNo = (data: RequestFormType) => {
        return (<div className="formSectionGeneral3">
            <label>Company Name</label>
            <div>{data.company.name}</div>
            <label>Company Registration No.</label>
            <div>{data.company.regNo}</div>
        </div>) 
    }

    const companyDiffAbledExp = (data: RequestFormType) => {
        return (<>
            <h4 className="subSectionTitle">Work Experiences With Person With Disability (PWD)</h4>
            <div className="companyDiffAbledExp">
                <table>
                    <thead>
                        <tr>
                            <th>{DiffAbledOptionsList.AUTISM.displayedVal}</th>
                            <th>{DiffAbledOptionsList.INTELLECTUAL.displayedVal}</th>
                            <th>{DiffAbledOptionsList.OTH_DEV_DELAY.displayedVal}</th>
                            <th>{DiffAbledOptionsList.PHYSICAL.displayedVal}</th>
                            <th>{DiffAbledOptionsList.SENSORY.displayedVal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{data.company.diffAbledExp.indexOf(DiffAbledOptionsList.AUTISM.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{data.company.diffAbledExp.indexOf(DiffAbledOptionsList.INTELLECTUAL.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{data.company.diffAbledExp.indexOf(DiffAbledOptionsList.OTH_DEV_DELAY.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{data.company.diffAbledExp.indexOf(DiffAbledOptionsList.PHYSICAL.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{data.company.diffAbledExp.indexOf(DiffAbledOptionsList.SENSORY.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
    }

    const companyParticulars = (data: RequestFormType) => {
        if (data.company) {
            return (<div className="formOuterSection">
                { companyTitleBar() }
                { companyNameAndRegNo(data) }
                { companyDiffAbledExp(data) }
            </div>)
        } else {
            return (<div className="formOuterSection">
                { companyTitleBar() }
                <div className="subSectionTitle">This requestor is not representing on behalf of a company.</div>
            </div>)
        }
    }

    const projectTitleBar = () => {
        return <div className="formSectionTitleBar">Project Information</div>
    }

    const projectServices = (project: RequestFormProjectInfoType) => {
        return (<>
            <h4 className="subSectionTitle">Services Required</h4>
            <div className="serviceOptionsList">
                <table>
                    <thead>
                        <tr>
                            <th>{ServiceOptionsList.THREE_D_PRINTING.displayedVal}</th>
                            <th>{ServiceOptionsList.BASIC_ELECTRONIC.displayedVal}</th>
                            <th>{ServiceOptionsList.WEB_DEV.displayedVal}</th>
                            <th>{ServiceOptionsList.ARDUINO_PROG.displayedVal}</th>
                            <th>{ServiceOptionsList.RASPBERRY_PI_PROG.displayedVal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{project.services.indexOf(ServiceOptionsList.THREE_D_PRINTING.value) > -1 ? <CheckIcon color='success'/> : "-"}</td>
                            <td>{project.services.indexOf(ServiceOptionsList.BASIC_ELECTRONIC.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{project.services.indexOf(ServiceOptionsList.WEB_DEV.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{project.services.indexOf(ServiceOptionsList.ARDUINO_PROG.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{project.services.indexOf(ServiceOptionsList.RASPBERRY_PI_PROG.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
    }

    const projectIntentions = (project: RequestFormProjectInfoType) => {
        return (<>
            <h4 className="subSectionTitle">Project Intentions</h4>
            <div className="intentionOptionsList">
                <table>
                    <thead>
                        <tr>
                            <th>{IntentionOptionsList.ART_PRODUCT.displayedVal}</th>
                            <th>{IntentionOptionsList.MAKER_PRODUCT.displayedVal}</th>
                            <th>{IntentionOptionsList.ENTERPRISE_PRODUCT.displayedVal}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{project.intentions.indexOf(IntentionOptionsList.ART_PRODUCT.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{project.intentions.indexOf(IntentionOptionsList.MAKER_PRODUCT.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                            <td>{project.intentions.indexOf(IntentionOptionsList.ENTERPRISE_PRODUCT.value) > -1 ? <CheckIcon color='success' /> : "-"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>)
    }

    const projectProductDescription = (project: RequestFormProjectInfoType) => {
        return (<>
            <h4 className="subSectionTitle">Project Description</h4>
            <div className="projectDescription">{project.productDescription}</div>
        </>)
    }

    const projectWorkWithDiffAbled = (project: RequestFormProjectInfoType) => {
        return (<>
            <h4 className="subSectionTitle">Able to work directly with our Person With Disability (PWD) workers in this project?</h4>
            <div className="workWithDiffAbled">{convertToBoolean(project.workWithDiffAbled) ? BinaryChoiceOptionsList.YES.displayedVal : BinaryChoiceOptionsList.NO.displayedVal }</div>
        </>)
    }

    const infoFromCompanyTitleBar = () => {
        return <div className="formSectionTitleBar">Information from Company</div>
    }

    const infoFromCompanyForm = (infoFromCompanyFormData: InfoFromCompanyFormType | null) => {
        return <InfoFromCompany
            projectId={idValue} 
            originalData={infoFromCompanyFormData}
            setApiStatusCode={setApiStatusCodeForUpdateProgress}
            setApiMsg={setApiMsgForUpdateProgress}
            setOpenSubmissionMsg={setOpenSubmissionMsg}
        />
    }

    const infoFromCompany = (infoFromCompanyFormData: InfoFromCompanyFormType | null) => {
        return (<div className="formOuterSection">
            { infoFromCompanyTitleBar() }
            { infoFromCompanyForm(infoFromCompanyFormData) }
        </div>)
    }

    const projectParticulars = (data: RequestFormType) => {
        let project = data.projects[0]

        return (<div className="formOuterSection">
            { projectTitleBar() }
            { projectServices(project) }
            { projectIntentions(project) }
            { projectProductDescription(project) }
            { projectWorkWithDiffAbled(project) }
        </div>)
    }

    const displayData = (data: any) => {
        return (<>
            { requestorParticulars(data?.requestForm) }
            { companyParticulars(data?.requestForm) }
            { projectParticulars(data?.requestForm) }
            { infoFromCompany(data?.currentProgress) }
        </>)
    }

    const displaySubmissionMessage = () => {
        if (checkStringHasValue(apiStatusCodeForUpdateProgress) && apiStatusCodeForUpdateProgress !== ErrorList.SUCCESS_001.code) {
            return <SubmissionMessage apiStatusCode={apiStatusCodeForUpdateProgress} apiMsg={apiMsgForUpdateProgress} severity={"error"} open={openSubmissionMsg} setOpen={setOpenSubmissionMsg} />
        }

        return <SubmissionMessage apiStatusCode={ErrorList.SUCCESS_001.code} apiMsg={ErrorList.SUCCESS_001.message} severity={"success"} open={openSubmissionMsg} setOpen={setOpenSubmissionMsg} />
    }

    const displayNoDataOrError = () => {
        return (<>
            <div>{apiMsg}</div>
        </>)
    }

    return (<>
        <h2>Project Details</h2>
        <GoBack/>
        { displaySubmissionMessage() }
        { apiResponseData !== null ? displayData(apiResponseData) : displayNoDataOrError() }
    </>)
}

export default ProjectDetails