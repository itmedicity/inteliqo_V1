import React, { Fragment } from 'react';
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly';
import DueClearenceHRTable from './DueClearenceHRTable';

const DueClearenceHR = () => {
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Due Clearence HR"
            >
                <div className="col-md-12">
                    <div className="row g-1">
                        <div className="d-flex justify-content-center">
                            <div className="col-md-12">
                                <DueClearenceHRTable />
                            </div>
                        </div>
                    </div>
                </div>
            </PageLayoutCloseOnly>
        </Fragment>
    )
};

export default DueClearenceHR;
