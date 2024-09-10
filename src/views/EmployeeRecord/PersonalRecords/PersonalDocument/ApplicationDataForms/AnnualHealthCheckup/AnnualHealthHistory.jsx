import { Box, Table, Typography } from '@mui/joy'
import React, { lazy, memo, useEffect, useMemo, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'

const AnnualHealthDetails = lazy(() => import('./AnnualHealthDetails'))

const AnnualHealthHistory = ({ checkupDoc, checkup, Employee, setHrdNo, setdatesaved, datesaved, HrdNo, Recorddata, setRecorddata }) => {


    return (
        <Box>
            <Table aria-label="basic table" borderAxis="both" size='sm' variant="outlined">

                <tbody>
                    <tr>
                        <td style={{}} width="25%"  ><Typography level="title-md" sx={{ ml: 1 }}>Do You Have Any History Of The Following</Typography></td>
                        <td style={{ textAlign: "center" }} ><Typography level="title-md" sx={{ ml: 1 }}>Yes</Typography> </td>
                        <td style={{ textAlign: "center" }} ><Typography level="title-md" sx={{ ml: 1 }}>No</Typography> </td>
                        <td style={{ textAlign: "center" }} ><Typography level="title-md" sx={{ ml: 1 }}>If yes,how long/when ?</Typography> </td>
                        <td style={{ textAlign: "center" }} ><Typography level="title-md" sx={{ ml: 1 }}>Still on Treatment</Typography> </td>
                        <td style={{ textAlign: "center" }} ><Typography level="title-md" sx={{ ml: 1 }}>Not On Treatment</Typography> </td>
                        <td style={{}} width="20%"  ><Typography level="title-md" sx={{ ml: 1 }}>If still on treatment,specify the medications</Typography> </td>
                    </tr>

                    {checkupDoc?.map((item, index) => (
                        <tr key={index}>
                            <td style={{}}> <Typography level="title-md" sx={{ ml: 1 }}>{item?.Diseases === "" ? "not updated" : item?.Diseases}</Typography></td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Diseases_Yes === 1 ? "Yes" : "No"}</Typography> </td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Diseases_No === 1 ? "Yes" : "No"}</Typography> </td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Diseases_Discription === "" ? "Nill" : item?.Diseases_Discription}</Typography> </td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Treatment_Yes === 1 ? "Yes" : "No"}</Typography> </td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Treatment_No === 1 ? "Yes" : "No"}</Typography> </td>
                            <td style={{ textAlign: "center" }}><Typography level="title-md" sx={{ ml: 1 }}>{item?.Treatment_Details === "" ? "not updated" : item?.Treatment_Details}</Typography></td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <AnnualHealthDetails checkup={checkup} Employee={Employee} setHrdNo={setHrdNo} setdatesaved={setdatesaved} datesaved={datesaved}
                HrdNo={HrdNo} Recorddata={Recorddata} setRecorddata={setRecorddata} />
        </Box>
    )
}

export default memo(AnnualHealthHistory)