import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import Protected from './views/Protected/Protected'
import BackDrop from './views/Component/BackDrop'
require('dotenv').config()

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Question = React.lazy(() => import('./views/recruitment/Interview Initial Assesment/Question'))
function App() {
  return (
    <BrowserRouter basename="/test" >
      <React.Suspense fallback={<BackDrop />}>
        <Switch>
          <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
          <Route path="/Home">
            <Protected cmp={DefaultLayout} />
          </Route>
          <Route path="/Question" render={(props) => <Question />}  >
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
