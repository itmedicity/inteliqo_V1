import { Box, Checkbox, Table, Typography } from '@mui/joy'
import React, { lazy, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { TableContainer } from '@mui/material';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const HealthCheckVacc = lazy(() => import('./HealthCheckVacc'))


const HealthCheckUpHistory = ({ formdata, setformdata, List, setList, selectedRowData, Vaccdata }) => {

    const handleCheckboxChange = (slno, field) => {
        setList(prevList => {
            return prevList.map(item => {
                if (item.slno === slno) {
                    return { ...item, [field]: item[field] === 1 ? 0 : 1 }; // Toggle the value between 0 and 1
                }
                return item;
            });
        });
    };
    const handleInputChange = (slno, value, field) => {
        setList(prevList => {
            return prevList.map(item => {
                if (item.slno === slno) {
                    return { ...item, [field]: value };
                }
                return item;
            });
        });
    };

    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title='History Of Illness' />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md" startDecorator={<ArrowRightIcon />}> Read the following carefully</Typography>
                <Typography level="title-md" startDecorator={<ArrowRightIcon />}> Tick appropriately</Typography>
                <Typography level="title-md" startDecorator={<ArrowRightIcon />}> Mention the required information as accordingly</Typography>
            </Box>
            <TableContainer sx={{ mt: 2 }}>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }} size='small' aria-label="basic table" borderAxis="both">
                    <tbody >

                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', }} width="20%" >
                                <Typography level="title-md" sx={{ ml: 1 }}>1.Do you have any history of the following </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }} align='center'>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Yes  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }} align='center'>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>No </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }} align='center'>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If yes,How long/When ? </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }} align='center'>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Still on treatment </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }} align='center'>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Not on  treatment</Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0' }}  >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If still on treatment , specify the medications.</Typography>
                            </td>
                        </tr>



                        {List?.map((item, slno) => (
                            <tr key={slno}>
                                {/* <td style={{ textAlign: "center" }}>{item?.slno === null ? "not updated" : item?.slno}</td> */}
                                <td >
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{item?.name === null ? "not updated" : item?.name} </Typography>
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Checkbox
                                        checked={item.history_yes === 1}
                                        onChange={() => handleCheckboxChange(item.slno, 'history_yes')}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Checkbox
                                        checked={item.history_no === 1}
                                        onChange={() => handleCheckboxChange(item.slno, 'history_no')}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        value={item.Long}
                                        onchange={(e) => handleInputChange(item.slno, e.target.value, 'Long')}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Checkbox
                                        checked={item.Treatment_yes === 1}
                                        onChange={() => handleCheckboxChange(item.slno, 'Treatment_yes')}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <Checkbox
                                        checked={item.Treatment_no === 1}
                                        onChange={() => handleCheckboxChange(item.slno, 'Treatment_no')}
                                    />
                                </td>
                                <td style={{ textAlign: "center" }}>
                                    <InputComponent
                                        type="text"
                                        size="sm"
                                        value={item.Medications}
                                        onchange={(e) => handleInputChange(item.slno, e.target.value, 'Medications')}
                                    />
                                </td>
                            </tr>
                        ))}

                    </tbody>
                </Table>
                <HealthCheckVacc formdata={formdata} setformdata={setformdata} Vaccdata={Vaccdata}
                    selectedRowData={selectedRowData} />
            </TableContainer>

        </Box>)
}

export default memo(HealthCheckUpHistory)