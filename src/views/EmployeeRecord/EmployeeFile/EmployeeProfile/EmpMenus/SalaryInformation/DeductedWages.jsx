import { CssVarsProvider, Typography } from '@mui/joy'
import { Box } from '@mui/material'
import React, { Fragment, Suspense, useEffect, useMemo, useState } from 'react'
import { memo } from 'react'
import FullPageloader from 'src/components/FullPageloader'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
const DeductedWages = ({ emno, sumofdeductsalary, deductstatus }) => {

    //use State For Deduction
    const [Deduction, setDeduction] = useState([])
    useEffect(() => {
        const getFixeddeduction = async () => {
            const result = await axioslogin.get(`/common/getfixeddeduction/${emno}`)
            const { success, data } = result.data
            if (success === 1) {
                setDeduction(data)
                const sumofdeduction = data.map((val) => val.em_amount).reduce((sum, val) => sum + val, 0)
                sumofdeductsalary(sumofdeduction)
            }
            else if (success === 0) {
                deductstatus(1)
            }
            else {
                warningNofity('Error Occured!!!Please Contact EDP')
            }
        }
        getFixeddeduction()
    }, [emno, sumofdeductsalary, deductstatus])
    //Deduction 
    const deductsalary = useMemo(() => Deduction, [Deduction]);

    return (
        <Fragment>
            <Suspense fallback={<FullPageloader />} >
                {
                    deductsalary.map((val) => {
                        return <Box sx={{ display: 'flex', flexDirection: "row", flex: 1 }}
                            key={val.ernded_slno}
                        >
                            <Box borderBottom={1} sx={{ display: "flex", justifyContent: "start", flex: 1 }} >
                                <CssVarsProvider>
                                    <Typography level="body1"> {val.earnded_name}</Typography>
                                </CssVarsProvider>
                            </Box>
                            <Box borderBottom={1} sx={{ display: "flex", justifyContent: "end", flex: 1 }} >
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

export default memo(DeductedWages)