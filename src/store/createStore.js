import { createStore, applyMiddleware, compose } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import rootReducer from "../modules";

const store = compose(applyMiddleware(thunk, logger))(createStore)(rootReducer);

export default store;
