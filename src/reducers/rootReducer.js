const initState = {
  language: '0'

  
            
         
}
const rootReducer = (state= initState, action) => {
    switch(action.type) {
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
                

        default:
            return state;
    }
}

export default rootReducer;