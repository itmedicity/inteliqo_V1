import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import Protected from './views/Protected/Protected'
import BackDrop from './views/Component/BackDrop'
require('dotenv').config()
const QuestionPreTest = React.lazy(() => import('./views/TrainingDevelopment/PreTest/OnlinePreWithQRcode'))
const OnlineTraining = React.lazy(() => import('./views/TrainingDevelopment/OnlineTraining/OnlineTrainingQR'))
const QuestionPostTest = React.lazy(() => import('./views/TrainingDevelopment/PostTest/OnlinePostWithQR'))
const RetestQuestions = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/RetestQuestionPage'))

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))

function App() {
  return (
    <BrowserRouter basename="/test" >
      <React.Suspense fallback={<BackDrop />}>
        <Switch>
          <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
          <Route path="/Home">
            <Protected cmp={DefaultLayout} />
          </Route>
          <Route path="/OnlinePreTest/:id/:emId/:tslno/:qcount" render={(props) => <QuestionPreTest />}  >
          </Route>
          <Route path="/OnlineTraining/:id/:emId" render={(props) => <OnlineTraining />}  >
          </Route>
          <Route path="/OnlinePostTest/:id/:emId/:tslno/:qcount" render={(props) => <QuestionPostTest />}  >
          </Route>
          <Route path="/OnlineReTest/:slno/:emId/:tslno/:qcount" render={(props) => <RetestQuestions />}  >
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
