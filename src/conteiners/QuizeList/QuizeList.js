import React, { Component } from 'react'
import './QuizeList.css'
import { NavLink } from 'react-router-dom'

class QuizeList extends Component {
  renderQuizeList() {
    const list = [1, 2, 3]
    return list.map((el, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quize/' + el}>{el}. Quize</NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="QuizeList">
        <h1>Quize List:</h1>
        <ul>{this.renderQuizeList()}</ul>
      </div>
    )
  }
}

export default QuizeList
