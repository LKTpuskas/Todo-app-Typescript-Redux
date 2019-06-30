// eslint-disable-next-line no-unused-vars
/** @jsx jsx */
import React, { Component } from 'react'
import { css, jsx } from '@emotion/core'
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';

import { List } from '../reducer/ListReducer'
import Form from './Form'
import Button from './Button'
// import { isThisHour } from 'date-fns';
import { addList } from '../actions/ListActions'
import { addCard } from '../actions/CardActions'

interface OwnState {
  open: boolean;
  text: string;
}

interface DispatchProps {
  addList?: typeof addList;
  addCard?: typeof addCard;
}

interface FormContainerProps {
  list: List
  isList: boolean;
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
    const { addCard, list } = this.props
    const { text } = this.state
    if (text && list && list.id) {
      this.setState({
        text: ''
      })
      addCard && addCard(list.id, text)
    }
  }

  render() {
    const { isList, hasList } = this.props
    const { open } = this.state
    const placeholder = `Enter ${isList ? 'list' : 'card'} title`
    const formLabel = `Add ${isList ? 'list' : 'card'}`
    const onMouse = isList ? this.handleAddList : this.handleAddCard
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
          onClick={() => this.openCloseForm(true)}
          className={css`
          opacity: ${isList ? 1 : 0.6};
          color: ${isList && '#fff'};
          background: ${isList && 'rgba(0,0,0,.15)'};`}>
          {hasList ?  buttonLabel : formLabel}
        </Button>
    )
  }
}

/* className={css`
opacity: ${isList ? 1 : 0.6};
color: ${isList && '#fff'};
background: ${isList && 'rgba(0,0,0,.15)'};
`} */

const mapStateToProps: MapStateToProps<{}, List, {}> =  list => ({
  list
});

/* const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = {
  addList,
  addCard
}; */

export default connect(mapStateToProps)(FormContainer)