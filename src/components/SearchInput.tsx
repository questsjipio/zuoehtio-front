import { apiSearchProject } from "../api/ApiCalls"
import { BinaryChoiceOptionsList } from "../optionslists/BinaryChoiceOptionsList"
import { DiffAbledOptionsList } from "../optionslists/DiffAbledOptionsList"
import { InfoFromCompanyStatusOptionsList } from "../optionslists/InfoFromCompanyStatusOptionsList"
import { ServiceOptionsList } from "../optionslists/ServiceOptionsList"
import SearchInputDefault from "../types/SearchPage/SearchInputDefault"
import SearchInputType from "../types/SearchPage/SearchInputType"
import { setSearchValuesIntoHookForm, setSearchValuesIntoSessionStorage, removeSearchValuesFromSessionStorage } from "../valueStorage/SearchInputValues"
import { trimWhitespaceExceptLastSpaceChar } from "../utils/GeneralHelpers"
import { useForm } from "react-hook-form";
import "../style/form.css"
import "../style/form2.css"
import { useEffect } from "react"


const SearchInput = (props: any) => {
    // HOOKS
    const { register, handleSubmit, reset, setValue, getValues } = useForm<SearchInputType>({ 
        defaultValues: SearchInputDefault, 
        mode: "onSubmit",
        reValidateMode: "onChange" 
    })

    useEffect(() => {
        if (sessionStorage.getItem("wentToGetPage") === "true") {
            setSearchValuesIntoHookForm(setValue)
            submitApplication(getValues())
            sessionStorage.removeItem("wentToGetPage")
        } else {
            removeSearchValuesFromSessionStorage()
        }
    },[])


    // FUNCTIONS
    const resetApplication = () => {
        reset()
        props.setApiResponseData([]);
        props.setClickedSearch(false);
        removeSearchValuesFromSessionStorage()
    }

    const submitApplication = (data: any, e: any = null) => {
        e?.preventDefault();
        props.setClickedSearch(true)
        setSearchValuesIntoSessionStorage(data)
        apiSearchProject(data, props.setApiResponseData, props.setApiStatusCode, props.setApiMsg, props.setOpenSubmissionMsg)
    }

    return (
        <form onSubmit={handleSubmit(submitApplication)} className="formOuterMargin2">
            <div className="formSectionGeneral2">
                <label>Requestor Name</label>
                <input 
                    {...register("requestorName") } 
                    type="text"
                    onChange={(e) => (e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value))}
                />
                <label id="form2Item3">Company Name</label>
                <input 
                    {...register("companyName") } 
                    type="text"
                    onChange={(e) => (e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value))}
                />
                <label>Services</label>
                <div className={"formCheckboxAndLabelOuterContainer2"}>
                    { ServiceOptionsList.map((item) => {
                        return (
                            <div className={"formCheckboxAndLabelContainer2"} key={`services.div.${item.value}`}>
                                <input type="checkbox" key={`services.checkbox.${item.value}`} value={item.value} {...register("services") } />
                                <label>{item.displayedVal}</label>
                            </div>
                        )
                    })}
                </div>
                <label id="form2Item7">Experiences</label>
                <div className={"formCheckboxAndLabelOuterContainer2"}>
                    { DiffAbledOptionsList.map((item) => {
                        return (
                            <div className={"formCheckboxAndLabelContainer2"} key={`diffAbledExp.div.${item.value}`}>
                                <input type="checkbox" key={`diffAbledExp.checkbox.${item.value}`} value={item.value} {...register("diffAbledExp") } />
                                <label>{item.displayedVal}</label>
                            </div>
                        )
                    })}
                </div>
                <label>Keywords in Description</label>
                <input 
                    {...register("description") } 
                    type="text"
                    onChange={(e) => (e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value))}
                />
                <label id="form2Item11">Accepts Our Workers</label>
                <select {...register("canWorkWithDiffAbled") }>
                    <option key={`canWorkWithDiffAbled.dropdown.blank`} value=""></option>
                    { BinaryChoiceOptionsList.map((item) => {
                        return <option key={`canWorkWithDiffAbled.dropdown.${item.value}`} value={item.value}>{item.displayedVal}</option>
                    })}
                </select>
                <label>Status</label>
                <select {...register("status") }>
                    <option key={`status.dropdown.blank`} value=""></option>
                    { InfoFromCompanyStatusOptionsList.map((item) => {
                        return <option key={`status.dropdown.${item.value}`} value={item.value}>{item.displayedVal}</option>
                    })}
                </select>
            </div>
            <div className="formFinalActionButtonsDiv">
                <button 
                    type="button"
                    className="formResetButton dangerButton" 
                    onClick={() => {resetApplication()}} 
                >
                    Reset
                </button>
                <input type="submit" className="formSubmitButton primaryButton" placeholder="Submit" />
            </div>
        </form>
    )
}

export default SearchInput