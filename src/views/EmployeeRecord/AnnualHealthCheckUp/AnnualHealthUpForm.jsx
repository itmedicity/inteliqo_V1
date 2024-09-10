import React, { useState, useCallback, lazy, memo } from 'react'
import { Box, Tooltip, Button, } from '@mui/joy'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import SearchIcon from '@mui/icons-material/Search';

const PreEmployementForm = lazy(() => import('./PreEmployementForm'))

const AnnualHealthUpForm = () => {

    const [empNo, setEmpNo] = useState(0);
    const [tableData, setTableData] = useState([])
    const [flag, setflag] = useState(0)
    const [selectedRowData, setSelectedRowData] = useState({})
    const [Vaccdata, setVaccination] = useState([])

    //  Employee Record List
    const handleOnClickFuntion = useCallback((e) => {

        const submitfunc = async () => {
            if (empNo !== 0) {
                const result = await axioslogin.get(`/empearndeduction/getAll/${empNo}`)
                const { data, success } = result.data;
                if (success === 1 && data?.length > 0) {
                    setTableData(data);
                } else {
                    infoNofity("No employee exist with this employee number!!")
                    setTableData([]);
                }
            }
            else {
                warningNofity("Please Enter the Employee Number")
            }
        }
        submitfunc()
    }, [empNo])


    //to show the annual health check up form
    const handleClick = useCallback(async (params) => {
        setflag(1)
        setSelectedRowData(params.data);

        const postdata = {
            em_no: params.data?.em_no
        };
        //for getting the vaccination data
        const result = await axioslogin.post(`/PersonalChecklist/getAll`, postdata)
        const { success, data } = result.data
        if (success === 1 && data?.length > 0) {

            setVaccination(data[0])
        }
        else {
            setVaccination([])
        }
    }, [setflag])
    const [columnDef] = useState([
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <Box sx={{ color: "#90caf9", cursor: 'pointer', }} size='sm' onClick={() => handleClick(params)}>
                        <AccountCircleOutlinedIcon />
                    </Box>
                </Tooltip>
        },
        { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
        { headerName: 'Employee Name', field: 'emp_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', minWidth: 90 },
        { headerName: 'Department Section', field: 'sect_name', minWidth: 90 },
    ])
    return (
        <Box>
            {
                flag === 1 ? <PreEmployementForm selectedRowData={selectedRowData} Vaccdata={Vaccdata} setflag={setflag} /> :
                    <CustomLayout title="Annual Health CheckUp Form" displayClose={true}>
                        <Box
                            sx={{ display: 'flex', flex: 1, px: 0.6, mt: 0.3, flexDirection: 'column', width: '100%', }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                                    flexDirection: 'row',
                                    width: '100%',
                                }}
                            >
                                <Tooltip title="Employee Number" followCursor placement='top' arrow>
                                    <Box sx={{ flex: 1, px: 0.5, mt: 0.8 }}>
                                        <JoyInput
                                            size="sm"
                                            value={empNo}
                                            onchange={setEmpNo}
                                        />

                                    </Box>
                                </Tooltip>

                                <Box sx={{ flex: 1, px: 0.3, mt: 0.7 }}>
                                    <Button
                                        aria-label="Like"
                                        variant="outlined"
                                        color="neutral"
                                        onClick={handleOnClickFuntion}
                                        sx={{
                                            color: '#81c784',
                                        }}
                                    >
                                        <SearchIcon />
                                    </Button>
                                </Box>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, width: '100%' }}>
                                <CommonAgGrid
                                    columnDefs={columnDef}
                                    tableData={tableData}
                                    sx={{
                                        height: window.innerHeight - 200,
                                        width: '100%',
                                    }}
                                    rowHeight={30}
                                    headerHeight={30}
                                />
                            </Box>
                        </Box>
                    </CustomLayout>
            }

        </Box>
    )
}

export default memo(AnnualHealthUpForm) 