const initState = {
    language: '0',
    reportID: null,
    spaceID: null,
    reportData: null




}
const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case "nepali":
            return {
                ...state,
                language: '1'
            }
        case "english":
            return {
                ...state,
                language: '0'
            }
        case "reportClicked":
            return {
                ...state,
                reportID: action.id
            }
        case "spaceClicked":
            return {
                ...state,
                spaceID: action.id
            }
        case "ReportFilter":
            return {
                ...state,
                reportData: action.data


            }


        default:
            return state;
    }
}

export default rootReducer;