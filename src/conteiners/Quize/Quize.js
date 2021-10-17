import { Component } from 'react'
import './Quize.css'
import ActiveQuize from '../../components/ActiveQuize/ActiveQuize.js'
import QuizeEnd from '../../components/QuizeEnd/QuizeEnd'
import { Route } from 'react-router'
import Loader from '../../components/UI/Loader/Loader'

class Quize extends Component {
  state = {
    isFinished: false,
    currentAnswerStyle: { isRigth: null, id: null },
    activeQuestion: 0,
    isLoading: true,
    userAnswers: [
      // {[idQuestion]: true/false}
    ],
    quize: [
      // {
      //   question: 'Which color of this text?',
      //   rightAnswear: 4,
      //   answers: [
      //     { text: 'Black', id: 1 },
      //     { text: 'Blue', id: 2 },
      //     { text: 'Red', id: 3 },
      //     { text: 'White', id: 4 },
      //   ],
      // },
      // {
      //   question: 'In which year creator was born?',
      //   rightAnswear: 2,
      //   answers: [
      //     { text: '2000', id: 1 },
      //     { text: '2001', id: 2 },
      //     { text: '2002', id: 3 },
      //     { text: '1999', id: 4 },
      //   ],
      // },
      // {
      //   question: 'What price creator want for his first job?',
      //   rightAnswear: 1,
      //   answers: [
      //     { text: '600$', id: 1 },
      //     { text: '300$', id: 2 },
      //     { text: '350$', id: 3 },
      //     { text: '500$', id: 4 },
      //   ],
      // },
    ],
  }

  async componentDidMount() {
    // console.log(this.props.match.params.id)
    const url =
      'https://react-quize-1a8d0-default-rtdb.europe-west1.firebasedatabase.app/quizes/' +
      this.props.match.params.id +
      '.json'
    const response = await fetch(url)
    const objQuize = JSON.parse(await response.text())
    this.setState({
      quize: objQuize,
      isLoading: false,
    })
  }

  answearStateRight(answerId) {
    let prevState = [...this.state.userAnswers]
    prevState.push({ [this.state.activeQuestion]: true })
    this.setState({
      currentAnswerStyle: { isRigth: true, id: answerId },
      userAnswers: [...prevState],
    })
  }

  answearStateWrong(answerId) {
    let prevState = [...this.state.userAnswers]
    prevState.push({ [this.state.activeQuestion]: false })
    this.setState({
      currentAnswerStyle: { isRigth: false, id: answerId },
      userAnswers: [...prevState],
    })
  }

  calculateScore() {
    let sum = 0
    this.state.userAnswers.forEach((el, index) => {
      if (el[index]) ++sum
    })
    return sum
  }

  onAnswerClick = (answerId) => {
    const rightAnswear =
      this.state.quize[this.state.activeQuestion].rightAnswear

    if (this.state.currentAnswerStyle.isRigth !== null) return

    if (this.state.activeQuestion + 1 < this.state.quize.length) {
      const timer = window.setTimeout(() => {
        this.setState({
          activeQuestion: this.state.activeQuestion + 1,
          currentAnswerStyle: { isRigth: null, id: null },
        })

        clearTimeout(timer)
      }, 600)

      if (rightAnswear === answerId) {
        this.answearStateRight(answerId)
      } else {
        this.answearStateWrong(answerId)
      }
    } else if (this.state.activeQuestion + 1 === this.state.quize.length) {
      const timer = window.setTimeout(() => {
        this.setState({
          isFinished: true,
        })
        clearTimeout(timer)
      }, 600)

      if (rightAnswear === answerId) {
        this.answearStateRight(answerId)
      } else {
        this.answearStateWrong(answerId)
      }
    }
  }

  render() {
    return (
      <div className="Quize">
        <div className="QuizeWrapper">
          <h1>Answer to the all Question</h1>

          {this.state.isLoading ? (
            <Loader />
          ) : this.state.isFinished ? (
            <QuizeEnd
              score={this.calculateScore()}
              arrAnswears={this.state.userAnswers}
              quizeLength={this.state.userAnswers.length}
              question={this.state.quize}
            />
          ) : (
            <ActiveQuize
              onAnswerClick={this.onAnswerClick}
              question={this.state.quize[this.state.activeQuestion].question}
              answers={this.state.quize[this.state.activeQuestion].answears}
              quizeLength={this.state.quize.length}
              activeQuestion={this.state.activeQuestion + 1}
              activeStyle={this.state.currentAnswerStyle}
            />
          )}
        </div>
      </div>
    )
  }
}

export default Quize
