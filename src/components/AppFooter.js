import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="footer" >
      <div>
        <a href="https://travancoremedicity.com" target="_blank" rel="noopener noreferrer">
          Travancore Medicity
        </a>
        <span className="ms-1">&copy; 2021 creativeLabs.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://travancoremedicity.com" target="_blank" rel="noopener noreferrer">
          Medicity EDP
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
