import React, { Fragment, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Actiontypes } from '../redux/constants/action.type'
import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import { axioslogin } from 'src/views/Axios/Axios'
import VaccinesIcon from '@mui/icons-material/Vaccines'


//NAV BAR IMPORT
import {
  IoHome,
  IoCalendarOutline,
  IoDocumentAttachOutline,
  IoPeopleOutline,
} from 'react-icons/io5'
import { GoDiff } from "react-icons/go";
import { IoIosGitNetwork } from "react-icons/io";
import { VscMortarBoard, VscLaw, VscFeedback } from "react-icons/vsc";
import { CNavGroup, CNavItem } from '@coreui/react'

import recruitMenuArray from '../Menus/AttendanceMang'
import AttendanceManagement from '../Menus/AttendanceMang'
import Employeerecord from '../Menus/EmployeeRecord'
import Leavemanagement from '../Menus/LeaveManagemrent'
import PayrollMenu from '../Menus/PayrollMenu'
import PerformanceApproval from '../Menus/PerformaneApproval'
import TrainingAndDevelopment from '../Menus/TrainingAndDevelopment'
import Resignation from '../Menus/Resignation'
import { getMenuSlno } from 'src/views/Constant/Constant'
import CIcon from '@coreui/icons-react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import VaccinationInfo from '../Menus/VaccinationMenu'

