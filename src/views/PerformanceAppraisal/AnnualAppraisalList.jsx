import { Box, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import { axioslogin } from '../Axios/Axios';
import { Checkbox } from '@mui/material'
import AnnualAppraisalTable from './AnnualAppraisalTable';
import AddTaskIcon from '@mui/icons-material/AddTask';
import CusIconButton from 'src/views/Component/CusIconButton'
import moment from 'moment';
import { errorNofity, succesNofity } from '../CommonCode/Commonfunc';

const AnnualAppraisalList = () => {
    const history = useHistory()
    const [tableData, setTableData] = useState([])
    const [pb, setpb] = useState(false)
    const [ap, setap] = useState(false)
    const [value, setValue] = useState([]);
    const [id, setid] = useState([])

    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        const aprobationEndList = async () => {
            const result = await axioslogin.get('/Performance/annualdata')
            const { success, data } = result.data
            if (success === 1) {
                setTableData(data)
                setValue(data)
            }
            else if (success === 0) {
                setTableData([])
            }
        }
        aprobationEndList()
    }, [])


    /** mapping em_id of employees into an array */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.em_id
        })
        setid(arr)
    }, [value])

    const addtoProcess = useCallback((e) => {
        e.preventDefault();
        const getallemployeeRights = async (id) => {
            /** getting appraisal user rights of listed employees, by sumbitting employee em_id */
            const result = await axioslogin.post('/performanceappriasalrights/allappraisalemp/list', id)
            const { success, data } = result.data
            /** the array of objects destructured using a loop */
            data.forEach(element => {
                const { em_id, rights_needed, em_no } = element
                const obj = JSON.parse(rights_needed);
                const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = obj
                const today = new Date();
                const tdyformat = moment(today).format('YYYY-MM-DD')
                const savedata = {
                    appraisal_start_date: tdyformat,
                    em_id: em_id,
                    em_no: em_no,
                    appraisal_type: "A",
                    incharge_required: incharge,
                    hod_required: hod,
                    gm_required: gm,
                    om_required: om,
                    hr_required: hr,
                    ms_required: ms,
                    cno_required: cno,
                    acno_required: acno,
                    ed_required: ed,
                    md_required: md
                }
                const getallemployeeRights = async (savedata) => {
                    /** submitting probation end employee rights to the database table */
                    const result = await axioslogin.post('/performanceappriasalrights/createappraisal', savedata)
                }
                if (savedata.length !== 0) {
                    getallemployeeRights(savedata)
                }
            });
        }
        if (id !== 0) {
            getallemployeeRights(id)
            succesNofity("Appraisal Submitted")
        }
        else {
            errorNofity("The employee has no rights")
        }

    }, [id])


    const getValue1 = useCallback((e) => {
        if (e.target.checked === true) {
            setpb(true)
            setap(false)
        }
        else {
            setpb(false)
            setap(false)
        }

    })

    const getValue2 = useCallback((e) => {
        if (e.target.checked === true) {
            setap(true)
            setpb(false)

        }
        else {
            setpb(false)
            setap(false)
        }
    })

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Annual Appraisal List"
                redirect={RedirectToHome}
            >
                <Box sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <Box>
                        <Checkbox
                            name="pb"
                            value={pb}
                            checked={pb}
                            onChange={(e) => getValue1(e)}
                        />
                        <Typography variant='8'>
                            {"Annual Appraisal List"}
                        </Typography>
                    </Box>
                    <Box sx={{
                        pl: 2
                    }}>
                        <Checkbox
                            name="ap"
                            value={ap}
                            checked={ap}
                            onChange={(e) => getValue2(e)}
                        />
                        <Typography variant='8'>
                            {"Appraisal Pending"}
                        </Typography>
                    </Box>
                    <Box sx={{
                        pl: 120,
                        display: "flex",
                        flexDirection: "row"
                    }}>
                        <Box>
                            <CusIconButton variant="outlined" size="sm" color="success"
                                onClick={addtoProcess}
                            >
                                <AddTaskIcon />
                            </CusIconButton>
                        </Box>
                        <Box
                            sx={{
                                pl: 2,
                                pt: 1
                            }}>
                            <Typography variant='8'>
                                {"Submit All"}
                            </Typography>
                        </Box>

                    </Box>

                </Box>
                {
                    pb === true ? <AnnualAppraisalTable tableData={tableData} /> : null
                }
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default AnnualAppraisalList
