import RequestFormType from "./RequestFormType"
import RequestFormProjectInfoDefault from "./RequestFormProjectInfoDefault"

const RequestFormDefault: RequestFormType = {
    requestor: {
        name: "",
        salutation: "",
        contactNo: "",
        email: ""
    },
    company: {
        onBehalf: 0,
        name: "",
        regNo: "",
        diffAbledExp: [],    
    },
    projects: [RequestFormProjectInfoDefault]
}

export default RequestFormDefault;