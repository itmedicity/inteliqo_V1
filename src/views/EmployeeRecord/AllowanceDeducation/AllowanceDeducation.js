import { IconButton } from '@mui/material';
import React, { Fragment } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave';
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent';
import TextInput from 'src/views/Component/TextInput';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import SalaryIncrementMainCard from '../EmployeeFile/EmpFileComponent/SalaryIncrementMainCard';
import AllowanceBulkUpdation from './AllowanceBulkUpdation';

const AllowanceDeducation = () => {
    const history = useHistory()
    const { id, no } = useParams();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

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
                                <div className="row g-1 mb-1">
                                    <div className="col-md-3">
                                        <TestSelectComponent select="Department" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <TestSelectComponent select="Department Section" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-3">
                                        <TestSelectComponent select="Earning / Deduction" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-2">
                                        <TestSelectComponent select="Wage Desceiption" style={SELECT_CMP_STYLE} />
                                    </div>
                                    <div className="col-md-1 text-center">
                                        <IconButton
                                            aria-label="add"
                                            style={{ padding: '0rem' }}
                                        >
                                            <MdOutlineAddCircleOutline className="text-info" size={30} />
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <SalaryIncrementMainCard wageName="Wages Bulk Updation" >
                                            <div>
                                                {
                                                    array.map((val) => {
                                                        return <AllowanceBulkUpdation key={val} />
                                                    })
                                                }
                                            </div>
                                        </SalaryIncrementMainCard>
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
