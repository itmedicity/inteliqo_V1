import { Box, Paper, Typography } from '@mui/material'
import React, { Fragment, memo, useCallback, useMemo, useState } from 'react'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/joy/Button';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { axioslogin } from 'src/views/Axios/Axios';
import PersonIcon from '@mui/icons-material/Person';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmpHomepage from './EmpHomepage';

const Induction_test_login = () => {

    const [EmpId, SetEmpId] = useState('');
    const [Mob, SetMob] = useState('');
    const [count, Setcount] = useState(0);
    const [view, SetView] = useState(0)
    const [data, setData] = useState([])

    const { topic_slno, slno } = useParams()

    const reset = useCallback(() => {
        SetEmpId('')
        SetMob('')
    }, [SetEmpId, SetMob])

    const postdata = useMemo(() => {
        return {
            em_no: parseInt(EmpId),
            em_mobile: parseInt(Mob),
            // topic_slno: parseInt(topic_slno),
            // slno: parseInt(slno)
        }
    }, [EmpId, Mob])
    //api call
    const LogInData = useCallback(async () => {
        if (EmpId !== '' && Mob !== '' && topic_slno !== 0) {
            // const GetData = async () => {
            //     const result = await axioslogin.post('/InductionTest/inductlogEmpDetails', postdata)
            //     const { data } = result.data
            //     if (data?.length > 0) {
            //         setData(data)
            //         Setcount(count + 1);
            //         SetView(1)
            //         reset();
            //     }
            //     else {
            //         warningNofity("Training Not scheduled For this Employee")
            //         setData([])
            //         Setcount(0);
            //         SetView(0)
            //     }
            // }
            // GetData(postdata)

            const result1 = await axioslogin.post('/InductionTest/inductlogEmpDetails', postdata)
            const { data, success } = result1.data
            if (success === 2 && data?.length > 0) {
                const { em_id } = data[0]
                const obj = {
                    preId: parseInt(em_id),
                    postId: parseInt(em_id),
                    em_no: parseInt(EmpId),
                    em_mobile: parseInt(Mob),
                    topic_slno: parseInt(topic_slno),
                    slno: parseInt(slno)

                }
                const result2 = await axioslogin.post('/InductionTest/inductlogEmpDatas', obj)
                const { datas, success } = result2.data
                if (success === 2) {
                    setData(datas)
                    Setcount(count + 1);
                    SetView(1)
                    reset();
                }
                else {
                    setData([])
                    Setcount(0);
                    SetView(0)
                }
            }
            else {
                warningNofity("Training Not scheduled")
                // setData([])
                // Setcount(0);
                // SetView(0)
            }
        }
        else {
            warningNofity("Please Enter Valid Employee ID and Registered Mobile Number")
            reset();
        }
    }, [postdata, setData, SetView, reset, Setcount, count, EmpId, Mob, topic_slno, slno])

    return (
        <Fragment>
            <ToastContainer />
            {
                view === 0 ?
                    <Paper elevation={0} sx={{ width: "100%", px: 1, p: 2, display: "flex", justifyContent: "center", }}>
                        <Box sx={{ width: "100%", backgroundColor: "#F0F0F0", textAlign: "center", mt: 20 }}>
                            <AccountCircleIcon sx={{ fontSize: "xxx-large", textAlign: "center", mt: 1, color: "#739072" }} />
                            <Typography sx={{ fontSize: "xx-large", color: "#508D69" }}>LogIn</Typography>
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", p: 1 }}>
                                <Box sx={{ width: "80%" }}>
                                    <InputComponent
                                        startDecorator={<PersonIcon />}
                                        type="text"
                                        size="sm"
                                        placeholder="Employee ID"
                                        name="EmId"
                                        value={EmpId}
                                        onchange={(e) => SetEmpId(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ mt: 1, width: "80%", color: "#7AA874" }}>
                                    <InputComponent
                                        startDecorator={<LocalPhoneIcon />}
                                        type="text"
                                        size="sm"
                                        placeholder="Mobile No"
                                        name="Mob"
                                        value={Mob}
                                        onchange={(e) => SetMob(e.target.value)}
                                    />
                                </Box>
                                <Box sx={{ p: 1 }}>
                                    <Button endDecorator={<KeyboardArrowRight />} color="success"
                                        onClick={(e) => { LogInData(e) }}
                                    >
                                        LogIn
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Paper>
                    : <EmpHomepage data={data} SetView={SetView} />
            }

        </Fragment >
    )
}

export default memo(Induction_test_login)
