import { Component } from 'react'
import './App.css'
import Layout from './hoc/Layout'
import Quize from './conteiners/Quize/Quize.js'
import { Route, Switch } from 'react-router-dom'
import Auth from './conteiners/Auth/Auth.js'
import QuizeCreator from './conteiners/QuizeCreator/QuizeCreator'
import QuizeList from './conteiners/QuizeList/QuizeList'

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/auth" component={Auth}></Route>
          <Route path="/quize-creator" component={QuizeCreator}></Route>
          <Route path="/quize/:id" component={Quize}></Route>
          <Route path="/" component={QuizeList}></Route>
        </Switch>
      </Layout>
    )
  }
}

export default App
