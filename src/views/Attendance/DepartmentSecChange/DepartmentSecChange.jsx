import React, { Fragment, useContext } from 'react'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import PageLayoutSaveClose from 'src/views/CommonCode/PageLayoutSaveClose'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import EmployeeNameSelect from 'src/views/CommonCode/EmployeeNameSelect'
import ReactTooltip from 'react-tooltip';
import DeptSectionMastSelect from 'src/views/CommonCode/DeptSectionMastSelect'
import { useHistory } from 'react-router-dom'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'

const DepartmentSecChange = () => {
    const history = useHistory();
    const { selectEmpName, getDeptSection } = useContext(PayrolMasterContext);
    //update Data
    const patchData = {
        em_dept_section: getDeptSection,
        em_id: selectEmpName
    }
    //Update Function
    const submitChange = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empmast/empmaster/deptsecChange', patchData)
        const { message, success } = result.data;
        if (success === 2) {
            succesNofity(message);
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        }
    }
    //Back to home
    const redirect = () => {
        history.push('/Home');
    }

    return (
        <Fragment>
            <PageLayoutSaveClose
                redirect={redirect}
                submit={submitChange}
            >
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3" data-tip="Department Name" data-for='toolTip1' data-place='top'>
                            <ReactTooltip id="toolTip1" />
                            <DepartmentSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3" data-tip="Department Section Name" data-for='toolTip1' data-place='top'>
                            <ReactTooltip id="toolTip1" />
                            <DepartmentSectionSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3" data-tip="Employee Name" data-for='toolTip1' data-place='top'>
                            <ReactTooltip id="toolTip1" />
                            <EmployeeNameSelect style={SELECT_CMP_STYLE} />
                        </div>
                        <div className="col-md-3" data-tip="Change Department Section" data-for='toolTip1' data-place='top'>
                            <ReactTooltip id="toolTip1" />
                            <DeptSectionMastSelect style={SELECT_CMP_STYLE} />
                        </div>
                    </div>
                </div>
            </PageLayoutSaveClose>
        </Fragment>
    )
}

export default DepartmentSecChange