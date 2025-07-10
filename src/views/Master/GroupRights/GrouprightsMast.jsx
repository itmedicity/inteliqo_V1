import React, { Fragment, memo, Suspense, useCallback, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { infoNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { IconButton } from '@mui/material'
import {
    Paper, Table, TableBody, TableContainer, TableHead
} from '@mui/material'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import GroupSelection from './GroupSelection';
import ModuleSelection from './ModuleSelection';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddTaskRoundedIcon from '@mui/icons-material/AddTaskRounded';

const GrouprightsMast = () => {
    const [tableData, setTableData] = useState([])
    const [groupname, setGroupName] = useState(0)
    const [modulename, setModuleName] = useState(0)

    const postData = useMemo(() => {
        return {
            user_group_slno: groupname,
            module_slno: modulename
        }
    }, [groupname, modulename])

    const submitGroupRightMast = useCallback(async (e) => {
        e.preventDefault();
        if (modulename === 0 || groupname === 0) {
            infoNofity("Select Group Name & Module Name")
        } else {
            const result = await axioslogin.post('/grprights', postData)
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
            } else {
                warningNofity("Menus Not Available")
            }

        }
    }, [postData, groupname, modulename])

    const groupRightUpdateDetl = useCallback(async (val) => {
        const { group_rights_slno, menu_view } = val;
        const postData = {
            group_rights_slno,
            menu_view: menu_view === 0 ? 1 : 0,
            user_group_slno: groupname,
            module_slno: modulename
        }
        const result = await axioslogin.patch('/grprights', postData)
        const { success, message, data } = result.data
        if (success === 1) {
            succesNofity(message)
            setTableData(data)
        } else {

            warningNofity(message)
        }
    }, [groupname, modulename])

    return (
        <Fragment>
            <ToastContainer />
            <MasterLayout title="Group Rights" displayClose={true} >
                <Box sx={{ width: "100%" }} >
                    <Paper variant='outlined' square sx={{ width: '100%', display: 'flex', py: 2, px: 0.5 }} >
                        <Box sx={{ mt: 1, ml: 2, flex: 1 }}>
                            <GroupSelection value={groupname} setValue={setGroupName} />
                        </Box>
                        <Box sx={{ mt: 1, ml: 2, flex: 1 }}>
                            <ModuleSelection value={modulename} setValue={setModuleName} />
                        </Box>
                        <Box sx={{ mt: 1, ml: 2, }}>
                            <CssVarsProvider>
                                <Button aria-label="Like" variant="outlined" color="primary" onClick={submitGroupRightMast} sx={{
                                    color: '#90caf9'
                                }} >
                                    <AddCircleOutlineIcon />
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ mt: 1, ml: 2, flex: 1 }}>

                        </Box>
                    </Paper>
                    <Paper square variant="outlined" sx={{ display: 'flex', p: 0.5, flex: 1 }}>
                        <Box sx={{ width: '100%' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table size="small" stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} > Slno </TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }} >Menu Name</TableCell>
                                            <TableCell size='medium' padding='none' align="center" rowSpan={2} sx={{ fontWeight: 550 }}>Action</TableCell>

                                        </TableRow>
                                    </TableHead>
                                    <Suspense>
                                        <TableBody>
                                            {tableData?.map((val, index) => {
                                                return <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell align="center">{val.group_rights_slno}</TableCell>
                                                    <TableCell align="center">{val.menu_name}</TableCell>
                                                    <TableCell align="center">
                                                        {
                                                            val.menu_view === 0 ? <IconButton aria-label="add"
                                                                onClick={() => groupRightUpdateDetl(val)} >
                                                                <AddTaskRoundedIcon color="disabled" />
                                                            </IconButton> : <IconButton aria-label="add"
                                                                onClick={() => groupRightUpdateDetl(val)} >
                                                                <AddTaskRoundedIcon color="success" />
                                                            </IconButton>
                                                        }



                                                    </TableCell>
                                                </TableRow>
                                            }
                                            )}
                                        </TableBody>
                                    </Suspense>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Paper>
                </Box>
            </MasterLayout>
        </Fragment>
    )
}

export default memo(GrouprightsMast) 
