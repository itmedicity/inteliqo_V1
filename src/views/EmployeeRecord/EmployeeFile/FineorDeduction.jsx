import { Chip, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { useHistory, useParams } from 'react-router'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import FineTypeSelection from 'src/views/CommonCode/FineTypeSelection'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { getFineSlno, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import ModelAddFineMaster from './EmpFileComponent/ModelAddFineMaster'
import FineAndDeductionTable from './EmployeeFileTable/FineAndDeductionTable'
import { eachMonthOfInterval, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import ReactTooltip from 'react-tooltip';

const FineorDeduction = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const { id, no } = useParams();
    const { selectFine, updateFine, employeedetails } = useContext(PayrolMasterContext)
    const { em_id } = employeedetails
    const [finestart, setMonthstart] = useState(format(new Date(), "yyyy-MM-dd"));
    const [fineend, setMonthend] = useState(format(new Date(), "yyyy-MM-dd"));
    const [count, setcount] = useState()
    const [period, setPeriod] = useState(0)
    const [status, setStatus] = useState(0)
    const [serialno, getSerialno] = useState(0)
    const [fineDed, setFineDed] = useState({
        fine_descp: '',
        fine_amount: 0,
        fine_remark: '',
        fine_status: ''
    })
    const [times, setTimes] = useState(0)

    //Destructuring
    const { fine_descp, fine_status, fine_amount, fine_remark } = fineDed
    const updateFineDed = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setFineDed({ ...fineDed, [e.target.name]: value })
    }

    //Status setting
    const updateStatusCollect = (e) => {
        setStatus(1)
    }
    const updateStatusPending = (e) => {
        setStatus(0)
    }

    //month format
    const getstart = (e) => {
        var startfine = e.target.value
        var fine_start = format(new Date(startfine), "yyyy-MM-dd")
        setMonthstart(fine_start)
        return (fine_start)
    }
    const getend = (e) => {
        var endfine = e.target.value
        var fine_end = format(new Date(endfine), "yyyy-MM-dd")
        setMonthend(fine_end)
        return (fine_end)
    }

    useEffect(() => {
        if (finestart < fineend) {
            var resultdates = eachMonthOfInterval({
                start: new Date(finestart),
                end: new Date(fineend)
            })
            setPeriod(resultdates)
            setTimes(resultdates.length)
        }
    }, [fineend, finestart])

    //get serial no
    getFineSlno().then((val) => {
        const fineslno = val;
        getSerialno(fineslno)
    })

    const postData = {
        fine_emp_no: id,
        fine_emp_id: no,
        fine_slno: serialno,
        fine_type: selectFine,
        fine_descp: fine_descp,
        fine_amount: fine_amount,
        fine_start: finestart,
        fine_end: fineend,
        fine_period: times,
        fine_remark: fine_remark,
        fine_create_user: em_id,
        fine_status: '0'
    }
    const resetForm = {
        fine_descp: '',
        fine_amount: 0,
        fine_remark: '',
        fine_status: ''
    }

    const reset = () => {
        updateFine(0);
        setPeriod(0);
        setTimes(0)
        setMonthstart(format(new Date(), "yyyy-MM-dd"));
        setMonthend(format(new Date(), "yyyy-MM-dd"));
    }
    //datas mapp for fine detailed table

    var finedetlmap = [];
    for (var i = 0; i < period.length; i++) {
        const postdata = {
            fine_emp_no: id,
            fine_emp_id: no,
            fine_slno: serialno,
            fine_amount: fine_amount / period.length,
            fine_date: format(new Date(period[i]), "yyyy-MM-dd"),
            create_user: em_id,
        }
        finedetlmap.push(postdata)
    }

    //Submit data
    const submitFine = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/empfinededuction', postData)
        const { message, success } = result.data;
        if (success === 1) {
            const result = await axioslogin.post('/empfinededuction/detltable', finedetlmap)
            const { success } = result.data;
            if (success === 1) {
                succesNofity(message);
                setcount(count + 1)
                setFineDed(resetForm);
                reset()
            } else if (success === 0) {
                infoNofity(message.sqlMessage);
            } else {
                infoNofity(message)
            }
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
        history.push(`/Home/FineorDeduction/${id}/${no}`);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const RedirectToProfilePage = () => {
        history.push(`/Home/Profile/${id}/${no}`)
    }

    return (
        <Fragment>
            <ModelAddFineMaster open={open} handleClose={handleClose} />
            <PageLayoutSave
                heading="Fines And Other Deductions"
                redirect={RedirectToProfilePage}
                submit={submitFine}
            >
                <div className="row g-1">
                    <div className="col-md-5">
                        <div className="card">
                            <div className="card-body">
                                <div className="row g-2">
                                    <div className="col-md-11">
                                        <FineTypeSelection
                                            select="Fine Or Deducation Master Drop Down"
                                            style={SELECT_CMP_STYLE}
                                        />
                                    </div>
                                    <div className="col-md-1 text-center">
                                        <Tooltip title="For Create New Fine Master" arrow>
                                            <IconButton aria-label="add" style={{ padding: "0rem" }} onClick={handleClickOpen}  >
                                                <MdOutlineAddCircleOutline className="text-danger" size={30}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Description"
                                            value={fine_descp}
                                            name="fine_descp"
                                            changeTextValue={(e) => updateFineDed(e)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Amount"
                                            value={fine_amount}
                                            name="fine_amount"
                                            changeTextValue={(e) => updateFineDed(e)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Period"
                                            disabled="disabled"
                                            value={times}
                                            name="times"
                                        //changeTextValue={(e) => updateFineDed(e)}
                                        />
                                    </div>
                                    <div className="col-md-6 " data-tip="Fine Start Date" data-for='toolTip1' data-place='top'>
                                        <ReactTooltip id="toolTip1" />
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                            min={new Date()}
                                            value={finestart}
                                            name="finestart"
                                            changeTextValue={(e) => {
                                                getstart(e)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6 " data-tip="Fine End Date" data-for='toolTip2' data-place='top'>
                                        <ReactTooltip id="toolTip2" />
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="End Date"
                                            value={fineend}
                                            min={finestart}
                                            name="fineend"
                                            changeTextValue={(e) => {
                                                getend(e)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-12">
                                        <TextInput
                                            type="text"
                                            classname="form-control form-control-sm"
                                            Placeholder="Remark"
                                            value={fine_remark}
                                            name="fine_remark"
                                            changeTextValue={(e) => updateFineDed(e)}
                                        />
                                        <input
                                            type="text"
                                            className="hiddenvalue"
                                            value={fine_status}
                                            name="fine_status"
                                            hidden
                                            onChange={(e) => updateFineDed(e)}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-evenly" >
                                        <div className="col-md-4" >
                                            <Chip
                                                size="small"
                                                // icon={fine_status === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label="Collected"
                                                color="secondary"
                                                variant="outlined"
                                                clickable={true}
                                                onClick={(e) => updateStatusCollect(e)}
                                                sx={{
                                                    minWidth: '90%',
                                                    maxWidth: '90%'
                                                }}
                                            />
                                        </div>
                                        <div className="col-md-4" >
                                            <Chip
                                                size="small"
                                                //icon={fine_status === 1 ? <IoCheckmarkDoneSharp /> : <IoBan />}
                                                label="Pending"
                                                color="secondary"
                                                variant="outlined"
                                                clickable={true}
                                                onClick={(e) => updateStatusPending(e)}
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
                        <FineAndDeductionTable update={count}
                            collected={status} />
                    </div>
                </div>
            </PageLayoutSave>
        </Fragment>
    )
}

export default FineorDeduction
