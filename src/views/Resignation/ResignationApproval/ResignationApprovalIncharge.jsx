import { IconButton } from '@material-ui/core'
import { Checkbox, FormControlLabel } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import { axioslogin } from 'src/views/Axios/Axios'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import InchargeApprovalTable from './InchargeApprovalTable'
import InchargeApprovalTableSection from './InchargeApprovalTableSection'
import ResignationApprovalSection from './ResignationApprovalSection'

const ResignationApprovalIncharge = () => {
    const [DeptSect, updateDeptSect] = useState([])
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const [depsect, setDeptsect] = useState(0)
    const handleChange = async (e) => {
        setDeptsect(e)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Resignation Approval Incharge"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-3">
                                <ResignationApprovalSection style={SELECT_CMP_STYLE} DeptSect={DeptSect} updateDeptSect={updateDeptSect} onChange={handleChange} />
                            </div>
                            <AuthorizationDetails />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {depsect === 0 ? <InchargeApprovalTable DeptSect={DeptSect} /> : null}
                    {depsect === 1 ? <InchargeApprovalTableSection DeptSect={depsect} /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default ResignationApprovalIncharge
