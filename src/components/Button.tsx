// eslint-disable-next-line no-unused-vars
import React from 'react'
/** @jsx jsx */
import { css, jsx, ClassNames } from '@emotion/core'

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
`

interface Props {
  children: string;
  className?: any;
  onClick?: () => void;
  onMouseDown?: () => void;
}

const Button: React.FC<Props> = ({children, ...props}) => {
  return (
    <button className={button && props.className} onClick={props.onClick} onMouseDown={props.onMouseDown}>
      {children}
    </button>
  )
}

export default Button