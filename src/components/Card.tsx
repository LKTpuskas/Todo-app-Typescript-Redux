// eslint-disable-next-line no-unused-vars
import * as React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Draggable } from 'react-beautiful-dnd'
import { Card as CardType } from '../reducer/ListReducer'

const container = css`
  position: relative;
  max-width: 100%;
  word-wrap: break-word;
  background: #1a9562;
  border-radius: 6px;
  padding: 12px 10px;
  margin-bottom: 12px;
  box-shadow: 0 1px 0 0 #010101;
`

const cardTitle = css`
  font-size: 18px;
  margin-bottom: 1rem;
  font-weight: 500;
`

const date = css`
font-size: 14px;
font-weight: 300;
`

const Card: React.FC<CardType> = ({ text, id, index, description, dueDate }) => {

  return (
    <Draggable draggableId={String(id)} index={index}>
      {provided => (
        <div
          css={container}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div css={css`width: 85%;`}>
            <h2 css={cardTitle}>{text}</h2>
            <p css={css`margin-bottom: 1rem;`}>
              {description}
            </p>
            <p css={date}>{dueDate}</p>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default Card