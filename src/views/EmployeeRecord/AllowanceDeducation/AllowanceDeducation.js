import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import TextInput from 'src/views/Component/TextInput';

const AllowanceDeducation = () => {
    const history = useHistory()
    const { id, no } = useParams();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <PageLayoutSave
                heading="Allowance & Deducation"
                redirect={RedirectToProfilePage}
            >
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-1">
                                    <div className="col-md-3">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="dddd"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="dddd"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="dddd"
                                        />
                                    </div>
                                    <div className="col-md-3">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="dddd"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default AllowanceDeducation
