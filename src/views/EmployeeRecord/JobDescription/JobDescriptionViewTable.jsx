import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { Box, Paper, Tooltip } from '@mui/material';
import { CssVarsProvider, Typography } from '@mui/joy';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import { axioslogin } from 'src/views/Axios/Axios';
import PreviewIcon from '@mui/icons-material/Preview';
// import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/joy/IconButton';
import { useHistory } from 'react-router-dom';
import JobDescriptionList from '../EmployeeFile/EmployeeProfile/EmpMenus/JobDescription/JobDescriptionList';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
// import JobDescriptionpdf from './JobDescriptionpdf';
import { setJobSummary } from 'src/redux/actions/JobDescription.Action';
import { useDispatch, useSelector } from 'react-redux';
import { pdfdownlod } from './JobDescrPdf';

const JobDescriptionViewTable = () => {

    const [tableData, setTableData] = useState([])//job description list
    const history = useHistory()
    const [flag, setflag] = useState(0)// flag for job description view
    const [downloads, setDownload] = useState(0)//setting state for download
    const [id, setId] = useState(0)//setting job from job id
    const dispatch = useDispatch();

    //job description view
    const getProfile = (params) => {
        setflag(1)
        const data = params.api.getSelectedRows()
        const { summary_slno } = data[0]
        setId(summary_slno)
    }

    const [columnDef] = useState([
        { headerName: 'SlNo', field: 'no', minWidth: 10, },
        { headerName: 'Department ', field: 'dpname', filter: true },
        { headerName: 'Department Section', field: 'dpsname', filter: true },
        { headerName: 'Designation', field: 'dsname', filter: true },
        {
            headerName: 'Preview', minWidth: 100, wrapText: true,
            cellRenderer: params => <Fragment>
                <Tooltip title="Job Description View" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => getProfile(params)}>
                        <PreviewIcon color='primary' />
                    </IconButton>
                </Tooltip >
                <Tooltip title="Download as PDF" followCursor placement='top' arrow >
                    <IconButton sx={{ pb: 1 }} onClick={() => download(params)}>
                        <DownloadForOfflineIcon color='primary' />
                    </IconButton>
                </Tooltip >
            </Fragment>
        },
    ])

    useEffect(() => {
        const JobView = async () => {
            const result = await axioslogin.get('/jobsummary/jobview')
            const { success, data, message } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 2) {
                warningNofity(message)
            }
            else {
                setTableData([])
            }
        }
        JobView()
    }, [])

    const toSettings = () => {
        history.push('/Home/JobDescription')
    }

    const download = async (params) => {
        const data = params.api.getSelectedRows()
        const { summary_slno } = data[0]
        setId(summary_slno)
        // try {
        //     console.log("fsgjfhnd");
        //     console.log(summary_slno);
        //     dispatch(setJobSummary(summary_slno))
        // }
        // catch (exceptionVar) {
        //     // console.log("err");
        //     setDownload(0)
        // }
        // finally {
        //     //console.log("finally");

        //     setDownload(1)
        // }


        dispatch(setJobSummary(summary_slno)).then(() => {
            setDownload(1)
        })
        //history.push(`/Home/JobDescrPdf`)
        setDownload(0)
    }

    const [summary, setSummary] = useState({
        objective: '',
        scope: '',
        branch_name: '',
        working_hour: '',
        reporting_dept: '',
        equipment_used: '',
        desig: '',
        dept: '',
        sect: '',
        date: '',
        revisiondate: '',
        docno: 0
    })
    const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept, sect, date, revisiondate, docno } = summary

    const [generic, setGeneric] = useState({
        experience_year: '',
        age_from: 0,
        age_to: 0,
        is_female: '',
        is_male: ''
    })
    const { experience_year, is_female, is_male, age_from, age_to } = generic

    const newState = useSelector((state) => {
        return {
            jobDuties: state.getJobSummary.jobDuties.jobDutiesList,
            jobCompetency: state.getJobSummary.jobCompetency.jobCompetencyList,
            jobGeneric: state.getJobSummary.jobGeneric.jobGenericList,
            jobPerformance: state.getJobSummary.jobPerformance.jobPerformanceList,
            jobQualification: state.getJobSummary.jobQualification.jobQualificationList,
            jobSummary: state.getJobSummary.jobSummary.jobSummaryList
        }
    })

    const { jobDuties, jobCompetency, jobGeneric, jobPerformance, jobQualification, jobSummary } = newState;

    const jsummary = useMemo(() => jobSummary, [jobSummary])
    const jDuty = useMemo(() => jobDuties, [jobDuties])
    const jCompetency = useMemo(() => jobCompetency, [jobCompetency])
    const jPerformance = useMemo(() => jobPerformance, [jobPerformance])
    const jGeneric = useMemo(() => jobGeneric, [jobGeneric])
    const jQualify = useMemo(() => jobQualification, [jobQualification])

    //de structuring job summary 
    useEffect(() => {
        if (Object.keys(jsummary).length > 0) {
            const { objective, scope, branch_name, working_hour, reporting_dept, equipment_used, desig, dept, sect, Docno, date, edit_date } = jsummary[0];
            const summary = {
                objective: objective === '' ? 'Not Updated' : objective,
                scope: scope === null ? 'Not Updated' : scope,
                branch_name: branch_name === null ? 'Not Updated' : branch_name,
                working_hour: working_hour === null ? 'Not Updated' : working_hour.slice(1, -1),
                reporting_dept: reporting_dept === null ? 'Not updated' : reporting_dept,
                equipment_used: equipment_used === null ? 'Not updated' : equipment_used,
                desig: desig === null ? 'Not Updated' : desig,
                dept: dept === null ? 'Not Updated' : dept,
                sect: sect === null ? 'Not Updated' : sect,
                date: date == null ? 'NIL' : date,
                revisiondate: edit_date === null ? 'NIL' : edit_date,
                docno: Docno === null ? 'NIL' : Docno
            }
            setSummary(summary)
            //setDocno(docno)
        }
        // return () => {
        //     setSummary()
        // }
    }, [jsummary])

    useEffect(() => {
        if (Object.keys(jGeneric).length > 0) {
            const { experience_year, is_female, is_male, age_from, age_to } = jGeneric[0]
            const generic = {
                experience_year: experience_year === '' ? 'Not Updated' : experience_year,
                is_female: is_female === 0 ? 0 : 'Female',
                is_male: is_male === 0 ? 0 : 'Male',
                age_from: age_from === 0 ? 0 : age_from,
                age_to: age_to === 0 ? 0 : age_to,
            }
            setGeneric(generic)
        }
        // return () => {
        //     setGeneric()
        // }
    }, [jGeneric])

    useEffect(() => {
        if (downloads === 1) {
            // try {
            //     pdfdownlod(objective, desig, scope, branch_name,
            //         working_hour, reporting_dept, equipment_used,
            //         dept, sect, date, revisiondate, docno, jDuty,
            //         jPerformance, jCompetency, jQualify,
            //         experience_year, is_female, is_male, age_from, age_to)
            // } catch (exceptionVar) {
            //     console.log("err");
            //     setDownload(0)
            // } finally {
            //     console.log("finally");

            //     setDownload(0)
            // }

            pdfdownlod(objective, desig, scope, branch_name,
                working_hour, reporting_dept, equipment_used,
                dept, sect, date, revisiondate, docno, jDuty,
                jPerformance, jCompetency, jQualify,
                experience_year, is_female, is_male, age_from, age_to)
        }
    }, [downloads, objective, desig, scope, branch_name,
        working_hour, reporting_dept, equipment_used, dept,
        sect, date, revisiondate, docno, jDuty, jPerformance, jCompetency, jQualify,
        experience_year, is_female, is_male, age_from, age_to])

    useEffect(() => {
        return () => {
            dispatch(setJobSummary())
        }
    }, [dispatch])

    return (
        <Box sx={{ display: "flex", flexGrow: 1, width: "100%" }} >
            <Paper sx={{ display: 'flex', flex: 1, height: window.innerHeight - 85, flexDirection: 'column', }}>
                <Box sx={{ width: "100%", overflow: 'auto', '::-webkit-scrollbar': { display: "none" } }}>

                    {
                        flag === 1 ? <JobDescriptionList setflag={setflag} flag={flag} id={id} /> :
                            <>
                                <Paper square elevation={1} sx={{ display: "flex", alignItems: "center", }}  >
                                    <Box sx={{ flex: 1 }} >
                                        <CssVarsProvider>
                                            <Typography startDecorator={<DragIndicatorOutlinedIcon />} textColor="neutral.400" sx={{ display: 'flex', }} >
                                                Job Description List
                                            </Typography>
                                        </CssVarsProvider>
                                    </Box>
                                    <Box sx={{ pl: 0.5, mt: 0.5 }}>
                                        <CssVarsProvider>
                                            <IconButton variant="outlined" size='xs' color="danger" onClick={toSettings}>
                                                <CloseIcon />
                                            </IconButton>
                                        </CssVarsProvider>
                                    </Box>
                                </Paper>
                                <Paper square elevation={0} sx={{ p: 1, mt: 0.5, display: 'flex', flexDirection: "column" }} >
                                    <CommonAgGrid
                                        columnDefs={columnDef}
                                        tableData={tableData}
                                        sx={{
                                            height: 600,
                                            width: "100%"
                                        }}
                                        rowHeight={30}
                                        headerHeight={30}
                                    />
                                </Paper>
                            </>
                    }
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(JobDescriptionViewTable) 