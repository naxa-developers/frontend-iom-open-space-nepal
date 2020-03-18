const initState = {
    language: '0',
    reportID: null,
    spaceID: null,
    reportData: null,
    currentloccalculated:false,
    wmsIsOpen: false,
    deleteAll: null,
    loaded: false




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
                reportID: action.id,
                daysCount: action.daysCount,
                space: action.open,
                ReportTitle: action.title,
                nav: action.nav
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
        case "Setcurrentloc":
            return{
                ...state,
                currentloccalculated:true
            }
        case "wmsClicked":
                return{
                    ...state,
                    wmsIsOpen:action.wms
                }
        case "singlePlotted":
                    return{
                        ...state,
                        deleteAll:action.status
                    }

        case "wmsLoaded":
                        return{
                            ...state,
                            loaded:action.loaded
                        }
            
        

        default:
            return state;
    }
}

export default rootReducer;