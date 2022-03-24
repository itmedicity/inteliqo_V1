import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import { IoHome, IoPower, IoSettingsSharp } from 'react-icons/io5'
import { Actiontypes } from '../redux/constants/action.type'

import { AppHeaderDropdown } from './header/index'
// import { logo } from 'src/assets/brand/logo'
import { useHistory } from 'react-router-dom'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
const AppHeader = () => {
  const dispatch = useDispatch()

  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  const history = useHistory();

  const hrmLogout = () => {
    sessionStorage.clear();
    infoNofity('You Are Logged Out Successfully');
    history.push('/')
  }

  return (
    <Fragment>
      <CHeader position="sticky" className="mb-2">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: Actiontypes.APP_SIDEBAR_SHOW, sidebarShow: !sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            {/* <CIcon icon={logo} height={48} alt="Logo" /> */}
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              <CNavLink to="/Home" component={NavLink} activeClassName="active">
                <IoHome className="text-info" size={20} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="/Home/Settings" component={NavLink}  >
                <IoSettingsSharp className="text-dark" size={20} />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink to="#">
                <IoPower className="text-danger" size={20} onClick={hrmLogout} cursor="pointer" />
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          {/* Notification Icons Start here */}
          <CHeaderNav>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilBell} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilList} size="lg" />
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilEnvelopeOpen} size="lg" />
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          {/* Notification Icons End here */}
          {/* Profile Picture And Profile Settings */}
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
          {/* Profile Picture And Profile Settings */}
        </CContainer>
      </CHeader>
    </Fragment>
  )
}

export default AppHeader
