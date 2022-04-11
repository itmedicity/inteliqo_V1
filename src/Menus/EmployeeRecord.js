import { CNavItem } from "@coreui/react";

const Employeerecord = [
    {
        men_slno: 19,
        component: CNavItem,
        name: 'Employee Register',
        to: '/Home/EmployeeRecord',
    },
    {
        men_slno: 20,
        component: CNavItem,
        name: 'Employee File',
        to: '/Home/EmployeeFile',
    },
    {
        men_slno: 21,
        component: CNavItem,
        name: 'Allowance/Deduction',
        to: '/Home/AllowanceDeduction',
    },
    // {
    //     component: CNavItem,
    //     name: 'Bulk Updation',
    //     to: '/homes',
    // },
    {
        men_slno: 128,
        component: CNavItem,
        name: 'Probation End Details',
        to: '/Home/Probation_end_details',
    },
    {
        men_slno: 129,
        component: CNavItem,
        name: 'Contract End Details',
        to: '/Home/Contract_end_details',
    },
]

export default Employeerecord;