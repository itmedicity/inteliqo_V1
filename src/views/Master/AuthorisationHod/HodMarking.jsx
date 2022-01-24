import { Checkbox, FormControlLabel, IconButton } from '@mui/material'
import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { FcPlus } from 'react-icons/fc'
import { ToastContainer } from 'react-toastify'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import EmpNameSelectDeptSec from 'src/views/CommonCode/EmpNameSelectDeptSec'
import DeptSecSelectAuth from 'src/views/CommonCode/DeptSecSelectAuth'
import HodMarkingTable from './HodMarkingTable'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const HodMarking = () => {
    const history = useHistory()
    const [hodcheck, sethod] = useState(false)
    const [inchargecheck, setincharge] = useState(false)
    const [authorization, setAuthorization] = useState(0)
    const [count, setcount] = useState(0)
    const { getDeptSection, selectempName, selectDeptSec,
        employeedetails } = useContext(PayrolMasterContext)
    const { em_no } = employeedetails

    const updateAuthorization = async (e) => {
        e.target.checked === true ? sethod(true) : setincharge(false)
        e.target.checked === false ? sethod(false) : setincharge(false)
        if (hodcheck === false) {
            setAuthorization(1)
        }
        else {
            setAuthorization(0)
        }
    }

    const updateAuthorizationin = async (e) => {
        e.target.checked === true ? setincharge(true) : sethod(false)
        e.target.checked === false ? setincharge(false) : sethod(false)
        if (inchargecheck === false) {
            setAuthorization(2)
        }
        else {
            setAuthorization(0)
        }
    }

    const postData = {
        dept_section: getDeptSection,
        auth_post: authorization,
        dept_section_post: selectDeptSec,
        emp_id: selectempName,
        create_user: em_no
    }

    const submitAuthorization = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/authorization', postData)
        const { message, success } = result.data;
        if (success === 1) {
            setcount(count + 1)
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    useEffect(() => {
    }, [])
    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <div>
            <SessionCheck />
            <ToastContainer />
            <PageLayoutCloseOnly
                heading="Department HOD and Incharge Assign"
                redirect={toSettings}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="col-md-3">
                            <DeptSectionMastSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1 text-center">
                            <FormControlLabel
                                className="pb-0 mb-0"
                                control={
                                    <Checkbox
                                        name="hodcheck"
                                        color="primary"
                                        value={hodcheck}
                                        checked={hodcheck}
                                        className="py-0 px-3"
                                        onChange={(e) => {
                                            updateAuthorization(e)
                                        }}
                                    />
                                }
                                label="HOD"
                            />
                        </div>
                        <div className="col-md-2 text-center ">
                            <FormControlLabel
                                className="pb-0 mb-0 noWrap"
                                control={
                                    <Checkbox
                                        name="incharge"
                                        color="primary"
                                        value={inchargecheck}
                                        checked={inchargecheck}
                                        className="py-0 pl-3 "
                                        onChange={(e) => {
                                            updateAuthorizationin(e)
                                        }}
                                    />
                                }
                                label="Incharge"
                            />
                        </div>
                        <div className="col-md-3">
                            <DeptSecSelectAuth style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-2">
                            <EmpNameSelectDeptSec style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-1 text-center">
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                                onClick={submitAuthorization}
                            >
                                <FcPlus className="text-info" size={30}
                                />
                            </IconButton>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    <HodMarkingTable update={count} />
                </div>
            </PageLayoutCloseOnly>
        </div>
    )
}

export default HodMarking
