
import { CssVarsProvider } from '@mui/joy';
import { Box, Button, Dialog, DialogActions, DialogContent, Paper, Slide, Typography } from '@mui/material'
import React, { Fragment, memo, useEffect, useState } from 'react'
import { useMemo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity } from 'src/views/CommonCode/Commonfunc';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});
const DetailsModel = ({ open, setOpen, family_details, emno, empid, relation, count, setCount }) => {

    const empno = useMemo(() => emno, [emno])
    const emp_id = useMemo(() => empid, [empid])
    const rel_number = useMemo(() => relation, [relation])

    const [details, setDetails] = useState({
        mrdno: '',
        pname: '',
        sex: '',
        age: '',
        mobile: '',
        address1: '',
        address2: ''
    })
    const { mrdno, pname, sex, age, mobile, address1, address2 } = details

    useEffect(() => {
        if (Object.keys(family_details).length > 0) {
            const { PT_NO, PTC_PTNAME, PTC_SEX, PTN_YEARAGE, PTC_MOBILE, PTC_LOADD2, PTC_LOADD1 } = family_details[0]
            const details = {
                mrdno: PT_NO,
                pname: PTC_PTNAME,
                sex: PTC_SEX,
                age: PTN_YEARAGE,
                mobile: PTC_MOBILE,
                address1: PTC_LOADD1,
                address2: PTC_LOADD2
            }
            setDetails(details)
        } else {
            setDetails({})
        }
    }, [family_details])

    const postData = useMemo(() => {
        return {
            employee_id: emp_id,
            employee_no: empno,
            relation_number: rel_number,
            mrd_number: mrdno,
            patient_name: pname,
            patient_sex: sex,
            patient_age: age,
            patient_mob: mobile,
            patient_address1: address1,
            patient_address2: address2
        }
    }, [empno, mrdno, pname, sex, age, mobile, address1,
        address2, rel_number, emp_id])

    const saveDetails = async () => {
        const result = await axioslogin.post('/personaldetl/family', postData);
        const { success } = result.data;
        if (success === 1) {
            succesNofity("Data Added Successfully")
            setCount(count + 1)
            setOpen(false)
        } else {
            setOpen(false)
        }
    }

    const CloseModel = async () => {
        setOpen(false)
    }

    return (
        <Fragment>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                fullWidth
                sx={{ width: '100%', height: 600 }}
            >
                <DialogContent id="alert-dialog-slide-descriptiona">
                    <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }} >
                        <Box sx={{ width: '100%', pt: 1, display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                            <CssVarsProvider>
                                <Typography sx={{ fontWeight: 500, fontSize: 25 }} >
                                    Family Details
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Paper variant="outlined" sx={{ px: 1, width: "100%" }} >
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> MRD No</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{mrdno} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Name</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{pname} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Age</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{age} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Sex</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{sex === 'F' ? 'Female' : 'Male'} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Mobile</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{mobile} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Address1</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{address1} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                            <Box sx={{ display: "flex", width: "100%" }} >
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> Address2</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", px: 0.5, justifyContent: "left", fontWeight: 500 }}>
                                    <CssVarsProvider>
                                        <Typography level="body1"> :</Typography>
                                    </CssVarsProvider>
                                </Box>
                                <Box sx={{ display: "flex", flex: 1, px: 0.5, justifyContent: "left" }} >
                                    <CssVarsProvider>
                                        <Typography level="body1">{address2} </Typography>
                                    </CssVarsProvider>
                                </Box>
                            </Box>
                        </Paper>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button color="secondary" onClick={saveDetails}>Save</Button>
                    <Button color="secondary" onClick={CloseModel} >Cancel</Button>
                </DialogActions>
            </Dialog>
        </Fragment >
    )
}

export default memo(DetailsModel)