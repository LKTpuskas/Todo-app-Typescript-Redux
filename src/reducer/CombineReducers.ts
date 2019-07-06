import { combineReducers } from 'redux'
import listsReducer from './ListReducer'

export default combineReducers({ lists: listsReducer })
