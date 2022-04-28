import { Card, CardContent, Grid, } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ApiIcon from '@mui/icons-material/Api';
import CodeIcon from '@mui/icons-material/Code';
import Widjet from '../Components/Widjet';
import DraftsIcon from '@mui/icons-material/Drafts';
import { axioslogin } from 'src/views/Axios/Axios';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import StreamIcon from '@mui/icons-material/Stream';
import FlareIcon from '@mui/icons-material/Flare';
import FlipToBackIcon from '@mui/icons-material/FlipToBack';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import LensBlurIcon from '@mui/icons-material/LensBlur';
import MemoryIcon from '@mui/icons-material/Memory';
import LoopIcon from '@mui/icons-material/Loop';
import TextureIcon from '@mui/icons-material/Texture';
import YardIcon from '@mui/icons-material/Yard';
import WifiProtectedSetupIcon from '@mui/icons-material/WifiProtectedSetup';
import TocIcon from '@mui/icons-material/Toc';
import { getMenuSlno } from 'src/views/Constant/Constant';

const DashAlertCmp = () => {
    const history = useHistory()
    //getting employee id
    const em_id = useSelector((state) => {
        return state.getProfileData.ProfileData[0].em_id
    })
    const Leaverequest = () => {
        history.push(`/Home/ApprovalHR`)
    }
    const LeaveUser = () => {
        history.push(`/Home/LeaveUser`)
    }
    const LeaveIncharge = () => {
        history.push(`/Home/ApprovalIncharge`)
    }
    const LeaveHOD = () => {
        history.push(`/Home/ApprovalHOD`)
    }
    const LeaveCEO = () => {
        history.push(`/Home/ApprovalCEO`)
    }
    const ContractRenew = () => {
        history.push(`/Home/Contract_end_details`)
    }
    const Training = () => {
        history.push(`/Home/Probation_end_details`)
    }
    const Contractclose = () => {
        history.push(`/Home/Contract_end_details`)
    }
    const Otrequest = () => {
        history.push(`/Home/OTApprovalHR`)
    }
    const Otinch = () => {
        history.push(`/Home/OTApprovalIncharge`)
    }
    const Othod = () => {
        history.push(`/Home/OTApprovalHOD`)
    }
    const Otceo = () => {
        history.push(`/Home/OTApprovalCEO`)
    }
    const Otuser = () => {
        history.push(`/Home/OtUser`)
    }
    const Resign = () => {
        history.push(`/Home/ResignationApprovalHR`)
    }
    const ResignInch = () => {
        history.push(`/Home/ResignationApprovalIncharge`)
    }
    const ResignHod = () => {
        history.push(`/Home/ResignationApprovalHod`)
    }
    const ResignCeo = () => {
        history.push(`/Home/ResignationApprovalCEO`)
    }

    const leaveCount = <DraftsIcon onClick={Leaverequest} />;
    const leaveUSER = <PersonOutlineIcon onClick={LeaveUser} />;
    const leaveInch = <AccessAlarmIcon onClick={LeaveIncharge} />;
    const leaveHOd = <ApiIcon onClick={LeaveHOD} />;
    const leaveCeo = <CodeIcon onClick={LeaveCEO} />;
    const contractRenew = <LensBlurIcon onClick={ContractRenew} />;
    const training = <FlipToBackIcon onClick={Training} />;
    const contractclose = <SelectAllIcon onClick={Contractclose} />;
    const otrequest = <StreamIcon onClick={Otrequest} />;
    const otinch = <FlareIcon onClick={Otinch} />;
    const othod = <GraphicEqIcon onClick={Othod} />;
    const otceo = <MemoryIcon onClick={Otceo} />;
    const otuser = <LoopIcon onClick={Otuser} />;
    const resign = <TextureIcon onClick={Resign} />;
    const resignInch = <YardIcon onClick={ResignInch} />;
    const resignHod = <WifiProtectedSetupIcon onClick={ResignHod} />;
    const resignCeo = <TocIcon onClick={ResignCeo} />;


    const [resigncount, setResigncount] = useState(0);
    const [contractcloseCount, setcontractcloseCount] = useState(0);
    const [otCount, setotCount] = useState(0);
    const [otCountIncharge, setotCountIncharge] = useState(0);
    const [otHODCount, setototHODCount] = useState(0);
    const [otCEOCount, setotCEOCount] = useState(0);
    const [otUserCount, setotUserCount] = useState(0);
    const [leaveInchargeCount, setleaveInchargeCount] = useState(0);
    const [leaveHODCount, setleaveHODCount] = useState(0);
    const [leaveCEOCount, setleaveCEOCount] = useState(0);
    const [leaveHRCount, setleaveHRCount] = useState(0);
    const [leaveUserCount, setleaveUserCount] = useState(0);
    const [resignInchargecount, setResignInchargecount] = useState(0);
    const [resignHODcount, setResignHODcount] = useState(0);
    const [resignCEOcount, setResignCEOcount] = useState(0);
    const [contractRenewal, setcontractRenewal] = useState(0);
    const [trainingConform, settrainingConform] = useState(0);


    useEffect(() => {
        const getResignCount = async () => {
            const result = await axioslogin.get('/Count')
            const { success, data } = result.data
            if (success === 1) {
                const { resignreqcount } = data[0]
                setResigncount(resignreqcount)
            }
        }
        getResignCount()
        //contract close count
        const getcontractCloseCount = async () => {
            const result = await axioslogin.get('/Count/contractcloseCount')
            const { success, data } = result.data
            if (success === 1) {
                const { contractcloseCount } = data[0]
                setcontractcloseCount(contractcloseCount)
            }
        }
        getcontractCloseCount()
        //get over time pending count 
        const getovertimeCount = async () => {
            const result = await axioslogin.get('/Count/OtReqHRCount')
            const { success, data } = result.data
            if (success === 1) {
                const { othrcount } = data[0]
                setotCount(othrcount)
            }
        }
        getovertimeCount()
        //get over time Incharge pending count
        const getovertimeCountIncharge = async () => {
            const result = await axioslogin.get('/Count/OtReqInchargeCount')
            const { success, data } = result.data
            if (success === 1) {
                const { otcountincharge } = data[0]
                setotCountIncharge(otcountincharge)
            }
        }
        getovertimeCountIncharge()
        //get over time HOD pending count
        const getovertimeCountHOD = async () => {
            const result = await axioslogin.get('/Count/OtReqHodCount')
            const { success, data } = result.data
            if (success === 1) {
                const { othodcount } = data[0]
                setototHODCount(othodcount)
            }
        }
        getovertimeCountHOD()
        //get over time CEO pending count
        const getovertimeCountCEO = async () => {
            const result = await axioslogin.get('/Count/OtReqCEOCount')
            const { success, data } = result.data
            if (success === 1) {
                const { otceocount } = data[0]
                setotCEOCount(otceocount)
            }
        }
        getovertimeCountCEO()
        //get over time User count
        const getovertimeCountUser = async () => {
            const result = await axioslogin.get(`/Count/OtRequest/CountUser/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { otusercount } = data[0]
                setotUserCount(otusercount)
            }
        }
        getovertimeCountUser()
        //get Leave Request incharge pending count
        const getleavereqCountIncharge = async () => {
            const result = await axioslogin.get('/Count/LeaveReqInchargeCount')
            const { success, data } = result.data
            if (success === 1) {
                const { leaveinchargecount } = data[0]
                setleaveInchargeCount(leaveinchargecount)
            }
        }
        getleavereqCountIncharge()
        //get Leave Request HOD pending count
        const getleavereqCountHOD = async () => {
            const result = await axioslogin.get('/Count/LeaveReqHodCount')
            const { success, data } = result.data
            if (success === 1) {
                const { leavehodcount } = data[0]
                setleaveHODCount(leavehodcount)
            }
        }
        getleavereqCountHOD()
        //get Leave Request HOD pending count
        const getleavereqCountCEO = async () => {
            const result = await axioslogin.get('/Count/LeaveReqCeoCount')
            const { success, data } = result.data
            if (success === 1) {
                const { leaveceocount } = data[0]
                setleaveCEOCount(leaveceocount)
            }
        }
        getleavereqCountCEO()

        //get Leave Request HOD pending count
        const getleavereqCountHR = async () => {
            const result = await axioslogin.get('/Count/LeaveReqHrCount')
            const { success, data } = result.data
            if (success === 1) {
                const { leavehrcount } = data[0]
                setleaveHRCount(leavehrcount)
            }
        }
        getleavereqCountHR()
        //get Leave Request User count
        const getLeaveRequestCountUser = async () => {
            const result = await axioslogin.get(`/Count/LeaveReqCount/User/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                const { leaveusercount } = data[0]
                setleaveUserCount(leaveusercount)
            }
        }
        getLeaveRequestCountUser()
        //get Resign Request incharge pending count
        const getresignreqCountIncharge = async () => {
            const result = await axioslogin.get('/Count/ResignReqInchargeCount')
            const { success, data } = result.data
            if (success === 1) {
                const { resigncountincharge } = data[0]
                setResignInchargecount(resigncountincharge)
            }
        }
        getresignreqCountIncharge()
        //get Resign Request HOD pending count
        const getresignreqCountHOD = async () => {
            const result = await axioslogin.get('/Count/ResignReqHodCount')
            const { success, data } = result.data
            if (success === 1) {
                const { resigncounthod } = data[0]
                setResignHODcount(resigncounthod)
            }
        }
        getresignreqCountHOD()
        //get Resign Request CEO pending count
        const getresignreqCountCEO = async () => {
            const result = await axioslogin.get('/Count/ResignReqCeoCount')
            const { success, data } = result.data
            if (success === 1) {
                const { resigncountceo } = data[0]
                setResignCEOcount(resigncountceo)
            }
        }
        getresignreqCountCEO()
        //get Contract Renewal count
        const getContractRenewalCount = async () => {
            const result = await axioslogin.get('/Count/contractrenewalCount')
            const { success, data } = result.data
            if (success === 1) {
                const { Contractendcount } = data[0]
                setcontractRenewal(Contractendcount)
            }
        }
        getContractRenewalCount()
        //get Training/Conformation count
        const getTrainingCount = async () => {
            const result = await axioslogin.get('/Count/trainingconformationCount')
            const { success, data } = result.data
            if (success === 1) {
                const { ProbationEndCount } = data[0]
                settrainingConform(ProbationEndCount)
            }
        }
        getTrainingCount()

    }, [])

    //get module rights
    const modulerights = useSelector((state) => {
        return state.getModuleRightList.modulerightsList
    })
    const constslno = modulerights.filter((val) => {
        return val.menu_slno === 133 || val.menu_slno === 134 || val.menu_slno === 135 ||
            val.menu_slno === 136 || val.menu_slno === 137 || val.menu_slno === 138 || val.menu_slno === 139
            || val.menu_slno === 140 || val.menu_slno === 141 || val.menu_slno === 142 || val.menu_slno === 143 ||
            val.menu_slno === 144 || val.menu_slno === 145 || val.menu_slno === 146 || val.menu_slno === 146 || val.menu_slno === 147
            || val.menu_slno === 148 || val.menu_slno === 149
    })

    return (
        <Fragment>
            <Card sx={{ marginTop: 1 }} >
                <CardContent>
                    <Grid container direction={'row'} justifyContent="space-between" alignItems="center" spacing={1} sx={{ width: '100%', marginX: 0.01 }} >

                        <div style={{ width: '24%', }} >
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        {/* <div style={{ width: '24%', }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div>
                        <div style={{ width: '24%' }}>
                            {
                                constslno.map((val, index) => {
                                    return val.menu_slno === 133 ? <Widjet avatarIcons={leaveCount} widgetName="Leave Request" count={leaveHRCount} key={index} /> : null
                                })}
                        </div> */}


                        {constslno.map((val, index) => {
                            return val.menu_slno === 134 ?
                                <div style={{ width: '24%' }} key={index} >
                                    <Widjet avatarIcons={leaveUSER} widgetName="Leave Request User" count={leaveUserCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 135 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={leaveInch} widgetName="Leave Request Incharge" count={leaveInchargeCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 136 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={leaveHOd} widgetName="Leave Request HOD" count={leaveHODCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 137 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={leaveCeo} widgetName="Leave Request CEO" count={leaveCEOCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 138 ?
                                <div style={{ width: '24%' }} key={index} >
                                    <Widjet avatarIcons={contractRenew} widgetName="Contract Renewal" count={contractRenewal} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 139 ?
                                <div style={{ width: '24%' }} key={index} >
                                    <Widjet avatarIcons={training} widgetName="Training Confirmation" count={trainingConform} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 140 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={contractclose} widgetName="Contract Closed" count={contractcloseCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 141 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={otrequest} widgetName="Overtime Request" count={otCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 142 ?
                                <div style={{ width: '24%' }}>
                                    <Widjet avatarIcons={otuser} widgetName="Overtime Request User" count={otUserCount} key={index} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 143 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={otinch} widgetName="Overtime Request Incharge" count={otCountIncharge} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 144 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={othod} widgetName="Overtime Request HOD" count={otHODCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 145 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={otceo} widgetName="Overtime Request CEO" count={otCEOCount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 146 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={resign} widgetName="Resignation Request" count={resigncount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 147 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={resignInch} widgetName="Resignation Request Incharge" count={resignInchargecount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 148 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={resignHod} widgetName="Resignation Request HOD" count={resignHODcount} />
                                </div>
                                : null
                        })}

                        {constslno.map((val, index) => {
                            return val.menu_slno === 149 ?
                                <div style={{ width: '24%' }} key={index}>
                                    <Widjet avatarIcons={resignCeo} widgetName="Resignation Request CEO" count={resignCEOcount} />
                                </div>
                                : null
                        })}



                    </Grid>
                </CardContent>
            </Card>
        </Fragment >
    )
}

export default DashAlertCmp