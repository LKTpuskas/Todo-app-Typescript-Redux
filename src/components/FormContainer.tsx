// eslint-disable-next-line no-unused-vars
/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'

import { List } from '../reducer/ListReducer'
import Form from './Form'
import Button from './Button'
import { addList } from '../actions/ListActions'
import { addCard } from '../actions/CardActions'

interface OwnState {
  open: boolean;
  text: string;
}

export interface DispatchProps {
  addList: typeof addList;
  addCard: typeof addCard;
}

interface FormContainerProps {
  list: List
  isList: boolean;
  listId?: number;
  hasList?: boolean;
}

type Props = FormContainerProps & DispatchProps;

class FormContainer extends Component<Props, OwnState> {
  readonly state: OwnState = {
    open: false,
    text: ''
  }

  openCloseForm = (change: boolean) => this.setState({ open: change })

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => this.setState({ text: event.target.value })

  handleAddList = () => {
    const { addList } = this.props
    const { text } = this.state
    if (text) {
      this.setState({
        text: ''
      })
      addList && addList(text)
    }
  }

  handleAddCard = () => {
    const { list, addCard } = this.props
    const { text } = this.state
    if (text && list && list.id) {
      this.setState({ text: '' })
      addCard && addCard(list.id, text)
    }
  }

  render() {
    const { isList, hasList } = this.props
    const { open } = this.state
    const placeholder = `Enter ${isList ? 'list' : 'card'} title`
    const formLabel = `Add ${isList ? 'list' : 'card'}`
    const onMouse = !isList ? this.handleAddCard : this.handleAddList
    const buttonLabel = `+ Add another ${isList ? 'list' : 'card'}`
    return open ? (
      <Form
        placeholder={placeholder}
        closeForm={() => this.openCloseForm(false)}
        value={this.state.text}
        handleInputChange={this.handleInputChange}
        onMouse={onMouse}
        label={hasList ? buttonLabel : formLabel}
      />
    ) : (
        <Button
          onClick={() => this.openCloseForm(true)}>
          {hasList ?  buttonLabel : formLabel}
        </Button>
    )
  }
}

export default FormContainer;