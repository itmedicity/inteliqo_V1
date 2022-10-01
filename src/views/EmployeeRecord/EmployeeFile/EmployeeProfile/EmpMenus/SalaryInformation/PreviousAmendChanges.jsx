import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect, useMemo, useState } from 'react'
import FullPageloader from 'src/components/FullPageloader'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const PreviousAmendChanges = ({ emp_id, amendStatus }) => {

    //use State For last Wage
    const [lastWage, setlastWage] = useState([])
    useEffect(() => {
        //get last changed salary detl
        const getLastWages = async () => {
            const result = await axioslogin.get(`/common/getlastwage/${emp_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setlastWage(data)
            }
            else if (success === 0) {
                amendStatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getLastWages()
    }, [emp_id, amendStatus])
    const lastwagedetl = useMemo(() => lastWage, [lastWage]);

    return (
        <Fragment>
            <Suspense fallback={<FullPageloader />} >
                {
                    lastwagedetl.map((val) => {
                        return <Box sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: "row",
                            //backgroundColor: "green"
                        }}
                            key={val.wagelog_slno}
                        >
                            <Box borderBottom={1} sx={{ display: "flex", flex: 1, }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.earnded_name}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderBottom={1} sx={{ display: "flex", flex: 1, justifyContent: "center" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.changed_date}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderBottom={1} sx={{ display: "flex", flex: 1, justifyContent: "end" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.new_change}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    })
                }
            </Suspense>
        </Fragment>
    )
}

export default memo(PreviousAmendChanges)