import React, { Component } from 'react'
import './QuizeList.css'
import { NavLink } from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'

class QuizeList extends Component {
  state = {
    quizes: [],
    isLoading: true,
  }

  renderQuizeList() {
    const list = this.state.quizes
    return list.map((el) => {
      return (
        <li key={el.id}>
          <NavLink to={'/quize/' + el.id}>{el.name}</NavLink>
        </li>
      )
    })
  }

  // ДОМ уже прогружен и можно изменять значения
  async componentDidMount() {
    try {
      const response = await fetch(
        'https://quize-ce21d-default-rtdb.europe-west1.firebasedatabase.app/quizes.json'
      )
      const objQuizes = JSON.parse(await response.text())

      const quizes = []

      Object.keys(objQuizes).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `${index + 1}. Quize`,
        })
      })

      this.setState({
        quizes,
        isLoading: false,
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="QuizeList">
        <h1>Quize List:</h1>
        {this.state.isLoading ? <Loader /> : <ul>{this.renderQuizeList()}</ul>}
      </div>
    )
  }
}

export default QuizeList
