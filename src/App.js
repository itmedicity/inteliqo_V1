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
const PreLogInpage = React.lazy(() => import('./views/TrainingDevelopment/CommonPreTest/PreLogInpage'))
const RetestEmpDetail = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/RetestEmpDetails'))
const InductLogInpage = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/Induction_test_login'))
const InductionPreTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/PreTest/QuestFirstPage'))
const InductionPostTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/PostTest/HeadingPage'))
const OnlineInductReTest = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/InductionRetest/SystemInductionRetest/TestMainPage'))
const InductQREmpDetails = React.lazy(() => import('./views/TrainingDevelopment/EmployeeDashboard/InductionRetest/QRInductionRetest/InductQREmpDetails'))
const ORInductionTraining = React.lazy(() => import('./views/TrainingDevelopment/OnlineTrainings/ORInductionTraining'))
const FeedbackPage = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/FeedbackPage'))
const FeedbackPageWithoutTest = React.lazy(() => import('./views/TrainingDevelopment/InductionTest/FeedbackWithoutTest'))

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
          <Route path="/PreLogInpage/:topic_slno/:slno" render={(props) => <PreLogInpage />}  >
          </Route>
          <Route path="/RetestEmpDetails/:emId/:tslno" render={(props) => <RetestEmpDetail />}  >
          </Route>
          <Route path="/InductLogInpage/:topic_slno/:slno" render={(props) => <InductLogInpage />}  >
          </Route>
          <Route path="/InductionPreTest/:id/:emId/:tslno/:qcount" render={(props) => <InductionPreTest />}  >
          </Route>
          <Route path="/InductionPostTest/:id/:emId/:tslno/:qcount" render={(props) => <InductionPostTest />}  >
          </Route>
          <Route path="/OnlineInductReTest/:slno/:emId/:tslno/:qcount" render={(props) => <OnlineInductReTest />}  >
          </Route>
          <Route path="/InductQREmpDetails/:emId/:tslno" render={(props) => <InductQREmpDetails />}  >
          </Route>
          <Route path="/InductOnlineTraining/:id/:emId" render={(props) => <ORInductionTraining />}  >
          </Route>
          <Route path="/FeedbackPage/:topic_no/:schedule_no/:EmId" render={(props) => <FeedbackPage />}  >
          </Route>
          <Route path="/FeedbackPageWithoutTest/:topic_no/:schedule_no/:EmId" render={(props) => <FeedbackPageWithoutTest />}  >
          </Route>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
