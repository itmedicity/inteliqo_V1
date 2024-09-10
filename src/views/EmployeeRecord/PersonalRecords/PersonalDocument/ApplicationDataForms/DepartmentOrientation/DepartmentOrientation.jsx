import { Box, Button, Table, Tooltip, Typography } from '@mui/joy'
import moment from 'moment';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';

const DepartmentOrientation = ({ Empdata }) => {
    const [datesaved, setdatesaved] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [date, setdate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [Hod, SetHod] = useState([]);
    const [UpdateFlag, setUpdateFlag] = useState(0)

    const [Orientationdata, setOrientationdata] = useState({
        WorkStation: false,
        DepartmentalPolices: false,
        Duties: false,
        DepartmentalObjective: false,
        PerformanceEvaluation: false,
        QualityManagment: false,
        FireFighting: false,
        GroomingStandards: false,
    })
    const { WorkStation, DepartmentalPolices, Duties, DepartmentalObjective, PerformanceEvaluation, QualityManagment, FireFighting, GroomingStandards } = Orientationdata

    const updateCommonSettings = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setOrientationdata({ ...Orientationdata, [e.target.name]: value })
    }
    const personaldata = useMemo(() => {
        return {
            em_no: Empdata?.em_no,

        }
    }, [Empdata])
    useEffect(() => {
        if (Empdata?.length !== 0) {
            const postdata = {
                dept_sec: Empdata?.em_dept_section,
            };
            const fetchData = async () => {
                const result = await axioslogin.post('/PersonalChecklist/HODincharge', postdata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    SetHod(data[0])
                }

                const orientationresult = await axioslogin.post('/PersonalChecklist/orientationdata', personaldata)
                const { orintsuccess, orientdata } = orientationresult.data
                if (orintsuccess === 1 && orientdata?.length > 0) {
                    setUpdateFlag(1)
                    const { DepartmentalObjective, DepartmentalPolices, Duties, FireFighting, GroomingStandards, PerformanceEvaluation, QualityManagment, WorkStation, emp_date, hod_datesaved
                    } = orientdata[0]
                    const frmdata = {
                        DepartmentalObjective: DepartmentalObjective === 1 ? true : false,
                        DepartmentalPolices: DepartmentalPolices === 1 ? true : false,
                        Duties: Duties === 1 ? true : false,
                        FireFighting: FireFighting === 1 ? true : false,
                        GroomingStandards: GroomingStandards === 1 ? true : false,
                        PerformanceEvaluation: PerformanceEvaluation === 1 ? true : false,
                        QualityManagment: QualityManagment === 1 ? true : false,
                        WorkStation: WorkStation === 1 ? true : false,
                    }
                    setOrientationdata(frmdata)
                    setdatesaved(emp_date)
                    setdate(hod_datesaved)
                }

            }
            fetchData()
        }

    }, [Empdata, personaldata])


    //to save
    const postdata = useMemo(() => {
        return {
            em_id: Empdata?.em_id,
            emno: Empdata?.em_no,
            WorkStation: WorkStation === true ? 1 : 0,
            DepartmentalPolices: DepartmentalPolices === true ? 1 : 0,
            Duties: Duties === true ? 1 : 0,
            DepartmentalObjective: DepartmentalObjective === true ? 1 : 0,
            PerformanceEvaluation: PerformanceEvaluation === true ? 1 : 0,
            QualityManagment: QualityManagment === true ? 1 : 0,
            FireFighting: FireFighting === true ? 1 : 0,
            GroomingStandards: GroomingStandards === true ? 1 : 0,
            datesaved: datesaved,
            date: date
        }
    }, [Empdata, WorkStation, DepartmentalPolices, Duties, DepartmentalObjective, PerformanceEvaluation, datesaved, date, QualityManagment, FireFighting, GroomingStandards])
    const handleOnClick = useCallback(async (event) => {

        const result = await axioslogin.post('/PersonalChecklist/OrientationdataInsert', postdata)
        const { success } = result.data
        if (success === 1) {
            succesNofity("Data Inserted Successfully")
        }
        else {
            warningNofity("Data Not Insert")
        }
    }, [postdata])
    return (
        <Box sx={{ height: window.innerHeight - 200, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
            <Table aria-label="basic table" borderAxis="both" size='sm'>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Department </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.dept_name === '' ? "Not Updated" : Empdata?.dept_name} </Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Em Id </Typography></td>
                        <td><Typography sx={{ ml: 1 }}>{Empdata?.em_no === '' ? "Not Updated" : Empdata?.em_no} </Typography></td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Designation </Typography></td>
                        <td><Typography sx={{ ml: 1 }}> {Empdata?.desg_name === '' ? "Not Updated" : Empdata?.desg_name}</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>Category </Typography></td>
                        <td><Typography sx={{ ml: 1 }}> {Empdata?.ecat_name === '' ? "Not Updated" : Empdata?.ecat_name} </Typography></td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 1 }}>

                <tbody>
                    <tr>
                        <td style={{ textAlign: "center" }}> <Typography level="title-md" sx={{ ml: 1 }}>Orientation Parameters</Typography></td>
                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' >

                <tbody>
                    <tr>
                        <td style={{ width: "10%" }}> <Typography level="title-md" sx={{ ml: 1 }}>1. </Typography></td>
                        <td style={{ width: "80%" }}> <Typography level="title-md" sx={{ ml: 1 }}>Assigning a workstation/place of work</Typography></td>
                        <td style={{ width: "10%", textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="WorkStation"
                                size="sm"
                                checked={WorkStation}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>2 </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Introduction to departmental policies,procedures and hierarchy </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="DepartmentalPolices"
                                size="sm"
                                checked={DepartmentalPolices}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>3</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Duties and responsibilities related to the job position, role clarity </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="Duties"
                                size="sm"
                                checked={Duties}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>4 </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Departmental objectives as a derivative of the organisational goals,Integration of group effort to each the departmental objectives </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="DepartmentalObjective"
                                size="sm"
                                checked={DepartmentalObjective}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>5 </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Performance evaluation and career progression,expectation from the role </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="PerformanceEvaluation"
                                size="sm"
                                checked={PerformanceEvaluation}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>6</Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Quality managment concept,NABH awarness and Continuous Quality improvement (CQI) Measures </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="QualityManagment"
                                size="sm"
                                checked={QualityManagment}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>7 </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Introduction to nearest fire exits and fire fighting equipment </Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="FireFighting"
                                size="sm"
                                checked={FireFighting}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>8 </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>Grooming standards, dress code ,code,code of conduct and ethics related to the role and Position</Typography></td>
                        <td style={{ textAlign: 'center' }}>
                            <JoyCheckbox
                                sx={{}}
                                name="GroomingStandards"
                                size="sm"
                                checked={GroomingStandards}
                                onchange={(e) => updateCommonSettings(e)}

                            />
                        </td>

                    </tr>
                </tbody>
            </Table>
            <Table aria-label="basic table" borderAxis="both" size='sm' sx={{ mt: 2 }}>

                <tbody>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Name of the Staff </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}> Signature</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Date </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name}  </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography></td>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="datesaved"
                                value={datesaved}
                                onchange={setdatesaved}
                            />
                        </td>
                    </tr>

                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Hod Name </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}> Signature</Typography></td>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> Date </Typography></td>
                    </tr>
                    <tr>
                        <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}> {Hod?.em_name === '' ? "Not Updated" : Hod?.em_name} </Typography></td>
                        <td><Typography level="title-md" sx={{ ml: 1 }}> {Hod?.em_name === '' ? "Not Updated" : Hod?.em_name}</Typography></td>
                        <td style={{}}>
                            <JoyInput
                                // placeholder={'other'}
                                type="date"
                                size="sm"
                                name="datesaved"
                                value={date}
                                onchange={setdate}
                            />
                        </td>
                    </tr>

                </tbody>
            </Table>

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
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
        </Box>
    )
}

export default memo(DepartmentOrientation)