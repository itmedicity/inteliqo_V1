import Chip from '@mui/material/Chip'
import React, { Fragment } from 'react'
import { useHistory } from 'react-router'
import { useStyles } from 'src/views/CommonCode/MaterialStyle'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent'
import TextInput from 'src/views/Component/TextInput'
import WagesInfoTable from './EmployeeFileTable/WagesInfoTable'
import './EmpStyle.css'
import { IoCheckmarkDoneSharp, IoBan } from "react-icons/io5";
import { Checkbox, FormControlLabel } from '@material-ui/core'
import ModalOne from 'src/views/CommonCode/ModalOne'

const EmployeeAllowance = () => {
    const history = useHistory()
    // const classes = useStyles();
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${4516}/${4516}`)
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const value = 1;

    return (
        <Fragment>
            <ModalOne open={open} handleClose={handleClose} />
            <PageLayoutSave
                heading="Earnings - Deducation"
                redirect={RedirectToProfilePage}
                submit={handleClickOpen}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md-12">
                                        <TestSelectComponent
                                            select="Wages Description"
                                            style={{ minHeight: 10, maxHeight: 27, paddingTop: 0, paddingBottom: 0 }} />
                                    </div>

                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Wage type Description (Fixed ,Earning, Deducation)"
                                            disabled="disabled"
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="100000.00 "
                                        // disabled="disabled"
                                        />
                                    </div>

                                    <div className="d-flex align-items-center" >
                                        <div className="col-md-3 text-center">
                                            <Chip
                                                size="small"
                                                icon={value === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={value === 0 ? "ESI" : "ESI"}
                                                color={value === 0 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center">
                                            <Chip
                                                size="small"
                                                icon={value === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={value === 1 ? "PF" : "PF"}
                                                color={value === 1 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center">
                                            <Chip
                                                size="small"
                                                icon={value === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={value === 0 ? "LWF" : "LWF"}
                                                color={value === 0 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-3 col-sx-6 text-center ">
                                            <Chip
                                                size="small"
                                                icon={value === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label={value === 1 ? "Pro Tax" : "Pro Tax"}
                                                color={value === 1 ? "success" : "error"}
                                                variant="outlined"
                                                clickable={true}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {/* 
                                        In Default thiese dates are disabled state. 
                                        
                                    */}
                                    <div className="row g-1 d-flex flex-row justify-content-between align-items-center">
                                        <div className="col-md-5 ">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="bank_status"
                                                        color="secondary"
                                                        // value={true}
                                                        checked={true}
                                                        className="ml-2"
                                                    // onChange={(e) => updateFormData(e)}
                                                    />
                                                }
                                                label="Start Month"
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            {/* <label htmlFor="StartDate" className="form-label" > Start Month</label> */}
                                            <TextInput
                                                type="date"
                                                classname="form-control form-control-sm"
                                                Placeholder="Mobile No"
                                            />
                                        </div>
                                    </div>
                                    <div className="row g-1 d-flex flex-row justify-content-between align-items-center">
                                        <div className="col-md-5 ">
                                            <FormControlLabel
                                                className=""
                                                control={
                                                    <Checkbox
                                                        name="bank_status"
                                                        color="secondary"
                                                        // value={true}
                                                        checked={true}
                                                        className="ml-2"
                                                    // onChange={(e) => updateFormData(e)}
                                                    />
                                                }
                                                label="End Month"
                                            />
                                        </div>
                                        <div className="col-md-5">
                                            {/* <label htmlFor="StartDate" className="form-label" > Start Month</label> */}
                                            <TextInput
                                                type="date"
                                                classname="form-control form-control-sm"
                                                Placeholder="Mobile No"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-7">
                        <div className="card">
                            <WagesInfoTable />
                        </div>
                    </div>
                </div>
            </PageLayoutSave >
        </Fragment>
    )
}

export default EmployeeAllowance

