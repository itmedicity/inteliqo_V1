import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import ResignationApprovalSection from 'src/views/Resignation/ResignationApproval/ResignationApprovalSection';
import OTApprovalInchargeTable from './OTApprovalInchargeTable'
import OTApprovalInchargeSecTable from './OTApprovalInchargeSecTable';

const OTApprovalIncharge = () => {
    const [DeptSect, updateDeptSect] = useState([])
    const [depsect, setDeptsect] = useState(0)
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const handleChange = async (e) => {
        setDeptsect(e)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Over Time Approval Incharge"
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
                    {depsect === 0 ? <OTApprovalInchargeTable DeptSect={DeptSect} /> : null}
                    {depsect !== 0 ? <OTApprovalInchargeSecTable DeptSect={depsect} /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default OTApprovalIncharge
