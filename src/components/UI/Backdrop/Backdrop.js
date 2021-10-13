import react from 'react'
import './Backdrop.css'

const Backdrop = (props) => {
  const cls = ['Backdrop']
  return <div onClick={props.onClickHandler} className={cls.join(' ')}></div>
}

export default Backdrop
