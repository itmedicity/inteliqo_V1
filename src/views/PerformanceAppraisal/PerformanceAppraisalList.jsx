import { Box, IconButton, Paper, Typography } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { FcPlus } from 'react-icons/fc'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import TextInput from '../Component/TextInput'
import PerformanceAppraisalTable from './PerformanceAppraisalTable'
import { useHistory } from 'react-router-dom'
import { axioslogin } from '../Axios/Axios'
import CustomCheckBox from '../Component/CustomCheckBox'
import { CheckBox } from '@material-ui/icons'

const PerformanceAppraisalList = () => {

    const history = useHistory()

    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        date_of_join_start: '',
        date_of_join_end: ''
    })
    const { date_of_join_start, date_of_join_end } = formData
    const updateDateOfJoin = async (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({ ...formData, [e.target.name]: value })
    }
    const postData = {
        startdate: date_of_join_start,
        enddate: date_of_join_end
    }

    useEffect(() => {
        const appraisalEmployee = async () => {
            const result = await axioslogin.get('/performanceGrade/appraisalemp')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        appraisalEmployee()
    }, [])


    const [columnDefMain] = useState([
        {
            headerName: '#',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 30,
        },
        { headerName: 'ID', field: 'em_id' },
        { headerName: 'Emp No ', field: 'em_no' },
        { headerName: 'Name ', field: 'em_name' },
        { headerName: 'Dept Name ', field: 'dept_name' },
        { headerName: 'Designation ', field: 'desg_name' },
        { headerName: 'Date of joining ', field: 'em_doj' },
        { headerName: 'Probation End ', field: 'em_prob_end_date' },
        { headerName: 'Contract End ', field: 'em_contract_end_date' },
    ])

    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Performance Appraisal List"
                redirect={RedirectToHome}
            >
                <Paper square elevation={2} sx={{ p: 0.5, }}   >
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}>
                        <Box
                            sx={{
                                width: 200
                            }}>
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_start"
                                value={date_of_join_start}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            /></Box>
                        <Box
                            sx={{
                                pl: 1,
                                width: 200
                            }}>
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date of Join"
                                name="date_of_join_end"
                                value={date_of_join_end}
                                changeTextValue={(e) => updateDateOfJoin(e)}
                            />
                        </Box>
                        <Box
                            sx={{
                                pl: 5,
                                pt: 0.5,
                                display: 'flex',
                                flexDirection: 'row-reverse'

                                // width: 200
                            }}>
                            <Typography>
                                {"Contract"}
                            </Typography>
                            <CheckBox></CheckBox>
                        </Box>

                        <Box
                            sx={{
                                pl: 120,
                            }}
                        >
                            <IconButton
                                aria-label="add"
                                style={{ padding: '0rem' }}
                            //onClick={getprobationlistbydate}
                            >
                                <FcPlus className="text-info" size={30} />
                            </IconButton>
                        </Box>
                    </Box>
                </Paper>
                <Box sx={{
                    pt: 1
                }}>
                    <PerformanceAppraisalTable columnDefs={columnDefMain} rowData={tableData} />
                </Box>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default PerformanceAppraisalList