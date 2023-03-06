export const ErrorList = {
    ERR_GEN_001: { code: "ERR_GEN_001", message: "Please add at least" },
    ERR_GEN_002: { code: "ERR_GEN_002", message: "This field needs exactly" },
    ERR_GEN_003: { code: "ERR_GEN_003", message: "This field can only have up to" },
    ERR_GEN_004: { code: "ERR_GEN_004", message: "This field is required." },
    ERR_GEN_005: { code: "ERR_GEN_005", message: "At least one of the mandatory fields is blank. Please check."},
    ERR_GEN_006: { code: "ERR_GEN_006", message: "At least one of the fields contains wrong value. Please check."},
    ERR_GEN_007: { code: "ERR_GEN_007", message: "Internal Server Error. Please contact administrator."},
    ERR_GEN_008: { code: "ERR_GEN_008", message: "Value is rejected."},
    ERR_GEN_009: { code: "ERR_GEN_009", message: "Internal Server Error. Please contact administrator."},
    ERR_GEN_010: { code: "ERR_GEN_010", message: "An error occurred. Contact administrator if problem persists." },
    ERR_NETWORK: { code: "ERR_NETWORK", message: "Connection has problem. Please try again later." },
    ERR_GEN_012: { code: "ERR_GEN_012", message: "This project does not exist."},
    ERR_GEN_013: { code: "ERR_GEN_013", message: "This project is no longer ongoing. Update request has been rejected."},
    ERR_GEN_014: { code: "ERR_GEN_014", message: "No change to any field has been detected. Update request has been rejected."},
    ERR_RGX_001: { code: "ERR_RGX_001", message: "Please enter alphanumeric characters only" },
    ERR_RGX_002: { code: "ERR_RGX_002", message: "Please enter a proper email address" },
    ERR_RGX_003: { code: "ERR_RGX_003", message: "Name can only contain alphabets, space or hyphens" },
    ERR_RGX_004: { code: "ERR_RGX_004", message: "Please enter a Singapore phone number" },
    SUCCESS_001: { code: "SUCCESS_001", message: "Transaction Successful"}
}

export const ErrorListMap = {
    FIELD_AT_LEAST: ErrorList.ERR_GEN_001,
    FIELD_HAS_EXACTLY_PREFIX: ErrorList.ERR_GEN_002,
    FIELD_HAS_UP_TO_PREFIX: ErrorList.ERR_GEN_003,
    FIELD_REQUIRED: ErrorList.ERR_GEN_004,
    REGEX_ALPHANUMERIC: ErrorList.ERR_RGX_001,
    REGEX_EMAIL: ErrorList.ERR_RGX_002,
    REGEX_PERSON: ErrorList.ERR_RGX_003,
    REGEX_PHONE_SG: ErrorList.ERR_RGX_004
}