import React, { Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import BrnachMastSelection from 'src/views/CommonCode/BrnachMastSelection'
import DepartmentSelect from 'src/views/CommonCode/DepartmentSelect'
import DepartmentSectionSelect from 'src/views/CommonCode/DepartmentSectionSelect'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { Box, Paper, IconButton, Icon } from '@mui/material'
import { FcPlus } from 'react-icons/fc'
import { setEmployeeList } from '../../../redux/actions/Profile.action'
import { useDispatch, useSelector } from 'react-redux'

import { axioslogin } from 'src/views/Axios/Axios'
import { useHistory } from 'react-router'
import setDepartment from 'src/redux/actions/Department.action'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import { Actiontypes } from 'src/redux/constants/action.type';
import DesignationSelect from './Jobdesccomponent/DesignationSelect'
import DeptSelectionRedux from 'src/views/CommonCode/DeptSelectionRedux'
import JobDescriptionTableview from './JobDescriptionTableview'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import EditIcon from '@mui/icons-material/Edit';
// import EmployeeRecordTableView from './EmployeeRecordTableView'

const JobDescriptionTable = ({ tableDataMain }) => {
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [data, setdata] = useState(0)
    const [dept, setdept] = useState([])
    const [desig, setdesig] = useState([])
    // const [tabledata, settabledata] = useState([])
    const dispatch = useDispatch()
    const postData = useMemo(() => {
        return {
            designation: desig,
            department: dept,
        }
    }, [desig, dept])


    // const onBtnClick1 = async (data) => {
    //     // const { em_id, em_no } = data
    //     history.push(`/Home/EmployeeRecordEdit/`)
    // }

    /** category wise report ag grid table heading */
    const [columnDef] = useState([
        {
            headerName: '',
            filterParams: {
                buttons: ['reset', 'apply'],
                debounceMs: 200,
            },
            width: 50,
        },
        { headerName: 'Descrption no:', field: 'description_slno' },
        { headerName: 'job_Summary ', field: 'job_Summary' },
        { headerName: 'job_desription ', field: 'job_desription' },

        {
            headerName: '', field: '', width: 20, padding: 2, onClick: { onBtnClick1 },
            cellRenderer: function (params) {
                return <EditIcon />
            }
        }
    ])


    const getcomptency = useCallback((e) => {
        e.preventDefault();
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        /** Selected education slno  to get corresponding data from databse */
        const getEmpjobComptency = async (postData) => {
            const result = await axioslogin.post('/jobsummary/getcomptency', postData)
            const { success, data } = result.data;
            if (success === 1) {
                setTableData(data)
                setdata(1)
            }
            else {
                setTableData([])
            }
        }
        if (desig !== 0 && dept !== 0) {
            getEmpjobComptency(postData)
        }

        else if (desig !== 0 && dept === 0) {
            warningNofity("choose any department")
        }
        else if (desig === 0 && dept !== 0) {
            warningNofity("choose any Designation")
        }
        else {
            warningNofity("choose Department and Designation")
        }

    }, [desig, dept, postData, dispatch])

    const backtojobDescription = () => {
        history.push('/Home/JobDescription')
    }
    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Job Description Table"
                redirect={backtojobDescription}
            >
                <Paper square elevation={3} sx={{
                    p: 0.5,
                    mt: 0.5,
                    display: 'flex',
                    alignItems: "center",
                    flexDirection: { xl: "row", lg: "row", md: "row", sm: 'column', xs: "column" }
                    // backgroundColor: "lightcyan"
                }} >
                    <Box sx={{ flex: 1, px: 0.5 }} >
                        <DeptSelectionRedux style={{ p: 0, height: 25, lineHeight: 1.200, m: 0 }} value={dept} setValue={setdept} label={"Department"} />
                    </Box>
                    <Box sx={{ flex: 1, px: 0.5, pt: 0 }}  >
                        <DesignationSelect style={{ p: 0, height: 25, lineHeight: 1.200, m: 0, }} value={desig} setValue={setdesig} label={"designation"} />
                    </Box>
                    <Box sx={{ flex: 0, px: 0.5 }} >
                        <IconButton variant="outlined" size='sm' onClick={getcomptency} >
                            <AddToPhotosIcon />
                        </IconButton>
                    </Box>
                </Paper>

                <Box>{
                    data === 1 ? <JobDescriptionTableview columnDef={columnDef} tableData={tableData} /> : null
                }

                </Box>
            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default JobDescriptionTable