import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom'
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
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
                                <ResignationApprovalSection style={SELECT_CMP_STYLE} DeptSect={DeptSect}
                                    updateDeptSect={updateDeptSect} onChange={handleChange} />
                            </div>
                            <AuthorizationDetails />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {depsect === 0 ? <InchargeApprovalTable DeptSect={DeptSect} /> : null}
                    {depsect !== 0 ? <InchargeApprovalTableSection DeptSect={depsect} /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default ResignationApprovalIncharge
