// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const button = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  border-radius: 3px;
  height: 40px;
  padding: 10px 12px;
  border: none;
  box-shadow: 0 1px 0 0 #808080;
  font-size: 16px;
  white-space: nowrap;
  color: #646464;
  background: #FFEB3B;
  &:focus {
    box-shadow: 0 0 4pt 1pt #358564c7;
    outline: none;
  }
`

interface Props {
  children: string;
  onClick?: () => void;
  onMouseDown?: () => void;
}

const Button: React.FC<Props> = ({children, ...props}) => {
  return (
    <button css={button} onClick={props.onClick} onMouseDown={props.onMouseDown}>
      {children}
    </button>
  )
}

export default Button