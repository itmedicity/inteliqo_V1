
import { Box, Typography } from '@mui/material'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageLayoutCloseOnly from '../CommonCode/PageLayoutCloseOnly'
import { axioslogin } from '../Axios/Axios';
import ProbationEndTable from './ProbationEndTable';
import { Checkbox } from '@mui/material'
import AddTaskIcon from '@mui/icons-material/AddTask';
import CusIconButton from 'src/views/Component/CusIconButton'
import moment from 'moment';
import { errorNofity, succesNofity, warningNofity } from '../CommonCode/Commonfunc';

const ProbationEnd = () => {

    const history = useHistory()
    /** initializing state */
    const [tableData, setTableData] = useState([]);
    const [pb, setpb] = useState(false)
    const [ap, setap] = useState(false)
    const [value, setValue] = useState([]);
    const [id, setid] = useState([])

    /** back to home page */
    const RedirectToHome = () => {
        history.push(`/Home`)
    }

    useEffect(() => {
        const aprobationEndList = async () => {
            /** list of probation end employees */
            const result = await axioslogin.get('/Performance/list')
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

    /** mapping sect_id of employees into an array */
    useEffect(() => {
        const arr = value && value.map((val, index) => {
            return val.sect_id
        })
        setid(arr)
    }, [value])

    const [click, setClick] = useState(0)
    const [submit, setSubmit] = useState([])

    useEffect(() => {
        if (click !== 0) {
            value.forEach(element => {
                const { em_id, em_no, sect_id, incharge, hod } = element
                const getallemployeeRights = async (sect_id, em_id, em_no) => {

                    /** fetching level3 hierarchy dept section for checking 
                                * selected employee dept section is present or not */

                    const result = await axioslogin.get(`/Performance/idonly`)
                    const { data } = result.data;
                    var arr = data.map(data => (data.level2_sect_id));


                    /** fetching level2 hierarchy dept section for checking 
                                 * selected employee dept section is present or not */
                    const level2ID = await axioslogin.get(`/HierarchyLevel/data`)
                    const { datas } = level2ID.data;
                    var l2ID = datas.map(datas => (datas.sect_id))
                    if (arr.indexOf(sect_id) !== -1) {
                        console.log("level3");
                        const result = await axioslogin.get(`/Performance/level2hier/${sect_id}`)
                        const { data } = result.data;
                        const { authorization_hod, authorization_incharge, highlevel_slno } = data[0]
                        const today = new Date();
                        const tdyformat = moment(today).format('YYYY-MM-DD')
                        if (highlevel_slno === 1) {
                            console.log("1");
                            const savedata1 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "P",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 1,
                                md_required: 0,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata1)
                            setSubmit(savedata1)
                            console.log(savedata1);
                        }
                        else if (highlevel_slno === 2) {
                            console.log("2");
                            const savedata2 = {
                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "P",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 1,
                                trustiee_required: 0,
                                ceo_required: 0
                            }
                            const result = await axioslogin.post('/Performance/create', savedata2)
                            console.log(savedata2);
                        }
                        else {
                            console.log("3");
                            const savedata3 = {

                                appraisal_start_date: tdyformat,
                                em_id: em_id,
                                em_no: em_no,
                                appraisal_type: "P",
                                incharge_required: authorization_incharge,
                                hod_required: authorization_hod,
                                ed_required: 0,
                                md_required: 0,
                                trustiee_required: 1,
                                ceo_required: 0
                            }
                            console.log(savedata3);
                            const result = await axioslogin.post('/Performance/create', savedata3)
                        }
                    }
                    else {
                        if (l2ID.indexOf(sect_id) !== -1) {
                            console.log("level2");
                            const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                            const { data } = result.data;
                            const { authorization_hod, authorization_incharge, highlevel_slno, } = data[0]
                            const today = new Date();
                            const tdyformat = moment(today).format('YYYY-MM-DD')
                            if (highlevel_slno === 1) {
                                console.log("4");
                                const savedata4 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "P",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 1,
                                    md_required: 0,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                console.log(savedata4);
                                const result = await axioslogin.post('/Performance/create', savedata4)
                            }
                            else if (highlevel_slno === 2) {
                                console.log("5");
                                const savedata5 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "P",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 1,
                                    trustiee_required: 0,
                                    ceo_required: 0
                                }
                                const result = await axioslogin.post('/Performance/create', savedata5)
                            }
                            else {
                                const savedata6 = {
                                    appraisal_start_date: tdyformat,
                                    em_id: em_id,
                                    em_no: em_no,
                                    appraisal_type: "P",
                                    incharge_required: authorization_incharge,
                                    hod_required: authorization_hod,
                                    ed_required: 0,
                                    md_required: 0,
                                    trustiee_required: 1,
                                    ceo_required: 0
                                }
                                const result = await axioslogin.post('/Performance/create', savedata6)
                            }
                        }
                        else {
                            var msg = "No Rights to the Departments!!"
                            return msg
                        }
                    }
                }
                const submitHODAppraisal = async () => {
                    /** fetching employee department section hirarchy details */
                    const result = await axioslogin.get(`/Performance/level1/${sect_id}`)
                    const { data } = result.data;
                    const { highlevel_slno } = data[0]
                    const today = new Date();
                    const tdyformat = moment(today).format('YYYY-MM-DD')
                    if (highlevel_slno === 1) {
                        const savedata7 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "P",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 1,
                            md_required: 0,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata7)
                    }
                    else if (highlevel_slno === 2) {
                        const savedata8 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "P",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 1,
                            trustiee_required: 0,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata8)
                    }
                    else {
                        const savedata9 = {
                            appraisal_start_date: tdyformat,
                            em_id: em_id,
                            em_no: em_no,
                            appraisal_type: "P",
                            incharge_required: 0,
                            hod_required: 0,
                            ed_required: 0,
                            md_required: 0,
                            trustiee_required: 1,
                            ceo_required: 0
                        }
                        const result = await axioslogin.post('/Performance/create', savedata9)
                    }
                }
                if (sect_id !== 0 && incharge !== 1 & hod !== 1) {
                    getallemployeeRights(sect_id, em_id, em_no)
                }
                else if (sect_id !== 0 && incharge === 1 & hod === 1) {
                    submitHODAppraisal()
                }
                else {
                    warningNofity("No Rights to the Departments!!")
                }
            })
            succesNofity("Appraisal Submitted!!")
        }
    }, [click])

    const addtoProcess = useCallback((e) => {
        e.preventDefault();
        setClick(1)
    }, [])





    /** getting appraisal user rights of listed employees, by sumbitting employee em_id */
    //     const result = await axioslogin.post('/performanceappriasalrights/allappraisalemp/list', id)
    //     const { success, data } = result.data
    //     /** the array of objects destructured using a loop */
    //     data.forEach(element => {
    //         const { em_id, rights_needed, em_no } = element
    //         const obj = JSON.parse(rights_needed);
    //         const { incharge, hod, gm, om, hr, ms, cno, acno, ed, md } = obj
    //         const today = new Date();
    //         const tdyformat = moment(today).format('YYYY-MM-DD')
    //         const savedata = {
    //             appraisal_start_date: tdyformat,
    //             em_id: em_id,
    //             em_no: em_no,
    //             appraisal_type: "P",
    //             incharge_required: incharge,
    //             hod_required: hod,
    //             gm_required: gm,
    //             om_required: om,
    //             hr_required: hr,
    //             ms_required: ms,
    //             cno_required: cno,
    //             acno_required: acno,
    //             ed_required: ed,
    //             md_required: md
    //         }
    //         const getallemployeeRights = async (savedata) => {
    //             /** submitting probation end employee rights to the database table */
    //             const result = await axioslogin.post('/performanceappriasalrights/createappraisal', savedata)
    //         }
    //         if (savedata.length !== 0) {
    //             getallemployeeRights(savedata)
    //         }
    //     });


    /** to get probation end checkbox value */
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

    /** to get appraisal pending checkbox value */
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
                heading="Probation End List"
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
                            {"Probation End"}
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
                    pb === true ? <ProbationEndTable tableData={tableData} /> : null
                }
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default ProbationEnd