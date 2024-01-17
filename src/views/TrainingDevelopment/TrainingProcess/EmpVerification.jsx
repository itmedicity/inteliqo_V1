import { Modal, ModalClose, ModalDialog, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { memo, useCallback, useEffect, useState } from 'react'
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import { Tooltip } from '@mui/material'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import DoneIcon from '@mui/icons-material/Done';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { IconButton as OpenIcon } from '@mui/material';
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const EmpVerification = ({ count, Setcount, open, Setopen, allot, getData }) => {

    const [tableData, setTableData] = useState([]);
    const [setData, setsetData] = useState([]);

    useEffect(() => {
        const filterdata = allot?.filter((val) => {
            return getData?.find((item) => item.topic_slno === val.topic_slno);
        })
        setsetData(filterdata);
    }, [getData, allot, setsetData])

    const Handleclose = useCallback((e) => {
        Setopen(false)
    }, [Setopen])

    useEffect(() => {
        const displayData = setData?.map((val) => {
            const object = {
                dept_id: val.dept_id,
                dept_name: val.dept_name,
                em_id: val.em_id,
                em_name: val.em_name,
                emp_dept: val.emp_dept,
                emp_dept_sectn: val.emp_dept_sectn,
                emp_name: val.emp_name,
                schedule_date: val.schedule_date,
                sect_id: val.sect_id,
                sect_name: val.sect_name,
                slno: val.slno,
                topic_slno: val.topic_slno,
                training_topic_name: val.training_topic_name,
                training_status: val.training_status,
                posttest_permission: val.posttest_permission
            }
            return object;
        })
        setTableData(displayData)
    }, [setData, setTableData])

    //mark attendance
    const HandleVerification = useCallback(async (params) => {
        const data = params.api.getSelectedRows()
        const { slno } = data[0]
        const patchdata = {
            slno: slno
        }
        const result = await axioslogin.patch('/TrainingProcess/empverification', patchdata)
        const { success, message } = result.data;
        if (success === 2) {
            Setcount(count + 1)
        }
        else {
            warningNofity(message)
        }
    }, [Setcount, count])

    const [columnDef] = useState([
        { headerName: 'Employee Names', field: 'em_name', filter: true, width: 250 },
        {
            headerName: 'Verify Employee ',
            cellRenderer: params => {
                if (params.data.posttest_permission === 1) {
                    return <OpenIcon
                        sx={{ paddingY: 0.5, cursor: 'none' }}  >
                        <Tooltip title="Verified">
                            <DoneIcon />
                        </Tooltip>
                    </OpenIcon>
                } else {
                    return <OpenIcon onClick={() => HandleVerification(params)}
                        sx={{ paddingY: 0.5 }} >
                        <Tooltip title="Not Verified">
                            <HowToRegIcon color='primary' />
                        </Tooltip>
                    </OpenIcon>
                }
            }
        }
    ])


    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "60%", height: 550 }}>
                <ModalClose
                    variant="outlined"
                    sx={{
                        top: 'calc(-1/4 * var(--IconButton-size))',
                        right: 'calc(-1/4 * var(--IconButton-size))',
                        boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                        borderRadius: '50%',
                        bgcolor: 'background.body'
                    }}
                />
                <Typography
                    fontSize="xl2"
                    lineHeight={1}
                    startDecorator={
                        <PendingActionsIcon sx={{ color: 'green' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 2 }}
                >
                    Employee Verification
                </Typography>
                <Box sx={{ overflow: 'auto', mt: 1 }}>
                    <CommonAgGrid
                        columnDefs={columnDef}
                        tableData={tableData}
                        sx={{
                            height: 400,
                            width: "100%", mt: 1
                        }}
                        rowHeight={30}
                        headerHeight={30}
                    />
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(EmpVerification)

