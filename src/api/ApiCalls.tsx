import Axios from "axios";
import { HTTP_STATUS_OK, LINK_BACKEND_UPDATE_PROGRESS, ZUOEHTIO_PROJECT, ZUOEHTIO_PROJECT_SEARCH, ZUOEHTIO_PROJECT_GETPROJECT } from "./ApiCallProperties";
import InfoFromCompanyFormSubmitType from "../types/InfoFromCompany/InfoFromCompanyFormSubmitType"
import RequestFormType from "../types/RequestForm/RequestFormType";
import SearchInputType from "../types/SearchPage/SearchInputType";
import { ErrorList } from "../utils/ErrorList";

export const apiAddApplication = (request: RequestFormType, setAppStatusCode: any, setMessage: any, setOpenSubmissionMsg: any) => {
    Axios.post(ZUOEHTIO_PROJECT, request)
        .then((response) => {
            thenAction("addApplication", response, null, setAppStatusCode, setMessage)
        })
        .catch((error) => {
            catchAction("addApplication", error, setAppStatusCode, setMessage)
            setOpenSubmissionMsg(true)
        })
}

export const apiSearchProject = (request: SearchInputType, setApiResponseData: any, setAppStatusCode: any, setMessage: any, setOpenSubmissionMsg: any) => {
    Axios.post(ZUOEHTIO_PROJECT_SEARCH, request)
        .then((response) => {
            thenAction("apiSearchProject", response, setApiResponseData, setAppStatusCode, setMessage)
            setOpenSubmissionMsg(false)
        })
        .catch((error) => {
            catchAction("apiSearchProject", error, setAppStatusCode, setMessage)
            setOpenSubmissionMsg(true)
        })
}

export const apiGetProject = (projectId: any, setApiResponseData: any, setAppStatusCode: any, setMessage: any) => {
    Axios.get(ZUOEHTIO_PROJECT_GETPROJECT + projectId)
        .then((response) => {
            thenAction("apiGetProject", response, setApiResponseData, setAppStatusCode, setMessage)
        })
        .catch((error) => {
            setApiResponseData(null)
            catchAction("apiGetProject", error, setAppStatusCode, setMessage)
        })
}

export const apiUpdateProgress = (request: InfoFromCompanyFormSubmitType, setAppStatusCode: any, setMessage: any, setOpenSubmissionMsg: any) => {
    Axios.post(LINK_BACKEND_UPDATE_PROGRESS, request)
        .then((response) => {
            thenAction("apiUpdateProgres", response, null, setAppStatusCode, setMessage)
        })
        .catch((error) => {
            catchAction("apiUpdateProgres", error, setAppStatusCode, setMessage)
            setOpenSubmissionMsg(true)
        })
}

const thenAction = (apiName: string, response: any, setApiResponseData: any, setAppStatusCode: any, setMessage: any) => {
    if (response.status === HTTP_STATUS_OK) {
        console.log(apiName + "() is successful")
        if (setApiResponseData !== null) {
            setApiResponseData(response.data)
        }
    } else {
        console.log(apiName + "() has problem")
    }
    console.log(response.data)
    setAppStatusCodeAndMessage(setAppStatusCode, setMessage, response.data?.appStatusCode, response.data?.message)
}

const catchAction = (apiName: string, error: any, setAppStatusCode: any, setMessage: any) => {
    console.log(apiName + "() failed")
    console.log(error)

    if (error?.code === ErrorList.ERR_NETWORK.code) {
        setAppStatusCodeAndMessage(setAppStatusCode, setMessage, ErrorList.ERR_NETWORK.code, ErrorList.ERR_NETWORK.message)
    } else if (error?.response?.data) {
        setAppStatusCodeAndMessage(setAppStatusCode, setMessage, error.response.data.appStatusCode, error.response.data.message)
    } else{
        setAppStatusCodeAndMessage(setAppStatusCode, setMessage, ErrorList.ERR_GEN_010.code, ErrorList.ERR_GEN_010.message)
    }

    let section = document.getElementById("scrollTosubmissionMessage");
    section?.scrollIntoView( { behavior: 'smooth', block: 'start' } );
}

const setAppStatusCodeAndMessage = (setAppStatusCode: any, setMessage: any, responseStatusCode: any, responseMessage: any) => {
    if (setAppStatusCode !== null) {
        setAppStatusCode(responseStatusCode)
    }

    if (setMessage != null) {
        setMessage(responseMessage)
    }
}