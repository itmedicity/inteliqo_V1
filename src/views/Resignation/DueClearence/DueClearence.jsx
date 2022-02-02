import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import DueClearenceTable from './DueClearenceTable';

const DueClearence = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Due Clearence Department"
                redirect={RedirectToProfilePage}
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12">
                                <DueClearenceTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default DueClearence;
