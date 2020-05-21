import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import  rootReducer  from './Reducers/index'

const middleware = composeWithDevTools(applyMiddleware(thunk));
const store = createStore( rootReducer, middleware );

export default store;