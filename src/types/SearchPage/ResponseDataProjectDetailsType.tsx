import RequestFormType from "../RequestForm/RequestFormType"

export type ResponseDataProjectDetailsType = {
    currentProgress: { status: string, briefTechnicalRequirements: string },
    requestForm: RequestFormType
}