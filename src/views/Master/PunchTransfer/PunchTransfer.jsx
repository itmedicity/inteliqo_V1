import { Box } from '@mui/material'
import React, { Fragment, useMemo, useState, memo } from 'react'
import { useHistory } from 'react-router-dom'
import { axioslogin } from 'src/views/Axios/Axios'
import { succesNofity, infoNofity } from 'src/views/CommonCode/Commonfunc'
import PageLayoutCloseOnly from 'src/views/CommonCode/PageLayoutCloseOnly'
import moment from 'moment'
import TextInput from 'src/views/Component/TextInput'
import { format } from 'date-fns'
import { CssVarsProvider } from '@mui/joy'
import Typography from '@mui/joy/Typography';
import { Button } from '@material-ui/core'

const PunchTransfer = () => {

    const history = useHistory()
    const [fromdate, setFromdate] = useState(moment(new Date()).format('YYYY-MM-DD'))
    const [todate, setTodate] = useState(moment(new Date()).format('YYYY-MM-DD'))

    const getFromDate = (e) => {
        var getdate = e.target.value
        var from = format(new Date(getdate), "yyyy-MM-dd")
        setFromdate(from)
    }
    const getToDate = (e) => {
        var getdate = e.target.value
        var to = format(new Date(getdate), "yyyy-MM-dd")
        setTodate(to)
    }

    const postdata = useMemo(() => {
        return {
            from: fromdate,
            to: todate,
        }
    }, [fromdate, todate])


    const transferPunch = async (e) => {
        e.preventDefault();
        const result = await axioslogin.post('/punchTrasfer/punchdata', postdata)
        const { message, success } = result.data;
        if (success === 1) {
            succesNofity(message);
            setFromdate(new Date())
            setTodate(new Date())
        } else if (success === 0) {
            infoNofity(message.sqlMessage);
        } else {
            infoNofity(message)
        }
    }

    const toSettings = () => {
        history.push('/Home/Settings');
    }

    return (
        <Fragment>
            <PageLayoutCloseOnly
                heading="Punch Transfer"
                redirect={toSettings}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flex: 1,
                        flexDirection: 'row',
                        width: "100%",
                    }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "row",
                        px: 8,
                        pt: 2,
                        width: "100%",
                    }}>
                        <Box sx={{ width: "7%" }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    From Date
                                </Typography>

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", pr: 2 }} >
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date"
                                min={new Date()}
                                value={fromdate}
                                name="fromdate"
                                changeTextValue={(e) => {
                                    getFromDate(e)
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "5%" }} >
                            <CssVarsProvider>
                                <Typography textColor="text.secondary" >
                                    To Date
                                </Typography>

                            </CssVarsProvider>
                        </Box>
                        <Box sx={{ width: "30%", pl: 2 }} >
                            <TextInput
                                type="date"
                                classname="form-control form-control-sm"
                                Placeholder="Date"
                                min={new Date()}
                                value={todate}
                                name="todate"

                                changeTextValue={(e) => {
                                    getToDate(e)
                                }}
                            />
                        </Box>
                        <Box sx={{ width: "10%", pl: 2 }} >
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                fullWidth
                                onClick={transferPunch}
                            >
                                Transfer
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </PageLayoutCloseOnly>
        </Fragment >
    )
}

export default memo(PunchTransfer)