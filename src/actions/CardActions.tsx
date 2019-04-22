import { CONSTANTS } from '../index'

export const addCard = (ListId, text) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { text, ListId }
  }
}