// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Card, { Card as Cards } from './Card'
import FormContainer from './FormContainer'

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

export interface List {
  listId: number;
  title: string;
  cards: Cards[]
}

const List: React.FC<List> = ({ title, cards, listId }) => {
  const list = { title, cards, listId };
  return (
    <Droppable droppableId={String(listId)}>
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
                title={card.title}
                index={index}
              />
            ))}
          {provided.placeholder}
          <FormContainer list={list} listId={list.listId} title={title} cards={cards} />
        </div>
      )}
    </Droppable>
  )
}

List.defaultProps = {
  title: "Hey! I'm your default list name"
}

export default List