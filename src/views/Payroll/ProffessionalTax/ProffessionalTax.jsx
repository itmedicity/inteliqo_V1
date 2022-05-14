import React, { Fragment, useContext, useEffect, useState, } from 'react'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeType from 'src/views/CommonCode/EmployeType'
import { FcPlus } from "react-icons/fc";
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { IconButton, Tooltip } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import PageLayoutProcess from 'src/views/CommonCode/PageLayoutProcess'
import { useHistory } from 'react-router-dom'
import { succesNofity } from 'src/views/CommonCode/Commonfunc'
import ProffessionalTaxTable from './ProffessionalTaxTable'
import { useDispatch } from 'react-redux'
import { setProTaxList } from 'src/redux/actions/ProffessionalTax.action'
import { HiTrash } from "react-icons/hi";
const ProffessionalTax = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const [tabList, setTabList] = useState(0)
    const { selectBranchMast, selectedDept, selectEmployeeType, selectDeptSection } = useContext(PayrolMasterContext);
    const [emp, setEmp] = useState([])
    const [tax, setTax] = useState([])
    //Data Passes to get employee details
    const postdata = {
        em_branch: selectBranchMast,
        em_department: selectedDept,
        em_dept_section: selectDeptSection,
        emp_type: selectEmployeeType
    }
    //When Search icon click API call for getting employee details including grosssalary from emp_master 
    const getEmployeeDetails = async () => {
        const result = await axioslogin.post('/proftax/display', postdata)
        const { success, data } = result.data
        if (success === 1) {
            setEmp(data)
            setTabList(1)
        }
    }

    //details from protax master according to gross salary range
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
        dispatch(setProTaxList())
    }, [dispatch])
    // Delete invidual datas from list
    const deleterowfromlist = (data) => {
        const finarry = emp.filter((val) => {
            return val.em_id !== data
        })
        setEmp(finarry)
    }
    // back to home
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    //Function used to get pro tax based on gross salary 
    //tax array contain proffessional tax master data
    const calc = (gross) => {
        const amt = tax.map((val) => {
            if (gross !== 0) {
                if ((val.salary_from <= gross) && (gross <= val.salary_to)) {
                    return { taxx: val.tax_amt }
                }
            }
            else {
                return { taxx: 0 }
            }
        })
        const x = amt.filter((val) => {
            if (val !== undefined) {
                if (val === 0) {
                    return { taxvalue: 0 }
                }
                else {
                    return { taxvalue: val.taxx }
                }
            }
        })
        const { taxx } = x[0]
        return taxx
    }
    //To add tax feild to emp array it saved to mege it is used to map
    const mege = emp.map((value) => {
        return {
            pro_emp_id: value.em_id, pro_emp_no: value.em_no, pro_emp_name: value.em_name, pro_gross_salary: value.gross_salary, pro_tax: calc(value.gross_salary)
        }
    })
    // Proccess button click insert data
    const submitProTax = async (e) => {
        e.preventDefault()
        const result = await axioslogin.post('/proftax/insert', mege)
        const { success, message } = result.data
        if (success === 1) {
            succesNofity(message);
        } else if (success === 2) {
            succesNofity(message);
        }
    }
    //function used to delete all dsata in one icon
    const deleteallData = () => {
        setEmp([])
    }


    return (
        <Fragment>
            <PageLayoutProcess
                heading="Proffessional Tax"
                redirect={RedirectToProfilePage}
                submit={submitProTax}
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
                        <div className="col-md-1">
                            <Tooltip title="Search" placement="top" arrow>
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={() => {
                                        getEmployeeDetails()
                                    }}
                                >
                                    <FcPlus className="text-info" size={30} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete All" placement="top" arrow>
                                <IconButton
                                    aria-label="add"
                                    style={{ padding: '0rem' }}
                                    onClick={() => {
                                        deleteallData()

                                    }}
                                >
                                    <HiTrash size={26} color='success' />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                </div>
                <div className="col-md-12">
                    {tabList === 1 ? <ProffessionalTaxTable
                        deleterowfromlist={deleterowfromlist}
                        mege={mege}
                    /> : null
                    }
                </div>
            </PageLayoutProcess>
        </Fragment >
    )
}

export default ProffessionalTax