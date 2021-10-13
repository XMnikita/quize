import React from 'react'
import './Input.css'

function isInvalid({ valid, touched, shouldValidate }) {
  return !valid && touched && shouldValidate
}

const Input = (props) => {
  const cls = ['Input']
  const type = props.type || 'text'
  const htmlFor = `${type}-${Math.random()}`
  const isInvalidInput = isInvalid(props)

  if (isInvalidInput) {
    cls.push('invalid')
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={type}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        required={props.require}
      />

      <span>{isInvalidInput ? props.errorMessage : null}</span>
    </div>
  )
}

export default Input
