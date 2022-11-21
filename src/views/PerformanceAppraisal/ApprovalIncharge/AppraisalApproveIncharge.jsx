import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import { Paper, Box, Grid } from '@mui/material'
import DeptSectionSingleSelect from 'src/views/CommonCode/DeptSectionSingleSelect'
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant'
import { axioslogin } from 'src/views/Axios/Axios'
import AppraisalApproveInchargeTable from './AppraisalApproveInchargeTable'
import EditIcon from '@mui/icons-material/Edit';
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const AppraisalApproveIncharge = () => {
    const [dept, setdept] = useState(0)
    const [value, setvalue] = useState([])
    const [tableData, settableData] = useState([])

    const history = useHistory()
    const RedirectToProfilePage = () => {
        history.push(`/Home`)
    }

    const login = useSelector((state) => {
        return state.getProfileData.ProfileData[0]
    })

    const { incharge, em_dept_section } = login

    useEffect(() => {
        if (incharge === 1) {
            const getInchargeDeptSect = async () => {
                const result = await axioslogin.get(`/section/${em_dept_section}`);
                const { success, data } = result.data
                if (success === 1) {
                    setvalue(data)
                }
                else {
                    setvalue([])
                }
            }
            getInchargeDeptSect()
        }
    }, [incharge, em_dept_section])

    const postData = useMemo(() => {
        return {
            sect_id: em_dept_section,
            level2_sect_id: em_dept_section
        }
    }, [em_dept_section])

    const getInchargeAppraisalList = useCallback((e) => {
        const getdatafromtable = async (postData) => {
            const result = await axioslogin.post('/Performance/incharge/apprlist', postData)
            const { success, data } = result.data
            if (success === 1) {
                settableData(data)
            }
            else {
                settableData([])
            }
        }
        if (postData !== 0) {
            getdatafromtable(postData)
        }
        else {
            warningNofity("No data")
        }

    }, [postData])

    if (dept !== 0) {
        getInchargeAppraisalList(postData)
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Performance Appraisal Approval Incharge"
                redirect={RedirectToProfilePage}
            >
                <Box>
                    <Paper square elevation={2} sx={{ p: 0.5, }}>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                pt: 2
                            }}>
                                <Grid
                                    sx={{
                                        width: 400
                                    }}
                                >
                                    <DeptSectionSingleSelect
                                        value={dept}
                                        setValue={setdept}
                                        data={value}
                                        label={"Select Department"}
                                        style={SELECT_CMP_STYLE}
                                    />
                                </Grid>
                            </Box>
                            <Box sx={{
                                pt: 5
                            }}>
                                <Grid>
                                    <AppraisalApproveInchargeTable tableData={tableData} />


                                </Grid>
                            </Box>
                        </Box>
                    </Paper>
                </Box>

            </PageLayoutCloseOnly>
        </Fragment>
    )
}

export default AppraisalApproveIncharge