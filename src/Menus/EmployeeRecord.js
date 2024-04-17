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
        name: 'Earning/Deduction',
        to: '/Home/EmpEarnDeduction',
    },
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
        men_slno: 231,
        component: CNavItem,
        name: 'Hrm Announcement',
        to: '/Home/Hrm_Announcement',
    },
    {
        men_slno: 128,
        component: CNavItem,
        name: 'Probation End List',
        to: '/Home/ProbationEnd'
    },
    {
<<<<<<< HEAD
=======
        men_slno: 129,
        component: CNavItem,
        name: 'Contract End List',
        to: '/Home/Contract_end_details',
    },
    {
>>>>>>> dbbf066fb70e3a4f8c54edc2ecdbc9bb84d0431c
        men_slno: 202,
        component: CNavItem,
        name: 'Company Information',
        to: '/Home/CompanyInfo',
    },
    {
        men_slno: 152,
        component: CNavItem,
        name: 'Department Section Change',
        to: '/Home/DeptSecChange',
    },

]

export default Employeerecord;