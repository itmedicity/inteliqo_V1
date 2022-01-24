import { CNavItem } from "@coreui/react";

const Employeerecord = [
    {
        men_slno: 1,
        component: CNavItem,
        name: 'Employee Register',
        to: '/Home/EmployeeRecord',
    },
    {
        men_slno: 2,
        component: CNavItem,
        name: 'Employee File',
        to: '/Home/EmployeeFile',
    },
    {
        men_slno: 3,
        component: CNavItem,
        name: 'Allowance/Deduction',
        to: '/Home/AllowanceDeduction',
    },
    // {
    //     component: CNavItem,
    //     name: 'Bulk Updation',
    //     to: '/homes',
    // },
]

export default Employeerecord;