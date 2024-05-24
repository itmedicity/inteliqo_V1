import React, { memo, useState } from 'react'
import { TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog';
import { IconButton, Table, Tooltip, Typography } from '@mui/joy';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';


import moment from 'moment';

const PersonalDataformExp = ({ ExpData, setExpData, Employee, experience, FormData }) => {
    const { exp } = FormData;

    const [rowCount, setRowCount] = useState(1);
    const handleAddMore = () => {
        setRowCount(rowCount + 1);
        setExpData([...ExpData, { // Add new empty data for the new row
            instiname: '',
            position: '',
            dateFrom: '',
            dateto: '',
            Salery: '',
            em_no: Employee?.em_no,
            em_id: Employee?.em_id
        }]);
    };
    const EduSettings = (e, index) => {
        const { name, value } = e.target;
        const updatedExpData = [...ExpData]; // Create a copy of expData array
        updatedExpData[index] = { ...updatedExpData[index], [name]: value }; // Update the corresponding row data
        setExpData(updatedExpData);
    };
    return (
        <>
            <CustmTypog title={' Experience'} />
            <TableContainer sx={{}}>

                {exp?.length > 0 ?
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', }}>
                        <thead >
                            <tr>
                                <th>Name Of The Institution</th>
                                <th>Position Held</th>
                                <th>Date From</th>
                                <th>Date To</th>
                                <th>Currently Working</th>
                                <th>Supervisor Name</th>
                                <th>Additional information</th>
                                <th>Other information</th>
                                <th>Responsibilities</th>

                            </tr>
                        </thead>
                        <tbody>
                            {exp?.map((val, index) => (
                                <tr key={val.id}>
                                    <td>   {val?.Employer === "" ? "not updated" : val?.Employer}</td>
                                    <td>{val?.jobexp === "" ? "not updated" : val?.jobexp}</td>
                                    <td>{val?.expstartdate === 0 ? "not updated" : moment(val?.expstartdate).format('DD-MM-YYYY')}</td>
                                    <td> {val?.expenddate === 0 ? "not updated" : moment(val?.expenddate).format('DD-MM-YYYY')}</td>
                                    <td> {val?.Workingstatus === false ? "No" : val?.Workingstatus === true ? "Yes" : "not updated"}</td>
                                    <td>{val?.SupervisorName === "" ? "not updated" : val?.SupervisorName}</td>
                                    <td> {val?.Additionalinf === "" ? "not updated" : val?.Additionalinf}</td>
                                    <td> {val?.Other === "" ? "not updated" : val?.Other}</td>
                                    <td> {val?.Responsibilities === "" ? "not updated" : val?.Responsibilities}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    : null}

                <Table>
                    <TableBody >
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}> Name Of The Institution </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Position Held </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Date From </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Date To </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Gross Monthly Salary </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}> Add More Experience</Typography>
                            </TableCell>

                        </TableRow>
                        {[...Array(rowCount)].map((_, index) => (
                            <TableRow key={index}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="instiname"
                                        value={ExpData[index]?.instiname}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="position"
                                        value={ExpData[index]?.position}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>

                                    <InputComponent
                                        type="date"
                                        size="sm"
                                        name="dateFrom"
                                        value={ExpData[index]?.dateFrom}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                    <InputComponent
                                        type="date"
                                        size="sm"
                                        name="dateto"
                                        value={ExpData[index]?.dateto}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        name="Salery"
                                        value={ExpData[index]?.Salery}
                                        onchange={(e) => EduSettings(e, index)}
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                    {index === rowCount - 1 && (
                                        <Tooltip title="Add More Experience" followCursor placement='top' arrow>
                                            <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF' }} onClick={handleAddMore}>
                                                <AddCircleOutlineIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
                {experience?.length > 0 ?
                    <Table>
                        <thead >
                            <tr>
                                <th>Name Of The Institution</th>
                                <th>Position Held</th>
                                <th>Date From</th>
                                <th>Date To</th>
                                <th>Gross Monthly Salary</th>

                            </tr>
                        </thead>
                        <tbody>
                            {experience?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.em_institution === null ? "not updated" : item?.em_institution}</td>
                                    <td>{item?.em_position === null ? "not updated" : item?.em_position}</td>
                                    <td>{item?.em_from === null ? "not updated" : item?.em_from}</td>
                                    <td>{item?.em_to === null ? "not updated" : item?.em_to}</td>
                                    <td>{item?.em_salary === null ? "not updated" : item?.em_salary}</td>

                                </tr>
                            ))}
                        </tbody>

                    </Table>

                    : null}
            </TableContainer>

        </>
    )
}

export default memo(PersonalDataformExp)