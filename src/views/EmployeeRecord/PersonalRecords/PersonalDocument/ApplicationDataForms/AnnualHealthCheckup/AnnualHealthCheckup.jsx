
import { Box, Button, Table, Tooltip, Typography } from '@mui/joy'
import moment from 'moment';
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const AnnualHealthHistory = lazy(() => import('./AnnualHealthHistory'))

const AnnualHealthCheckup = ({ Empdata }) => {
    const Employee = useMemo(() => Empdata, [Empdata]);
    const [UpdateFlag, setUpdateFlag] = useState(0)
    const [DoctorStatus, setDoctorStatus] = useState(0)

    const [HrdNo, setHrdNo] = useState(0)
    const [datesaved, setdatesaved] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [checkupDoc, setCheckUpDoc] = useState([])
    const [checkup, setCheckDoc] = useState([])


    const personaldata = useMemo(() => {
        return {
            em_id: Employee?.em_id,
        }
    }, [Employee])
    const [Recorddata, setRecorddata] = useState({
        Join: false,
        NotJoin: false,
        pending: false
    })

    //for getting the details already entered
    useEffect(() => {
        if (Employee.length !== 0) {
            const getCommonSettings = async () => {
                const result = await axioslogin.post('/AnnualHealthUp/CheckupDataDoc', personaldata)
                const { success, data } = result.data
                if (success === 1 && data.length > 0) {
                    setCheckUpDoc(data)
                }
                else {
                    setDoctorStatus(1)
                    setCheckUpDoc([])
                    warningNofity("Details Not Entered By Doctor")
                }
                const resultCheck = await axioslogin.post('/AnnualHealthUp/CheckupData', personaldata)
                const { successCheck, dataCheck } = resultCheck.data
                if (successCheck === 1 && dataCheck.length > 0) {
                    setCheckDoc(dataCheck[0])
                    if (dataCheck[0]?.Hrd_Saved_Emid === 0) {
                        setUpdateFlag(0)

                    } else {
                        setUpdateFlag(1)
                        const { Hrd_join_Status, Hrd_NotJoin_Status, Hrd_Pending_Status, Hrd_Saved_date, Hrd_Saved_Emid } = dataCheck[0]
                        const Recorddata = {
                            Join: Hrd_join_Status === 1 ? true : false,
                            NotJoin: Hrd_NotJoin_Status === 1 ? true : false,
                            pending: Hrd_Pending_Status === 1 ? true : false
                        }
                        setRecorddata(Recorddata)
                        setdatesaved(Hrd_Saved_date)
                        setHrdNo(Hrd_Saved_Emid)
                    }
                }
                else {
                    setCheckDoc([])
                }
            }
            getCommonSettings()
        } else {
            warningNofity("SomeThing Went Wrong")
        }
    }, [Employee, personaldata])


    const { Join, NotJoin, pending } = Recorddata
    const postdata = useMemo(() => {
        return {
            HrdNo: HrdNo,
            Join: Join === true ? 1 : 0,
            NotJoin: NotJoin === true ? 1 : 0,
            pending: pending === true ? 1 : 0,
            em_no: Employee?.em_no,
            em_id: Employee?.em_id,
            datesaved: datesaved
        }
    }, [HrdNo, Join, NotJoin, pending, Employee, datesaved])
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (HrdNo === 0) {
            warningNofity("Please enter all the data")
        }
        else {
            const result = await axioslogin.post('/AnnualHealthUp/AnnualHealthHrd', postdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Data Inserted SuccessFully")
            }
            else {
                warningNofity("Data Not Inserted")
            }
        }
    }, [postdata, HrdNo])
    return (
        <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name Of The Employee</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.em_name?.toLowerCase() === '' ? "Not Updated" : Employee?.em_name?.toLowerCase()} </Typography>
                        </td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_age_year === '' ? "Not Updated" : Employee?.em_age_year} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Gender</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_gender === 1 ? "Male" : Employee?.em_gender === 2 ? "FeMale" : Employee?.em_gender === 3 ? "Other" : null} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Blood Group</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.group_name === '' ? "Not Updated" : Employee?.group_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Designation</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.desg_name?.toLowerCase() === '' ? "Not Updated" : Employee?.desg_name?.toLowerCase()} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Emp Id</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_no === '' ? "Not Updated" : Employee?.em_no} </Typography>
                        </td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>Department</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Employee?.dept_name?.toLowerCase() === '' ? "Not Updated" : Employee?.dept_name?.toLowerCase()} </Typography>
                        </td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Employee?.em_doj === '' ? "Not Updated" : Employee?.em_doj} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Box sx={{ ml: 1, mt: 1 }}>
                <Typography level="title-md">. Read the following carefully</Typography>
                <Typography level="title-md">. Tick appropriately</Typography>
                <Typography level="title-md">. Mention the required information as accordingly</Typography>
            </Box>
            <AnnualHealthHistory Employee={Employee} setHrdNo={setHrdNo} setdatesaved={setdatesaved} datesaved={datesaved}
                HrdNo={HrdNo} Recorddata={Recorddata} setRecorddata={setRecorddata} checkupDoc={checkupDoc} checkup={checkup} />
            {DoctorStatus === 1 ?
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="Save">
                        <Button
                            variant="outlined"
                            component="label"
                            size="sm"
                            color="primary"
                            disabled={true}
                        >
                            Submit Application
                        </Button>
                    </Tooltip>
                </Box>

                : <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    {UpdateFlag === 0 ?

                        <Tooltip title="Save">
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                onClick={handleOnClick}
                            >
                                Submit Application
                            </Button>
                        </Tooltip>
                        :
                        <Tooltip title="Update">
                            <Button
                                variant="outlined"
                                component="label"
                                size="sm"
                                color="primary"
                                disabled={true}
                            >
                                Update Application
                            </Button>
                        </Tooltip>
                    }
                </Box>
            }


        </Box>
    )
}

export default memo(AnnualHealthCheckup)