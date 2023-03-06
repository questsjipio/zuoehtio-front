import RequestFormProjectInfoType from './RequestFormProjectInfoType'

type RequestFormType = {
    requestor: {
        name: string,
        salutation: string,
        contactNo: string,
        email: string
    },
    company: {
        onBehalf: number,
        name: string,
        regNo: string,
        diffAbledExp: string[],    
    },
    projects: RequestFormProjectInfoType[]
}

export default RequestFormType