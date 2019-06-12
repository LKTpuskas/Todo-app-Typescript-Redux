import { AnyAction } from 'redux'; 
import { CONSTANTS } from '../actions/ActionConstants'
// import { PURGE } from 'redux-persist'
// import initialData from '../../config/data'

let ListId = 7
let CardId = 8

interface Card {
  id: number;
  text: string;
}

export interface List {
  title: string;
  id?: number;
  cards?: Card[]
}

const initialState: List[] = []

const listsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    // A new list starts with an empty cards array
    // increment a list id by one, so it's unique
    // spead our current lists (initial data) and add new lists
    case CONSTANTS.ADD_LIST: {
      const { title } = action.payload
      const newList = {
        title,
        id: ListId,
        cards: []
      }
      ListId += 1
      return [...state, newList]
    }

    case CONSTANTS.ADD_CARD: {
      const { text, ListId } = action.payload
      const newCard = {
        text,
        id: CardId
      }
      CardId += 1

      // Map over lists, see if their id is the same as the payload id
      // spead the lists array, as well as current cards (initial state)
      // add the new cards at the end
      // so we don't modify the existing state
      const newState = state.map(list => {
        if (list.id === ListId) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        } else {
          return list
        }
      })
      return newState
    }

    case CONSTANTS.DRAG_ENDED: {
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexEnd,
        droppableIndexStart
      } = action.payload

      const newState = [...state]

   
      if (droppableIdStart === droppableIdEnd) {
       
        const list = state.find(list => Number(droppableIdStart) === list.id)
        if (list && list.cards ) {
          const card = list.cards.splice(droppableIndexStart, 1)
  
          list.cards.splice(droppableIndexEnd, 0, ...card)
        }
        // return newState
      }

      // if cards are moved between lists
      if (droppableIdStart !== droppableIdEnd) {
        // we grab our list in which the drag happened
        const listStart = state.find(
          list => Number(droppableIdStart) === list.id
        )
        // access the card from the list
        const card = listStart && listStart.cards && listStart.cards.splice(droppableIndexStart, 1)
        // grab the list in which the drag ended
        const listEnd = state.find(list => Number(droppableIdEnd) === list.id)

        // put the card into the new list / array
        if (listEnd && listEnd.cards) {
          listEnd.cards.splice(droppableIndexEnd, 0, ...card)
        }
      }
      return newState
    }
    /* case PURGE: {
      // Return the initial state of this reducer to 'reset' the app
      return initialState
    } */
    default:
      return state
  }
}

export default listsReducer