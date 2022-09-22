import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, memo, useEffect, useMemo, useState } from 'react'
import { Suspense } from 'react'
import FullPageloader from 'src/components/FullPageloader'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'

const FixedWageSalary = ({ emno, sumoffixedwage, fixedwagestate }) => {

    const [fixedWages, setFixedwages] = useState([])
    useEffect(() => {
        const getFixedWages = async () => {
            const result = await axioslogin.get(`/common/getfixedwagesSalary/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setFixedwages(data)
                const fixedwagessum = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumoffixedwage(fixedwagessum)
            }
            else if (success === 0) {
                fixedwagestate(1)
                infoNofity('No Fixed wages is set to this employee')
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixedWages()
    }, [emno, sumoffixedwage, fixedwagestate])

    //use Memofixed Wages
    const fixedwage = useMemo(() => fixedWages, [fixedWages]);

    return (
        // <div>FixedWageSalary</div>
        <Fragment>
            <Suspense fallback={<FullPageloader />} >
                {
                    fixedwage && fixedwage.map((val) => {
                        return <Box sx={{
                            display: 'flex',
                            flex: 1,
                            flexDirection: "row",
                        }}
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
        </Fragment>
    )
}

export default memo(FixedWageSalary)