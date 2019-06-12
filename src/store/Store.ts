import { createStore } from 'redux'
// import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

import rootReducer from '../reducer/CombineReducers'

/* const persistConfig = {
  key: 'root',
  storage
} */

// const persistedReducer = persistReducer(persistConfig, rootReducer)
export default () => {
  let store = createStore(rootReducer)
 // let persistor = persistStore(store)
  return { store }
}