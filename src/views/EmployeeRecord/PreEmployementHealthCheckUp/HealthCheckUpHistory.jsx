import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { TableContainer } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
// import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';

const HealthCheckVacc = lazy(() => import('./HealthCheckVacc'))


const HealthCheckUpHistory = ({ formdata, setformdata }) => {
    const { Diabetes_yes, Diabetes_no, Hypertension_statusyes, Hypertension_statusno, Heart_statusyes, Heart_statusno, Respiratory_status_yes, Respiratory_status_no, AIDS_status_no,
        Hepatitis_status_yes, Hepatitis_status_no, Chickenpox_statusyes, Chickenpox_statusno, AIDS_status_yes, Diabetes_stillOn, Diabetes_notOn, Hypertension_statusstillOn,
        Hypertension_statusnotOn, Heart_statusstillOn, Heart_statusnotOn, Respiratory_status_StillOn, Respiratory_status_notOn, AIDS_status_stillOn, AIDS_status_notOn, Hepatitis_status_StillOn,
        Hepatitis_status_notOn, Chickenpox_statusStillOn, Chickenpox_statusnotOn } = formdata;


    const updateBoard = useCallback((e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setformdata({ ...formdata, [e.target.name]: value })
    }, [formdata, setformdata]);

    return (
        <Box sx={{ mt: 1 }}>
            <CustmTypog title='History Of Illness' />
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">. Read the following carefully</Typography>
                <Typography level="title-md">. Tick appropriately</Typography>
                <Typography level="title-md">. Mention the required information as accordingly</Typography>
            </Box>
            <TableContainer sx={{ mt: 2 }}>

                <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }} size='small' aria-label="basic table" borderAxis="both">
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>1.Do you have any history of the following </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Yes  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>No </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If yes,How long/When ? </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Still on treatment </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Not on  treatment</Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>If still on treatment , specify the medications.</Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>A.Diabetes </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Diabetes_yes"
                                        checked={Diabetes_yes}
                                        disabled={Diabetes_no === true ? true : false}
                                        onchange={(e) => updateBoard(e)}
                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Diabetes_no"
                                        checked={Diabetes_no}
                                        disabled={Diabetes_yes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                {/* <JoyInput
                                    size="sm"
                                    // value={RelativeName}
                                    // onchange={setRelativeName}
                                    name="RelativeNam"
                                    type="text"
                                    placeholder="Enter The Name"

                                /> */}
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Diabetes_stillOn"
                                        checked={Diabetes_stillOn}
                                        disabled={Diabetes_notOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Diabetes_notOn"
                                        checked={Diabetes_notOn}
                                        disabled={Diabetes_stillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>B.Hypertension </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hypertension_statusyes"
                                        checked={Hypertension_statusyes}
                                        disabled={Hypertension_statusno === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hypertension_statusno"
                                        checked={Hypertension_statusno}
                                        disabled={Hypertension_statusyes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hypertension_statusstillOn"
                                        checked={Hypertension_statusstillOn}
                                        disabled={Hypertension_statusnotOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hypertension_statusnotOn"
                                        checked={Hypertension_statusnotOn}
                                        disabled={Hypertension_statusstillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>C.Heart diseases </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Heart_statusyes"
                                        checked={Heart_statusyes}
                                        disabled={Heart_statusno === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Heart_statusno"
                                        checked={Heart_statusno}
                                        disabled={Heart_statusyes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Heart_statusstillOn"
                                        checked={Heart_statusstillOn}
                                        disabled={Heart_statusnotOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Heart_statusnotOn"
                                        checked={Heart_statusnotOn}
                                        disabled={Heart_statusstillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>D.Respiratory Diseases </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Respiratory_status_yes"
                                        checked={Respiratory_status_yes}
                                        disabled={Respiratory_status_no === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Respiratory_status_no"
                                        checked={Respiratory_status_no}
                                        disabled={Respiratory_status_yes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Respiratory_status_StillOn"
                                        checked={Respiratory_status_StillOn}
                                        disabled={Respiratory_status_notOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Respiratory_status_notOn"
                                        checked={Respiratory_status_notOn}
                                        disabled={Respiratory_status_StillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>E.AIDS&apos;S </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="AIDS_status_yes"
                                        checked={AIDS_status_yes}
                                        disabled={AIDS_status_no === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="AIDS_status_no"
                                        checked={AIDS_status_no}
                                        disabled={AIDS_status_yes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="AIDS_status_stillOn"
                                        checked={AIDS_status_stillOn}
                                        disabled={AIDS_status_notOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="AIDS_status_notOn"
                                        checked={AIDS_status_notOn}
                                        disabled={AIDS_status_stillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>F.Hepatitis </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hepatitis_status_yes"
                                        checked={Hepatitis_status_yes}
                                        disabled={Hepatitis_status_no === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hepatitis_status_no"
                                        checked={Hepatitis_status_no}
                                        disabled={Hepatitis_status_yes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hepatitis_status_StillOn"
                                        checked={Hepatitis_status_StillOn}
                                        disabled={Hepatitis_status_notOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Hepatitis_status_notOn"
                                        checked={Hepatitis_status_notOn}
                                        disabled={Hepatitis_status_StillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>G.Chickenpox </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Chickenpox_statusyes"
                                        checked={Chickenpox_statusyes}
                                        disabled={Chickenpox_statusno === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Chickenpox_statusno"
                                        checked={Chickenpox_statusno}
                                        disabled={Chickenpox_statusyes === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Chickenpox_statusStillOn"
                                        checked={Chickenpox_statusStillOn}
                                        disabled={Chickenpox_statusnotOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    />
                                </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>
                                    <JoyCheckbox
                                        sx={{}}
                                        name="Chickenpox_statusnotOn"
                                        checked={Chickenpox_statusnotOn}
                                        disabled={Chickenpox_statusStillOn === true ? true : false}
                                        onchange={(e) => updateBoard(e)}

                                    /></Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>H.Other communicable diseases </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <Table>
                    <tbody >
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>I.Allergy </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                        </tr>
                        <tr sx={{ p: 0 }}>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '5%' }} >
                                <Typography level="title-md" sx={{ ml: 1 }}>J.Other </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '25%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }}>
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}> </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                            <td padding='none' sx={{ border: '1px solid #e0e0e0', width: '10%' }} >
                                <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>  </Typography>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <HealthCheckVacc />
            </TableContainer>

        </Box>)
}

export default memo(HealthCheckUpHistory)