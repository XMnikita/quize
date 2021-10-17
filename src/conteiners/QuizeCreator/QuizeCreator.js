import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/Select/Select'
import {
  createFormControl,
  isValidControl,
} from '../../form/validation/createFormControler'
import './QuizeCreator.css'

function createOptionControl(n) {
  return createFormControl(
    {
      label: `Answear ${n}:`,
      errorMessage: 'Fill this fild',
      id: n,
      value: '',
      valid: true,
      touched: false,
      shouldValidate: true,
    },
    {
      require: true,
    }
  )
}

function createFormControls() {
  return {
    question: createFormControl(
      {
        label: 'Write Question',
        errorMessage: 'Fill this fild',
        value: '',
        valid: true,
        touched: false,
        shouldValidate: true,
      },
      {
        require: true,
      }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}

class QuizeCreator extends Component {
  state = {
    rightAnswearId: 1,
    quize: [],
    formControls: createFormControls(),
  }

  onSubmitHandler(event) {
    event.preventDefault()
  }

  onChangeInput = (event, controlName) => {
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
        <React.Fragment key={el + index}>
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
          {index === 0 ? <hr style={{ marginBottom: '20px' }} /> : null}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswearId: +event.target.value,
    })
  }

  addQuestionHandler = () => {
    let isFormValid = true
    const formControls = { ...this.state.formControls }
    for (const controlName in this.state.formControls) {
      if (
        !isValidControl(
          this.state.formControls[controlName],
          this.state.formControls[controlName].validation
        )
      ) {
        isFormValid = false
        const control = { ...formControls[controlName] }
        control.valid = false
        formControls[controlName] = control
        this.setState({
          formControls,
        })
      }
    }
    if (isFormValid) {
      const quize = this.state.quize.concat()
      // const index = this.state.quize.length + 1
      const question = this.state.formControls.question.value
      const rightAnswear = this.state.rightAnswearId
      const formControls = this.state.formControls
      const answears = [
        { id: formControls.option1.id, text: formControls.option1.value },
        { id: formControls.option2.id, text: formControls.option2.value },
        { id: formControls.option3.id, text: formControls.option3.value },
        { id: formControls.option4.id, text: formControls.option4.value },
      ]
      quize.push({
        question,
        rightAnswear,
        answears,
      })

      this.setState({
        formControls: createFormControls(),
        quize,
      })
    }
  }

  createQuizeHandler = async () => {
    try {
      const response = await fetch(
        'https://react-quize-1a8d0-default-rtdb.europe-west1.firebasedatabase.app/quizes.json',
        {
          method: 'POST',
          body: JSON.stringify(this.state.quize),
          headers: { 'Content-Type': 'application/json' },
        }
      )
      // console.log(response)

      this.setState({
        rightAnswearId: 1,
        quize: [],
        formControls: createFormControls(),
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="QuizeCreator">
        <h1>Quize Creator</h1>

        <form onSubmit={this.onSubmitHandler}>
          {this.renderInputs()}
          <Select
            value={this.state.rightAnswearId}
            onChange={this.selectChangeHandler}
            label="Choose right answear:"
            options={[
              { text: 1, value: 1 },
              { text: 2, value: 2 },
              { text: 3, value: 3 },
              { text: 4, value: 4 },
            ]}
          />

          <Button type="primary" onClick={this.addQuestionHandler}>
            Add Question
          </Button>

          <Button
            type={this.state.quize.length === 0 ? 'disabled' : 'right'}
            onClick={
              this.state.quize.length === 0
                ? (event) => event.preventDefault()
                : this.createQuizeHandler
            }
          >
            Create Quize
          </Button>
        </form>
      </div>
    )
  }
}

export default QuizeCreator
