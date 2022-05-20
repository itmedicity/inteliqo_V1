import React, { Fragment, useContext, Suspense, useState } from 'react'
import { useHistory } from 'react-router-dom'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios'
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { LinearProgress } from '@mui/material'
import PayrollProcessTable from './PayrollProcessTable'


const PayrollProcess = () => {

    const { selectBranchMast, selectedDept, selectDeptSection, selectEmpName } = useContext(PayrolMasterContext);
    const history = useHistory()
    const [secEmp, setSecEmp] = useState([])
    const [tabl, settabl] = useState(0)

    const getData = async () => {
        if ((selectBranchMast !== 0) && (selectedDept !== 0) && (selectDeptSection === 0) && (selectEmpName === 0)) {
            const postdata = {
                em_branch: selectBranchMast,
                em_department: selectedDept
            }
            const result = await axioslogin.post('/payrollprocess/EmpDelDept', postdata)
            const { success, data } = result.data
            if (success === 1) {
                setSecEmp(data)
                settabl(1)
            } else {
                infoNofity("No data")
            }

        }
        else if ((selectBranchMast !== 0) && (selectedDept !== 0) && (selectDeptSection !== 0) && (selectEmpName === 0)) {
            const postdata1 = {
                em_branch: selectBranchMast,
                em_department: selectedDept,
                em_dept_section: selectDeptSection
            }
            const result = await axioslogin.post('/payrollprocess/EmpDelDeptSec', postdata1)
            const { success, data } = result.data
            if (success === 1) {
                setSecEmp(data)
                settabl(1)
            } else {
                infoNofity("No data")
            }

        } else if ((selectBranchMast !== 0) && (selectedDept !== 0) && (selectDeptSection !== 0) && (selectEmpName !== 0)) {
            const postdata2 = {
                em_branch: selectBranchMast,
                em_department: selectedDept,
                em_dept_section: selectDeptSection,
                em_id: selectEmpName
            }
            const result = await axioslogin.post('/payrollprocess/EmpDelName', postdata2)
            const { success, data } = result.data
            if (success === 1) {
                setSecEmp(data)
                settabl(1)
            } else {
                infoNofity("No data")
            }
        }
    }

    // back to home
    const Redirect = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutProcess
                heading="Payroll Process"
                redirect={Redirect}
            // submit={submitProTax}
            >
                <div className="col-md-12 mb-2">
                    <div className="row g-2">
                        <div className="col-md-2">
                            <BrnachMastSelection style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <EmployeeNameSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1 text-center">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={() => {
                                    getData()
                                }}
                            >
                                <MdOutlineAddCircleOutline className="text-info" size={30} />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    {tabl === 1 ? <TableContainer sx={{ maxHeight: 350 }}>
                        <Table size="small"
                            stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow >
                                    <TableCell align="center">Emp ID</TableCell>
                                    <TableCell align="center">Emp No</TableCell>
                                    <TableCell align="center">Employee Name</TableCell>
                                    <TableCell align="center">Fixed </TableCell>
                                    {/* <TableCell align="center">Earnings</TableCell>
                                    <TableCell align="center">Deduction</TableCell>
                                    <TableCell align="center">LOP</TableCell>
                                    <TableCell align="center">Calculated LOP</TableCell>
                                    <TableCell align="center">PF</TableCell>
                                    <TableCell align="center">ESI</TableCell>
                                    <TableCell align="center">Total Earnings</TableCell>
                                    <TableCell align="center">Total Deduction</TableCell>
                                    <TableCell align="center">Net Salary</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <Suspense fallback={<LinearProgress />} >
                                    <PayrollProcessTable
                                        secEmp={secEmp}
                                    />
                                </Suspense>
                            </TableBody>
                        </Table>
                    </TableContainer> : null
                    }
                </div>
            </PageLayoutProcess>
        </Fragment >
    )
}

export default PayrollProcess