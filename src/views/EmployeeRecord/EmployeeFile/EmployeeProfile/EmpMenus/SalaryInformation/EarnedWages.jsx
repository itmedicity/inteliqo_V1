import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, Suspense, useEffect, useMemo, useState } from 'react'
import FullPageloader from 'src/components/FullPageloader'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const EarnedWages = ({ emno, sumoferanedwages, earningstatus }) => {

    //use State For Earnings
    const [Earnings, setEarnings] = useState([])
    useEffect(() => {
        const getFixedEarnings = async () => {
            const result = await axioslogin.get(`/common/getfixedearnings/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setEarnings(data)
                const earningsum = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumoferanedwages(earningsum)
            }
            else if (success === 0) {
                earningstatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedEarnings()
    }, [emno, sumoferanedwages, earningstatus])
    //earning 
    const earnsalary = useMemo(() => Earnings, [Earnings]);

    return (
        <Fragment>
            <Suspense fallback={<FullPageloader />} >
                {
                    earnsalary.map((val) => {
                        return <Box sx={{ display: 'flex', flexDirection: "row", }}
                            key={val.ernded_slno}
                        >
                            <Box borderBottom={1} sx={{ display: "flex", flex: 1, }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.earnded_name}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderBottom={1} sx={{ display: "flex", flex: 1, justifyContent: "end" }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.em_amount}</Typography>
                                </CssVarsProvider>
                            </Box>
                        </Box>
                    })
                }
            </Suspense>
        </Fragment >
    )
}

export default memo(EarnedWages)