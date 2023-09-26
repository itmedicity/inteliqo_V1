import React, { memo, useCallback } from 'react'
import CustomDashboardPage from 'src/views/Component/MuiCustomComponent/CustomDashboardPage';
import { Button, CssVarsProvider, Input, Textarea } from '@mui/joy'
import { Box, Paper, TextareaAutosize, Tooltip } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import SaveIcon from '@mui/icons-material/Save';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import _ from 'underscore';
import { useState } from 'react';
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux';
import SelectTopics from 'src/views/MuiComponents/SelectTopics';
import SelectTrainer from 'src/views/MuiComponents/SelectTrainer';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { addMonths } from 'date-fns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';

const DepartmentalTrainingCalender = ({ setShow, count, Setcount }) => {

    const [dept, setdept] = useState(0);
    const [desSelect, setdesSelect] = useState(0);
    const [topic, setTopic] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [trainer, setTrainer] = useState([]);
    const [year, setYear] = useState(moment(new Date()));
    const [month, setMonth] = useState(moment(new Date()));
    const [remarks, setRemarks] = useState();



    //postdata
    const SubmitBtn = useCallback(() => {

    }, [])

    return (
        <CustomDashboardPage title="Departmental Training Calender" displayClose={true} setClose={setShow}  >
            <ToastContainer />
            <Paper elevation={0} sx={{ width: "100%", p: 1 }}>
                <Paper elevation={0} variant='outlined' sx={{ width: "100%", p: 1, display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                    <Box sx={{ flex: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year']}
                                maxDate={addMonths(new Date(), 1)}
                                value={year}
                                onChange={(newValue) => {
                                    setYear(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={false} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['month']}
                                maxDate={addMonths(new Date(), 1)}
                                value={month}
                                onChange={(newValue) => {
                                    setMonth(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <CssVarsProvider>
                                            <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={false} />
                                        </CssVarsProvider>
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DeptSelectByRedux value={dept} setValue={setdept} />
                    </Box>
                    <Box sx={{ pt: 0.5, flex: 1 }}>
                        <DeptSecSelectByRedux dept={dept} value={desSelect} setValue={setdesSelect} />
                    </Box>
                </Paper>
                <Paper elevation={0} variant='outlined' sx={{ pt: 1, gap: 1, p: 1, width: "100%", justifyContent: "space-evenly", display: "flex", flexDirection: "row" }}>
                    <Tooltip title="Select training topics">
                        <Box sx={{ pt: 0.5, flex: 1, maxWidth: "25%" }}>
                            <SelectTopics value={topic} setValue={setTopic} />
                        </Box>
                    </Tooltip>
                    <Tooltip title="Select traineers">
                        <Box sx={{ pt: 0.5, flex: 1, maxWidth: "25%" }}>
                            <SelectTrainer value={trainer} setValue={setTrainer} />
                        </Box>
                    </Tooltip>
                    <Box sx={{ display: 'flex', flex: 4 }} >
                        <CssVarsProvider>
                            <Textarea
                                label="Outlined"
                                placeholder="Remarks"
                                variant="outlined"
                                size="lg"
                                minRows={1}
                                maxRows={2}
                                onChange={(e) => setRemarks(e.target.value)}
                                sx={{ flex: 1 }}
                            />
                        </CssVarsProvider>
                    </Box>
                    <Box sx={{ px: 0.5 }}>
                        <CssVarsProvider>
                            <Button
                                variant="outlined"
                                component="label"
                                size="md"
                                color="primary"
                                onClick={SubmitBtn}
                            >
                                SAVE
                            </Button>
                        </CssVarsProvider>
                    </Box>

                </Paper>
                <Paper elevation={0} sx={{ width: "100%" }}>
                    <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", gap: 3, justifyContent: "center", pt: 1, fontSize: "x-large", fontWeight: "bold" }}>
                        <Box>JAN</Box>
                        <Box>2024</Box>
                    </Paper>
                    <Paper elevation={0} sx={{ display: "flex", flexDirection: "row", mt: 3 }}>
                        <Box sx={{ width: "100%", height: 180, px: 5, textAlign: "center" }}>YEAR AND MONTH</Box>
                        <Box sx={{ width: "100%", height: 180, px: 5, textAlign: "center" }}>TRAINING TOPICS</Box>
                        <Box sx={{ width: "100%", height: 180, px: 5, textAlign: "center" }}>SCHEDULE DATE</Box>
                    </Paper>
                </Paper>


                {/*<Paper elevation={0} variant='outlined' sx={{ width: "100%", mt: 1 }}>
                     <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 500,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    /> 
                </Paper>*/}
            </Paper>
        </CustomDashboardPage >
    )
}

export default memo(DepartmentalTrainingCalender)
