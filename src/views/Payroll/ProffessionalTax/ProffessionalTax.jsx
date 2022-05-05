import React, { Fragment, Suspense, useContext, useEffect, useState, } from 'react'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeType from 'src/views/CommonCode/EmployeType'
import { FcPlus } from "react-icons/fc";
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import ProffesionalTaxRow from './ProffesionalTaxRow'
import { LinearProgress } from '@mui/material'
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import { useHistory } from 'react-router-dom'

const ProffessionalTax = () => {
    const history = useHistory()
    const [tabList, setTabList] = useState(0)
    const { selectBranchMast, selectedDept, selectEmployeeType, selectDeptSection } = useContext(PayrolMasterContext);
    const [emp, setEmp] = useState([])
    const [tax, setTax] = useState([])
    const postdata = {
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        emp_type: selectEmployeeType
    }

    //When button click API call for getting grosssalary from emp_master 
    const getEmployeeDetails = async () => {
        const result = await axioslogin.post('/proftax/display', postdata)
        const { success, data } = result.data
        if (success === 1) {
            setEmp(data)
            setTabList(1)
        }
    }
    //details from protax master
    useEffect(() => {
        const getproTax = async () => {
            const result = await axioslogin.get(`/proftax`)
            const { success, data } = result.data;
            if (success === 1) {
                setTax(data)
            } else {
                infoNofity("No Tax details added")
            }
        }
        getproTax()
    }, [])

    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutProcess
                heading="Proffessional Tax"
                redirect={RedirectToProfilePage}
            //submit={submit}

            >

                <div className="col-md-12 mb-2">
                    <div className="row g-2">
                        <div className="col-md-2">
                            <BrnachMastSelection style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                        </div>
                        <div className="col-md-2">
                            <DepartmentSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                        </div>
                        <div className="col-md-2">
                            <DepartmentSectionSelect style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                        </div>
                        <div className="col-md-2">
                            <EmployeType style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 4 }} />
                        </div>
                        <div className="col-md-2">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={() => {
                                    getEmployeeDetails()
                                }}
                            >
                                <FcPlus className="text-info" size={30} />
                            </IconButton>

                        </div>
                    </div>
                </div>
                <div className="col-md-12">
                    {tabList === 1 ?
                        <div className="row g-1 ">
                            <div className="card ">
                                <div className="col-md-12 pt-1">
                                    <TableContainer sx={{ maxHeight: 350 }}>
                                        <Table size="small"
                                            stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow >
                                                    <TableCell align="center">Emp ID</TableCell>
                                                    <TableCell align="center">Emp No</TableCell>
                                                    <TableCell align="center">Employee Name</TableCell>
                                                    <TableCell align="center">Gross Salary </TableCell>
                                                    <TableCell align="center">Proffessional Tax </TableCell>
                                                    <TableCell align="center"></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <Suspense fallback={<LinearProgress />} >
                                                    <ProffesionalTaxRow
                                                        emp={emp}
                                                        tax={tax}
                                                    />
                                                </Suspense>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            </div>
                        </div>
                        : null
                    }

                </div>

            </PageLayoutProcess>
        </Fragment >
    )
}

export default ProffessionalTax