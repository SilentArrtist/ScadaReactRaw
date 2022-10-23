const ADD_ELEMENT = "ADD_ELEMENT"
const SET_ELEMETNS = "SET_ELEMETNS"
const SET_IMAGES = "SET_IMAGES"
const SET_SETTINGS = "SET_SETTINGS"
const CHANGE_STYLE = "CHANGE_STYLE"
const CHANGE_DYNAMIC_VALUE = "CHANGE_DYNAMIC_VALUE"
const CHANGE_OUTPUT = "CHANGE_OUTPUT"
const CONNECT = "CONNECT"
const DELETE_ELEMENT = "DELETE_ELEMENT"
const ADD_IMAGE = "ADD_ICON"
const DELETE_IMAGE = "DELETE_ICON"
const defaultState = {
    elements:[],
    images:[],
    settings:[],
}
export const elementsReducer = (state=defaultState,action)=>{
    switch(action.type){
        case ADD_ELEMENT:
            return {...state,elements:[...state.elements,action.payload]}
        case SET_ELEMETNS:
            return {...state,elements:action.payload}
        case SET_SETTINGS:
            return {...state,settings:action.payload}
        case SET_IMAGES:
            return {...state,images:action.payload}
        case DELETE_ELEMENT:
            const elsArr = state.elements.filter(el=>el.key!==action.payload)
            return {...state,elements:[...elsArr]}
        case CHANGE_OUTPUT:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.output = action.payload.output;
                }
            })
            return state
        case CHANGE_STYLE:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.style[action.payload.parameter] = action.payload.newValue;
                }
            })
            return state
        case CHANGE_DYNAMIC_VALUE:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.dynamicValue[action.payload.parameter] = action.payload.newValue;
                }
            })
            return state
        case CONNECT:
            state.elements.forEach(el=>{
                if(el.key === action.payload.key){
                    el.ip = action.payload.ip;
                    el.type = action.payload.type;
                    el.index = action.payload.index;
                }
            })
            return state;
        case ADD_IMAGE:
            return {...state,images:[...state.images,action.payload]}
        case DELETE_IMAGE:
            const imgArr = state.images.filter(el=>el.key!==action.payload)
            return {...state,images:[...imgArr]}
        default:
            return state
    }
}
export const addElementAction = (payload) => ({type:ADD_ELEMENT, payload})
export const setElementsAction = (payload) => ({type:SET_ELEMETNS, payload})
export const setImagesAction = (payload) => ({type:SET_IMAGES, payload})
export const setSettignsAction = (payload) => ({type:SET_SETTINGS, payload})
export const deleteElementAction = (payload) => ({type:DELETE_ELEMENT, payload})
export const changeStyleAction = (payload) => ({type:CHANGE_STYLE, payload})
export const changeDynamicValueAction = (payload) => ({type:CHANGE_DYNAMIC_VALUE, payload})
export const connectAction = (payload) => ({type:CONNECT, payload})
export const changeOutputAction = (payload) => ({type:CHANGE_OUTPUT, payload})
export const addImageAction = (payload) => ({type:ADD_IMAGE, payload})
export const deleteImageAction = (payload) => ({type:DELETE_IMAGE, payload})