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
        //to: '/Home/EmployeeFile',
        to: '/Home/EmployeeRecordsAgGrid'
    },
    {
        men_slno: 168,
        component: CNavItem,
        name: 'I-Level Verification',
        //to: '/Home/EmployeeRecordVerification',
        to: '/Home/EmpFirstVerification',
    },
    {
        men_slno: 174,
        component: CNavItem,
        name: 'II-Level Verification',
        //to: '/Home/EmpfileFinalVerification',
        to: '/Home/EmpSecondVerification',
    },
    {
        men_slno: 155,
        component: CNavItem,
        name: 'Job Description',
        to: '/Home/JobDescription',
    },
    {
        men_slno: 21,
        component: CNavItem,
        name: 'Wage Bulk Updation',
        to: '/Home/AllowanceDeduction',
    },
    {
        men_slno: 221,
        component: CNavItem,
        name: 'Employee Earn Deduction',
        to: '/Home/EmpEarnDeduction',
    },
    // {
    //     component: CNavItem,
    //     name: 'Bulk Updation',
    //     to: '/homes',
    // },
    {
        men_slno: 130,
        component: CNavItem,
        name: 'Hrm Alert',
        to: '/Home/Hrm_Alert',
    },
    {
        men_slno: 131,
        component: CNavItem,
        name: 'Hrm Message',
        to: '/Home/Hrm_message',
    },
    {
        men_slno: 129,
        component: CNavItem,
        name: 'Hrm Announcement',
        to: '/Home/Hrm_Announcement',
    },
    {
        men_slno: 128,
        component: CNavItem,
        name: 'Probation End List',
        //to: '/Home/Probation_end_details',
        to: '/Home/ProbationEnd'
    },
    {
        men_slno: 129,
        component: CNavItem,
        name: 'Contract End List',
        to: '/Home/Contract_end_details',
    },
    {
        men_slno: 129,
        component: CNavItem,
        name: 'Approved Contract Renew',
        to: '/Home/ContractRenewApprovalList',
    },

]

export default Employeerecord;