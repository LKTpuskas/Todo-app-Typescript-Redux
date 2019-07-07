import { AnyAction, ReducersMapObject, Reducer, Action } from 'redux'; 
import { CONSTANTS } from '../actions/ActionConstants'

let ListId = 7
let CardId = 8

export interface Card {
  id: number;
  index: number;
  text: string;
  description?: string;
  dueDate?: string;
}

export interface List {
  title: string;
  id?: number;
  cards?: Card[]
}

const initialState: List[] = []

const listsReducer: ReducersMapObject = {
  [CONSTANTS.ADD_LIST](state: List[], action: AnyAction) {
    const { title } = action.payload
    const newList = {
      title,
      id: ListId,
      cards: []
    }
    ListId += 1
    return [...state, newList]
  },
  [CONSTANTS.ADD_CARD](state: List[], action: AnyAction) {
    const { text, ListId } = action.payload
    const newCard = {
      text,
      id: CardId
    }
    CardId += 1

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
  },
  [CONSTANTS.DRAG_ENDED](state: List[], action: AnyAction) {
    const {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexEnd,
      droppableIndexStart
    } = action.payload

    const newState = [...state]


    if (droppableIdStart === droppableIdEnd) {

      const list = state.find(list => Number(droppableIdStart) === list.id)
      if (list && list.cards) {
        const card = list.cards.splice(droppableIndexStart, 1)

        list.cards.splice(droppableIndexEnd, 0, ...card)
      }
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
}

function reducerFactory<S>(initialState: S, ActionHandlers: ReducersMapObject): Reducer<S> {
  return (state: S = initialState, action: Action) => {
    const handler = ActionHandlers[action.type];

    return handler ? handler(state, action) : state;
  };
}

const reducer = reducerFactory(initialState, listsReducer);

export default reducer