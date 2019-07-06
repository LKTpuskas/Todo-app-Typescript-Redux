// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Card from './Card'
import { List as ListType } from './../reducer/ListReducer'
import FormContainer, { DispatchProps } from './FormContainer'

const container = css`
background-color: #dfe3e6;
border-radius: 3px;
width: 350px;
padding: 14px;
height: 100%;
margin: 0 8px 0 0;
`

const listTitle = css`
padding-bottom: 0.5rem;
margin-left: 0.5rem;
`

interface OwnProps {
  listId?: number;
}

type Props = ListType & OwnProps & DispatchProps;

const List: React.FC<Props> = ({ title, cards, id, listId, addCard, addList }) => {
  const list = { title, cards, id: listId };
  return (
    <Droppable droppableId={String(id)}>
      {provided => (
        <div
          css={container}
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          <h2 css={listTitle}>{title}</h2>
          {cards &&
            cards.map((card, index) => (
              <Card
                key={card.id}
                id={card.id}
                text={card.text}
                index={index}
              />
            ))}
          {provided.placeholder}
          <FormContainer isList={false} list={list} addCard={addCard} addList={addList}/>
        </div>
      )}
    </Droppable>
  )
}

export default List