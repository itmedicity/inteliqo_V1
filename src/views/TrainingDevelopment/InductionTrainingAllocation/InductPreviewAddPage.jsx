import { Input, Modal, ModalClose, ModalDialog, Typography, IconButton, CssVarsProvider, Button, Sheet, Table, Checkbox } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import JoyTrainerMultipleSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainerMultipleSelect';
import { Tooltip } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import { TrainerNames } from 'src/redux/actions/Training.Action';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import AddmoreEmployees from './AddmoreEmployees';
import { startOfMonth } from 'date-fns';

const InductPreviewAddPage = ({ SetOpen, open, modalData, datas, count, SetCount }) => {

    const dispatch = useDispatch()

    const [Reschedule, setReschedule] = useState(moment(new Date(modalData?.induction_date)).format("DD-MM-YYYY"));
    const [NewTrainers, setNewTrainers] = useState([]);
    const [flag, SetFlag] = useState(0)
    const [Scheduledata, setScheduledata] = useState([]);

    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    const shedule = datas.find((val) => val.schedule_slno)

    const { schedule_slno } = shedule

    useEffect(() => {
        dispatch(TrainerNames())
        SetCount(0)
    }, [dispatch, SetCount])

    const Handleclose = useCallback(() => {
        SetOpen(false)
    }, [SetOpen])

    const EditTrainers = useCallback(() => {
        SetFlag(1)
    }, [SetFlag])

    const EditDate = useCallback((newValue) => {
        setReschedule(newValue)
        SetFlag(2)
    }, [SetFlag])

    const patchdata = useMemo(() => {
        return {
            schedule_slno: schedule_slno,
            NewTrainers: NewTrainers,
            Reschedule: moment(Reschedule).format("YYYY-MM-DD HH:mm:ss"),
            edit_user: em_id
        }
    }, [schedule_slno, NewTrainers, Reschedule, em_id])

    const DataSubmit = useCallback(async () => {
        if (flag === 1) {
            const result = await axioslogin.patch('/InductionTraining/UpdateTrainers', patchdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Trainer Updated Successfully")
                SetCount(count + 1)
                SetFlag(0)
                setNewTrainers([])
                SetOpen(false)
            }
            else {
                warningNofity("Can't change Trainers")
                SetFlag(0)
                setNewTrainers([])
                SetOpen(false)
            }
        }
        else if (flag === 2) {
            const result = await axioslogin.patch('/InductionTraining/UpdateDate', patchdata)
            const { success, message } = result.data
            if (success === 1) {
                succesNofity(message)
                SetCount(count + 1)
                SetFlag(0)
                setReschedule('')
                SetOpen(false)
            }
            else {
                warningNofity("Date Not Changed")
                SetFlag(0)
                setReschedule('')
                SetOpen(false)
            }
        }
    }, [flag, setReschedule, SetOpen, setNewTrainers, SetFlag, count, SetCount, patchdata])

    const ScheduleNewEmployees = useCallback(async () => {
        SetFlag(3)
        const result = await axioslogin.get('/InductionTraining/Inductscheduledatas')
        const { success, data } = result.data;
        if (success === 2) {
            setScheduledata(data)
        } else {
            setScheduledata([])
        }
    }, [SetFlag])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={open}
                onClose={Handleclose}
            >
                {flag === 3 ? <AddmoreEmployees SetCount={SetCount} count={count} SetFlag={SetFlag} em_id={em_id} modalData={modalData} Scheduledata={Scheduledata} schedule_slno={schedule_slno} /> :
                    <ModalDialog size="lg"  >
                        <ModalClose
                            variant="outlined"
                            sx={{
                                top: 'calc(-1/4 * var(--IconButton-size))',
                                right: 'calc(-1/4 * var(--IconButton-size))',
                                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                borderRadius: '50%',
                                bgcolor: 'background.body',
                            }}
                        />
                        <Box>
                            <Typography
                                fontSize="xl2"
                                lineHeight={1}
                                sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                            >
                                Schedule Training
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: "row", p: 1, gap: 5 }}>
                            <Box >
                                <Box sx={{ mt: 1, color: "#424769" }}>Schedule Date</Box>
                                <Box sx={{ mt: 2, color: "#424769" }}>Training Topic</Box>
                                <Box sx={{ mt: 2, color: "#424769" }}>Trainer Names</Box>
                                <Box sx={{ mt: 4, color: "#424769" }}>Reschedule Date</Box>
                            </Box>
                            <Box >
                                <Box sx={{ mt: 1, color: "#7077A1" }}>{moment(modalData?.induction_date).format("DD-MM-YYYY")}</Box>

                                <Box sx={{ mt: 2, textTransform: "capitalize", color: "#7077A1" }}>{modalData?.topic?.toLowerCase()}</Box>
                                <Box sx={{ mt: 2 }}>
                                    {
                                        flag === 1 ?
                                            <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Box sx={{ width: "100%" }}>
                                                    <JoyTrainerMultipleSelect value={NewTrainers} setValue={setNewTrainers} />
                                                </Box>
                                            </Box>
                                            : <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
                                                <Box sx={{ textTransform: "capitalize", color: "#7077A1" }}>{modalData?.trainer_name?.toLowerCase()}</Box>
                                                <Tooltip title="Change Trainer">
                                                    <Box>
                                                        <IconButton
                                                            onClick={(e) => { EditTrainers(e) }}
                                                        >
                                                            <CachedIcon />
                                                        </IconButton>
                                                    </Box>
                                                </Tooltip>
                                            </Box>
                                    }
                                </Box>
                                <Box sx={{ mt: 2, display: "flex", flexDirection: "row" }}>
                                    <Box sx={{ flex: 1 }}>
                                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                            < DatePicker
                                                views={['day']}
                                                minDate={startOfMonth(new Date(modalData?.induction_date))}
                                                value={Reschedule}
                                                size="small"
                                                // onChange={(newValue) => {
                                                //     setReschedule(newValue);
                                                // }}
                                                onChange={(e) => {
                                                    EditDate(e);
                                                }}

                                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                                        <CssVarsProvider>
                                                            <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />
                                                        </CssVarsProvider>
                                                        {InputProps?.endAdornment}
                                                    </Box>
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: "space-between",
                        }}>
                            <Box>
                                <Button aria-label="submit" variant="outlined"
                                    onClick={DataSubmit}
                                >
                                    SAVE
                                </Button>
                            </Box>
                            <Box>
                                <Button aria-label="submit" variant="outlined"
                                    onClick={ScheduleNewEmployees}
                                >
                                    Add More Employees
                                </Button>
                            </Box>
                        </Box>

                        <Box>
                            <Sheet sx={{
                                overflow: 'auto',
                                '::-webkit-scrollbar': { display: "none" }, height: 300,
                                width: "100%"
                            }}>
                                <Table borderAxis="both" stickyHeader >
                                    <thead>
                                        <tr>
                                            <th style={{ width: "8%", textAlign: "center" }}>Sl No.</th>
                                            <th style={{ width: "8%", textAlign: "center" }}>
                                                check
                                            </th>
                                            <th style={{ width: "15%", textAlign: "center" }}>Emp ID</th>
                                            <th>Name</th>
                                            <th>Designation</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {datas?.map((row, index) => (
                                            <tr key={index} style={{
                                                border: "2px solid black",
                                                overflow: "hidden",
                                                overflowY: "scroll"
                                            }}>
                                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                <td style={{ textAlign: "center" }}>
                                                    <Checkbox
                                                        checked={row?.schedule === 0 ? row?.inValue : true}
                                                        onChange={(e) => {
                                                        }}
                                                    />
                                                </td>
                                                <td style={{ textAlign: "center" }}>{row?.emno}</td>
                                                <td>{row?.employee_name}</td>
                                                <td>{row?.sect_name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Sheet>
                        </Box>
                    </ModalDialog>
                }
            </Modal >
        </Fragment >
    )
}

export default memo(InductPreviewAddPage) 
