import React, { Fragment, useState } from 'react'
import { useHistory } from 'react-router-dom';
import AuthorizationDetails from 'src/views/CommonCode/AuthorizationDetails';
import PageLayoutCloseOnly from "src/views/CommonCode/PageLayoutCloseOnly";
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import HodApprovalTable from './HodApprovalTable';
import HodApprovalTableSection from './HodApprovalTableSection';
import HodSections from './HodSections';

const ResignationApprovalHod = () => {
    const [DeptSect, updateDeptSect] = useState([])
    const [depsect, setDeptsect] = useState(0)
    const [update, setUpdate] = useState(0)
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    const handleChange = async (e) => {
        setDeptsect(e)
        setUpdate(update + 1)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Resignation Approval HOD"
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
                    {depsect === 0 ? <HodApprovalTable DeptSect={DeptSect} /> : null}
                    {depsect !== 0 ? <HodApprovalTableSection DeptSect={depsect} /> : null}
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default ResignationApprovalHod;
