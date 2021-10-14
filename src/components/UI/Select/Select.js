import react from 'react'
import './Select.css'

const Select = (props) => {
  const htmlFor = `select-${Math.random()}`
  return (
    <div className="Select">
      <label htmlFor={htmlFor}>{props.label}</label>
      <select value={props.value} onChange={props.onChange} id={htmlFor}>
        {props.options.map((el, index) => {
          return (
            <option key={index} value={el.value}>
              {el.text}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default Select
