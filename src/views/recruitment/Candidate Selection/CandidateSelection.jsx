import { Box, Button } from '@mui/joy'
import React, { lazy, memo, useCallback, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'

const DesignationChange = lazy(() => import('./DesignationChange'))


const CandidateSelection = ({
    Select_status,
    setSelect_status,
    Reject_status,
    setReject_status,
    Hold_status,
    setHold_status,
    Pending_status,
    setPending_status,
    setIsModalOpen,
    count, setcount,
    setOpenRowIndex,
    details, desg_status,
    setdesg_status,
    data }) => {

    const [statusdata, setstatusdata] = useState([]);
    const [desgdata, setdesgdata] = useState([]);
    const [desgid, setdesgid] = useState(0);
    const { edu } = details;
    const [remark, setremark] = useState("");

    const education = edu.map(item => item.education)


    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/Applicationform/selectionedu', education)
            const { success, data } = result.data
            if (success === 1) {
                const filterdata = data.filter(item => item.manpower_required_no !== 0)
                setdesgdata(filterdata)
            }
            else {
                setdesgdata([])
            }
        }
        fetchData()
    }, [])

    // for checkbox
    const handleCheckBoxChange = useCallback((name) => {
        if (name === 'Select_status') {
            setSelect_status(true);
            setReject_status(false);
            setHold_status(false);
            setPending_status(false);

        } else if (name === 'Reject_status') {
            setSelect_status(false);
            setReject_status(true);
            setHold_status(false);
            setPending_status(false);


        } else if (name === 'Hold_status') {
            setSelect_status(false);
            setReject_status(false);
            setHold_status(true);
            setPending_status(false);


        } else if (name === 'Pending_status') {
            setSelect_status(false);
            setReject_status(false);
            setHold_status(false);
            setPending_status(true);

        }
    }, [setSelect_status, setReject_status, setHold_status, setPending_status]);

    const Postdata = useMemo(() => {
        return {
            desg_id: data?.desg_id,
            application_no: data?.application_no,
        }
    }, [data])

    useEffect(() => {
        const fetchData = async () => {
            const result = await axioslogin.post('/Applicationform/selectionStatus', Postdata)
            const { success, data } = result.data
            if (success === 1) {
                setstatusdata(data[0])
            }
            else {
                setstatusdata([])
            }
        }
        fetchData()
    }, [Postdata])

    const insertData = useMemo(() => {
        return {
            desg_id: data?.desg_id,
            application_no: data?.application_no,
            Select_status: Select_status === true ? 1 : 0,
            Reject_status: Reject_status === true ? 1 : 0,
            Hold_status: Hold_status === true ? 1 : 0,
            Pending_status: Pending_status === true ? 1 : 0,
            changed_desgid: desgid,
            remark: remark,
            applicationform_id: data?.applicationform_id
        }
    }, [data, Select_status, Reject_status, Hold_status, Pending_status, remark, desgid])

    const updateData = useMemo(() => {
        return {
            desg_id: data?.desg_id,
            application_no: data?.application_no,
            Select_status: Select_status === true ? 1 : 0,
            changed_desgid: desgid === 0 ? data?.desg_id : desgid,
        }
    }, [data, Select_status, desgid])

    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        if (Select_status === false && Reject_status === false && Hold_status === false && Pending_status === false) {
            setIsModalOpen(false)
            warningNofity("Please Select Any Of the CheckBox")
        } else {
            const result = await axioslogin.post('/Applicationform/updateselection', updateData)
            const { success } = result.data
            if (success === 1) {
                const result = await axioslogin.post('/Applicationform/selection', insertData)
                const { success } = result.data

                if (success === 1) {
                    setIsModalOpen(false)
                    setcount(count + 1)
                    setOpenRowIndex(null)
                    setSelect_status(false);
                    setReject_status(false);
                    setHold_status(false);
                    setPending_status(false);
                    setdesg_status(false)
                    succesNofity("Updated Sucessfully")
                }

            } else {
                warningNofity("Something Went Wrong")
            }
        }


    }, [insertData, Select_status, Reject_status, Hold_status, Pending_status, setPending_status, setReject_status, setSelect_status,
        setHold_status, setIsModalOpen, setOpenRowIndex, setcount, count, setdesg_status, updateData])
    return (
        <>
            <CustmTypog title={'Candidate Selection'} />
            <Box sx={{ display: 'flex', ml: 2, gap: 2, pt: 1, }}>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Select'
                        name="Select_status"
                        checked={Select_status}
                        onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                    />
                </Box>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Reject'
                        name="Reject_status"
                        checked={Reject_status}
                        onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                    />

                </Box>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Hold'
                        name="Hold_status"
                        checked={Hold_status}
                        onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                    />

                </Box>
                <Box sx={{ pt: 1, }}>
                    <JoyCheckbox
                        label='Pending'
                        name="Pending_status"
                        checked={Pending_status}
                        onchange={(e) => handleCheckBoxChange(e.target.name, e.target.checked)}
                    />

                </Box>
            </Box>

            {/* designation change */}
            {Select_status === true ?
                <>
                    <DesignationChange desgdata={desgdata} setdesgid={setdesgid} desgid={desgid} desg_status={desg_status}
                        setdesg_status={setdesg_status} remark={remark} setremark={setremark} />
                </> : <></>}


            {data?.selectedStatus === 1 ?
                <>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                        <Button disabled sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success">
                            Employee Selected
                        </Button>
                    </Box>
                </> :
                <>
                    {statusdata?.length === 0 ?
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                            <Button sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success" onClick={submitmanpower}>
                                Submit
                            </Button>
                        </Box> :
                        <>
                            {statusdata?.select_status === 1 ?
                                <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                                    <Button disabled sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success">
                                        Employee Selected
                                    </Button>
                                </Box>
                                : statusdata?.reject_status === 1 ?
                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                                        <Button disabled sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success">
                                            Employee Rejected
                                        </Button>
                                    </Box>
                                    : statusdata?.hold_status === 1 ?
                                        <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                                            <Button disabled sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success" >
                                                Employee OnHold
                                            </Button>
                                        </Box>
                                        : statusdata?.pending_status === 1 ?
                                            <Box sx={{ mt: 2, display: 'flex', justifyContent: "end", gap: 1 }}>
                                                <Button disabled sx={{ p: 0, width: "30%" }} size='sm' variant="outlined" color="success">
                                                    Employee Pending
                                                </Button>
                                            </Box> : <></>

                            }

                        </>


                    }
                </>}




        </>
    )
}

export default memo(CandidateSelection)