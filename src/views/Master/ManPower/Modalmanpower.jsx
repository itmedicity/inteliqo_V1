import { Box, Button, Typography } from '@mui/joy'
import { Modal } from '@mui/material'
import React, { useState, useCallback, memo } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import DesignationSelectRedux from 'src/views/MuiComponents/DesignationSelectRedux'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'

const Modalmanpower = ({ isModalOpen, setIsModalOpen, setmincount, setmaxcount, mincount, maxcount, setnewdesig, dept, section, salaryto, salaryfrom }) => {
    const [designation, setdesignation] = useState(0);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
    }, [setIsModalOpen])

    const handleOnClick = useCallback(
        async (event) => {
            event.preventDefault()
            if (designation === 0) {
                infoNofity('Enter the Designation')
            } else {
                const postdata = {
                    designation: designation
                }
                const response = await axioslogin.post('/Manpower/getdesig', postdata)
                const { message, success, data } = response.data
                if (success === 1) {
                    const designame = data[0]?.desg_name
                    const grade_desc = data[0]?.grade_desc
                    succesNofity(message)
                    handleCloseModal()
                    setdesignation(0)
                    const obj = {
                        grade_desg: grade_desc,
                        MaxCount: maxcount,
                        MinCount: mincount,
                        desg_name: designame,
                        salaryto: 0,
                        salaryfrom: 0,
                        status: 0,
                        dept_id: dept,
                        sect_id: section,
                        em_designation_number: designation
                    }
                    setnewdesig(obj)

                } else {
                    infoNofity(message)

                }
            }
        },
        [designation, maxcount, mincount, handleCloseModal, section, dept, setnewdesig],
    )
    return (
        <Box>
            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 600,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 1,
                        borderRadius: 10,
                    }}
                >
                    <Box sx={{ p: 2, border: 1, borderColor: "#6B728E" }}>
                        <CustmTypog title={'Add New designation'} />
                        <Box sx={{ mt: 2, display: "flex" }}>
                            <Box sx={{ width: "50%" }}>
                                <Typography>Designation :</Typography>
                            </Box>
                            <Box sx={{ width: "50%" }}>
                                <DesignationSelectRedux value={designation}
                                    setValue={setdesignation} />
                            </Box>

                        </Box>

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            <Button sx={{ p: 0, width: "10%", }} size='sm' variant="outlined" color="success" onClick={handleOnClick} >
                                Save
                            </Button>
                            <Button sx={{ p: 0, width: "10%" }} size='sm' variant="outlined" color="primary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Box>
                    </Box>


                </Box>

            </Modal>

        </Box>
    )
}

export default memo(Modalmanpower)