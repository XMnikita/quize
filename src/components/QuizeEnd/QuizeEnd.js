import React from 'react'
import Button from '../UI/Button/Button'
import './QuizeEnd.css'
import { Link } from 'react-router-dom'

const QuizeEnd = (props) => {
  return (
    <div className="QuizeEnd">
      <ul>
        {props.arrAnswears.map((el, index) => {
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {props.question[index].question}
              {el[index] ? (
                <i className="material-icons done">done</i>
              ) : (
                <i className="material-icons close">close</i>
              )}
            </li>
          )
        })}
      </ul>
      <p>
        {props.score} of {props.quizeLength} is right
      </p>
      <Button type="primary" onClick={() => window.location.reload()}>
        Repeat Quize
      </Button>
      <Link to="/">
        <Button type="right">Go to Quize List</Button>
      </Link>
    </div>
  )
}

export default QuizeEnd
