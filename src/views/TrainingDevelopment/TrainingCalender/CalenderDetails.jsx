import { Box, Modal, ModalClose, ModalDialog, Sheet, Table, Typography } from '@mui/joy'
import React, { memo, useCallback, useMemo } from 'react'
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeptCountPage from './DeptCountPage';

const CalenderDetails = ({ SetOpen, open, modalData, }) => {

    const Handleclose = useCallback((e) => {
        SetOpen(false)
    }, [SetOpen])

    const datas = useMemo(() => modalData, [modalData])

    return (
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={Handleclose}
            sx={{ display: 'flex' }}
        >
            <ModalDialog size="lg" sx={{ width: "50%" }}>
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
                        <LocalLibraryIcon sx={{ color: 'green' }} />
                    }
                    sx={{ display: 'flex', alignItems: 'flex-start', mr: 2, }}
                >
                    Induction Training
                </Typography>
                <Box>
                    <Sheet sx={{
                        overflow: 'auto',
                        '::-webkit-scrollbar': { display: "none" }, height: 400,
                        width: "100%"
                    }}>
                        <Table borderAxis="bothBetween" stickyHeader >
                            <tbody >
                                <tr>
                                    <th style={{ backgroundColor: "#5A639C", color: "white", width: "10%", textAlign: "center" }}>#</th>
                                    <th style={{ backgroundColor: "#5A639C", color: "white", textAlign: "center" }}>TOPICS</th>
                                    <th style={{ backgroundColor: "#5A639C", color: "white", textAlign: "center" }}>TRAINERS</th>
                                    <th style={{ backgroundColor: "#5A639C", color: "white", textAlign: "center" }}>DEPARTMENTS</th>
                                </tr>


                                {datas?.map((row, indx) => (
                                    <tr key={indx} >
                                        <td style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}><StarOutlineIcon /></td>
                                        <td style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}>{row?.topic}</td>
                                        <td style={{ backgroundColor: "#EEEEEE", textAlign: "center" }}>{row?.trainer_name}</td>
                                        <td style={{ backgroundColor: "#EEEEEE" }}>
                                            <DeptCountPage topic={row?.topic_slno} SelectedDate={row?.induction_date} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Sheet>
                </Box>
            </ModalDialog>
        </Modal >
    )
}

export default memo(CalenderDetails)

