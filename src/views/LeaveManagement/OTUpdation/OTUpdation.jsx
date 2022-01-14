import React, { Fragment } from 'react'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import { useHistory } from 'react-router'
import TextInput from 'src/views/Component/TextInput'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { FiSearch } from "react-icons/fi";
import { IconButton } from '@material-ui/core';
import Tooltip from "@material-ui/core/Tooltip";
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import OTUpdationTable from './OTUpdationTable';
const OTUpdation = () => {
    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }
    return (
        <Fragment>
            <PageLayoutSave
                heading="Over Time Updation"
                redirect={RedirectToProfilePage}
            //submit={submitFine}
            >
                <div className="card">
                    <div className="card-body">
                        <div className="col-md-12">
                            <div className="row g-1">
                                <div className="col-md-2">
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="Start Date"
                                    //value={fineend}
                                    // name="fineend"
                                    // changeTextValue={(e) => { }}
                                    />
                                </div>
                                <div className="col-md-2">
                                    <TextInput
                                        type="date"
                                        classname="form-control form-control-sm"
                                        Placeholder="End Date"
                                    //value={fineend}
                                    // name="fineend"
                                    // changeTextValue={(e) => { }}
                                    />
                                </div>
                                <div className="col-md-3 ">
                                    <DepartmentSelect
                                        style={SELECT_CMP_STYLE}
                                    />
                                </div>
                                <div className="col-md-3 ">
                                    <DepartmentSectionSelect
                                        style={SELECT_CMP_STYLE}
                                    />
                                </div>
                                <div className="col-md-1">
                                    <TextInput
                                        type="text"
                                        classname="form-control form-control-sm"
                                        Placeholder="Emp No"
                                    //value={fine_descp}
                                    //name="fine_descp"

                                    />
                                </div>
                                <div className="col-md-1">
                                    <Tooltip title="Search">
                                        <IconButton type="submit" >
                                            < FiSearch size={18} />
                                        </IconButton>
                                        {/* // disabled={props.disable}
                                                // clickable={true} */}
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-12 pt-1">
                    <div className="card">
                        <OTUpdationTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default OTUpdation
