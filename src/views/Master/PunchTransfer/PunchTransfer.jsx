import { Box } from '@mui/material'
import React, { Fragment, useMemo, useState, memo, useCallback } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, infoNofity } from 'src/views/CommonCode/Commonfunc'
import moment from 'moment'
import { format } from 'date-fns'
import { Button, CssVarsProvider, Input } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import MasterLayout from '../MasterComponents/MasterLayout'
import CustomBackDrop from 'src/views/Component/MuiCustomComponent/CustomBackDrop'

const PunchTransfer = () => {

    const [fromdate, setFromdate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [todate, setTodate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [backDrop, setBackDrop] = useState(false)

    const getFromDate = useCallback((e) => {
        var getdate = e.target.value
        var from = format(new Date(getdate), "yyyy-MM-dd")
        setFromdate(from)
    }, [])
    const getToDate = useCallback((e) => {
        var getdate = e.target.value
        var to = format(new Date(getdate), "yyyy-MM-dd")
        setTodate(to)
    }, [])

    const postdata = useMemo(() => {
        return {
            from: fromdate,
            to: todate,
        }
    }, [fromdate, todate])


    const transferPunch = useCallback(async (e) => {
        e.preventDefault();
        setBackDrop(true)
        const result = await axioslogin.post('/punchTrasfer/punchdata', postdata)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setFromdate(moment(new Date()).format('YYYY-MM-DD'))
            setTodate(moment(new Date()).format('YYYY-MM-DD'))
            setBackDrop(false)
        } else if (success === 0) {
            setBackDrop(false)
            infoNofity(message.sqlMessage);
        } else {
            setBackDrop(false)
            infoNofity(message)
        }
    }, [postdata])

    return (
        <Fragment>
            <CustomBackDrop open={backDrop} text="Please Wait ! Updating punch for the Selected Date" />
            <MasterLayout title="Punch Transfer" displayClose={true} >
                <Box
                    sx={{ display: 'flex', flex: 1, flexDirection: 'row', width: "100%", }} >
                    <Box sx={{ display: "flex", flexDirection: "row", p: 1, width: "100%", }}>
                        <Box sx={{ mt: 0.5 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    From Date
                                </Typography>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, ml: 1 }} >
                            <Input
                                type="date"
                                value={fromdate}
                                name="fromdate"
                                onChange={(e) => getFromDate(e)}
                            />
                        </Box>
                        <Box sx={{ ml: 1, mt: 0.5 }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    To Date
                                </Typography>

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, ml: 1 }} >
                            <Input
                                type="date"
                                value={todate}
                                name="todate"
                                onChange={(e) => getToDate(e)}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pl: 2, mt: 0.2 }} >
                            <CssVarsProvider>
                                <Button
                                    variant="outlined"
                                    component="label"
                                    size="sm"
                                    color="primary"
                                    onClick={transferPunch}
                                >
                                    Transfer
                                </Button>
                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ flex: 1, }} >

                        </Box>
                    </Box>
                </Box>
            </MasterLayout>
        </Fragment >
    )
}

export default memo(PunchTransfer)