import React from 'react'
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import { Option, Select } from '@mui/joy';
import { addDays, differenceInMinutes, format, formatDuration, intervalToDuration, isValid } from 'date-fns';
import moment from 'moment';
import { errorNofity, infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc';
import { useCallback } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { Actiontypes } from 'src/redux/constants/action.type';
import { memo } from 'react';

const ShiftModal = ({ open, setOpen, data }) => {
    const dispatch = useDispatch()
    const { UPDATE_PUNCHMASTER_TABLE } = Actiontypes
    //FETCH DATA'S
    const punchData = useSelector((state) => state.getPunchData.punchDta)
    const shiftData = useSelector((state) => state.getShiftData.shiftData)

    //FIND THE CROSS DAY
    const crossDay = shiftData?.find(shft => shft.shft_slno === data.shift_id);
    const crossDayStat = crossDay?.shft_cross_day ?? 0;

    //DISPLAY DATA'S

    let shiftIn = `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_time), 'HH:mm')}`;
    let shiftOut = crossDayStat === 0 ? `${format(new Date(data.duty_day), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_time), 'HH:mm')}` :
        `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_time), 'HH:mm')}`;

    let checkinStart = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_start), 'HH:mm')}`;
    let checkinEnd = `${format(new Date(shiftIn), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkin_end), 'HH:mm')}`;

    let checkOutStart = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_start), 'HH:mm')}`;
    let checkOutEnd = `${format(new Date(shiftOut), 'yyyy-MM-dd')} ${format(new Date(crossDay?.shft_chkout_end), 'HH:mm')}`;

    const endTimeVale = format(new Date(checkOutEnd), 'HH')
    const check = endTimeVale < 5
    const checkOutEndTime = `${format(addDays(new Date(data.duty_day), 1), 'yyyy-MM-dd')} ${format(new Date(checkOutEnd), 'HH:mm')}`

    let punchInData = punchData?.filter(val => new Date(val.punch_time) >= new Date(checkinStart) && new Date(val.punch_time) <= new Date(checkinEnd))
    let punchOutData = check === true ? punchData?.filter(val => new Date(val.punch_time) >= new Date(checkOutStart) && new Date(val.punch_time) <= new Date(checkOutEndTime))
        : punchData?.filter(val => new Date(val.punch_time) >= new Date(checkOutStart) && new Date(val.punch_time) <= new Date(checkOutEnd))


    //SELECT AND UPDATE DATA'S
    const [inTime, setInTime] = useState(null)
    const [outTime, setOutTime] = useState(null)



    const updatePunchInOut = useCallback(async () => {
        if (inTime !== null && outTime !== null) {

            // GET THE HOURS WORKED IN MINITS
            let interVal = intervalToDuration({
                start: isValid(new Date(inTime)) ? new Date(inTime) : 0,
                end: isValid(new Date(outTime)) ? new Date(outTime) : 0
            })

            //CALCULATE HOURS WORKED IN MINUTS
            const hoursWrkdInMinits = (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
                differenceInMinutes(new Date(data.punch_out), new Date(data.punch_in)) : 0

            //CALCULATE EARLY AND LATE IN
            const CaluculateLateInOut = (isValid(new Date(shiftIn)) && isValid(new Date(shiftOut))) && (isValid(new Date(inTime)) && isValid(new Date(outTime))) ?
                { lateIn: differenceInMinutes(new Date(inTime), new Date(shiftIn)), earlyOut: differenceInMinutes(new Date(shiftOut), new Date(outTime)) }
                : { lateIn: 0, earlyOut: 0 };

            //CALCULATE WORKING HOURS IN WORDS FFOR DISPLAY
            const wrkInHrsInWord = (isValid(new Date(data.punch_in)) && data.punch_in !== null) && (isValid(new Date(data.punch_out)) && data.punch_out !== null) ?
                formatDuration({ hours: interVal.hours, minutes: interVal.minutes }) : 0;

            //POST DATA  FOR UPDATE
            let postData = {
                in: inTime,
                out: outTime,
                slno: data.punch_slno,
                hrsInMinuts: hoursWrkdInMinits,
                wrkMinitusInWord: wrkInHrsInWord,
                lateIn: CaluculateLateInOut.lateIn > 0 ? CaluculateLateInOut.lateIn : 0,
                earlyOut: CaluculateLateInOut.earlyOut > 0 ? CaluculateLateInOut.earlyOut : 0
            }

            //DISPATCH THIS DATA TO A TABLE LIST
            dispatch({ type: UPDATE_PUNCHMASTER_TABLE, payload: postData })

            //UPDATE THIS DATA TO THE DATA BASE
            let result = await axioslogin.post("/attendCal/inOutUpdate", postData);
            const { success } = result.data;
            if (success === 2) {
                succesNofity('Punch Data Updated')
                setOpen(false)
            } else {
                errorNofity('Punch Data Not Updated ! Contact HR/IT')
                setOpen(false)
            }

        } else {
            infoNofity("Select Both In & Out Time")
        }
    }, [inTime, outTime, UPDATE_PUNCHMASTER_TABLE, data, shiftIn, shiftOut, dispatch, setOpen])


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Sheet
                variant="outlined"
                sx={{
                    width: '30%',
                    borderRadius: 'md',
                    p: 3,
                    boxShadow: 'lg',
                }}
            >
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
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h5"
                    textColor="inherit"
                    fontWeight="sm"
                    mb={1}
                >
                    Punch In and Punch Out Time Marking On {moment(data.duty_day).format('DD-MM-YYYY')}
                </Typography>
                <Box sx={{ display: 'flex', flex: 1, py: 1 }} >
                    <Box sx={{ display: 'flex', flex: 1, alignContent: 'center' }} ><Typography textColor="text.tertiary">Shift In</Typography></Box>
                    <Box sx={{ flex: 2 }} >
                        <Select
                            disabled={false}
                            placeholder="Punch In....."
                            size="sm"
                            variant="outlined"
                            // value={inTime}
                            onChange={(e) => setInTime(e.target.innerText)}
                        >
                            {punchInData?.map((val, idx) => <Option key={idx} value={val.punch_time} >{val.punch_time}</Option>)}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, }} >
                    <Box sx={{ flex: 1 }} ><Typography textColor="text.tertiary">Shift Out</Typography></Box>
                    <Box sx={{ flex: 2 }}>
                        <Select
                            disabled={false}
                            placeholder="Punch Out....."
                            size="sm"
                            variant="outlined"
                            // value={outTime}
                            onChange={(e) => setOutTime(e.target.innerText)}
                        >
                            {punchOutData?.map((val, idx) => <Option key={idx} value={val.punch_time} >{val.punch_time}</Option>)}
                        </Select>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', flex: 1, py: 1 }} >
                    <Box sx={{ flex: 2 }} ></Box>
                    <Box sx={{ flex: 1 }}>
                        <Button fullWidth onClick={updatePunchInOut} size="sm">Update</Button>
                    </Box>
                </Box>
            </Sheet>
        </Modal>
    )
}

export default memo(ShiftModal)