// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import Button from './Button'

const textArea = css`
  resize: none;
  width: 100%;
  outline: none;
  font-size: 16px;
  border: none;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
`

const container = css`
  min-height: auto;
  padding: 10px;
`

interface Props {
  placeholder: string;
  value: string;
  label: string;
  closeForm: (close: boolean) => void;
  handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>): void;
  onMouse(): void;
}

const Form: React.FC<Props> = ({
  placeholder,
  closeForm,
  value,
  handleInputChange,
  onMouse,
  label
}) => {
  return (
    <div css={container}>
      <textarea
        placeholder={placeholder}
        onBlur={() => closeForm}
        autoFocus
        value={value}
        onChange={handleInputChange}
        css={textArea}
      />
      <Button onMouseDown={onMouse}>{label}</Button>
    </div>
  )
}

export default Form