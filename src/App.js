import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import TokenAuth from './Context/TokenAuth'
import './scss/style.scss'
import Protected from './views/Protected/Protected'
require('dotenv').config()

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

function App() {
  return (
    <BrowserRouter basename="/test" >
      <React.Suspense fallback={loading}>
        <Switch>
          <TokenAuth>
            <Route exact path="/" name="Login Page" render={(props) => <Login {...props} />} />
            {/* <Route
            exact
            path="/register"
            name="Register Page"
            render={(props) => <Register {...props} />}
          /> */}
            {/* <Route exact path="/404" name="Page 404" render={(props) => <Page404 {...props} />} />
          <Route exact path="/500" name="Page 500" render={(props) => <Page500 {...props} />} /> */}
            {/* <Route path="/Home" name="Home" render={(props) => <DefaultLayout {...props} />} /> */}
            <Route path="/Home">
              <Protected cmp={DefaultLayout} />
            </Route>
          </TokenAuth>
        </Switch>
      </React.Suspense>
    </BrowserRouter>
  )
}

export default App
