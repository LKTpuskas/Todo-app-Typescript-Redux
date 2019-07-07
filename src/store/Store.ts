import { createStore } from 'redux'
import listsReducer from '../reducer/ListReducer'

export default () => {
  let store = createStore(listsReducer)
  return { store }
}