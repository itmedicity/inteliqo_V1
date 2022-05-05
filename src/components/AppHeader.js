import React, { Fragment, useEffect, useState } from 'react'
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
import { cilMenu } from '@coreui/icons'
import { IoHome, IoPower, IoSettingsSharp } from 'react-icons/io5'
import { Actiontypes } from '../redux/constants/action.type'

import { AppHeaderDropdown } from './header/index'
// import { logo } from 'src/assets/brand/logo'
import { useHistory } from 'react-router-dom'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import { Badge, IconButton, Typography } from '@mui/material'
import moment from 'moment'
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import MessageComponent from './profileComponent/MessageComponent'
import NotificationComponent from './profileComponent/NotificationComponent'
import { setAlertList } from '../redux/actions/Alert.Actions'
import { setMsgList } from 'src/redux/actions/Message.actions'
import { setAnnouncementList } from 'src/redux/actions/Announcement.action'
import { setModuleRightsList } from 'src/redux/actions/ModuleRights.Action'


const AppHeader = () => {
  //alert Count
  const [alertcount, setalertcount] = useState(0)
  const [msgcount, setmsgcount] = useState(0)
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)
  const history = useHistory();
  const today = moment().format('dddd, DD MMMM - YYYY')
  const hrmLogout = () => {
    sessionStorage.clear();
    infoNofity('You Are Logged Out Successfully');
    history.push('/')
  }

  // Notification and Message Component Function

  const [anchorElMessage, setAnchorElMessage] = React.useState(null);
  const openMessage = Boolean(anchorElMessage);

  const handleMessageClick = (event) => {
    setAnchorElMessage(event.currentTarget);
  };
  const handleMessageClose = () => {
    setAnchorElMessage(null);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  //getting employee id
  const empid = useSelector((state) => {
    // console.log(state)
    const status = state.getProfileData.lodingStatus
    if (status === false) {
      hrmLogout()
    }
    return state.getProfileData.ProfileData[0].em_id
  })
  //getting alert list
  useEffect(() => {
    dispatch(setAlertList())
    dispatch(setAnnouncementList())
    dispatch(setMsgList(empid))
    dispatch(setModuleRightsList(empid))
  }, [empid, dispatch])

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
              <Typography
                variant="overline"
                display="block"
                gutterBottom
                sx={{ paddingTop: 1, margin: 0, paddingX: 2 }}
              >
                {today}
              </Typography>
            </CNavItem>
            {/* Message Menu */}
            <CNavItem>
              <IconButton sx={{ paddingX: 1.5 }}
                id="basic-button"
                aria-controls={openMessage ? 'message-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMessage ? 'true' : undefined}
                onClick={handleMessageClick}
              >
                <Badge badgeContent={msgcount} variant='standard' color='error'
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: "#4caf50",
                      boxShadow: "0 0 8px 2px lightblue",
                    }
                  }}
                >
                  <EmailIcon color="primary" />
                </Badge>
              </IconButton>
            </CNavItem>
            {/* NOtiication Menu */}
            <CNavItem>
              <IconButton sx={{ paddingX: 1.5 }}
                id="basic-button"
                aria-controls={open ? 'notification-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                <Badge badgeContent={alertcount} variant='standard' color='error'
                  sx={{
                    "& .MuiBadge-badge": {
                      color: "white",
                      backgroundColor: "#ff9800",
                      boxShadow: "0 0 8px 2px lightblue",
                    }
                  }}
                >
                  <NotificationsIcon color="primary" />
                </Badge>
              </IconButton>
            </CNavItem>

            {/* <CNavItem>
              <CNavLink href="#">
                <CIcon icon={cilBell} size="lg" />
              </CNavLink>
            </CNavItem> */}

          </CHeaderNav>
          {/* Notification Icons End here */}
          {/* Profile Picture And Profile Settings */}
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav>
          {/* Profile Picture And Profile Settings */}
        </CContainer>
      </CHeader>

      {/* Message NOtificaton CComp */}
      <MessageComponent anchorEl={anchorElMessage} open={openMessage} handleClose={handleMessageClose} setmsgcount={setmsgcount} />
      <NotificationComponent anchorEl={anchorEl} open={open} handleClose={handleClose} setalertcount={setalertcount} />

    </Fragment>
  )
}

export default AppHeader
