import React from 'react'
import './ActiveQuizeList.css'
import QuizeListItem from './QuizeListItem/QuizeListItem'

const ActiveQuizeList = (props) => {
  return (
    <ul className="ActiveQuizeList">
      {props.answers.map((el, index) => {
        return (
          <QuizeListItem
            text={el.text}
            id={el.id}
            key={index}
            onAnswerClick={props.onAnswerClick}
            activeStyle={props.activeStyle}
          />
        )
      })}
    </ul>
  )
}

export default ActiveQuizeList
