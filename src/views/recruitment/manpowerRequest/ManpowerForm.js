import { Box, Button, Tooltip, Typography } from '@mui/joy'
import React, { useState, memo, useEffect, lazy, useCallback, useMemo } from 'react'
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox';
import { axioslogin } from 'src/views/Axios/Axios'
import { setEmployee } from 'src/redux/actions/Employee.Action';
import JoyEmployee from 'src/views/MuiComponents/JoyComponent/JoyEmployee';
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import _ from 'underscore'
import { useSelector } from 'react-redux'
import SaveIcon from '@mui/icons-material/Save';
import moment from 'moment'

const Manpowerexp = lazy(() => import('./Manpowerexp'))
const ManpowerplaningView = lazy(() => import('./ManpowerplaningView'))
const JobAndSkillDescription = lazy(() => import('./JobAndSkillDescription/JobAndSkillDescription'))

const ManpowerForm = () => {
    const [desg, changeDesg] = useState(0);
    // const [dept, changeDept] = useState(0);
    const [data, setdata] = useState(0);
    const [count, setcount] = useState(0);
    const [mincount, setmincount] = useState(0);
    const [date, setdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [requiredNo, setrequiredNo] = useState(0);
    const [expfrom, setexpfrom] = useState(0);
    const [expto, setexpto] = useState(0);
    const [value, setValue] = useState([])
    const [exp, setexp] = useState('')
    const [other_essen, setother_essen] = useState('')
    const [training, settraining] = useState('')
    const [tableData, setTableData] = useState([])
    const [statusData, setstatusData] = useState([])
    const [Permanent_status, setPermanent_status] = useState(false);
    const [Replacement_status, SetReplacement_status] = useState(false);
    const [Contract_status, setContract_status] = useState(false);
    const [Apprenticeship_status, setApprenticeship_status] = useState(false);
    const [Trainee_status, setTrainee_status] = useState(false);
    const [Fresher_status, setFresher_status] = useState(false);
    const [TraineeExp_status, setTraineeExp_status] = useState(false);
    const [ApprenticeshipExp_status, setApprenticeshipExp_status] = useState(false);
    const [Experience_status, setExperience_status] = useState(false);
    const [New_Position_status, setNew_Position_status] = useState(false);
    const [Addition_status, setAddition_status] = useState(false);
    const [selectEmpno, setSelectEmpno] = useState(0)
    const dispatch = useDispatch();
    const [salaryfrom, setsalaryfrom] = useState(0);
    const [salaryto, setsalaryto] = useState(0);

    //get the employee details for taking the HOd and Incharge Details
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department, dept_name, em_dept_section } = employeeProfileDetl;

    const postData1 = useMemo(() => {
        return {
            dept_id: em_department,
            sect_id: em_dept_section
        }
    }, [em_department, em_dept_section])
    // for manpower planning details
    useEffect(() => {
        dispatch(setDepartment());
        if (em_department !== 0) {
            dispatch(setEmployee(em_department));
            const fetchData = async () => {
                const result = await axioslogin.post('/Manpower/getdesgdet', postData1)
                const { success, data } = result.data

                if (success === 1) {
                    setTableData(data)
                } else {
                    setTableData([])
                    warningNofity("ManPower planning not done")
                }
            }
            fetchData()
        }
    }, [dispatch, em_department, postData1])

    const postData = useMemo(() => {
        return {
            dept_id: em_department,
            desg_id: desg
        }
    }, [em_department, desg])
    // for getting salary scale and count
    useEffect(() => {
        if (em_department !== 0 && desg !== 0) {
            const fetchData = async () => {
                const result = await axioslogin.post('/Manpower/get/all', postData)
                const { success, data } = result.data
                if (success === 1) {
                    const { maxcount, salaryfrom, salaryto, mincount } = data[0]
                    setmincount(mincount)
                    setsalaryfrom(salaryfrom)
                    setsalaryto(salaryto)
                    setdata(maxcount)
                    setrequiredNo(0);
                } else {
                    setdata(0)
                    warningNofity("ManPower planning not done for this designation")
                }
            }
            fetchData()
        }
    }, [em_department, desg, postData])

    // for checkbox
    const handleCheckBoxChange = useCallback((name) => {
        if (name === 'Permanent_status') {
            setPermanent_status(true);
            setContract_status(false);
            setApprenticeship_status(false);
            setTrainee_status(false);

        } else if (name === 'Contract_status') {
            setPermanent_status(false);
            setContract_status(true);
            setApprenticeship_status(false);
            setTrainee_status(false);


        } else if (name === 'Apprenticeship_status') {
            setPermanent_status(false);
            setContract_status(false);
            setApprenticeship_status(true);
            setTrainee_status(false);


        } else if (name === 'Trainee_status') {
            setPermanent_status(false);
            setContract_status(false);
            setApprenticeship_status(false);
            setTrainee_status(true);

        }
    }, [setPermanent_status, setContract_status, setApprenticeship_status, setTrainee_status]);
    // replacement check box
    const handleCheckBox = useCallback((name) => {
        if (name === 'New_Position_status') {
            setNew_Position_status(true)
            setAddition_status(false)
            SetReplacement_status(false)
        } else if (name === 'Addition_status') {
            SetReplacement_status(false)
            setNew_Position_status(false)
            setAddition_status(true)

        } else if (name === 'Replacement_status') {
            SetReplacement_status(true)
            setNew_Position_status(false)
            setAddition_status(false)

        }
    }, [setNew_Position_status, setAddition_status, SetReplacement_status]);
    const handleCountChange = useCallback((e) => {
        const newValue = parseInt(e);
        if (data - mincount < newValue) {
            warningNofity("Required Number is exceed")
        } else {
            setrequiredNo(newValue);
        }
    }, [setrequiredNo, data, mincount]);

    // data save
    const insertData = useMemo(() => {
        return {
            dept_id: em_department,
            desg_id: desg,
            Permanent_status: Permanent_status === true ? 1 : 0,
            Contract_status: Contract_status === true ? 1 : 0,
            Apprenticeship_status: Apprenticeship_status === true ? 1 : 0,
            Trainee_status: Trainee_status === true ? 1 : 0,
            requiredNo: requiredNo,
            date: date,
            New_Position_status: New_Position_status === true ? 1 : 0,
            Addition_status: Addition_status === true ? 1 : 0,
            Replacement_status: Replacement_status === true ? 1 : 0,
            Fresher_status: Fresher_status === true ? 1 : 0,
            TraineeExp_status: TraineeExp_status === true ? 1 : 0,
            ApprenticeshipExp_status: ApprenticeshipExp_status === true ? 1 : 0,
            Experience_status: Experience_status === true ? 1 : 0,
            selectEmpno: selectEmpno,
            salaryto: salaryto,
            salaryfrom: salaryfrom,
            value: value,
            expfrom: expfrom,
            expto: expto,
            other_essen: other_essen,
            training: training,
        }
    }, [em_department, desg, Permanent_status, salaryto, Experience_status, TraineeExp_status, Fresher_status, ApprenticeshipExp_status, Contract_status, selectEmpno, salaryfrom, value, expto, expfrom, other_essen, training, Apprenticeship_status, Trainee_status, requiredNo, date, New_Position_status, Addition_status, Replacement_status])

    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        if (desg === 0) {
            infoNofity('Enter the Designation')
        } else {
            const result = await axioslogin.post('/Manpower/insertDataManpower', insertData)
            const { success, message } = result.data
            if (success === 1) {

                succesNofity(message)
                changeDesg(0)
                setPermanent_status(false)
                SetReplacement_status(false)
                setNew_Position_status(false)
                setAddition_status(false)
                setContract_status(false)
                setApprenticeship_status(false)
                setTrainee_status(false)
                setTraineeExp_status(false)
                setFresher_status(false)
                setApprenticeshipExp_status(false)
                setExperience_status(false)
                setexpto(0)
                setexpfrom(0)
                setdata(0)
                setdate(0)
                setValue([])
                setrequiredNo(0)
                setSelectEmpno(0)
                setother_essen('')
                settraining('')
                setexp('')
                setsalaryfrom(0)
                setsalaryto(0)
                setcount(count + 1)
            } else {
                warningNofity(message)
            }
        }
    }, [desg, insertData, count])

    // for getting the approve and reject table detials
    const postapprove = useMemo(() => {
        return {
            dept_id: em_department,
        }
    }, [em_department])
    useEffect(() => {
        dispatch(setDepartment());
        if (em_department !== 0) {
            dispatch(setEmployee(em_department));
            const fetchData = async () => {
                const result = await axioslogin.post('/Manpower/getapprovedata', postapprove)
                const { success, data } = result.data
                if (success === 1) {
                    setstatusData(data)
                    setcount(0)
                } else {
                    setstatusData([])
                    warningNofity("ManPower planning not done")
                }
            }
            fetchData()
        }
    }, [dispatch, em_department, count, postapprove])
    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', p: 1, overflow: "auto", }}>
            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: "30%", mt: 0.8, px: 0.2, }}>
                    <JoyInput
                        type="text"
                        disabled
                        value={dept_name === null ? "no department" : dept_name}
                        // onchange={(newValue) => handleCountChange(newValue, "MaxCount", val)}
                        size="sm"
                    />
                    {/* <JoyDepartment getDept={changeDept} deptValue={dept} /> */}
                </Box>
                <Box sx={{ width: "30%", mt: 0.8, px: 0.2, ml: .5 }}>
                    <JoyDesignationSelect getDesg={changeDesg} desgValue={desg} />
                </Box>
                <Box sx={{ display: 'flex', ml: 2, gap: 2, pt: 1, }}>
                    <Box sx={{ pt: 1, }}>
                        <JoyCheckbox
                            label='Permanent'
                            name="Permanent_status"
                            checked={Permanent_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />
                    </Box>
                    <Box sx={{ pt: 1, }}>
                        <JoyCheckbox
                            label='Contract'
                            name="Contract_status"
                            checked={Contract_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />

                    </Box>
                    <Box sx={{ pt: 1, }}>
                        <JoyCheckbox
                            label='Apprenticeship'
                            name="Apprenticeship_status"
                            checked={Apprenticeship_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />

                    </Box>
                    <Box sx={{ pt: 1, }}>
                        <JoyCheckbox
                            label='Trainee'
                            name="Trainee_status"
                            checked={Trainee_status}
                            onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                        />

                    </Box>
                </Box>
            </Box>


            <Box sx={{ display: 'flex', width: "100%", gap: 1, mt: 0.8, px: 0.2, }}>

                <Box sx={{ pt: .5, mt: .5 }}><Typography>Required No:</Typography></Box>
                <Box sx={{ width: '10%' }}>
                    <JoyInput

                        type="number"
                        value={requiredNo}
                        onchange={handleCountChange}
                        size="sm"
                    />
                </Box>
                <Box sx={{ pt: .5, mt: .5 }}><Typography>Date Wanted:</Typography></Box>
                <Box sx={{ width: '10%' }}>
                    <JoyInput
                        type="date"
                        value={date}
                        onchange={setdate}
                        size="sm"
                    />
                </Box>
                {/* <Box sx={{ pt: .5, mt: .5 }}><Typography>If Replacement:</Typography>

                </Box> */}

                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='New Position'
                        name="New_Position_status"
                        checked={New_Position_status}
                        onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                    />

                </Box>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Addition'
                        name="Addition_status"
                        checked={Addition_status}
                        onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                    />

                </Box>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Replacement'
                        name="Replacement_status"
                        checked={Replacement_status}
                        onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                    />

                </Box>

                {Replacement_status === true ? <Box sx={{}}>
                    <JoyEmployee selectEmpno={selectEmpno} setSelectEmpno={setSelectEmpno} />
                </Box> : <Box> </Box>}
                <Box sx={{ ml: 2 }}>
                    <Tooltip title="Save">
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={submitmanpower}
                        >
                            <SaveIcon />
                        </Button>
                    </Tooltip>
                </Box>
            </Box>

            <Manpowerexp
                setExperience_status={setExperience_status}
                Experience_status={Experience_status}
                setApprenticeshipExp_status={setApprenticeshipExp_status}
                ApprenticeshipExp_status={ApprenticeshipExp_status}
                setTraineeExp_status={setTraineeExp_status}
                TraineeExp_status={TraineeExp_status}
                setFresher_status={setFresher_status}
                Fresher_status={Fresher_status}
                salaryfrom={salaryfrom}
                salaryto={salaryto}
                value={value}
                setValue={setValue}
                exp={exp}
                training={training}
                settraining={settraining}
                setexp={setexp}
                other_essen={other_essen}
                setother_essen={setother_essen}
                expfrom={expfrom}
                expto={expto}
                setexpto={setexpto}
                setexpfrom={setexpfrom}
            />
            {/* JobAndSkillDescription */}
            <JobAndSkillDescription em_department={em_department} desg={desg} />

            <ManpowerplaningView tableData={tableData} setTableData={setTableData} statusData={statusData} />


        </Box >
    )
}

export default memo(ManpowerForm)