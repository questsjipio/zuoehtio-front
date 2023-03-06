export const checkStringHasValue = (strVar: undefined | null | string) => {
    return strVar != undefined && strVar != null && strVar.trim().length > 0
}

export const checkArrayHasElement = (list: any[] | null | undefined) => {
    return list !== undefined && list !== null && list.length > 0
}

export const MandatoryAsterisk = () => {
    return (<span className="mandatoryAsterisk"> * </span>)
}

export const trimWhitespaceExceptLastSpaceChar = (text: string) => {
    let tempStr = text.trimStart()

    if (tempStr.slice(-2) === "  ") {
        return tempStr.slice(0, -1)
    }

    return tempStr
}

export const convertStringIntoHtmlList = (text: string | null, divider: string = ",", convertPairs: any[] | null = null) => {
    if (!checkStringHasValue(text)) {
        return "-"
    }

    let valueList = text!!.split(divider)
    let displayedValList: string[] = []

    if (checkArrayHasElement(convertPairs)) {
        valueList.forEach((item) => {
            let displayedVal = convertPairs!!.filter((keyValuePair) => { return keyValuePair.value === item} )[0]?.displayedVal
            displayedValList.push(displayedVal)
        })
    } else {
        displayedValList = Array.from(valueList)
    }

    if (!checkArrayHasElement(displayedValList)) {
        return "-"
    }

    displayedValList.sort()

    return (<>
        <ul style={{ padding: "0px" }}>
            { displayedValList.map ((item) => {
                return (<li key={`htmlList_${item}`}>{item}</li>)
            }) }
        </ul>
    </>)
}

export const convertToBoolean = (valueToBeConverted : string | number | boolean) => {
    let falseValues = ["0", "false", "False", "FALSE", 0, false]
    let trueValues = ["1", "true", "True", "TRUE", 1, true]

    if (trueValues.indexOf(valueToBeConverted) > -1) {
        return true
    } else if (falseValues.indexOf(valueToBeConverted)) {
        return false
    } else {
        throw console.error("Unable to do conversion");
    }
}

export const randomNoGenerator = (maxValue: number) => {
    return Math.floor(Math.random() * maxValue);
}