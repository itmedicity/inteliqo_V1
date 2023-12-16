import { Box, Typography } from '@mui/joy'
import React, { useCallback, memo } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'

import JoyEducationSelect from 'src/views/MuiComponents/JoyComponent/JoyEducationSelect';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';

const Manpowerexp = ({ setExperience_status, Fresher_status, setexpfrom, setexpto, expfrom, expto, setFresher_status, TraineeExp_status, setTraineeExp_status, Experience_status, setApprenticeshipExp_status, ApprenticeshipExp_status, salaryfrom, salaryto,
    setexp, exp, setValue, value, settraining, training, other_essen, setother_essen }) => {
    const handleCountfrom = useCallback((e) => {
        setexpfrom(e);

    }, [setexpfrom]);
    const handleCountTo = useCallback((e) => {
        setexpto(e);

    }, [setexpto]);
    return (
        <Box sx={{ mt: 3, width: '100%' }}>
            <CustmTypog title={'QUALIFICATION AND EXPERIENCE'} />
            <TableContainer sx={{ mt: 2 }}>
                <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                    <TableHead>
                        <TableRow sx={{}}>
                            <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>Particulars</TableCell>
                            <TableCell padding='none' align='center' sx={{ border: '1px solid #e0e0e0' }}>Standard Requirements</TableCell>
                            {/* <TableCell sx={{ border: '1px solid #e0e0e0' }}></TableCell> */}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Qualification </Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                <JoyEducationSelect variant="plain" value={value} setValue={setValue} />
                            </TableCell>
                        </TableRow>

                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>    Other essential attributes(certificates ,etc..) </Typography>


                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    variant="plain"
                                    type="text"
                                    value={other_essen}
                                    onchange={setother_essen}
                                    size="sm"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}> Training</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <JoyInput
                                    variant="plain"
                                    type="text"
                                    value={training}
                                    onchange={settraining}
                                    size="sm"
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Experience</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                <Box sx={{ gap: 1, ml: 1, mt: 1 }}>
                                    <Box >
                                        <Box sx={{}}>  <JoyCheckbox
                                            sx={{ p: "0", m: "0", mt: "1" }}
                                            label='Fresher'
                                            name="Fresher_status"
                                            checked={Fresher_status}
                                            onchange={(e) => setFresher_status(e.target.checked)}

                                        /></Box>
                                        <Box> <JoyCheckbox
                                            label='Trainee'
                                            name="TraineeExp_status"
                                            checked={TraineeExp_status}
                                            onchange={(e) => setTraineeExp_status(e.target.checked)}
                                        /></Box>
                                        <Box>  <JoyCheckbox
                                            label='Apprenticeship'
                                            name="ApprenticeshipExp_status"
                                            checked={ApprenticeshipExp_status}
                                            onchange={(e) => setApprenticeshipExp_status(e.target.checked)}
                                        /></Box>
                                        <Box>
                                            <JoyCheckbox
                                                label='Experience'
                                                name="Experience_status"
                                                checked={Experience_status}
                                                onchange={(e) => setExperience_status(e.target.checked)}
                                            />
                                        </Box>

                                    </Box>

                                    {Experience_status === true ?
                                        <Box sx={{ display: "flex", mb: 1 }}>
                                            <Typography color="neutral" sx={{}}>  From:</Typography>
                                            <Box sx={{ ml: 1 }}>
                                                <JoyInput
                                                    type="number"
                                                    sx={{}}
                                                    value={expfrom}
                                                    onchange={handleCountfrom}
                                                    size="sm"

                                                />
                                            </Box>

                                            <Typography color="neutral" sx={{ ml: 1 }}>To:</Typography>
                                            <Box sx={{ ml: 1 }}>
                                                <JoyInput

                                                    type="number"
                                                    value={expto}
                                                    onchange={handleCountTo}
                                                    size="sm"
                                                />
                                            </Box>
                                        </Box> : <Box> </Box>}

                                </Box>
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ p: 0 }}>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography sx={{ ml: 1 }}>Salary Scale</Typography>
                            </TableCell>
                            <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>

                                <Box sx={{ display: 'flex', }}>
                                    <Typography color="neutral" sx={{ mt: .4, ml: 1, mr: 1 }}>  From:</Typography>
                                    <JoyInput
                                        variant="plain"
                                        type="number"
                                        disabled
                                        value={salaryfrom === null ? 0 : salaryfrom}
                                        // onchange={(newValue) => handleCountChange(newValue, "salaryfrom", val)}
                                        size="sm"

                                    />
                                    <Typography color="neutral" sx={{ mt: .4, mr: 1 }}>To:</Typography>
                                    <JoyInput
                                        variant="plain"
                                        type="number"
                                        disabled
                                        value={salaryto === null ? 0 : salaryto}
                                        // onchange={(newValue) => handleCountChange(newValue, "salaryto", val)}
                                        size="sm"
                                    />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box >
    )
}

export default memo(Manpowerexp) 