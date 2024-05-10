import React, { Fragment, memo } from 'react'
import { useCallback } from 'react';
import { Typography, Box, Modal, ModalDialog, Sheet, Table } from '@mui/joy';
import moment from 'moment';
import ModalClose from '@mui/joy/ModalClose';
import { Paper } from '@mui/material';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'

const PendingViewModal = ({ joinees, pendingmodal, Setpendingmodal, len }) => {

    const Handleclose = useCallback((e) => {
        Setpendingmodal(false)
    }, [Setpendingmodal])

    return (
        <Fragment>
            <Modal
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
                open={pendingmodal}
                onClose={Handleclose}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="lg"  >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    <Box sx={{ p: 1 }}>
                        <Paper elevation={0} sx={{ p: 1 }}>
                            <Typography
                                fontSize="xl2"
                                lineHeight={1}
                                startDecorator={
                                    <PendingActionsIcon sx={{ color: 'green' }}
                                    />
                                }
                                sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                            >
                                Pending Employee List ({len})
                            </Typography>
                            {joinees?.length !== 0 ?
                                <Sheet sx={{
                                    mt: 3,
                                    overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }, height: 450,
                                    width: "100%"
                                }}>
                                    <Table borderAxis="both" stickyHeader >
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: "center" }}>Joining Date</th>
                                                <th style={{ textAlign: "center" }}>Name</th>
                                                <th style={{ textAlign: "center" }}>Department Section</th>
                                                <th style={{ textAlign: "center" }}>Designation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {joinees?.map((row, index) => (
                                                <tr key={index}>
                                                    <td style={{ textAlign: "center" }}>{moment(row?.joining_date).format("DD-MM-YYYY")}</td>
                                                    <td style={{ textAlign: "center" }}>{row?.em_name}</td>
                                                    <td style={{ textAlign: "center" }}>{row?.sect_name}</td>
                                                    <td style={{ textAlign: "center" }}>{row?.desg_name}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Sheet>
                                : null}
                        </Paper>
                    </Box>
                </ModalDialog>
            </Modal>
        </Fragment >
    )
}

export default memo(PendingViewModal) 
