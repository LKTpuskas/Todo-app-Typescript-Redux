// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { connect } from 'react-redux'
import { addList, addCard } from '../../actions'
import Form from '../form'
import Button from '../button'

class FormContainer extends Component {
  state = {
    open: false
  }

  openForm = () => this.setState({ open: true })

  closeForm = () => this.setState({ open: false })

  handleInputChange = event => this.setState({ text: event.target.value })

  handleAddList = () => {
    const { dispatch } = this.props
    const { text } = this.state

    if (text) {
      this.setState({
        text: ''
      })
      dispatch(addList(text))
    }
  }

  handleAddCard = () => {
    const { dispatch, ListId } = this.props
    const { text } = this.state

    if (text) {
      this.setState({
        text: ''
      })
      dispatch(addCard(ListId, text))
    }
  }

  render() {
    const { list } = this.props
    const { open } = this.state
    const placeholder = `Enter ${list ? 'list' : 'card'} title`
    const label = `Add ${list ? 'list' : 'card'}`
    const onMouse = list ? this.handleAddList : this.handleAddCard
    const buttonLabel = `+ Add another ${list ? 'list' : 'card'}`
    return open ? (
      <Form
        placeholder={placeholder}
        closeForm={this.closeForm}
        value={this.state.text}
        handleInputChange={this.handleInputChange}
        onMouse={onMouse}
        label={label}
      />
    ) : (
      <Button
        onClick={this.openForm}
        css={css`
          opacity: ${list ? 1 : 0.6};
          color: ${list && '#fff'};
          background: ${list && 'rgba(0,0,0,.15)'};
        `}
      >
        {buttonLabel}
      </Button>
    )
  }
}

export default connect()(FormContainer)