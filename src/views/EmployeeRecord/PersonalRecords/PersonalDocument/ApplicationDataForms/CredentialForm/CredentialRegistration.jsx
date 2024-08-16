import { Box, IconButton, Table, Tooltip } from '@mui/joy'
import React, { memo, useState } from 'react'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';

const CredentialRegistration = ({ setExpData, ExpData, Employee, registration }) => {

    const [rowCount, setRowCount] = useState(1);

    const handleAddMore = () => {
        setRowCount(rowCount + 1);
        setExpData([...ExpData, { // Add new empty data for the new row
            NameOfReg: '',
            RegIssuing: '',
            RegNo: "",
            RegDate: "",
            Validity: '',
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
        <Box>
            <Table sx={{ mt: 1 }} >
                <thead>
                    <tr>
                        <th>Name Of The Registration </th>
                        <th>Registration Issuing Authority </th>
                        <th>Registration Number </th>
                        <th>Registration Date </th>
                        <th>Validity </th>
                        <th>Add More </th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCount)].map((_, index) => (
                        <tr key={index}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="NameOfReg"
                                    value={ExpData[index]?.NameOfReg}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="RegIssuing"
                                    value={ExpData[index]?.RegIssuing}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>

                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="RegNo"
                                    value={ExpData[index]?.RegNo}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="RegDate"
                                    value={ExpData[index]?.RegDate}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="Validity"
                                    value={ExpData[index]?.Validity}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                {index === rowCount - 1 && (
                                    <Tooltip title="Add More Experience" followCursor placement='top' arrow>
                                        <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF' }} onClick={handleAddMore}>
                                            <AddCircleOutlineIcon />
                                        </IconButton>
                                    </Tooltip>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>

            <Table>
                <thead>
                    <tr>
                        <th>Name Of The Registration </th>
                        <th >Registration Issuing Authority </th>
                        <th>Registration Number </th>
                        <th>Registration Date </th>
                        <th>Validity </th>
                    </tr>
                </thead>
                <tbody>
                    {registration?.map((val, index) => (
                        <tr key={val.registration_sl_no}>
                            <td>   {val?.NameOfReg === "" ? "not updated" : val?.NameOfReg}</td>
                            <td>{val?.RegAuthority === "" ? "not updated" : val?.RegAuthority}</td>
                            <td>{val?.RegNo === 0 ? "not updated" : val?.RegNo}</td>
                            <td> {val?.RegDate === 0 ? "not updated" : moment(val?.RegDate).format('DD-MM-YYYY')}</td>
                            <td> {val?.Validity === 0 ? "not updated" : moment(val?.Validity).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>

    )
}

export default memo(CredentialRegistration)