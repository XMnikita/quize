import React from 'react'
import './QuizeListItem.css'

const QuizeListItem = (props) => {
  // console.log(props)
  let className = 'QuizeListItem'
  const styleId = props.activeStyle.id
  const isRight = props.activeStyle.isRigth
  if (isRight && props.id === styleId) className += ' right'
  else if (isRight === false && props.id === styleId) className += ' wrong'
  return (
    <li className={className} onClick={() => props.onAnswerClick(props.id)}>
      {props.text}
    </li>
  )
}

export default QuizeListItem
