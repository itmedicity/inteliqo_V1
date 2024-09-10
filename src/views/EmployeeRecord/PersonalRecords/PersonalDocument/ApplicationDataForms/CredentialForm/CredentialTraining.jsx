import { Box, IconButton, Table, Tooltip } from '@mui/joy'
import React, { memo, useState } from 'react'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import moment from 'moment';

const CredentialTraining = ({ trainData, settrainData, Employee, Training }) => {

    const [rowCount, setRowCount] = useState(1);

    const handleAddMore = () => {
        setRowCount(rowCount + 1);
        settrainData([...trainData, { // Add new empty data for the new row
            NameOfpgrm: '',
            from: '',
            to: "",
            conducted: "",
            em_no: Employee?.em_no,
            em_id: Employee?.em_id
        }]);
    };

    const EduSettings = (e, index) => {
        const { name, value } = e.target;
        const updatedExpData = [...trainData]; // Create a copy of expData array
        updatedExpData[index] = { ...updatedExpData[index], [name]: value }; // Update the corresponding row data
        settrainData(updatedExpData);
    };
    return (
        <Box>
            <Table borderAxis="both" sx={{ mt: 1 }} >
                <thead>
                    <tr>
                        <th rowSpan={2}>Name of the training/workshop program</th>
                        <th colSpan={2} style={{ textAlign: 'center' }}> Period </th>
                        <th rowSpan={2}>Conducted By </th>
                        <th rowSpan={2}>Add More </th>
                    </tr>
                    <tr>
                        <th>From </th>
                        <th style={{ borderRightWidth: 0 }}> To </th>
                    </tr>
                </thead>
                <tbody>
                    {[...Array(rowCount)].map((_, index) => (
                        <tr key={index}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="NameOfpgrm"
                                    value={trainData[index]?.NameOfpgrm}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="from"
                                    value={trainData[index]?.from}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>

                                <InputComponent
                                    type="date"
                                    size="sm"
                                    name="to"
                                    value={trainData[index]?.to}
                                    onchange={(e) => EduSettings(e, index)}
                                />
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '15%' }}>
                                <InputComponent
                                    type="text"
                                    size="sm"
                                    name="conducted"
                                    value={trainData[index]?.conducted}
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
                        <th >Name of the training/workshop program</th>
                        {/* <th style={{ textAlign: 'center' }}> Period </th> */}
                        <th >Conducted By </th>
                        <th>From </th>
                        <th style={{ borderRightWidth: 0 }}> To </th>
                    </tr>

                </thead>
                <tbody>
                    {Training?.map((val, index) => (
                        <tr key={val.Training_sl_no}>
                            <td>   {val?.NameOfpgrm === "" ? "not updated" : val?.NameOfpgrm}</td>
                            {/* <td>{val?.RegAuthority === "" ? "not updated" : val?.RegAuthority}</td> */}
                            <td>{val?.conducted === 0 ? "not updated" : val?.conducted}</td>
                            <td> {val?.from_date === 0 ? "not updated" : moment(val?.from_date).format('DD-MM-YYYY')}</td>
                            <td> {val?.to_date === 0 ? "not updated" : moment(val?.to_date).format('DD-MM-YYYY')}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Box>

    )
}

export default memo(CredentialTraining)