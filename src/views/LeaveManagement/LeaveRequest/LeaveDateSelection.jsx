import { IconButton, Typography } from '@mui/material';
import React, { Fragment, useContext, useState } from 'react';
import { useEffect } from 'react';
import Salutation from 'src/views/CommonCode/Salutation';
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import TestCasulLeave from './Component/TestCasulLeave';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TestLeaveType from './Component/TestLeaveType';
import TestHalfday from './Component/TestHalfday'
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';

const LeaveDateSelection = ({ index, date, setLeveData, leveData, leaveDetails, leaveretypeid }) => {
    // console.log(leaveretypeid)
    const { emergencynumber, fromDate, resonforleave } = leaveDetails
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    // console.log(employeedetails)
    const { em_id, em_no, em_department, em_dept_section } = employeedetails
    const [data, setValue] = useState(0)
    const [data1, setData1] = useState(0)
    const [casualLeve, setCasualLeve] = useState({})
    const [casualLeve2, setCasualLeve2] = useState({})
    const [postData, setPostData] = useState({})
    const [casualLeavesallowable, setcasualleaveallowable] = useState([])
    const [applyBtn, setAppleBtn] = useState(0)
    const handleChange = ({ target: { name, value } }) => {
        setData1(value)
        setCasualLeve({
            // ...casualLeve,
            [name]: value,
            lveDate: date,
            lveType: data,
            index: index
        })
        setAppleBtn(0)
    }
    const handleLveType = async ({ target: { name, value } }) => {
        if (value === 1) {
            const result = await axioslogin.get(`/yearleaveprocess/allwbleCL/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setcasualleaveallowable(data)
                setValue(value)
            }
            else if (success === 2) {
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        const lveTypedata = {
            lveDate: date,
            lveType: value,
            index: index
        }
        setCasualLeve2(lveTypedata)
        setAppleBtn(0)
    }
    useEffect(() => {
        if (data === 1 || data === 2) {
            setPostData(casualLeve)
        } else {
            setPostData(casualLeve2)
        }
    }, [casualLeve, casualLeve2, data])
    const validateSubmit = async () => {
        const filtedLeave = leveData.filter((val) => {
            return val.index !== postData.index
        })
        if (data === 0 || data === 0 && data1 === 0) {
            warningNofity("Select The Leave Type")
        } else {
            setLeveData([...filtedLeave, postData])
            setAppleBtn(1)
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="col-md-12 mb-2">
                <div className="row g-1">
                    <div className="col-md-3">
                        <Typography variant="button" display="block" gutterBottom align='justify' >
                            {date}
                        </Typography>
                    </div>
                    <div className="col-md-3">
                        <TestLeaveType style={SELECT_CMP_STYLE} name="type" select="Leave Request Type" onChange={handleLveType} />
                    </div>
                    {

                        data === 1 ?
                            <div className="col-md-3">
                                <TestCasulLeave style={SELECT_CMP_STYLE} className="mb-0" name={index} select="casual Leave" onChange={handleChange} CL={casualLeavesallowable} />
                            </div> : data === 2 ?
                                <div className="col-md-3" >
                                    <TestHalfday style={SELECT_CMP_STYLE} className="mb-0" name={index} select="Holiday" onChange={handleChange} />
                                </div> : null
                    }
                    <div className='col-md-1'  >
                        <IconButton
                            edge="end"
                            className='py-1'
                            style={applyBtn === 0 ? { color: 'red' } : { color: 'green' }}
                            onClick={validateSubmit}  >
                            <ExitToAppIcon className='p-0' />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LeaveDateSelection
