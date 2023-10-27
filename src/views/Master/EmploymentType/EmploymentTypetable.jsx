import React, { useCallback, useEffect, useMemo, useState, } from 'react'
import { memo } from 'react';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';
import { useHistory } from 'react-router-dom';
import { Box, CssVarsProvider, Typography, IconButton, } from '@mui/joy';
import { Paper } from '@mui/material';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton as OpenIcon } from '@mui/material';

const EmploymentTypetable = () => {
    const history = useHistory();
    const [empTypeData, setempTypeData] = useState([]);

    useEffect(() => {
        const getEmpTypeData = async () => {
            const result = await axioslogin.get('/empcat');
            const { success, data, message } = result.data;
            if (success === 1) {
                setempTypeData(data);
            } else {
                setempTypeData([]);
                infoNofity(message);
            }
        }
        getEmpTypeData();
    }, []);

    const [columnDef] = useState([
        { headerName: 'Sl No', field: 'category_slno' },
        { headerName: 'Name', field: 'ecat_name', filter: true, width: 250 },
        { headerName: 'Type', field: 'emptype_name', filter: true, width: 250 },
        { headerName: 'Status ', field: 'status', filter: true, width: 250 },
        {
            headerName: 'Action', cellRenderer: params =>
                <OpenIcon sx={{ paddingY: 0.5 }} onClick={() => getDataTable(params)} >
                    <EditIcon color='primary' />
                </OpenIcon>

        },
    ])

    const getDataTable = useCallback((params) => {
        const { category_slno } = params.data;
        history.push(`/Home/EmploymentTypeEdit/${category_slno}`);
    }, [history])

    const tablelist = useMemo(() => empTypeData, [empTypeData])

    const tohomeMaster = useCallback(() => {
        history.push('/Home/EmploymentType')
    }, [history])

    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }} >
            <Paper sx={{ flex: 1, }} >
                <Paper square sx={{ display: "flex", height: 30, flexDirection: 'column' }}>
                    <Box sx={{ display: "flex", flex: 1, height: 30, }} >
                        <Paper square sx={{ display: "flex", flex: 1, height: 30, alignItems: 'center', justifyContent: "space-between" }} >
                            <Box sx={{ display: "flex" }}>
                                <DragIndicatorOutlinedIcon />
                                <CssVarsProvider>
                                    <Typography textColor="neutral.400" sx={{ display: 'flex', }} >
                                        Employee Type List
                                    </Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box sx={{ display: "flex", pr: 1 }}>
                                <CssVarsProvider>
                                    <IconButton
                                        variant="outlined"
                                        size='xs'
                                        color="danger"
                                        onClick={tohomeMaster}
                                        sx={{ color: '#ef5350' }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </CssVarsProvider>
                            </Box>
                        </Paper>
                    </Box>
                </Paper>
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, flexDirection: 'column' }} >
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tablelist}
                        sx={{
                            height: 400,
                            width: "100%"
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Box>
            </Paper>
        </Box>
    )
}

export default memo(EmploymentTypetable)
