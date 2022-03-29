import MaterialTable from 'material-table'
import { Button } from '@material-ui/core'
import React, { Fragment, memo, useContext, useEffect, useState } from 'react'
import { ToastContainer } from 'react-bootstrap'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import { tableIcons } from 'src/views/Constant/MaterialIcon'
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import { axioslogin } from 'src/views/Axios/Axios'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { useHistory } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'

const EmployeeRecord = () => {
    const classes = useStyles()
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch()

    const employeeRecordList = useSelector((state) => {
        return state.getEmployeeRecordList.empRecordData;
    })

    useEffect(() => {
        // set the table data from reducx store to material table data
        if (Object.keys(employeeRecordList).length > 0) {
            setTableData(employeeRecordList)
        }
    }, [employeeRecordList])

    const {
        selectedDept,
        selectDeptSection,
        selectBranchMast,
    } = useContext(PayrolMasterContext)

    const postData = {
        dept_id: selectedDept,
        sect_id: selectDeptSection,
        branch_slno: selectBranchMast
    }

    //Material Table
    const title = [
        { title: '#', field: 'em_slno' },
        {
            title: 'Emp No', field: 'em_no', cellStyle: {
                minWidth: 118,
                maxWidth: 120
            }
        },
        {
            title: 'Emp Id', field: 'em_id', cellStyle: {
                minWidth: 118,
                maxWidth: 120
            }
        },
        {
            title: 'Name', field: 'emp_name', cellStyle: {
                minWidth: 300,
                maxWidth: 400
            }
        },
        {
            title: 'Gender', field: 'gender', cellStyle: {
                minWidth: 20,
                maxWidth: 20
            }
        },
        { title: 'Age', field: 'em_age_year' },
        {
            title: 'DOJ', field: 'em_doj', cellStyle: {
                minWidth: 250,
                maxWidth: 250
            }
        },
        { title: 'Mobile', field: 'em_mobile' },
        {
            title: 'Branch', field: 'branch_name', cellStyle: {
                minWidth: 100,
                maxWidth: 100
            }
        },
        {
            title: 'Department', field: 'dept_name', cellStyle: {
                minWidth: 200,
                maxWidth: 200
            }
        },
        {
            title: 'Department Section', field: 'sect_name', cellStyle: {
                minWidth: 200,
                maxWidth: 200
            }
        },
        {
            title: 'Designation', field: 'desg_name', cellStyle: {
                minWidth: 300,
                maxWidth: 400
            }
        },
        { title: 'Status', field: 'emp_status' },
    ]
    // Employee Record List
    const getEmployeeList = async (e) => {
        e.preventDefault()
        if (selectedDept !== 0 && selectDeptSection !== 0 && selectBranchMast !== 0) {
            const result = await axioslogin.post('/empmast/getEmpDet', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                dispatch(setEmployeeList(data))
            }
        } else {
            warningNofity("Choose All Option")
        }

    }

    const toSettings = () => {
        history.push('/Home')
    }

    // Route to Empl Record
    const getEmployeeEmpNumber = (data) => {
        const { em_no, em_id } = data
        history.push(`/Home/Profile/${em_no}/${em_id}`)
        // console.log(data);
    }

    return (
        <Fragment>
            <SessionCheck />
            <ToastContainer />
            <div className="card">
                <div className="card-header bg-dark pb-0 border border-dark text-white">
                    <h5>Employee Record List</h5>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <form className={classes.root} onSubmit={getEmployeeList}  >
                                <div className="row">
                                    <div className="col-md-3 pb-2 pr-0">
                                        <BrnachMastSelection />
                                    </div>
                                    <div className="col-md-3 pb-2  ">
                                        <DepartmentSelect />
                                    </div>
                                    <div className="col-md-3 pb-2 pr-0 ">
                                        <DepartmentSectionSelect />
                                    </div>
                                    <div className="col-md-1 pt-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            type="Submit"
                                            className="ml-1"
                                        >
                                            Search
                                        </Button>
                                    </div>
                                    <div className="col-md-1 pt-2">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            fullWidth
                                            className="ml-2"
                                            onClick={toSettings}
                                        >
                                            Close
                                        </Button>
                                    </div>
                                </div>
                            </form>
                            <MaterialTable
                                title="Employee Data"
                                data={tableData}
                                columns={title}
                                icons={tableIcons}
                                // className={classes.horizondalScroll}
                                actions={[
                                    {
                                        icon: () => <AccountCircleOutlinedIcon color='info' />,
                                        tooltip: "Click here to Edit The Personal File",
                                        onClick: (e, data) => getEmployeeEmpNumber(data)
                                    }
                                ]}
                                options={{
                                    paginationType: "stepped",
                                    showFirstLastPageButtons: false,
                                    padding: "dense",
                                    actionsColumnIndex: 0,
                                    pageSize: 10,
                                    // tableLayout: "fixed",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default memo(EmployeeRecord)
