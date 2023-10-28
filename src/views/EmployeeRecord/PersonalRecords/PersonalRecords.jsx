import React, { useState, useCallback, useMemo, useEffect, lazy, memo } from 'react'
import { Box, Tooltip, Button, } from '@mui/joy'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { infoNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput'
import SearchIcon from '@mui/icons-material/Search';


const Document = lazy(() => import('./PersonalDocument/Document'))
const Viewpage = lazy(() => import('./PersonalDocument/EmployeeFileCheck/Viewpage'))
const Viewpageall = lazy(() => import('./PersonalDocument/Viewpageall'))

const PersonalRecords = () => {
  const [flag, setflag] = useState(0)
  const [dept, changeDept] = useState(0);
  const [section, changeSection] = useState(0);
  const [Files, setFiles] = useState([])
  const [src, setSrc] = useState([])
  const [empNo, setEmpNo] = useState("");
  const dispatch = useDispatch();
  const [selectedRowData, setSelectedRowData] = useState({})
  const [tableData, setTableData] = useState([])

  // dispatch the department data
  useEffect(() => {
    dispatch(setDepartment());
  }, [dispatch,])

  const postData = useMemo(() => {
    return {
      dept_id: dept,
      sect_id: section
    }
  }, [dept, section])

  const postDataDept = useMemo(() => {
    return { dept_id: dept }
  }, [dept])

  //  Employee Record List
  const handleOnClickFuntion = useCallback((e) => {
    e.preventDefault()
    const submitfunc = async () => {

      if (dept !== 0 && section !== 0) {
        const result = await axioslogin.post('/empmast/getEmpDet', postData)
        const { success, data, message } = result.data
        if (success === 1) {
          setTableData(data)
        }
        else {
          warningNofity(message)
        }
      }
      else if (dept !== 0 && section === 0) {
        const result = await axioslogin.post('/empmast/empmaster/getdeptByDept', postDataDept)
        const { success, data, message } = result.data
        if (success === 1) {
          setTableData(data)
        }
        else {
          warningNofity(message)
        }
      }
      // else if (dept !== 0 && section !== 0) {
      //   console.log("emp");
      //   const result = await axioslogin.post('/empmast/getEmpDetInactive', postData)
      //   const { success, data, message } = result.data
      //   if (success === 1) {
      //     setTableData(data)

      //   }
      //   else {
      //     warningNofity(message)
      //   }
      // }
      else if (dept === 0 && section === 0 && empNo !== 0) {

        const result = await axioslogin.get(`/empearndeduction/getAll/${empNo}`)
        const { data, success } = result.data;
        if (success === 1) {
          setTableData(data);
        } else {
          infoNofity("No employee exist with this employee number!!")
          setTableData([]);
        }
      }
      else {
        warningNofity("Choose All Option")
      }
    }
    submitfunc()
  }, [postDataDept, postData, dept, section, empNo])

  const handleClick = useCallback((params) => {
    setflag(1)
    setSelectedRowData(params.data);

  }, [setflag])


  const [columnDef] = useState([
    {
      headerName: 'Action', minWidth: 100,
      cellRenderer: params =>
        <Tooltip title="Profile View" followCursor placement='top' arrow >
          <Box sx={{ color: "#90caf9", cursor: 'pointer', }} size='sm' onClick={() => handleClick(params)}>
            <AccountCircleOutlinedIcon />
          </Box>
        </Tooltip>
    },
    { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
    { headerName: 'Employee Name', field: 'emp_name', minWidth: 90 },
    { headerName: 'Department', field: 'dept_name', minWidth: 90 },
    { headerName: 'Department Section', field: 'sect_name', minWidth: 90 },
  ])
  return (
    <>
      {
        flag === 1 ? (<Document selectedRowData={selectedRowData} setflag={setflag} setFiles={setFiles} Files={Files} setSrc={setSrc} src={src} />) :
          flag === 2 ? (<Viewpage src={src} setflag={setflag} />) :
            flag === 3 ? (<Viewpageall Files={Files} setflag={setflag} />) :
              <CustomLayout title="Personal Records" displayClose={true}>
                <Box
                  sx={{ display: 'flex', flex: 1, px: 0.6, mt: 0.3, flexDirection: 'column', width: '100%', }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                      flexDirection: 'row',
                      width: '100%',
                    }}
                  >
                    <Box sx={{ flex: 1, mt: 0.8, px: 0.2 }}>
                      <DepartmentDropRedx getDept={changeDept} />
                    </Box>
                    <Box sx={{ flex: 1, mt: 0.8, px: 0.3 }}>
                      <DepartmentSectionRedx getSection={changeSection} />

                    </Box>
                    <Tooltip title="Employee Number" followCursor placement='top' arrow>
                      <Box sx={{ flex: 1, px: 0.5, mt: 0.8 }}>
                        <JoyInput
                          size="sm"
                          value={empNo}
                          onchange={setEmpNo}
                        />

                      </Box>
                    </Tooltip>

                    <Box sx={{ flex: 1, px: 0.3, mt: 0.7 }}>
                      <Button
                        aria-label="Like"
                        variant="outlined"
                        color="neutral"
                        onClick={handleOnClickFuntion}
                        sx={{
                          color: '#81c784',
                        }}
                      >
                        <SearchIcon />
                      </Button>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, width: '100%' }}>
                    <CommonAgGrid
                      columnDefs={columnDef}
                      tableData={tableData}
                      sx={{
                        height: 600,
                        width: '100%',
                      }}
                      rowHeight={30}
                      headerHeight={30}
                    />
                  </Box>
                </Box>
              </CustomLayout>
      }
    </>

  )
}

export default memo(PersonalRecords)