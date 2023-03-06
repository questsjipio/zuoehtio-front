import { apiAddApplication } from "../api/ApiCalls"
import { DiffAbledOptionsList } from "../optionslists/DiffAbledOptionsList"
import RequestFormDefault from "../types/RequestForm/RequestFormDefault";
import RequestFormType from "../types/RequestForm/RequestFormType";
import RequestFormProjectInfoDefault from "../types/RequestForm/RequestFormProjectInfoDefault"
import { ErrorList } from "../utils/ErrorList";
import { checkStringHasValue, MandatoryAsterisk, trimWhitespaceExceptLastSpaceChar } from "../utils/GeneralHelpers"
import { IntentionOptionsList } from "../optionslists/IntentionOptionsList";
import { SalutationOptionsList } from "../optionslists/SalutationOptionsList";
import { ServiceOptionsList } from "../optionslists/ServiceOptionsList";
import { RequestFormValidations } from "../validations/RequestFormValidations"
import SubmissionMessage from "../components/SubmissionMessage";
import { useState, useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom"
import "../style/form.css"

const AccountForm = () => {
    // HOOKS
    const { register, handleSubmit, reset, control, setValue, getValues, formState: { errors } } = useForm<RequestFormType>({ 
        defaultValues: RequestFormDefault, 
        mode: "onSubmit",
        reValidateMode: "onChange" 
    })
    const { fields, append, remove } = useFieldArray({ control, name: "projects" })
    const [apiStatusCode, setApiStatusCode] = useState("")
    const [apiMsg, setApiMsg] = useState("");
    const [onBehalf, setOnBehalf] = useState(false);
    const [textareaLengths, setTextareaLengths] = useState([0]);
    const [openSubmissionMsg, setOpenSubmissionMsg] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        setValue("company.name", RequestFormDefault.company.name)
        setValue("company.regNo", RequestFormDefault.company.regNo)
        setValue("company.diffAbledExp", RequestFormDefault.company.diffAbledExp)
    }, [onBehalf])

    useEffect(() => {
        if (apiStatusCode === ErrorList.SUCCESS_001.code) {
            navigate("/project/add/success", { state: { status: ErrorList.SUCCESS_001.code } })
        }
    }, [apiStatusCode])


    // OTHER IMPORTS
    const projServicesFullList = ServiceOptionsList
    const projIntentionsFullList = IntentionOptionsList


    // FUNCTIONS
    const submitApplication = (data: any, e: any) => {
        e.preventDefault();

        if (validateRemainingFields(data)) {
            apiAddApplication(data, setApiStatusCode, setApiMsg, setOpenSubmissionMsg);
        }
    }

    const validateRemainingFields = (data: any) : boolean => {
        return data?.projects?.length > 0
    }

    const requestorParticulars = () => {
        return (
            <>
                <div className="formContainer">
                    <div className="formSectionGeneral">
                        <label>Name<MandatoryAsterisk/></label>
                        <div>
                            <input 
                                type="text" 
                                maxLength={RequestFormValidations.requestor.name.maxLength.value} 
                                {...register("requestor.name", RequestFormValidations.requestor.name) } 
                                onChange={(e) => (e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value))}
                            />
                            { errors.requestor?.name && <div className="formErrorMessage">{errors.requestor.name.message}</div> }
                        </div>
                        <label>Salutation<MandatoryAsterisk/></label>
                        <div>
                            { requestorSalutation() }
                            { errors.requestor?.salutation && <div className="formErrorMessage">{errors.requestor.salutation.message}</div> }
                        </div>
                        <label>Contact No.<MandatoryAsterisk/></label>
                        <div>
                            <input 
                                type="text" 
                                {...register("requestor.contactNo", RequestFormValidations.requestor.contactNo)}
                                onChange={(e) => (e.target.value = e.target.value.trim())} 
                            />
                            { errors.requestor?.contactNo && <div className="formErrorMessage">{errors.requestor.contactNo.message}</div> }
                        </div>
                        <label>Email<MandatoryAsterisk/></label>
                        <div>
                            <input 
                                type="text" 
                                {...register("requestor.email", RequestFormValidations.requestor.email)}
                                onChange={(e) => (e.target.value = e.target.value.trim())} 
                            />
                            { errors.requestor?.email && <div className="formErrorMessage">{errors.requestor.email.message}</div> }
                        </div>
                    </div>
                </div>
            </>
        )
    }

    const requestorSalutation = () => {
        return (
            <>
                <div>
                    <select {...register(`requestor.salutation` as const, RequestFormValidations.projects.services)}>
                        {
                            SalutationOptionsList.map((item) => {
                                return (
                                    <>
                                        <option value={item.value} key={`$requestor.${item.value}}`}>
                                            { item.displayedVal }
                                        </option>
                                    </>
                                )
                            })                    
                        }
                    </select>
                </div>
            </>
        )
    }

    const companyParticulars = () => {
        return (
            <>
                <div className="formContainer">
                    <div className="formGeneralQuestion">Are you representing on behalf of a company?<MandatoryAsterisk/></div>
                    { errors.company?.onBehalf && <div className="formErrorMessage">{errors.company.onBehalf.message}</div> }
                    <div className="formBinaryRadioSection">
                        <label>Yes</label>
                        <input type="radio" value={1} {...register("company.onBehalf", RequestFormValidations.company.onBehalf)} onClick={ () => {setOnBehalf(true) }} />
                        <label>No</label>
                        <input type="radio" value={0} {...register("company.onBehalf")} onClick={ () => {setOnBehalf(false) }}/>
                    </div>
                    { companyNameAndRegNo() }
                </div>
            </>
        )
    }

    const companyNameAndRegNo = () => {
        return (
            <>
                <div className="formGeneralQuestion">If yes, please fill up the fields below.</div>
                <div className={ onBehalf ? "formSectionGeneral" : "formSectionGeneral formDisabled" } >
                    <label>Company Name<MandatoryAsterisk/></label>
                    { companyName() }
                    <label>Company Registration No.<MandatoryAsterisk/></label>
                    { companyRegNo() }
                    <label>Work Experiences With<br/>Person With Disability (PWD)</label>
                    { companyDiffAbledExp() }
                </div>
            </>
        )
    }

    const companyName = () => {
        return (
            <div>
                <input 
                    type="text" 
                    maxLength={RequestFormValidations.company.name.maxLength.value} 
                    {...register("company.name", { validate: {
                        hasStringWhenOnBehalfIsTrue: v => 
                            (onBehalf === false || (onBehalf === true && checkStringHasValue(v))) 
                            || RequestFormValidations.company.name.required
                    }})}
                    onChange={(e) => (e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value))}
                    disabled={!onBehalf} 
                />
                { (errors.company?.name && onBehalf) ? <div className="formErrorMessage">{errors.company.name.message}</div> : null }
            </div>
        )
    }

    const companyRegNo = () => {
        return (
            <div>
            <input 
                type="text" 
                maxLength={RequestFormValidations.company.regNo.maxLength.value} 
                {...register("company.regNo", { validate: {
                    hasStringWhenOnBehalfIsTrue: v => {
                        return (onBehalf === false || (onBehalf === true && checkStringHasValue(v))) 
                        || RequestFormValidations.company.regNo.required
                    },
                    correctLengthWhenInputHasValue: v => {
                        return (!checkStringHasValue(v) || (checkStringHasValue(v) && (v.length == 9 || v.length == 10))) 
                        || RequestFormValidations.company.regNo.maxLength.message
                    },
                    correctPatternWhenInputHasValue: v => {
                        return (!checkStringHasValue(v) || (checkStringHasValue(v) && RequestFormValidations.company.regNo.pattern.value.test(v))) 
                        || RequestFormValidations.company.regNo.pattern.message
                    }
                }})}
                onChange={(e) => (e.target.value = e.target.value.trim())} 
                disabled={!onBehalf} 
            />
            { (errors.company?.regNo && onBehalf) ? <div className="formErrorMessage">{errors.company.regNo.message}</div> : null }
        </div>
        )
    }

    const companyDiffAbledExp = () => {
        return (
            <div className="formCheckboxAndLabelOuterContainer"> {
                DiffAbledOptionsList.map((item) => {
                    return (
                        <>
                            <div className="formDiffAbledExpOption formCheckboxAndLabelContainer">
                                <input
                                    type="checkbox" 
                                    value={item.value} 
                                    {...register(`company.diffAbledExp` as const)}
                                    key={`company.diffAbledExp.${item.value}}.value`}
                                />
                                <label key={`company.diffAbledExp.${item.value}}.displayedVal`}>{item.displayedVal}</label>
                            </div>    
                        </>
                    )
                })
            } </div>
        )
    }

    const projectsList = () => {
        return (
            <>
                { (getValues("projects")?.length > 0) ? null : <div className="formErrorMessage">{`${ErrorList.ERR_GEN_001.message} 1 project`}</div> }
                {
                    fields.map(( { id }, projectIndex ) => {
                        return projectParticulars(id, projectIndex)
                    })    
                }
                <button type="button" className="formProjectAddButton secondaryButton1" onClick={() => {
                    append({
                        services: RequestFormProjectInfoDefault.services,
                        intentions: RequestFormProjectInfoDefault.intentions,
                        productDescription: RequestFormProjectInfoDefault.productDescription,
                        workWithDiffAbled: RequestFormProjectInfoDefault.workWithDiffAbled,
                    })
                    setTextareaLengths([...textareaLengths, 0])
                }}>
                    Add Another Project
                </button>
            </>
        );
    }

    const projectParticulars = (
        id: any,
        projectIndex: any 
    ) => {
        return (
            <>
                <div className="formProjectSection" key={id}>

                    <div className="formGeneralQuestion" key={`${id}.services.question`}>What services are you looking for<MandatoryAsterisk/></div>
                    { errors.projects && <div className="formErrorMessage">{errors.projects[projectIndex]?.services?.message}</div> }
                    <div>
                        <div className="formServicesQuestion" key={`${id}.services.section`}>
                            { projectServices(id, projectIndex) }
                        </div>
                    </div>

                    <div className="formGeneralQuestion" key={`${id}.intentions.question`}>The above services are intended to create a/an...<MandatoryAsterisk/></div>
                    { errors.projects && <div className="formErrorMessage">{errors.projects[projectIndex]?.intentions?.message}</div> }
                    <div>
                        <div className="formIntentionsQuestion" key={`${id}.intentions.section`}>
                            { projectIntentions(id, projectIndex) }
                        </div>
                    </div>

                    <div key={`${id}.productDescription.section`}>
                        <div className="formGeneralQuestion" key={`${id}.productDescription.question`}>Description of product to be created<MandatoryAsterisk/></div>
                        { errors.projects && <div className="formErrorMessage">{errors.projects[projectIndex]?.productDescription?.message}</div> }
                        <div className="formContainer">
                            <textarea 
                                {...register(`projects.${projectIndex}.productDescription` as const, RequestFormValidations.projects.productDescription)}
                                maxLength={RequestFormValidations.projects.productDescription.maxLength.value}
                                className="textareaProductDescription"
                                key={`${id}.productDescription.input`}
                                onChange={(e) => {
                                    e.target.value = trimWhitespaceExceptLastSpaceChar(e.target.value)
                                    let newTextareaLengths = Array.from(textareaLengths)
                                    newTextareaLengths[projectIndex] = e.target.value.length
                                    setTextareaLengths(newTextareaLengths)
                                }}
                            />
                            <div className="textareaWordCount">{textareaLengths[projectIndex]}/{RequestFormValidations.projects.productDescription.maxLength.value}</div>
                        </div>
                    </div>

                    <div key={`${id}.workWithDiffAbled.section`}>
                        <div className="formGeneralQuestion" key={`${id}.workWithDiffAbled.question`}>Will you or your company want to work directly with our Person With Disability (PWD) employees in this project?<MandatoryAsterisk/></div>
                        { errors.projects && <div className="formErrorMessage">{errors.projects[projectIndex]?.workWithDiffAbled?.message}</div> }
                        <div>
                            <div className="formBinaryRadioSection" key={`${id}.workWithDiffAbled.nestedSection`}>
                                <label key={`${id}.workWithDiffAbled.yesLabel`}>Yes</label>
                                <input 
                                    type="radio" 
                                    value={1}
                                    {...register(`projects.${projectIndex}.workWithDiffAbled` as const, RequestFormValidations.projects.workWithDiffAbled)} 
                                    key={`${id}.workWithDiffAbled.yesRadio`}
                                />
                                <label key={`${id}.workWithDiffAbled.noLabel`}>No</label>
                                <input 
                                    type="radio" 
                                    value={0} 
                                    {...register(`projects.${projectIndex}.workWithDiffAbled` as const)} 
                                    key={`${id}.workWithDiffAbled.noRadio`}
                                />
                            </div>
                        </div>
                    </div>

                    <button type="button" onClick={() => remove(projectIndex)} className="formProjectRemoveButton dangerButton" key={`${id}.remove`}>Remove Project</button>

                </div>
            </>
        )
    }

    const projectServices = (id: any, projectIndex: any) => {
        return (
            projServicesFullList.map((item) => {
                return (
                    <>
                        <div className="formServicesOption">
                            <label key={`${id}.services.${item.value}}.displayedVal`}>{item.displayedVal}</label>
                            <input
                                type="checkbox" 
                                value={item.value} 
                                {...register(`projects.${projectIndex}.services` as const, RequestFormValidations.projects.services)}
                                key={`${id}.services.${item.value}}.value`}
                            />
                        </div>    
                    </>
                )
            })
        )
    }

    const projectIntentions = (id: any, projectIndex: any) => {
        return (
            projIntentionsFullList.map((item) => {
                return (
                    <>
                        <div className="formIntentionsOption">
                            <label key={`${id}.intentions.${item.value}.displayedVal}`}>{item.displayedVal}</label>
                            <input
                                type="checkbox" 
                                value={item.value} 
                                {...register(`projects.${projectIndex}.intentions` as const, RequestFormValidations.projects.intentions)}
                                key={`${id}.intentions.${item.value}}.value`}
                            />
                        </div>
                    </>
                )
            })
        )
    }

    return (
        <>
            <h2>Create Request</h2>
            <form onSubmit = {handleSubmit(submitApplication)}>
                <SubmissionMessage apiStatusCode={apiStatusCode} apiMsg={apiMsg} open={openSubmissionMsg} setOpen={setOpenSubmissionMsg} severity={ 
                    apiStatusCode === ErrorList.SUCCESS_001.code ? "success" : "error" } 
                />
                <div className="formSectionTitleBar">Requestor Particulars</div>
                    { requestorParticulars() }
                <div className="formSectionTitleBar">Company Particulars</div>
                    { companyParticulars() }
                <div className="formSectionTitleBar">List of Projects</div>
                    { projectsList() }
                <div className="formFinalActionButtonsDiv formExtraBottomMargin">
                    <button 
                        type="button"
                        className="formResetButton dangerButton" 
                        onClick={(e) => {
                            reset()
                            setOnBehalf(false)
                        }} 
                    >
                        Reset
                    </button>
                    <input type="submit" className="formSubmitButton primaryButton" placeholder="Submit" />
                </div>
            </form>
        </>
    )
}

export default AccountForm