import { Box, IconButton, Typography } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';

const Antecedentexp = lazy(() => import('./Antecedentexp'))


const AntecedentForm = ({ Empdata, itemname, setformid }) => {

    const [details, setDetails] = useState({
        email: '',
        em_name: '',
        dob: 0,
        mobile_num: 0,
        reg_name: '',
        relg_name: '',
        edu: [],
        exp: [],
        addressPermnt1: '',
        addressPermnt2: '',
        hrm_pin1: ''
    })

    const { email, em_name, dob, mobile_num, reg_name, relg_name, addressPermnt1, addressPermnt2, hrm_pin1 } = details;
    useEffect(() => {
        if (Empdata && Empdata.length > 0) {
            const { em_name, em_dob, em_mobile, reg_name, relg_name, em_email, addressPermnt1, addressPermnt2, hrm_pin1 } = Empdata[0]
            // const exp = JSON.parse(Empdata[0].Experience_details)
            // const edu = JSON.parse(Empdata[0].Education_details)

            const details = {
                email: em_email,
                em_name: em_name,
                dob: em_dob,
                mobile_num: em_mobile,
                reg_name: reg_name,
                relg_name: relg_name,
                // exp: exp,
                // edu: edu,
                addressPermnt1: addressPermnt1,
                addressPermnt2: addressPermnt2,
                hrm_pin1: hrm_pin1

            }
            setDetails(details)
        }
        else {
            setDetails({})
        }

    }, [Empdata])
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

                <TableContainer sx={{ mt: 2 }}>
                    <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>
                        <TableBody>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Name </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{em_name === '' ? "Not Updated" : em_name} </Typography>
                                        {/* <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{last_name} </Typography> */}
                                    </Box>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>   Email Address</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{email === '' ? "Not Updated" : email}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}> Mobile Number</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}> {mobile_num === 0 ? 'Not Updated' : mobile_num}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Region</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{reg_name === null ? "Not Updated" : reg_name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Religion</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1, textTransform: 'capitalize' }}>{relg_name === '' ? "Not Updated" : relg_name}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Date of Birth</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{dob === 0 ? "Not Updated" : moment(dob).format('DD-MM-YYYY')}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Condact Address</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{addressPermnt1 === '' ? "Not Updated" : addressPermnt1} , {addressPermnt2 === '' ? "Not Updated" : addressPermnt2}
                                    </Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>Condact Address</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography sx={{ ml: 1 }}>{hrm_pin1 === 0 ? "Not Updated" : hrm_pin1}
                                    </Typography>
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Antecedentexp
                    details={details}
                />
            </Box>
            {/* </Box>
            </Modal > */}
        </Box >
    )
}

export default memo(AntecedentForm) 