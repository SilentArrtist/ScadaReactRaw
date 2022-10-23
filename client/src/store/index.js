import { legacy_createStore as createStore} from "redux";
import { combineReducers } from "redux";
import { menuIconsReducer } from "./reducers/menuIconsReducer";
import { elementsReducer } from "./reducers/elementsReducer";
import { userReducer } from "./reducers/userReducer";
import { deviceReducer } from "./reducers/deviceReducer";
const rootReducer = combineReducers({
    menuIcons:menuIconsReducer,
    elements:elementsReducer,
    user:userReducer,
    devices:deviceReducer,
})

export const store = createStore(rootReducer)