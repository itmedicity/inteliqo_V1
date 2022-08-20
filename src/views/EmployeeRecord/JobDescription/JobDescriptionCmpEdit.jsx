import { Box, Paper } from '@mui/material'
import React, { Fragment, useContext, useEffect, useMemo, useState } from 'react'
import { ToastContainer } from 'react-toastify'
import Typography from '@mui/joy/Typography';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import { CssVarsProvider } from '@mui/joy'
import IconButton from '@mui/joy/IconButton';
import DesignationMast from 'src/views/CommonCode/DesignationMast';
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import JobSummaryEdit from './JobSummaryEdit';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import { infoNofity } from 'src/views/CommonCode/Commonfunc';


const JobDescriptionCmpEdit = () => {

    const [flag, setflag] = useState(0)
    const [tableData, setTableData] = useState([])

    const { selectDesignation, updateDesignation,
        selectedDept, updateSelected, selectDesignationName, selectedDeptName
    } = useContext(PayrolMasterContext)

    const addtojobSummary = async () => {
        if (selectDesignation !== 0 && selectedDept !== 0) {
            setflag(1)

        }
        else {
            setflag(0)
            infoNofity("Choose All Option")
        }
    }


    return (
        <Fragment>
            <ToastContainer />
            <Box sx={{ width: "100%" }} >
                {/* Outer Main Box */}
                <Paper square elevation={2} sx={{ p: 0.5, }}   >
                    {/* Main Heading Section Box */}
                    <Paper square elevation={0} sx={{
                        display: "flex",
                        p: 1,
                        alignItems: "center",
                    }}  >
                        <Box sx={{ flex: 1 }} >
                            <CssVarsProvider>
                                <Typography startDecorator={<DragIndicatorOutlinedIcon color='success' />} level="h6" >
                                    Job Description
                                </Typography>
                            </CssVarsProvider>
                        </Box>


                    </Paper>

                    {/* Depertment Selection Box */}
                    <Paper square elevation={3} sx={{
                        p: 0.5,
                        mt: 0.5,
                        display: 'flex',
                        alignItems: "center",
                        flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                        // backgroundColor: "lightcyan"
                    }} >
                        <Box sx={{ flex: 1, px: 0.5 }} >
                            <DepartmentSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 1, px: 0.5 }}  >
                            <DesignationMast style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} />
                        </Box>
                        <Box sx={{ flex: 0, px: 0.5 }} >
                            <IconButton variant="outlined" size='sm' onClick={addtojobSummary} >
                                <AddToPhotosIcon />
                            </IconButton>
                        </Box>
                    </Paper>

                    {
                        flag === 1 ? <JobSummaryEdit
                            selectDesignation={selectDesignation}
                            selectedDept={selectedDept}
                            selectDesignationName={selectDesignationName}
                            selectedDeptName={selectedDeptName}

                        />
                            : null

                    }

                    {/* Job Summary */}
                </Paper>
            </Box>
        </Fragment >
    )
}

export default JobDescriptionCmpEdit