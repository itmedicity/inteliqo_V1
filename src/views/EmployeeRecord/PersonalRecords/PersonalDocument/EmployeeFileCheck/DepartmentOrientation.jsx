import React, { memo, useCallback, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/joy'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';


const DepartmentOrientation = ({ Empdata, itemname, setformid }) => {
    const [workstation, setworkstation] = useState(false);
    const [dtpPolicy, setdtpPolicy] = useState(false);
    const [duties, setduties] = useState(false);
    const [objective, setobjective] = useState(false);
    const [evaluation, setevaluation] = useState(false);
    const [quality, setquality] = useState(false);
    const [introduction, setintroduction] = useState(false);
    const [grooming, setgrooming] = useState(false);

    const toRedirectToHome = useCallback(() => {
        setformid(0)
    }, [setformid])

    return (
        <Box>
            <Box >
                {/* <CustmTypog title={'CheckList For Documents'} /> */}
                <Paper square sx={{ backgroundColor: '#e8eaf6', height: 25 }} >
                    <Box sx={{ display: "flex", flexDirection: 'row', justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                startDecorator={<ArrowRightIcon />}
                                textColor="neutral.600" sx={{ display: 'flex', }} >
                                {itemname}
                            </Typography>
                        </Box>
                        <Box >
                            <IconButton
                                variant="outlined"
                                size='xs'
                                color="danger"
                                onClick={toRedirectToHome}
                                sx={{ color: '#ef5350', }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
            </Box>
            <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" } }}>

                <TableContainer sx={{}}>
                    <Table sx={{ mt: 1, p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}> Name</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Designation</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Department  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.dept_name === '' ? 'Not Updated' : Empdata?.dept_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Id No </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_no === '' ? 'Not Updated' : Empdata?.em_no} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Category </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.ecat_name === '' ? 'Not Updated' : Empdata?.ecat_name} </Typography>
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                    <Table sx={{ mt: 2 }}>
                        <TableBody>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={5}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>Orientation Parameters</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={1}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>(Please tick)</Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>1</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, }}>Assigning a workstation/place of work</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={workstation}
                                            onchange={(e) => setworkstation(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>2</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Introduction to departmental policies,procedures and hierarchy</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="dtpPolicy"
                                            checked={dtpPolicy}
                                            onchange={(e) => setdtpPolicy(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>3</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Duties and responsibilities related to the job position, role clarity</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={duties}
                                            onchange={(e) => setduties(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>4</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Departmental objectives as a derivative of the organisational goals,Integration of group effort to each the departmental objectives</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={objective}
                                            onchange={(e) => setobjective(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>5</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Performance evaluation and career progression,expectation from the role</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={evaluation}
                                            onchange={(e) => setevaluation(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>6</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Quality managment concept,NABH awarness and Continuous Quality improvement (CQI) Measures </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>

                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={quality}
                                            onchange={(e) => setquality(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>7</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Introduction to nearest fire exits and fire fighting equipment</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={introduction}
                                            onchange={(e) => setintroduction(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, textAlign: "center" }}>8</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1 }}>Grooming standards, dress code ,code,code of conduct and ethics related to the role and Position</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography sx={{ ml: 1, mt: .5, textAlign: "center" }}>
                                        <JoyCheckbox
                                            sx={{}}
                                            name="workstation"
                                            checked={grooming}
                                            onchange={(e) => setgrooming(e.target.checked)}

                                        />
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            {/* </Box>

            </Modal > */}
        </Box >
    )
}

export default memo(DepartmentOrientation)