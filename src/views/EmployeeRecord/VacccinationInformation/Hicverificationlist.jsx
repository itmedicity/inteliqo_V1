import { Box, Button } from '@mui/joy'
import React, { useState, useEffect } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import DeptSelectByRedux from 'src/views/MuiComponents/DeptSelectByRedux'
import DeptSecSelectByRedux from 'src/views/MuiComponents/DeptSecSelectByRedux'
import { Tooltip, TextField } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import { infoNofity } from 'src/views/CommonCode/Commonfunc'
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges'
import CommonAgGrid from 'src/views/Component/CommonAgGrid'
import { ToastContainer } from 'react-toastify'
import { IconButton as OpenIcon } from '@mui/material'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline'
import { pdfdownlod } from './HicPdf'
import ProfilePicDefault from 'src/assets/images/nosigature.jpg'
import { urlExist } from 'src/views/Constant/Constant'
import { PUBLIC_NAS_FOLDER } from 'src/views/Constant/Static'
import { useCallback } from 'react'
import { memo } from 'react'

const Hicverificationlist = () => {
  const [dept, setDept] = useState(0)
  const [deptSection, setDeptSection] = useState(0)
  const [Empno, setEmpNo] = useState('')
  const [nameList, setnameList] = useState([])
  const [details, setDetails] = useState({})

  const [src, setSrc] = useState(ProfilePicDefault)
  const [srcsecond, setSrcsecond] = useState(ProfilePicDefault)
  const [srcthird, setSrcthird] = useState(ProfilePicDefault)
  const [srcbooster, setSrcbooster] = useState(ProfilePicDefault)

  const [download, setDownload] = useState(0)
  const [vaccinData, setVaccineData] = useState([])

  useEffect(() => {
    if (Object.keys(nameList).length !== 0) {
      const {
        hic_emid_booster_verified,
        hic_emid_first_verified,
        hic_emid_second_verified,
        hic_emid_third_verified,
      } = nameList[0]
      const details = {
        hic_emid_booster_verified: hic_emid_booster_verified,
        hic_emid_first_verified: hic_emid_first_verified,
        hic_emid_second_verified: hic_emid_second_verified,
        hic_emid_third_verified: hic_emid_third_verified,
      }
      setDetails(details)
    } else {
      setDetails({})
    }
  }, [nameList])

  const getEmpNO = async (e) => {
    setEmpNo(e.target.value)
  }

  const dataDisplay = useCallback(async () => {
    if (dept !== 0 && deptSection !== 0 && Empno === '') {
      const postData = {
        em_department: dept,
        em_dept_section: deptSection,
      }
      // for dep and dep section
      const result = await axioslogin.post('/Vaccination/create', postData)
      const { success, data } = result.data
      if (success === 1) {
        const hicverifed =
          data?.filter(
            (val) =>
              (val.hic_frst_dose_status === 1 &&
                val.hic_second_dose_status === 1 &&
                val.hic_third_dose_status === 1) ||
              val.hic_booster_dose_status === 1,
          )
        setnameList(hicverifed)
      } else {
        infoNofity('No employee exist with this employee number!!')
        setnameList([])
      }
    } else if (dept !== 0 && deptSection === 0 && Empno === '') {
      infoNofity('Select Department Section')
    } else if (dept === 0 && deptSection === 0 && Empno === '') {
      infoNofity('Select Department Section')
    } else {
      // search by emid
      const result = await axioslogin.get(`/Vaccination/getAll/${Empno}`)
      const { data, success } = result.data

      if (success === 1) {
        setnameList(data)
      } else {
        infoNofity('No employee exist with this employee number!!')
        setnameList([])
      }
    }
  }, [dept, deptSection, Empno, setnameList])

  // for signature
  useEffect(() => {
    const getEmployeeSig = async () => {
      if (details.hic_emid_first_verified > 0) {
        const profilePic = JSON.stringify(
          `${PUBLIC_NAS_FOLDER + details.hic_emid_first_verified}/signature/signature.jpg`,
        )
        urlExist(profilePic, (status) => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)

            setSrc(picUrl)
          } else {
            setSrc(ProfilePicDefault)
          }
        })
      }
    }
    getEmployeeSig()

    const getEmployeeSigsecond = async () => {
      if (details.hic_emid_second_verified > 0) {
        const profilePic = JSON.stringify(
          `${PUBLIC_NAS_FOLDER + details.hic_emid_second_verified}/signature/signature.jpg`,
        )
        urlExist(profilePic, (status) => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setSrcsecond(picUrl)
          } else {
            setSrc(ProfilePicDefault)
          }
        })
      }
    }
    getEmployeeSigsecond()
    const getEmployeeSigthird = async () => {
      if (details.hic_emid_third_verified > 0) {
        const profilePic = JSON.stringify(
          `${PUBLIC_NAS_FOLDER + details.hic_emid_third_verified}/signature/signature.jpg`,
        )
        urlExist(profilePic, (status) => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setSrcthird(picUrl)
          } else {
            setSrc(ProfilePicDefault)
          }
        })
      }
    }
    getEmployeeSigthird()
    const getEmployeeSigbooster = async () => {
      if (details.hic_emid_booster_verified > 0) {
        const profilePic = JSON.stringify(
          `${PUBLIC_NAS_FOLDER + details.hic_emid_booster_verified}/signature/signature.jpg`,
        )
        urlExist(profilePic, (status) => {
          if (status === true) {
            const picUrl = JSON.parse(profilePic)
            setSrcbooster(picUrl)
          } else {
            setSrc(ProfilePicDefault)
          }
        })
      }
    }
    getEmployeeSigbooster()
  }, [
    details.hic_emid_first_verified,
    details.hic_emid_second_verified,
    details.hic_emid_third_verified,
    details.hic_emid_booster_verified,
  ])

  const handleIconClick = useCallback((params) => {
    setDownload(1)
    setVaccineData(params.data)
  }, [])
  useEffect(() => {
    if (download === 1) {
      pdfdownlod(vaccinData, src, srcsecond, srcthird, srcbooster)
    } else {
      setDownload(0)
    }
  }, [download, vaccinData, src, srcsecond, srcthird, srcbooster])

  const processedData = nameList?.map((row) => ({
    em_no: row.em_no,
    em_name: row.em_name,
    dept_name: row.dept_name,
    sect_name: row.sect_name,
    hic_first_dose_date: row.hic_first_dose_date === null ? 'Nil' : row.hic_first_dose_date,
    hic_second_dose_date: row.hic_second_dose_date === null ? 'Nil' : row.hic_second_dose_date,
    hic_thirdt_dose_date: row.hic_thirdt_dose_date === null ? 'Nil' : row.hic_thirdt_dose_date,
    firstdesg: row.firstdesg === null ? 'Nil' : row.firstdesg,
    secdesg: row.secdesg === null ? 'Nil' : row.secdesg,
    thirddesg: row.thirddesg === null ? 'Nil' : row.thirddesg,
    boosterdesg: row.boosterdesg === null ? 'Nil' : row.boosterdesg,
    hic_boostert_dose_date:
      row.hic_boostert_dose_date === null ? 'Nil' : row.hic_boostert_dose_date,
    blood: row.group_name,
    age: row.em_age_year,
    dob: row.em_dob,
    doj: row.em_doj,
    desgn: row.desg_name,
    gender: row.em_gender === 1 ? 'Male' : row.em_gender === 2 ? 'Female' : 'Nil',
    em_name_first_verified:
      row.em_name_first_verified === null ? 'Nil' : row.em_name_first_verified,
    em_name_second_verified:
      row.em_name_second_verified === null ? 'Nil' : row.em_name_second_verified,
    em_name_third_verified:
      row.em_name_third_verified === null ? 'Nil' : row.em_name_third_verified,
    em_name_booster_verified:
      row.em_name_booster_verified === null ? 'Nil' : row.em_name_booster_verified,
    first_verified: row.first_verified === null ? 'Nil' : row.first_verified,
    second_verified: row.second_verified === null ? 'Nil' : row.second_verified,
    third_verified: row.third_verified === null ? 'Nil' : row.third_verified,
    booster_verified: row.booster_verified === null ? 'Nil' : row.booster_verified,
    firstdose_date: row.firstdose_date === null ? 'Nil' : row.firstdose_date,
    second_dose_given_date:
      row.second_dose_given_date === null ? 'Nil' : row.second_dose_given_date,
    third_dose_given_date: row.third_dose_given_date === null ? 'Nil' : row.third_dose_given_date,
    booster_dose_given_date:
      row.booster_dose_given_date === null ? 'Nil' : row.booster_dose_given_date,
  }))

  const [columnDef] = useState([
    { headerName: 'Emp No', field: 'em_no', minWidth: 90 },
    { headerName: 'Employee Name', field: 'em_name', minWidth: 90 },
    { headerName: 'Department', field: 'dept_name', minWidth: 90 },
    { headerName: 'Department Section', field: 'sect_name', minWidth: 90 },
    { headerName: 'Hic FirstDose Verified Date', field: 'hic_first_dose_date', minWidth: 150 },
    { headerName: 'Hic SecondDose Verified Date', field: 'hic_second_dose_date', minWidth: 150 },
    { headerName: 'Hic ThirdDose Verified Date', field: 'hic_thirdt_dose_date', minWidth: 150 },
    { headerName: 'Hic BoosterDose Verified Date', field: 'hic_boostert_dose_date', minWidth: 150 },
    {
      headerName: 'Action',
      cellRenderer: (params) => {
        return (
          <OpenIcon
            sx={{ p: 0.1 }}
            fontSize="small"
            color="primary"
            onClick={() => handleIconClick(params)}
          >
            <Tooltip title="Click Here to download pdf">
              <DownloadForOfflineIcon />
            </Tooltip>
          </OpenIcon>
        )
      },
    },
  ])

  // Now you can use 'processedData' with 'columnDef' in your ag-Grid component

  return (
    <CustomLayout title="Vacccination entry" displayClose={true}>
      <ToastContainer />
      <Box
        sx={{ display: 'flex', flex: 1, px: 0.8, mt: 0.3, flexDirection: 'column', width: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
            flexDirection: 'row',
            width: '100%',
          }}
        >
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
            <DeptSelectByRedux setValue={setDept} value={dept} />
          </Box>
          <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
            <DeptSecSelectByRedux dept={dept} setValue={setDeptSection} value={deptSection} />
          </Box>
          <Tooltip title="Employee Number" followCursor placement="top" arrow>
            <Box sx={{ flex: 1, mt: 0.5, px: 0.3 }}>
              <TextField fullWidth id="fullWidth" size="small" onChange={getEmpNO} />
            </Box>
          </Tooltip>

          <Box sx={{ flex: 1, px: 0.3 }}>
            <Button
              aria-label="Like"
              variant="outlined"
              color="neutral"
              onClick={dataDisplay}
              sx={{
                color: '#81c784',
              }}
            >
              <PublishedWithChangesIcon />
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', pt: 1, width: '100%' }}>
          <CommonAgGrid
            columnDefs={columnDef}
            tableData={processedData}
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
  )
}

export default memo(Hicverificationlist)
