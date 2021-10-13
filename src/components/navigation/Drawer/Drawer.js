import { Component } from 'react'
import './Drawer.css'
import { NavLink } from 'react-router-dom'

const links = [
  {
    to: '/',
    label: 'Quize List',
    exact: true,
  },
  { to: '/auth', label: 'Authorization', exact: false },
  { to: '/quize-creator', label: 'Create Quize', exact: false },
]

class Drawer extends Component {
  renderLinks() {
    return links.map((el, index) => {
      return (
        <li key={index}>
          <NavLink
            onClick={this.props.onClickHandler}
            activeClassName="active"
            to={el.to}
            exact={el.exact}
          >
            {el.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = ['Drawer']

    if (!this.props.isOpen) {
      cls.push('closed')
    }
    return (
      <nav className={cls.join(' ')}>
        <ul>{this.renderLinks()}</ul>
      </nav>
    )
  }
}

export default Drawer
