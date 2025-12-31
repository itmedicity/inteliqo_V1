import {
  CNavItem
} from "@coreui/react";
const PayrollDoctors = [{
    men_slno: 349,
    component: CNavItem,
    name: 'Doctor Dashboard',
    to: '/Home/DasboardforDoctor',
  },
  {
    men_slno: 343,
    component: CNavItem,
    name: 'Doctor Registration',
    to: '/Home/DoctorRegistration',
  },
  {
    men_slno: 344,
    component: CNavItem,
    name: 'Doctor Dutyplan',
    to: '/Home/DoctorPlanning',
  },
  {
    men_slno: 347,
    component: CNavItem,
    name: 'NMC Punch Upload',
    to: '/Home/DoctorPunch',
  },
  {
    men_slno: 348,
    component: CNavItem,
    name: 'Doctor Punch View',
    to: '/Home/DoctorPunchView',
  },
  {
    men_slno: 357,
    component: CNavItem,
    name: 'Doctor Leave Request',
    to: '/Home/DoctorLeaveRequest',
  },
  {
    men_slno: 358,
    component: CNavItem,
    name: 'Delete Leave Report',
    to: '/Home/DeleteDocLeaveReq',
  },
   {
    men_slno: 359,
    component: CNavItem,
    name: 'Punch Report',
    to: '/Home/DeptWisePunchView',
  },
]


export default PayrollDoctors;
