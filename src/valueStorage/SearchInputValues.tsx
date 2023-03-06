import { checkStringHasValue, checkArrayHasElement } from "../utils/GeneralHelpers"

export const setSearchValuesIntoHookForm = (setValue: any) => {
    if (checkStringHasValue(sessionStorage.getItem("requestorName"))) {
        setValue("requestorName", sessionStorage.getItem("requestorName")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("companyName"))) {
        setValue("companyName", sessionStorage.getItem("companyName")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("services"))) {
        setValue("services", sessionStorage.getItem("services")?.split(",")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("description"))) {
        setValue("description", sessionStorage.getItem("description")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("canWorkWithDiffAbled"))) {
        setValue("canWorkWithDiffAbled", sessionStorage.getItem("canWorkWithDiffAbled")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("diffAbledExp"))) {
        setValue("diffAbledExp", sessionStorage.getItem("diffAbledExp")?.split(",")!!)
    }

    if (checkStringHasValue(sessionStorage.getItem("status"))) {
        setValue("status", sessionStorage.getItem("status")!!)
    }
}

export const setSearchValuesIntoSessionStorage = (data: any) => {
    sessionStorage.setItem("requestorName", data?.requestorName)
    sessionStorage.setItem("companyName", data?.companyName)
    sessionStorage.setItem("services", data?.services?.join(","))
    sessionStorage.setItem("description", data?.description)
    sessionStorage.setItem("canWorkWithDiffAbled", data?.canWorkWithDiffAbled)
    sessionStorage.setItem("diffAbledExp", data?.diffAbledExp?.join(","))
    sessionStorage.setItem("status", data?.status)
}

export const removeSearchValuesFromSessionStorage = () => {
    sessionStorage.removeItem("requestorName")
    sessionStorage.removeItem("companyName")
    sessionStorage.removeItem("services")
    sessionStorage.removeItem("description")
    sessionStorage.removeItem("canWorkWithDiffAbled")
    sessionStorage.removeItem("diffAbledExp")
    sessionStorage.removeItem("status")
}

export const checkHasAtLeastOneInputFilledUp = (getValues: any) => {
    return checkStringHasValue(getValues("requestorName"))
            || checkStringHasValue(getValues("companyName"))
            || checkArrayHasElement(getValues("services"))
            || checkStringHasValue(getValues("description"))
            || checkStringHasValue(getValues("canWorkWithDiffAbled"))
            || checkArrayHasElement(getValues("diffAbledExp"))
            || checkStringHasValue(getValues("status"))
}