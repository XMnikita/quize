import React from 'react'
import './ActiveQuize.css'
import ActiveQuizeList from './ActiveQuizeList/ActiveQuizeList'

const ActiveQuize = (props) => {
  const activeQuestion = props.activeQuestion
  return (
    <div className="ActiveQuize">
      <p className="QuestionHeader">
        <span>
          <strong>{activeQuestion}.</strong>&nbsp; {props.question}
        </span>
        <small>
          {activeQuestion} of {props.quizeLength}
        </small>
      </p>

      <ActiveQuizeList
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
        activeStyle={props.activeStyle}
      ></ActiveQuizeList>
    </div>
  )
}

export default ActiveQuize
