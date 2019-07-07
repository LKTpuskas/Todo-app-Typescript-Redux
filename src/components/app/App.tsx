/** @jsx jsx */
// CRA-specific rules: eslint and emotion / jsx 
// eslint-disable-next-line no-unused-vars
import { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux'
import List from '../List'
import { List as ListType } from '../../reducer/ListReducer'
import FormContainer from '../FormContainer'
import { dnd } from '../../actions/ListActions'
import { addList } from '../../actions/ListActions'
import { addCard } from '../../actions/CardActions'

const container = css`
  background: #181818f0;
  min-height: 100vh;
  padding: 1rem;
`

const header = css`
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  margin-bottom: 3rem;
  color: #3e8562;
`

const listsContainer = css`
  display: flex;
  flex-direction: row;
`
interface OwnProps {
  lists?: ListType[];
}

interface AppDispatchProps {
  dnd?: typeof dnd;
  addList: typeof addList;
  addCard: typeof addCard;
}

type Props = OwnProps & AppDispatchProps

class App extends Component<Props> {
  // Enables us to reset the state
  // in the context of local storage,
  // useful for development purposes
  // Our logic for card dragging and dropping
  onDragEnd = (result: DropResult) => {
    const { destination, source } = result
    const { dnd } = this.props

    // If no destination, e.g. user drags a card
    // outside of the droppable area, i.e. list
    // return null and don't perform draging/dropping
    if (!destination) {
      return
    }

    // If there is a destination, run our logic
    // using the source and destination objects from the dnd package.
    // Destination is where we landed,
    // source is where the dragging happened

      dnd && dnd(
        source.droppableId,
        destination.droppableId,
        source.index,
        destination.index
      )
  }

  render() {
    const { lists, addCard, addList } = this.props
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div css={container}>
          <header css={header}>
            <h1>{'Trello board 🐐'}</h1>
          </header>
          {/* Use the below button to reset the app if needed, for development purposes  */}
          {/* <button onClick={this.onPurgeStoredState}>{'Reset state'}</button> */}
          <div css={listsContainer}>
            {lists &&
              lists.map((list: ListType) => {
                return (
                  <List
                    key={list.id}
                    title={list.title}
                    cards={list.cards}
                    listId={list.id}
                    addCard={addCard}
                    addList={addList}
                  />
                )
              })}
            <FormContainer 
              isList={true} 
              hasList={lists && lists.length !== 0}
              list={{ title: ''}}
              addCard={addCard}
              addList={addList}
            />
          </div>
        </div>
      </DragDropContext>
    )
  }
}

const mapStateToProps: MapStateToProps<{}, ListType, {}> = lists => ({
  lists
})

const mapDispatchToProps: MapDispatchToProps<AppDispatchProps, {}> = {
  addList,
  addCard,
  dnd
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)