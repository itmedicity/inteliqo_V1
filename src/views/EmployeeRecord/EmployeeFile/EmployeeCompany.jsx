import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import EmployeeInstitutiontype from 'src/views/CommonCode/EmployeeInstitutiontype'
import FooterClosebtn from 'src/views/CommonCode/FooterClosebtn'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'

const EmployeeCompany = () => {
    const history = useHistory()
    const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Company Information"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="col-md-3">
                        <BrnachMastSelection
                            style={SELECT_CMP_STYLE}
                        />
                    </div>
                    <div className="col-md-3">
                        <DepartmentSelect
                            style={SELECT_CMP_STYLE}
                        />
                    </div>
                    <div className="col-md-3">
                        <DepartmentSectionSelect
                            style={SELECT_CMP_STYLE}
                        />
                    </div>
                    <div className="col-md-3">
                        <EmployeeInstitutiontype
                            style={SELECT_CMP_STYLE}
                        />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default EmployeeCompany
