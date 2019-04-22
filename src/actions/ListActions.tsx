import { CONSTANTS } from '../index'

export const addList = title => {
  return {
    type: CONSTANTS.ADD_LIST,
    payload: { title }
  }
}

export const dnd = (
  droppableIdStart,
  droppableIdEnd,
  droppableIndexStart,
  droppableIndexEnd
) => {
  return {
    type: CONSTANTS.DRAG_ENDED,
    payload: {
      droppableIdStart,
      droppableIdEnd,
      droppableIndexStart,
      droppableIndexEnd
    }
  }
}