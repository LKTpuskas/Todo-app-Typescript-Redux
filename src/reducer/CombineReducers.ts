import { combineReducers } from 'redux'
import listsReducer from './lists-reducer'

export default combineReducers({ lists: listsReducer })
