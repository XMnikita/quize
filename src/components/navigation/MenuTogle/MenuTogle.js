import React from 'react'
import './MenuTogle.css'

const MenuTogle = (props) => {
  const cls = [
    'material-icons',
    'MenuTogle',
    props.isOpen ? 'open' : '',
    props.class,
  ]
  return (
    <i onClick={props.onTogle} className={cls.join(' ')}>
      {props.isOpen ? 'close' : 'menu'}
    </i>
  )
}

export default MenuTogle
