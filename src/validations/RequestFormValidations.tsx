import { ErrorList } from "../utils/ErrorList"
import { RegexPatterns } from "../utils/RegexPatterns"

export const RequestFormValidations = {
    requestor: {
        name: {
            required: ErrorList.ERR_GEN_004.message,
            maxLength: {
                value: 100,
                message: `${ErrorList.ERR_GEN_003.message} 100 characters`
            },
            pattern: {
                value: RegexPatterns.PERSON_NAME,
                message: ErrorList.ERR_RGX_003.message
            }
        },
        salutation: {
            required: ErrorList.ERR_GEN_004.message
        },
        contactNo: {
            required: ErrorList.ERR_GEN_004.message,
            pattern: {
                value: RegexPatterns.PHONE_NO_SG,
                message: ErrorList.ERR_RGX_004.message
            }
        },
        email: {
            required: ErrorList.ERR_GEN_004.message,
            pattern: {
                value: RegexPatterns.EMAIL,
                message: ErrorList.ERR_RGX_002.message
            }
        }
    },
    company: {
        onBehalf: {
            required: ErrorList.ERR_GEN_004.message
        },
        name: {
            required: ErrorList.ERR_GEN_004.message,
            maxLength: {
                value: 100,
                message: `${ErrorList.ERR_GEN_003.message} 100 characters`
            }
        },
        regNo: {
            required: ErrorList.ERR_GEN_004.message,
            minLength: {
                value: 9,
                message: `${ErrorList.ERR_GEN_002.message} 9 to 10 characters`
            },
            maxLength: {
                value: 10,
                message: `${ErrorList.ERR_GEN_002.message} 9 to 10 characters`
            },
            pattern: {
                value: RegexPatterns.ALPHANUMERIC,
                message: ErrorList.ERR_RGX_001.message
            }
        }
    },
    projects: {
        services: {
            required: ErrorList.ERR_GEN_004.message
        },
        intentions: {
            required: ErrorList.ERR_GEN_004.message
        },
        productDescription: {
            required: ErrorList.ERR_GEN_004.message,
            maxLength: {
                value: 500,
                message: `${ErrorList.ERR_GEN_003.message} 500 characters`
            }
        },
        workWithDiffAbled: {
            required: ErrorList.ERR_GEN_004.message
        },
    }
}