import { Chip, IconButton, Tooltip } from '@mui/material'
import React, { Fragment, useContext, useEffect, useState } from 'react'
import FineTypeSelection from 'src/views/CommonCode/FineTypeSelection'
import PageLayoutSave from 'src/views/CommonCode/PageLayoutSave'
import TextInput from 'src/views/Component/TextInput'
import { employeeNumber, SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { differenceInMonths, format } from 'date-fns'
import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory, useParams } from 'react-router'
import { MdOutlineAddCircleOutline } from 'react-icons/md'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import FineAndDeductionTable from '../EmployeeFileTable/FineAndDeductionTable'
import ModelAddFineMaster from '../EmpFileComponent/ModelAddFineMaster'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const FineAndDeductionTableEdit = () => {
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const { slno, id, no } = useParams();
    const { selectFine, updateFine } = useContext(PayrolMasterContext)
    const [finestart, setMonthstart] = useState(format(new Date(), "yyyy-MM-dd"));
    const [fineend, setMonthend] = useState(format(new Date(), "yyyy-MM-dd"));
    const [period, setPeriod] = useState(0)
    const [status, setStatus] = useState(0)

    //initializing
    const [fineDed, setFineDed] = useState({
        fine_descp: '',
        fine_amount: '',
        fine_remark: '',
        fine_status: ''
    })

    const { fine_descp, fine_status, fine_amount, fine_remark } = fineDed
    const updateFineDed = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.value : e.target.value;
        setFineDed({ ...fineDed, [e.target.name]: value })
    }

    const updateStatusCollect = (e) => {
        setStatus(1)
    }

    const updateStatusPending = (e) => {
        setStatus(0)
    }


    useEffect(() => {
        const getFineDed = async () => {
            const result = await axioslogin.get(`/empfinededuction/select/${slno}`);
            const { success, data } = result.data;
            if (success === 1) {
                const { fine_type, fine_status, fine_descp, fine_amount, fine_start, fine_end, fine_period, fine_remark } = data[0]
                const formdata = {
                    fine_descp: fine_descp,
                    fine_amount: fine_amount,
                    fine_remark: fine_remark,
                    fine_status: fine_status
                }
                updateFine(fine_type)
                setMonthstart(format(new Date(fine_start), "yyyy-MM-dd"))
                setMonthend(format(new Date(fine_end), "yyyy-MM-dd"))
                setPeriod(fine_period)
                setFineDed(formdata)
            }
            else {
            }
        }
        getFineDed()
        updateFine(0)
    }, [slno, updateFine]);

    const getstart = (e) => {
        var startfine = e.target.value
        var fine_start = format(new Date(startfine), "yyyy-MM-dd")
        setMonthstart(fine_start)
        const fine_period = differenceInMonths(new Date(fineend), new Date(finestart));
        setPeriod(fine_period)
        return (fine_start)
    }

    const getend = (e) => {
        var endfine = e.target.value
        var fine_end = format(new Date(endfine), "yyyy-MM-dd")
        setMonthend(fine_end)
        const fine_period = differenceInMonths(new Date(fineend), new Date(finestart));
        setPeriod(fine_period)
        return (fine_end)
    }

    //post Data
    const updateData = {
        fine_type: selectFine,
        fine_descp: fine_descp,
        fine_amount: fine_amount,
        fine_start: finestart,
        fine_end: fineend,
        fine_period: period,
        fine_remark: fine_remark,
        fine_edit_user: employeeNumber(),
        fine_slno: slno
    }

    const resetForm = {
        fine_descp: '',
        fine_amount: '',
        fine_start: '',
        fine_end: '',
        fine_period: '',
        fine_remark: ''
    }

    const reset = () => {
        updateFine(0);
        setPeriod(0);
        setMonthstart(format(new Date(), "yyyy-MM-dd"));
        setMonthend(format(new Date(), "yyyy-MM-dd"));
    }

    const submitFine = async (e) => {
        e.preventDefault();
        const result = await axioslogin.patch('/empfinededuction', updateData)
        const { message, success } = result.data;
        if (success === 2) {
            setFineDed(resetForm);
            history.push(`/Home/FineorDeduction/${id}/${no}`);
            succesNofity(message);
            reset()
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
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
                                            value={period}
                                            name="period"
                                            changeTextValue={(e) => updateFineDed(e)}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="Start Date"
                                            value={finestart}
                                            name="finestart"
                                            changeTextValue={(e) => {
                                                getstart(e)
                                            }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <TextInput
                                            type="date"
                                            classname="form-control form-control-sm"
                                            Placeholder="End Date"
                                            value={fineend}
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
                                                // icon={value === 0 ? <IoCheckmarkDoneSharp /> : <IoBan />}
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
                        <FineAndDeductionTable collected={status} />
                    </div>
                </div>

            </PageLayoutSave>
        </Fragment>
    )
}

export default FineAndDeductionTableEdit
