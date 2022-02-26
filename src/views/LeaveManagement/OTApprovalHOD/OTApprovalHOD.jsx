import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import OTApprovalHODTable from './OTApprovalHODTable';
import OTApprovalHodSecTable from './OTApprovalHodSecTable';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails'
import HodSections from 'src/views/Resignation/ResignationApprovalHOD/HodSections';

const OTApprovalHOD = () => {
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
                heading="Over Time Approval HOD"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-3">
                                <HodSections style={SELECT_CMP_STYLE} DeptSect={DeptSect} updateDeptSect={updateDeptSect} onChange={handleChange} />
                            </div>
                            <AuthorizationDetails />
                        </div>
                    </div>
                </div>
                <div className="col-md-12 mt-3">
                    {depsect === 0 ? <OTApprovalHODTable DeptSect={DeptSect} /> : null}
                    {depsect !== 0 ? <OTApprovalHodSecTable DeptSect={depsect} /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default OTApprovalHOD