const AppSidebar = () => {

  const [empRecruit, setRecruitMenuArray] = useState();
  const [empRecord, setEmployeerecord] = useState();
  const [empAttendance, setAttendanceManagement] = useState();
  const [empLeaveMagt, setLeavemanagement] = useState();
  const [empPayrol, setPayrollMenu] = useState();
  const [empPerformance, setPerformanceApproval] = useState();
  const [empTraining, setTrainingAndDevelopment] = useState();
  const [empResignation, setResignation] = useState();
  const [count, setCount] = useState(0)
  const [empVaccination, setVaccination] = useState();

  //SIDE NAV BAR
  const navigation = [
    {
      slno: 1,
      component: CNavItem,
      name: 'Home',
      to: '/Home',
      icon: <IoHome className="text-info nav-icon" size={20} />,
    },
    {
      slno: 2,
      component: CNavGroup,
      name: 'Recruitment',
      icon: <IoCalendarOutline className="text-light nav-icon" size={20} color="#ee98fb" />,
      items: empRecruit
    },
    {
      slno: 3,
      component: CNavGroup,
      name: 'Employee Record',
      icon: <IoDocumentAttachOutline className="text-light nav-icon" size={20} />,
      items: empRecord
    },
    {
      slno: 4,
      component: CNavGroup,
      name: 'Attendance',
      icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
      items: empAttendance
    },
    {
      slno: 5,
      component: CNavGroup,
      name: 'Leave Management',
      icon: <IoIosGitNetwork className="text-light nav-icon" size={20} />,
      items: empLeaveMagt
    },
    {
      slno: 6,
      component: CNavGroup,
      name: 'Payroll',
      icon: <GoDiff className="text-light nav-icon" size={20} />,
      items: empPayrol
    },
    {
      slno: 7,
      component: CNavGroup,
      name: 'Apprarisal',
      icon: <VscLaw className="text-light nav-icon" size={20} />,
      items: empPerformance
    },
    {
      slno: 8,
      component: CNavGroup,
      name: 'Training ',
      icon: <VscMortarBoard className="text-light nav-icon" size={20} />,
      items: empTraining
    },
    {
      slno: 9,
      component: CNavGroup,
      name: 'Resignation',
      icon: <VscFeedback className="text-light nav-icon" size={20} />,
      items: empResignation
    },
    {
      slno: 13,
      component: CNavGroup,
      name: 'Vaccination ',
      icon: <VaccinesIcon className="text-light nav-icon" size={20} />,
      items: empVaccination
    },
  ]

  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.changeState.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.changeState.sidebarShow)

  const [menu, setMenu] = useState([])

  useEffect(() => {

    //MENU RIGHTS FROM HERE
    getMenuSlno().then((val) => {

      const resultLength = Object.keys(val[0])?.length ?? 0

      if (resultLength > 0) {

        const menuRitSlno = val[0];
        const menuSlnoAry = menuRitSlno.map((menu) => {
          return menu.menu_slno;
        })

        const newEmployRecord = Employeerecord.filter(val => menuSlnoAry.includes(val.men_slno));
        setEmployeerecord(newEmployRecord)
        const newRecruitMent = recruitMenuArray.filter(val => menuSlnoAry.includes(val.men_slno));
        setRecruitMenuArray(newRecruitMent)
        const newAttendanceMangt = AttendanceManagement.filter(val => menuSlnoAry.includes(val.men_slno));
        setAttendanceManagement(newAttendanceMangt)
        const newLeaveMangt = Leavemanagement.filter(val => menuSlnoAry.includes(val.men_slno));
        setLeavemanagement(newLeaveMangt)
        const newPayrollmgnt = PayrollMenu.filter(val => menuSlnoAry.includes(val.men_slno));
        setPayrollMenu(newPayrollmgnt)
        const newPerformance = PerformanceApproval.filter(val => menuSlnoAry.includes(val.men_slno));
        setPerformanceApproval(newPerformance)
        const newTrainging = TrainingAndDevelopment.filter(val => menuSlnoAry.includes(val.men_slno));
        setTrainingAndDevelopment(newTrainging)
        const newResignation = Resignation.filter(val => menuSlnoAry.includes(val.men_slno));
        setResignation(newResignation)
        const newVaccination = VaccinationInfo.filter(val => menuSlnoAry.includes(val.men_slno))
        setVaccination(newVaccination)
        //For Rerent the Component
        setCount(1)
      }

    })

    //MODULE RIGHTS FROM HERE
    const module_rights = []
    const getModuleUserRight = async () => {
      const userinfo = sessionStorage.getItem('userDetl');
      const emp_no = userinfo ? JSON.parse(sessionStorage.getItem('userDetl')).empno : 0;
      const result = await axioslogin.get(`/common/getempid/${emp_no}`)
      const { success, data } = result.data
      if (success === 1) {
        const { emp_id } = data[0]
        const postdata = {
          emp_slno: emp_id
        }
        try {
          const result = await axioslogin.post('/common/getModlRight', postdata)
          const { success, data } = await result.data
          if (success === 1) {
            const moduleDetl = await JSON.parse(data[0].module_slno)
            const moduleSlno = Object.values(moduleDetl)
            moduleSlno.map((val) => module_rights.push(val))

            const menus = navigation.filter((element, index, array) => {
              return module_rights.includes(element.slno)
            })
            setMenu(menus)
          }

        } catch (err) {
          console.log(err)
        }
      }
    }
    getModuleUserRight()
  }, [count])
  const em_name = useSelector((state) => {
    return state.getProfileData.ProfileData[0].em_name
    //const status = state.getProfileData.lodingStatus
  })

  return (
    <Fragment>
      <CSidebar
        position="fixed"
        unfoldable={unfoldable}
        visible={sidebarShow}
        onVisibleChange={(visible) => {
          dispatch({ type: Actiontypes.APP_SIDEBAR_SHOW, sidebarShow: visible })
        }}
      >
        <CSidebarBrand className="d-none d-md-flex" to="/">

          <Box sx={{ display: "flex", flexDirection: "row", px: 1, }}>
            <Box sx={{ p: 1, display: "flex", }} >
              <CssVarsProvider>
                <Typography textColor="text.secondary">
                  WELCOME
                </Typography>
              </CssVarsProvider>
            </Box>
            <Box sx={{ p: 1, display: "flex", textTransform: 'capitalize', fontStyle: "oblique", }} >
              <CssVarsProvider>
                <Typography textColor="text.secondary">
                  {em_name.toLowerCase()}
                </Typography>
              </CssVarsProvider>
            </Box>
          </Box>


          {/* Company Logo Big Size */}
          {/* <CIcon className="sidebar-brand-full" height={35} /> */}
          {/* Company Logo Small size */}
          {/* <CIcon className="sidebar-brand-narrow" height={35} /> */}
        </CSidebarBrand>
        <CSidebarNav>
          <SimpleBar>
            <AppSidebarNav items={menu} />
          </SimpleBar>
        </CSidebarNav>
        <CSidebarToggler
          className="d-none d-lg-flex"
          onClick={() => dispatch({ type: Actiontypes.APP_SIDEBAR_SHOW, sidebarUnfoldable: !unfoldable })}
        />
      </CSidebar>
    </Fragment>
  )
}

export default React.memo(AppSidebar)
