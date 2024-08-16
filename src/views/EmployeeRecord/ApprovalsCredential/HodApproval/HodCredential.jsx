import { Box, Tooltip } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import _ from 'underscore';
import AddTaskIcon from '@mui/icons-material/AddTask';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'

const CredentialDocmodal = lazy(() => import('./CredentialDoc/CredentialDocmodal'))
const CredentialNurseModal = lazy(() => import('./CredentialNurse/CredentialNurseModal'))
const CredentialParaModal = lazy(() => import('./CredentialPara/CredentialParaModal'))
const CredentialOtherModal = lazy(() => import('./CredentialOther/CredentialOtherModal'))



const HodCredential = () => {
    // login id
    const employeeState = useSelector((state) => state.getProfileData.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_department } = employeeProfileDetl;
    const [creddoc, setcreddoc] = useState(false)
    const [crednurse, setcrednurse] = useState(false)
    const [credpara, setcredpara] = useState(false)
    const [credother, setcredother] = useState(false)
    const [tabledata, setTableData] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [Empdata, setEmpdata] = useState([])
    const [count, SetCount] = useState(0)


    const handleCheckBox = useCallback((name) => {
        if (name === 'creddoc') {
            setcreddoc(true)
            setcrednurse(false)
            setcredpara(false)
            setcredother(false)
        } else if (name === 'crednurse') {
            setcreddoc(false)
            setcrednurse(true)
            setcredpara(false)
            setcredother(false)
        } else if (name === 'credpara') {
            setcreddoc(false)
            setcrednurse(false)
            setcredpara(true)
            setcredother(false)
        }
        else if (name === 'credother') {
            setcreddoc(false)
            setcrednurse(false)
            setcredpara(false)
            setcredother(true)
        }
    }, [setcreddoc, setcrednurse, setcredpara, setcredother]);
    const personaldata = useMemo(() => {
        return {
            department: em_department,
        }
    }, [em_department])

    useEffect(() => {
        const fetchData = async () => {
            if (creddoc === true) {
                const result = await axioslogin.post('/PersonalChecklist/HodapprovalData ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    SetCount(0)
                    setTableData(data)
                } else {
                    setTableData([])
                    warningNofity("No Pending Data")
                }
            } else if (crednurse === true) {
                const result = await axioslogin.post('/PersonalChecklist/HodapprovalNurseData ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setTableData(data)
                    SetCount(0)
                }
                else {
                    setTableData([])
                    warningNofity("No Pending Data")
                }
            } else if (credpara === true) {
                const result = await axioslogin.post('/PersonalChecklist/HodapprovalParaData ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setTableData(data)
                    SetCount(0)
                }
                else {
                    setTableData([])
                    warningNofity("No Pending Data")
                }
            } else if (credother === true) {
                const result = await axioslogin.post('/PersonalChecklist/HodapprovalotheraData ', personaldata)
                const { success, data } = result.data
                if (success === 1 && data?.length > 0) {
                    setTableData(data)
                    SetCount(0)
                }
                else {
                    setTableData([])
                    warningNofity("No Pending Data")
                }
            }
            else {
                setTableData([])
            }
        }
        fetchData()
    }, [personaldata, creddoc, crednurse, credpara, credother, count])

    // for getting the employee data
    const handleClick = useCallback(async (params) => {
        const postdata = {
            em_no: params?.data?.em_no
        }
        const result = await axioslogin.post('/PersonalChecklist/empdetails', postdata)
        const { success, data } = result.data
        if (success === 1) {
            setEmpdata(data[0])
            setIsModalOpen(true)
        } else {
            setEmpdata([])
        }
    }, [setIsModalOpen, creddoc])

    const [columnDef] = useState([

        { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
        { headerName: 'Employee Name', field: 'em_name', minWidth: 90 },
        { headerName: 'Department', field: 'dept_name', minWidth: 90 },
        { headerName: 'Department Section', field: 'sect_name', minWidth: 90 },
        {
            headerName: 'Action', minWidth: 100,
            cellRenderer: params =>
                <Tooltip title="Profile View" followCursor placement='top' arrow >
                    <Box sx={{ color: "#90caf9", cursor: 'pointer', }} size='sm' onClick={() => handleClick(params)}>
                        <AddTaskIcon />
                    </Box>
                </Tooltip>
        },
    ])
    return (
        <Box sx={{ height: window.innerHeight - 180 }}>
            <ToastContainer />
            <CustomLayout title="HOD Approval Credential Privilege" displayClose={true}>
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
                        <Box sx={{ flex: 1, mt: 0.8, px: 0.2 }}>
                            <JoyCheckbox
                                label='Credential And Privileging Form (Doctors)'
                                name="creddoc"
                                checked={creddoc}
                                // disabled={crednurse === true ? true : false}
                                onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                            />
                        </Box>
                        <Box sx={{ flex: 1, mt: 0.8, px: 0.3 }}>
                            <JoyCheckbox
                                label='Credential And Privileging Form (Nursing)'
                                name="crednurse"
                                checked={crednurse}
                                // disabled={Health_statusno === true ? true : false}
                                onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                            />
                        </Box>

                        <Box sx={{ flex: 1, px: 0.3, mt: 0.7 }}>
                            <JoyCheckbox
                                label='Credential And Privileging Form (Paramedical Staff)'
                                name="credpara"
                                checked={credpara}
                                // disabled={Health_statusno === true ? true : false}
                                onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                            />
                        </Box>

                        <Box sx={{ flex: 1, px: 0.3, mt: 0.7 }}>
                            <JoyCheckbox
                                label='Credential And Privileging Form (other)'
                                name="credother"
                                checked={credother}
                                // disabled={Health_statusno === true ? true : false}
                                onchange={(e) => handleCheckBox(e.target.name, e.target.checked)}
                            />
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, width: '100%' }}>
                        <CommonAgGrid
                            columnDefs={columnDef}
                            tableData={tabledata}
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
            {
                creddoc === true ?
                    <CredentialDocmodal
                        setIsModalOpen={setIsModalOpen}
                        isModalOpen={isModalOpen}
                        Empdata={Empdata}
                        count={count}
                        SetCount={SetCount}
                    />
                    : crednurse === true ?
                        <CredentialNurseModal
                            setIsModalOpen={setIsModalOpen}
                            isModalOpen={isModalOpen}
                            Empdata={Empdata}
                            count={count}
                            SetCount={SetCount}
                        />
                        : credpara === true ?
                            <CredentialParaModal
                                setIsModalOpen={setIsModalOpen}
                                isModalOpen={isModalOpen}
                                Empdata={Empdata}
                                count={count}
                                SetCount={SetCount}
                            />
                            : credother === true ?
                                < CredentialOtherModal
                                    setIsModalOpen={setIsModalOpen}
                                    isModalOpen={isModalOpen}
                                    Empdata={Empdata}
                                    count={count}
                                    SetCount={SetCount}

                                /> : null


            }

        </Box>
    )
}

export default memo(HodCredential)