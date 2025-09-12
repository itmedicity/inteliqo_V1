import { Box, Button, Input, Sheet, Table, Typography } from '@mui/joy';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import React, { memo, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import * as XLSX from 'xlsx'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { tableCellClasses } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { format, isValid } from 'date-fns';

const DoctorsPunchUpload = () => {
    const fileInputRef = React.useRef(null);
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [attendanceData, setAttendanceData] = useState([])

    //const fileType = ['application/vnd.ms-excel'];
    const fileType = ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        let selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = async (e) => {
                    let exceldata = e.target.result
                    if (exceldata !== null) {
                        const workbook = XLSX.read(exceldata, { type: 'buffer' });
                        const worksheetName = workbook.SheetNames[0];
                        const worksheet = workbook.Sheets[worksheetName];
                        const data = XLSX.utils.sheet_to_json(worksheet);

                        const arr = data?.map((item) => {
                            const newItem = {};
                            Object.keys(item).forEach((key) => {
                                const newKey = key.replace(/\s+/g, '_');

                                // Handle Excel date serial for "In Time" and "Out Time"
                                if (["In Time", "Out Time"].includes(key) && typeof item[key] === 'number') {
                                    const date = XLSX.SSF.parse_date_code(item[key]);
                                    if (date) {
                                        // Format as "YYYY-MM-DD HH:mm"
                                        newItem[newKey] = `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')} ${String(date.H).padStart(2, '0')}:${String(date.M).padStart(2, '0')}`;
                                    } else {
                                        newItem[newKey] = item[key]; // fallback
                                    }
                                } else {
                                    newItem[newKey] = item[key];
                                }
                            });
                            return newItem;
                        })

                        const insertDutyPunch = await axioslogin.post("/DoctorsProcess/insert/doctorpunch", arr)
                        const { success, message } = insertDutyPunch.data;

                        if (success === 1) {
                            succesNofity(message)
                        } else {
                            warningNofity(message)
                        }

                        // setAttendanceData(arr)
                    }
                }
            } else {
                // warningNofity("Please Select Only Excel Files!!!")
            }
        }
        else {
            //  infoNofity('Please Select File!')
        }
    };


    return (
        <CustomLayout title="Doctor Punch View" displayClose={true} >
            <Box sx={{ display: 'flex', mt: 1, flexDirection: 'column' }}>
                <Box sx={{ display: 'flex', mt: 1 }}>
                    <Box sx={{ px: 0.5 }} >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                views={['year', 'month']}
                                // minDate={subMonths(new Date(), 1)}
                                // maxDate={addMonths(new Date(), 1)}
                                value={selectedMonth}
                                onChange={(newValue) => {
                                    setSelectedMonth(newValue);
                                }}
                                renderInput={({ inputRef, inputProps, InputProps }) => (
                                    <Box sx={{ display: 'flex', alignItems: 'center', }}>
                                        <Input ref={inputRef} {...inputProps} style={{ width: '80%' }} disabled={true} />
                                        {InputProps?.endAdornment}
                                    </Box>
                                )}
                            />
                        </LocalizationProvider>
                    </Box>
                    <Box sx={{ mr: 1 }}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                            required
                        />
                        <Button
                            variant="outlined"
                            color="primary"
                            startDecorator={<UploadFileIcon />}
                            onClick={handleButtonClick}
                        >
                            Upload File
                        </Button>
                    </Box>

                </Box>
                <Box sx={{ p: 4 }}>

                    {attendanceData && attendanceData.length > 0 && (
                        <Sheet
                            variant="outlined"
                            sx={{
                                borderRadius: 'md',
                                overflow: 'auto',
                                width: '100%',
                                boxShadow: 'sm',
                                height: 500
                            }}
                        >
                            <Table
                                borderAxis="bothBetween"
                                stripe="odd"
                                hoverRow
                                sx={{
                                    minWidth: 650,
                                    '& thead th': {
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 1,
                                        bgcolor: 'neutral.softBg',
                                    },
                                    [`& .${tableCellClasses.head}`]: {
                                        textTransform: 'uppercase',
                                        fontWeight: 'lg',
                                    },
                                }}
                            >
                                <thead>
                                    <tr>
                                        {/* <th>Date</th> */}
                                        <th>Attendance ID</th>
                                        <th>Name</th>
                                        <th>Designation</th>
                                        <th>In Time</th>
                                        <th>Out Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {attendanceData.map((row, index) => (
                                        <tr key={index}>
                                            {/* <td>{row.Date}</td> */}
                                            <td>{row.Attendance_id}</td>
                                            <td>{row.User_Name}</td>
                                            <td>{row.Users_Designation}</td>
                                            <td>{row.In_Time}</td>
                                            <td>{row.Out_Time || '-'}</td>
                                            <td>{row.Status}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Sheet>
                    )}

                </Box>
            </Box>
        </CustomLayout>
    )
}

export default memo(DoctorsPunchUpload) 