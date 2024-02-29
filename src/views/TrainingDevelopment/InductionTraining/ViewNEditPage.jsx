import React, { Fragment, memo, useCallback, useState } from 'react'
import { Typography, Box, Button, Modal, ModalDialog } from '@mui/joy';
import ModalClose from '@mui/joy/ModalClose';
import { Paper } from '@material-ui/core';
import JoyTrainingTypeSelect from 'src/views/MuiComponents/JoyComponent/JoyTrainingTypeSelect'
import { IconButton, Tooltip } from '@mui/material';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { axioslogin } from 'src/views/Axios/Axios';
import { warningNofity } from 'src/views/CommonCode/Commonfunc';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import CommonAgGrid from 'src/views/Component/CommonAgGrid';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditTable from './EditTable';

const ViewNEditPage = ({ setviewModal, viewModal }) => {

    const [type, setType] = useState(0)
    const [viewData, SetviewData] = useState([])
    const [editbtn, seteditbtn] = useState(false)
    const [getdata, SetGetdata] = useState([])
    const [count, setcount] = useState(0)

    const Handleclose = useCallback((e) => {
        setviewModal(false)
        setType(0)
    }, [setType, setviewModal])

    const SearchTrainings = useCallback(async () => {
        if (type !== 0) {
            const result = await axioslogin.post(`/InductionTraining/gettrainings/${type}`)
            const { success, data } = result.data;
            if (success === 2) {
                const viewData = data?.map((val) => {
                    const obj = {
                        schedule_slno: val.schedule_slno,
                        induction_date: val.induction_date,
                        date: moment(val.induction_date).format("YYYY-MM-DD"),
                        schedule_topic: val.schedule_topic,
                        schedule_type: val.schedule_type,
                        topic_slno: val.topic_slno,
                        trainers: val.trainers,
                        trainers_name: val.trainers_name,
                        training_topic_name: val.training_topic_name,
                        trainingtype_slno: val.trainingtype_slno,
                        type_name: val.type_name
                    }
                    return obj;
                })
                SetviewData(viewData);
                setcount(count + 1)
            } else {
                SetviewData([]);
            }
        }
        else {
            warningNofity("Please select any Training Type to show")
        }
    }, [SetviewData, count, type])

    const getRows = useCallback((params) => {
        const data = params.api.getSelectedRows()
        SetGetdata(data)
        seteditbtn(true)
    }, [seteditbtn, SetGetdata])

    const [columnDef] = useState([
        { headerName: 'Sl.No ', field: 'schedule_slno', filter: true, minWidth: 90 },
        { headerName: 'Training Topics', field: 'training_topic_name', filter: true, minWidth: 200 },
        { headerName: 'Schedule Date ', field: 'date', filter: true, minWidth: 100 },
        {
            headerName: 'Edit', minWidth: 150, cellRenderer: params =>
                < Fragment >
                    <IconButton sx={{ paddingY: 0.5 }}
                        onClick={() => getRows(params)}
                    >
                        <EditIcon color='primary' />
                    </IconButton>
                </Fragment >
        }
    ])
    return (
        <Fragment>
            {
                editbtn === true ? <EditTable setviewModal={setviewModal} count={count} setcount={setcount} editbtn={editbtn} seteditbtn={seteditbtn} getdata={getdata} />
                    :
                    <Modal
                        aria-labelledby="modal-title"
                        aria-describedby="modal-desc"
                        open={viewModal}
                        onClose={Handleclose}
                        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                    >
                        <ModalDialog size="lg">
                            <ModalClose
                                variant="outlined"
                                sx={{
                                    top: 'calc(-1/4 * var(--IconButton-size))',
                                    right: 'calc(-1/4 * var(--IconButton-size))',
                                    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                                    borderRadius: '100%',
                                    bgcolor: 'background.body',
                                }}
                            />
                            <Typography
                                fontSize="xl2"
                                lineHeight={1}
                                startDecorator={
                                    <ModeEditIcon sx={{ color: 'green' }} />
                                }
                                sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                            >
                                View & Reschedule
                            </Typography>
                            {/* body starts */}
                            <Paper variant='outlined'>
                                <Box sx={{ p: 1, width: 1000, }}>
                                    <Box sx={{ display: 'flex', flexDirection: "row", width: "100%", gap: 2 }}>
                                        <Box sx={{ p: 0.2, flex: 1 }} >
                                            <JoyTrainingTypeSelect type={type} setType={setType} />
                                        </Box>

                                        <Tooltip title="Search Trainings">
                                            <Button variant='outlined'>
                                                <FindReplaceIcon
                                                    onClick={SearchTrainings}
                                                />
                                            </Button>
                                        </Tooltip>
                                    </Box>

                                    <Box sx={{ width: "100%", p: 0.5, mt: 1 }}>
                                        <CommonAgGrid
                                            columnDefs={columnDef}
                                            tableData={viewData}
                                            sx={{
                                                height: 500
                                            }}
                                            rowHeight={30}
                                            headerHeight={30}
                                        />

                                    </Box>

                                </Box>
                            </Paper>
                        </ModalDialog>
                    </Modal>
            }
        </Fragment >
    )
}

export default memo(ViewNEditPage)

