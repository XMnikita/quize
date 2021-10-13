import React, { Component } from 'react'
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

class Auth extends Component {
  state = {
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Input valid Email',
        valid: true,
        touched: false,
        shouldValidate: true,
        validation: {
          require: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Input valid Password',
        valid: true,
        touched: false,
        shouldValidate: true,
        validation: {
          require: true,
          minLenth: 6,
        },
      },
    },
  }

  isValidAuth() {
    const formControls = { ...this.state.formControls }
    const email = { ...formControls.email }
    const password = { ...formControls.password }
    if (!validateEmail(email.value)) {
      email.valid = false
    }
    if (password.value.trim().length < 6) {
      password.valid = false
    }

    formControls.email = email
    formControls.password = password

    this.setState({
      formControls,
    })
  }

  signInHandler = (event) => {
    this.isValidAuth()
  }

  signUpHandler = (event) => {
    this.isValidAuth()
  }

  onSubmitHandler(event) {
    // console.log(event)
    event.preventDefault()
  }

  onChangeInput(event, controlName) {
    // console.log(controlName + ':' + event.target.value)
    const formControls = { ...this.state.formControls }
    const newControl = { ...formControls[controlName] }
    newControl.value = event.target.value
    newControl.touched = true
    newControl.valid = true
    formControls[controlName] = newControl
    this.setState({ formControls })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((el, index) => {
      const control = this.state.formControls[el]
      return (
        <Input
          key={el + index}
          type={control.type}
          label={control.label}
          errorMessage={control.errorMessage}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={control.shouldValidate}
          value={control.value}
          onChange={(event) => this.onChangeInput(event, el)}
          require={control.validation.require ? true : false}
        />
      )
    })
  }

  render() {
    return (
      <div className="Auth">
        <h1>Authorization</h1>

        <form onSubmit={this.onSubmitHandler} className="AuthForm">
          {this.renderInputs()}

          {/* <Input type="text" label="Email" />
          <Input type="password" label="Password" /> */}
          <Button
            type="right"
            // style={{ margin: '0px' }}
            onClick={this.signInHandler}
          >
            Sign in
          </Button>
          <Button
            type="primary"
            // style={{ margin: '0px' }}
            onClick={this.signUpHandler}
          >
            Sign up
          </Button>
        </form>
      </div>
    )
  }
}

export default Auth
