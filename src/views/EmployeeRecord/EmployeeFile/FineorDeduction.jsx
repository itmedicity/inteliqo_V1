import { Chip, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useHistory } from 'react-router'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import TextInput from 'src/views/Component/TextInput'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import ModelAddFineMaster from './EmpFileComponent/ModelAddFineMaster'
import FineAndDeductionTable from './EmployeeFileTable/FineAndDeductionTable'

const FineorDeduction = () => {
    const history = useHistory()
    // const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    return (
        <Fragment>
            <ModelAddFineMaster open={open} handleClose={handleClose} />
            <PageLayoutSave
                heading="Fines And Other Deductions"
                redirect={RedirectToProfilePage}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md-11">
                                        <TestSelectComponent
                                            select="Fine Or Deducation Master Drop Down"
                                            style={SELECT_CMP_STYLE}
                                        />
                                    </div>
                                    <div className="col-md-1 text-center">
                                        <Tooltip title="For Create New Fine Master" arrow>
                                            <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={handleClickOpen}  >
                                                <MdOutlineAddCircleOutline className="text-danger" size={30} />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Description"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Amount"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Period"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="End Date"
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Remark"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-evenly" >
                                        <div className="col-md-4" >
                                            <Chip
                                                size="small"
                                                // icon={value === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label="Collected"
                                                color="secondary"
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4" >
                                            <Chip
                                                size="small"
                                                // icon={value === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label="Pending"
                                                color="secondary"
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <FineAndDeductionTable />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default FineorDeduction
