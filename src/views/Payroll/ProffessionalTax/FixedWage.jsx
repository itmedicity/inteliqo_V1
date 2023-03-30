import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios';
import { CssVarsProvider, Typography } from '@mui/joy'
import { Box, Grid, LinearProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
const FixedWage = ({ empno }) => {
  console.log("gjh");
  const [fixed, setFixed] = useState([])

  // const postData = {
  //   em_no: empno
  // }
  console.log(fixed);
  useEffect(() => {
    const getFixed = async () => {

      // console.log(postData);empno
      const result = await axioslogin.get(`/payrollprocess/empFixedDetl/${empno}`)
      const { success, data } = result.data;
      // console.log(result);
      if (success === 1) {
        setFixed(data)
      }
    }
    getFixed()

  }, [empno])



  return (
    <Fragment>
      <Suspense fallback={<LinearProgress />}>
        {
          fixed && fixed.map((val, index) => {
            return <TableRow key={val.em_salary_desc}>
              <TableCell
                sx={{ p: 0, }}>
                <Box component={Grid} item sx={{ minHeight: 25, minWidth: 250, maxHeight: 25 }}>
                  {val.earnded_name}
                </Box>
              </TableCell>
              <TableCell
                sx={{ p: 0, }}>
                <Box component={Grid} item sx={{ minHeight: 25, minWidth: 250, maxHeight: 25 }}>
                  {val.em_amount}
                </Box>
              </TableCell>
            </TableRow>







            // return <TableRow
            //   key={val.em_salary_desc}
            //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            // >
            //   <TableCell sx={{ p: 0, backgroundColor: '#f1faee', border: 0.1, borderColor: '#E1E6E1' }}>
            //     <Box component={Grid} item sx={{ minHeight: 25, minWidth: 250, maxHeight: 25, p: 0.2 }}>
            //       {val.earnded_name}
            //     </Box>
            //   </TableCell>



            //   <TableCell
            //     component="th"
            //     scope="row"

            //     sx={{
            //       py: 0, px: 0.5, width: 100,
            //       border: 0.1, borderColor: '#E1E6E1'
            //     }}
            //   >
            //     {val.em_amount}
            //   </TableCell>


            // </TableRow>



          })

        }




      </Suspense>





      {/* {fixed && fixed.map((row, index) => (
       return     <TableCell
        component="th"
        scope="row"
        sx={{
          py: 0, px: 0.5, width: 100,
          border: 0.1, borderColor: '#E1E6E1'
        }}
      >
        <Box
          component={Grid}
          item
          sx={{
            minHeight: 25,
            maxHeight: 25,
            p: 0.2,
            fontWeight: 'normal',
            textOverflow: 'ellipsis',
            width: 100,
          }}
        >
          <Typography variant="body2" gutterBottom noWrap={true}>
            {row.earnded_name}
          </Typography>
        </Box>
      </TableCell>
      <TableCell
        component="th"
        scope="row"
        sx={{
          py: 0, px: 0.5, width: 100,
          border: 0.1, borderColor: '#E1E6E1'
        }}
      >
        <Box
          component={Grid}
          item
          sx={{
            minHeight: 25,
            maxHeight: 25,
            p: 0.2,
            fontWeight: 'normal',
            textOverflow: 'ellipsis',
            width: 100,
          }}
        >
          <Typography variant="body2" gutterBottom noWrap={true}>
            {row.em_amount}
          </Typography>
        </Box>
      </TableCell>

      
      ))} */}


    </Fragment>
  )
}

export default FixedWage