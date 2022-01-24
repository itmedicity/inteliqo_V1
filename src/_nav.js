import React from 'react'
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
import recruitMenuArray from './Menus/Recruitment'
import AttendanceManagement from './Menus/AttendanceMang'
import Employeerecord from './Menus/EmployeeRecord'
import Leavemanagement from './Menus/LeaveManagemrent'
import PayrollMenu from './Menus/PayrollMenu'
import PerformanceApproval from './Menus/PerformaneApproval'
import TrainingAndDevelopment from './Menus/TrainingAndDevelopment'
import Resignation from './Menus/Resignation'



const empRecords = [1]

const newEmployRecord = Employeerecord.filter(val => empRecords.includes(val.men_slno))

console.log(newEmployRecord)

const _nav = [
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
    items: recruitMenuArray
  },
  {
    slno: 3,
    component: CNavGroup,
    name: 'Employee Record',
    icon: <IoDocumentAttachOutline className="text-light nav-icon" size={20} />,
    items: newEmployRecord
  },
  {
    slno: 4,
    component: CNavGroup,
    name: 'Attendance',
    icon: <IoPeopleOutline className="text-light nav-icon" size={20} />,
    items: AttendanceManagement
  },
  {
    slno: 5,
    component: CNavGroup,
    name: 'Leave Management',
    icon: <IoIosGitNetwork className="text-light nav-icon" size={20} />,
    items: Leavemanagement
  },
  {
    slno: 6,
    component: CNavGroup,
    name: 'Payroll',
    icon: <GoDiff className="text-light nav-icon" size={20} />,
    items: PayrollMenu
  },
  {
    slno: 7,
    component: CNavGroup,
    name: 'Apprarisal',
    icon: <VscLaw className="text-light nav-icon" size={20} />,
    items: PerformanceApproval
  },
  {
    slno: 8,
    component: CNavGroup,
    name: 'Training ',
    icon: <VscMortarBoard className="text-light nav-icon" size={20} />,
    items: TrainingAndDevelopment
  },
  {
    slno: 9,
    component: CNavGroup,
    name: 'Resignation',
    icon: <VscFeedback className="text-light nav-icon" size={20} />,
    items: Resignation
  },
]

export default _nav

