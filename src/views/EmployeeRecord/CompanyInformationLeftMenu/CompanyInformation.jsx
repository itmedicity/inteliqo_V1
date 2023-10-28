import { Button } from '@mui/joy'
import { Box, IconButton, Tooltip } from '@mui/material'
import React, { memo, useEffect, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { axioslogin } from 'src/views/Axios/Axios'
import NextPlanIcon from '@mui/icons-material/NextPlan';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { useDispatch } from 'react-redux';
import { setDepartment } from 'src/redux/actions/Department.action';

const CompanyPage = React.lazy(() => import('./CompanyInfoPage'))

const CompanyInformation = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])

    const [dept, setDept] = useState(0)
    const [deptSection, setDeptSection] = useState(0)
    const [nameList, setnameList] = useState([])
    const [open, setOpen] = useState(0)
    const [emno, setEmno] = useState(0)
    const [empid, setEmpid] = useState(0)

    const [columnDef] = useState([
        {
            headerName: 'Action', cellRenderer: params =>
                <IconButton onClick={() => toOpenCmpnyPage(params)}
                    sx={{ paddingY: 0.5 }} >
                    <Tooltip title="View">
                        <NextPlanIcon color='primary' />
                    </Tooltip>
                </IconButton>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 90, filter: true },
        { headerName: 'Employee Name', field: 'em_name', filter: true },
        { headerName: 'Department', field: 'dept_name' },
        { headerName: 'Department Section', field: 'sect_name' },

    ])

    const dataDisplay = async () => {
        if (dept !== 0 && deptSection !== 0) {
            const postData = {
                em_department: dept,
                em_dept_section: deptSection
            }
            const result = await axioslogin.post("/plan/create", postData);
            const { success, data } = result.data
            if (success === 1) {
                setnameList(data);
            } else {
                setnameList([]);
            }
        }
    }

    const toOpenCmpnyPage = async (params) => {
        const data = params.api.getSelectedRows()
        const { em_no, em_id } = data[0]
        setEmno(em_no)
        setEmpid(em_id)
        setOpen(1)

    }

    return (
        <CustomLayout title="Company Information" displayClose={true} >
            {
                open === 1 ? <CompanyPage emno={emno} empid={empid} setOpen={setOpen} /> : <Box sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3, }, flexDirection: 'row', width: '100%' }}>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                            <DepartmentDropRedx getDept={setDept} />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }} >
                            <DepartmentSectionRedx getSection={setDeptSection} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.3, mt: 1 }}>
                            <Button aria-label="Like" size='sm' variant="outlined" color="neutral"
                                onClick={dataDisplay}
                                sx={{
                                    color: '#81c784'
                                }}>
                                <PublishedWithChangesIcon />
                            </Button>
                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", pt: 1, width: "100%" }}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={nameList}
                            sx={{
                                height: 600,
                                width: "100%"
                            }}
                            rowHeight={30}
                            headerHeight={30} />
                    </Box>
                </Box>
            }
        </CustomLayout>
    )
}

export default memo(CompanyInformation) 