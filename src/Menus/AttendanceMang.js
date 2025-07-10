import { CNavItem } from "@coreui/react";

const AttendanceManagement = [
    {
        men_slno: 23,
        component: CNavItem,
        name: 'Duty Planning',
        to: '/Home/Dutyplan',
    },
    {
        men_slno: 24,
        component: CNavItem,
        name: 'Punch In/Out Marking',
        to: '/Home/ShiftUpdation',
    },
    {
        men_slno: 237,
        component: CNavItem,
        name: 'Attendance View',
        to: '/Home/AttendanceView',
    },
    {
        men_slno: 277,
        component: CNavItem,
        name: 'Attendance Punch View',
        to: '/Home/EmpPreviouspunchreport',
    },
    // {
    //     men_slno: 235,
    //     component: CNavItem,
    //     name: 'Monthly Punch Marking',
    //     to: '/Home/PunchMarkingHR',
    // },
    {
        men_slno: 235,
        component: CNavItem,
        name: 'Monthly Punch Marking',
        to: '/Home/MonthlyPunchMarking',
    },
    {
        men_slno: 132,
        component: CNavItem,
        name: 'Dutyplan for Incharge',
        to: '/Home/DutyplanforIncharge',
    },
    {
        men_slno: 127,
        component: CNavItem,
        name: 'Leave Carry Forwad',
        to: '/Home/LeaveCarryForwad',
    },
    {
        men_slno: 151,
        component: CNavItem,
        name: 'Annual Leave Process',
        to: '/Home/EmployeeAnnualLeave',
    },

    // {
    //     men_slno: 125,
    //     component: CNavItem,
    //     name: 'Attendance Process',
    //     to: '/Home/AttendanceMarking',
    // },
    {
        men_slno: 286,
        component: CNavItem,
        name: 'Salary Process',
        to: '/Home/SalaryProcess',
    },
    {
        men_slno: 316,
        component: CNavItem,
        name: 'Monthly Payroll Process',
        to: '/Home/MonthlySalaryProcess',
    }, {
        men_slno: 337,
        component: CNavItem,
        name: 'Monthly Payroll Report',
        to: '/Home/ProcessedSalaryReport',
    },



]

export default AttendanceManagement;