const SET_DEVICES = "SET_DEVICES"
const SET_COPY = "SET_COPY"
const defaultState = {
    devices:[],
    devicesCopy:[]
}
export const deviceReducer = (state=defaultState,action)=>{
    switch(action.type){
        case SET_DEVICES:
            return {...state,devices:action.payload}
        case SET_COPY:
            return {...state,devicesCopy:action.payload}
        default:
            return state
    }
}
export const setDeivcesAction = (payload) => ({type:SET_DEVICES, payload})
export const setCopyAction = (payload) => ({type:SET_COPY, payload})