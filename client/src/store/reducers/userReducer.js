const SET_USER = "SET_USER"
const CLEAR_USER = "CLEAR_USER"
const defaultState = {
    user:{
        login:"",
        role:"",
        editMode:false,
    }
}
export const userReducer = (state=defaultState,action)=>{
    switch(action.type){
        case SET_USER:
            return {...state,user:action.payload}
        case CLEAR_USER:
            return {...state,user:{login:"",role:""}}
        default:
            return state
    }
}
export const setUserAction = (payload) => ({type:SET_USER, payload})
export const clearUserAction = () => ({type:CLEAR_USER})