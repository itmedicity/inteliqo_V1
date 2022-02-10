import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { CContainer } from '@coreui/react'

// routes config
import routes from '../routes'
import MasterContext from 'src/Context/MasterContext'
import TokenAuth from 'src/Context/TokenAuth'
import FullPageloader from './FullPageloader'
import Employeedetails from 'src/views/CommonCode/Employeedetails'

const AppContent = () => {
  return (
    <TokenAuth>
      <MasterContext>
        <CContainer fluid>
          <Employeedetails />
          <Suspense fallback={<FullPageloader />}>
            <Switch>
              {routes.map((route, idx) => {
                return (
                  route.component && (
                    <Route
                      key={idx}
                      path={route.path}
                      exact={route.exact}
                      name={route.name}
                      render={(props) => (
                        <>
                          <route.component {...props} />
                        </>
                      )}
                    />
                  )
                )
              })}
              {/* <Redirect from="/" to="/dashboard" /> */}
            </Switch>
          </Suspense>
        </CContainer>
      </MasterContext>
    </TokenAuth>
  )
}

export default React.memo(AppContent)
