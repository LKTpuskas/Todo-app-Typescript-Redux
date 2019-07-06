import { CONSTANTS } from './ActionConstants'

export const addCard = (ListId: number, text: string) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { ListId, text }
  }
}