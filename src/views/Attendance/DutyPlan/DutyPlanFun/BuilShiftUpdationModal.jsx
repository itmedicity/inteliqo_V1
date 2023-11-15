import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { memo } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Box } from '@mui/system';
import { FormControl, MenuItem, Paper, Select } from '@mui/material';
import { Checkbox, CssVarsProvider, Typography, Button } from '@mui/joy';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import _ from 'underscore';
import moment from 'moment';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';

const BuilShiftUpdationModal = ({ open, handleChange, emNo, updation }) => {

    const departmentShiftt = useSelector((state) => state?.getDepartmentShiftData?.deptShiftData, _.isEqual);
    const commonState = useSelector((state) => state?.getCommonSettings, _.isEqual);
    const planData = useSelector((state) => state?.getShiftPlanDetl.shiftData, _.isEqual);

    const deptShift = useMemo(() => departmentShiftt, [departmentShiftt]);
    const commonSettings = useMemo(() => commonState, [commonState]);
    const shiftPlanData = useMemo(() => planData, [planData]);

    const { notapplicable_shift, default_shift, week_off_day } = commonSettings;

    const [shift, setShift] = useState(0);
    const [checked, setChecked] = useState(false);

    const handleClose = () => { handleChange(false) }

    useEffect(() => {
        return () => {
            setShift(0);
            setChecked(false);
        }
    }, [])

    const multiShiftSubmit = async () => {
        const empPlanDetl = shiftPlanData.filter((val) => val.em_no === emNo);
        const oldPlanArray = empPlanDetl[0].plan[0];
        let newPlanUpdate = oldPlanArray.map((val) => {
            const sunday = moment(val.duty_day).format('d');
            return {
                ...val,
                shift_id: checked === true && sunday === '0' ? week_off_day : shift,
            }
        })

        const postData = {
            newPlan: newPlanUpdate,
            naShift: notapplicable_shift
        }
        const result = await axioslogin.patch('/plan/multiShift', postData);
        const { success } = result.data;
        if (success === 1) {
            handleChange(false)
            const newPlanState = {
                em_no: emNo,
                plan: newPlanUpdate,
                notApplicableShift: notapplicable_shift
            }
            updation(newPlanState);
        }
        else {
            warningNofity("Error updating ")
        }

        setShift(0);
        setChecked(false);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <Paper sx={{ m: 1 }} variant="outlined" >
                <Box sx={{ flex: 1, p: 0.5 }} >
                    <CssVarsProvider>
                        <Typography fontWeight="lg" variant="soft" >
                            Multi Date Shift Selection
                        </Typography>
                    </CssVarsProvider>
                </Box>
                <DialogContent sx={{ display: 'flex', minWidth: 500, flexDirection: 'column' }} >
                    <Box sx={{ display: 'flex', flex: 1 }} >
                        <FormControl fullWidth>
                            <Select
                                value={shift}
                                size="small"
                                onChange={(e) => setShift(e.target.value)}
                            >
                                <MenuItem disabled value={0}>Select Shift</MenuItem>
                                {
                                    deptShift && deptShift.map((val, index) => (
                                        <MenuItem
                                            value={val.shiftcode} key={index}
                                            disabled={val.shiftcode === notapplicable_shift || val.shiftcode === default_shift ? true : false}
                                        >{val.shiftDescription}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ display: 'flex', flex: 1, py: 0.5 }} >
                        <CssVarsProvider>
                            <Checkbox
                                color="warning"
                                size="lg"
                                checked={checked}
                                variant="outlined"
                                label="Sunday - is Week Day"
                                onChange={(e) => {
                                    setChecked(e.target.checked)
                                }}
                                sx={{ color: '#2196f3' }}
                            />
                        </CssVarsProvider>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <CssVarsProvider>
                        <Button
                            variant="outlined"
                            color="danger"
                            onClick={multiShiftSubmit}
                            size="sm"
                            sx={{ py: 0, color: '#81c784' }}
                        >
                            <LibraryAddCheckIcon sx={{ fontSize: 25 }} />
                        </Button>
                        <Button
                            variant="outlined"
                            color="success"
                            onClick={handleClose}
                            size="sm"
                            sx={{ py: 0, color: '#d50000' }}
                        >
                            <CancelOutlinedIcon sx={{ fontSize: 25 }} />
                        </Button>
                    </CssVarsProvider>
                </DialogActions>
            </Paper>
        </Dialog>
    )
}

export default memo(BuilShiftUpdationModal)