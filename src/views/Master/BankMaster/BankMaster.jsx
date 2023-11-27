import React, { memo, useCallback, useEffect, useMemo } from 'react'
import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { axioslogin } from 'src/views/Axios/Axios'
import SessionCheck from 'src/views/Axios/SessionCheck'
import { infoNofity, succesNofity } from 'src/views/CommonCode/Commonfunc'
import { employeeNumber } from 'src/views/Constant/Constant'
import BankSelection from './BankSelection'
import MasterLayout from '../MasterComponents/MasterLayout'
import { Box, Button, CssVarsProvider } from '@mui/joy'
import { Grid, IconButton } from '@mui/material'
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent'
import JoyCheckbox from 'src/views/MuiComponents/JoyComponent/JoyCheckbox'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import SaveIcon from '@mui/icons-material/Save';
import EditIcon from '@mui/icons-material/Edit';

const BankMaster = () => {
  const [count, setCount] = useState(0)
  const [bankmast, setbankmast] = useState(0)
  const [tableData, setTableData] = useState([])
  const [flag, setFlag] = useState(0)
  const [slno, setSlno] = useState(0)

  const [bankData, getFormdata] = useState({
    bank_name: '',
    bank_ifsc: '',
    bank_address: '',
    bank_status: false,
  })

  const resetFrom = useMemo(() => {
    return {
      bank_name: '',
      bank_ifsc: '',
      bank_address: '',
      bank_status: false,
    }
  }, [])

  const { bank_name, bank_ifsc, bank_address, bank_status } = bankData;

  const updateFormData = useCallback((e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    getFormdata({ ...bankData, [e.target.name]: value })
  }, [bankData])

  const postData = useMemo(() => {
    return {
      ...bankData,
      bank_mastname: bankmast,
      bank_status: bank_status === true ? 1 : 0,
      create_user: employeeNumber()
    }
  }, [bankData, bankmast, bank_status])

  const postBank = useMemo(() => {
    return {
      bank_name,
      bank_mastname: bankmast,
      bank_ifsc,
      bank_address,
      bank_status: bank_status === true ? 1 : 0,
      edit_user: employeeNumber(),
      bank_slno: slno
    }
  }, [bank_name, bankmast, bank_ifsc, bank_address, bank_status, slno])

  const postFormData = useCallback(async (e) => {
    e.preventDefault()
    if (flag === 1) {
      const result = await axioslogin.patch('/bank', postBank)
      const { message, success } = result.data;
      if (success === 2) {
        getFormdata(resetFrom)
        setCount(count + 1)
        succesNofity(message);
        setbankmast(0)
      } else if (success === 0) {
        infoNofity(message.sqlMessage);
      } else {
        infoNofity(message)
      }
    } else {
      const result = await axioslogin.post('/bank', postData)
      const { message, success } = result.data
      if (success === 1) {
        succesNofity(message)
        setCount(count + 1)
        setbankmast(0)
        getFormdata(resetFrom)
      } else if (success === 0) {
        infoNofity(message.sqlMessage)
      } else {
        infoNofity(message)
      }
    }

  }, [postData, flag, count, postBank, resetFrom])

  useEffect(() => {
    const getTableData = async () => {
      const result = await axioslogin.get('/bank');
      const { success, data } = result.data;
      if (success === 1) {
        setTableData(data);
        setCount(0)
      } else {
        setTableData([])
      }
    }
    getTableData();
  }, [count]);

  const [columnDef] = useState([
    { headerName: 'Sl No', field: 'bank_slno' },
    { headerName: 'Bank Name', field: 'bankmast_name', filter: true, width: 150 },
    { headerName: 'Branch Name', field: 'bank_name', filter: true, width: 150 },
    { headerName: 'IFSC', field: 'bank_ifsc', filter: true, width: 150 },
    { headerName: 'Status ', field: 'status', width: 100 },
    {
      headerName: 'Edit', cellRenderer: params =>
        <IconButton sx={{ paddingY: 0.5 }} onClick={() => getEdit(params)} >
          <EditIcon color='primary' />
        </IconButton>
    },
  ])

  const getEdit = useCallback((params) => {
    setFlag(1)
    const { bank_slno, bank_name, bank_ifsc, bank_address, bankmast_slno, bank_status } = params.data
    const frmdata = {
      bank_name: bank_name,
      bank_ifsc: bank_ifsc,
      bank_address: bank_address,
      bank_status: bank_status === 1 ? true : false
    }
    getFormdata(frmdata)
    setbankmast(bankmast_slno)
    setSlno(bank_slno)
  }, [])

  return (
    <MasterLayout title="Board Master" displayClose={true} >
      <ToastContainer />
      <SessionCheck />
      <Box sx={{ width: "100%" }} >
        <Grid container spacing={1}>
          <Grid item xl={3} lg={2}>
            <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
              <BankSelection value={bankmast} setValue={setbankmast} />
            </Box>
            <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
              <InputComponent
                placeholder={'Bank Name*'}
                type="text"
                size="sm"
                name="bank_name"
                value={bank_name}
                onchange={(e) => updateFormData(e)}
              />
            </Box>
            <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
              <InputComponent
                placeholder={'Branch IFSC Code*'}
                type="text"
                size="sm"
                name="bank_ifsc"
                value={bank_ifsc}
                onchange={(e) => updateFormData(e)}
              />
            </Box>
            <Box sx={{ width: "100%", px: 1, mt: 0.5 }}>
              <InputComponent
                placeholder={'Address*'}
                type="text"
                size="sm"
                name="bank_address"
                value={bank_address}
                onchange={(e) => updateFormData(e)}
              />
            </Box>
            <Box sx={{ pl: 1, mt: 0.5 }} >
              <JoyCheckbox
                label='Status'
                checked={bank_status}
                name="bank_status"
                onchange={(e) => updateFormData(e)}
              />
            </Box>
            <Box sx={{ px: 0.5, mt: 0.9 }}>
              <CssVarsProvider>
                <Button
                  variant="outlined"
                  component="label"
                  size="md"
                  color="primary"
                  onClick={postFormData}
                >
                  <SaveIcon />
                </Button>
              </CssVarsProvider>
            </Box>
          </Grid>
          <Grid item xs={9} lg={9} xl={9} md={9}>
            <CommonAgGrid
              columnDefs={columnDef}
              tableData={tableData}
              sx={{
                height: 400,
                width: "100%"
              }}
              rowHeight={30}
              headerHeight={30}
            />
          </Grid>
        </Grid>
      </Box>
    </MasterLayout>
    // <Fragment>
    //   <SessionCheck />
    //   <ToastContainer />
    //   <div className="card">
    //     <div className="card-header bg-dark pb-0 border border-dark text-white">
    //       <h5>Bank Master</h5>
    //     </div>
    //     <div className="card-body">
    //       <div className="row">
    //         <div className="col-md-4">
    //           <form className={classes.root} onSubmit={postFormData} >
    //             <div className="row g-2">
    //               <div className="col-md-12 ">
    //                 <BankSelection style={SELECT_CMP_STYLE} onChange={handlechange} value={bankmast} setValue={setbankmast} />
    //               </div>
    //               <div className="col-md-12 ">
    //                 <TextField
    //                   style={{ paddingLeft: 0, marginLeft: 1 }}
    //                   label="Branch Name"
    //                   fullWidth
    //                   size="small"
    //                   autoComplete="off"
    //                   variant="outlined"
    //                   required
    //                   name="bank_name"
    //                   value={bank_name}
    //                   onChange={(e) => updateFormData(e)}
    //                 />
    //               </div>
    //               <div className="col-md-12">
    //                 <TextField
    //                   style={{ paddingLeft: 0, marginLeft: 1 }}
    //                   label="Branch IFSC Code"
    //                   fullWidth
    //                   size="small"
    //                   autoComplete="off"
    //                   variant="outlined"
    //                   required
    //                   name="bank_ifsc"
    //                   value={bank_ifsc}
    //                   onChange={(e) => updateFormData(e)}
    //                 />
    //               </div>
    //               <div className="col-md-12">
    //                 <TextField
    //                   style={{ paddingLeft: 0, marginLeft: 1 }}
    //                   label="Address"
    //                   fullWidth
    //                   size="small"
    //                   autoComplete="off"
    //                   variant="outlined"
    //                   required
    //                   name="bank_address"
    //                   value={bank_address}
    //                   onChange={(e) => updateFormData(e)}
    //                 />
    //               </div>
    //               <div className="col-md-12 pb-0 mb-0">
    //                 <FormControlLabel
    //                   className="pb-0 mb-0"
    //                   control={
    //                     <Checkbox
    //                       name="bank_status"
    //                       color="primary"
    //                       value={bank_status}
    //                       checked={bank_status}
    //                       className="ml-2"
    //                       onChange={(e) => updateFormData(e)}
    //                     />
    //                   }
    //                   label="Status"
    //                 />
    //               </div>
    //               <div className="row col-md-12">
    //                 <div className="col-md-6 col-sm-12 col-xs-12 mb-1">
    //                   <Button
    //                     variant="contained"
    //                     color="primary"
    //                     size="small"
    //                     fullWidth
    //                     type="Submit"
    //                     className="ml-2"
    //                   >
    //                     Save
    //                   </Button>
    //                 </div>
    //                 <div className="col-md-6 col-sm-12 col-xs-12">
    //                   <Button
    //                     variant="contained"
    //                     color="primary"
    //                     size="small"
    //                     fullWidth
    //                     className="ml-2"
    //                     onClick={toSettings}
    //                   >
    //                     Close
    //                   </Button>
    //                 </div>
    //               </div>
    //             </div>
    //           </form>
    //         </div>
    //         <div className="col-md-8">
    //           <BankMastTable update={count} />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Fragment >
  )
}

export default memo(BankMaster) 
