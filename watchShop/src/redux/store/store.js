import { applyMiddleware,compose, createStore} from 'redux';
import thunk from "redux-thunk";
import roootReducer from "../reducer/index";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    roootReducer,
    composeEnhancers(applyMiddleware(thunk))
);
export default store;