import {createStore, applyMiddleware, compose} from 'redux'
import {rootReducer} from './reducers'
import thunk from 'redux-thunk'

const storeEnhancers = window.REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose

const store = createStore(
    rootReducer,
    storeEnhancers(applyMiddleware(thunk))
)

export default store