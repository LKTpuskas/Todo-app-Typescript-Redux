// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import Card from '../card'
import FormContainer from '../form-container'

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

const List = ({ title, cards, ListId }) => {
  return (
    <Droppable droppableId={String(ListId)}>
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
                title={card.text}
                index={index}
              />
            ))}
          {provided.placeholder}
          <FormContainer ListId={ListId} />
        </div>
      )}
    </Droppable>
  )
}

List.defaultProps = {
  title: "Hey! I'm your default list name"
}

List.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array,
  ListId: PropTypes.number
}

export default List