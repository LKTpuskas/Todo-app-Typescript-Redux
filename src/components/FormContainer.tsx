// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { addList } from '../actions/ListActions'
import { addCard } from '../actions/CardActions'
import Form from './Form'
import Button from './Button'

interface OwnState {
  open: boolean;
  text: string;
}

interface DispatchProps {
  addList: typeof addList;
  addCard: typeof addCard;
}

interface FormContainerProps {
  listId: number;
}

type Props = FormContainerProps & DispatchProps;

class FormContainer extends Component<Props, OwnState> {
  state = {
    open: false,
    text: ''
  }

  openCloseForm = (change: boolean) => this.setState({ open: change })

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ text: event.target.value })

  handleAddList = () => {
    const { addList } = this.props
    const { text } = this.state

    if (text) {
      this.setState({
        text: ''
      })
      addList(text)
    }
  }

  handleAddCard = () => {
    const { addCard, listId } = this.props
    const { text } = this.state

    if (text) {
      this.setState({
        text: ''
      })
      addCard(listId, text)
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
        closeForm={this.openCloseForm(false)}
        value={this.state.text}
        handleInputChange={this.handleInputChange}
        onMouse={onMouse}
        label={label}
      />
    ) : (
      <Button
        onClick={this.openCloseForm(true)}
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

const mapStateToProps: MapStateToProps<> = {
  list: 
}

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  addList,
  addCard
};

export default connect(mapDispatchToProps)(FormContainer)