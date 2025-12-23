import * as React from 'react'
import { Box, Typography, Button, Card, Sheet } from '@mui/joy'
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded'
import { RiFileExcel2Fill } from 'react-icons/ri'
import * as XLSX from 'xlsx'
import { useState } from 'react'
import { useRef } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { errorNofity, succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { format, isValid } from 'date-fns'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { useCallback } from 'react'
import { employeeIdNumber } from 'src/views/Constant/Constant'
import { useQuery, useQueryClient } from 'react-query'
import { getDoctorPunchLog } from 'src/redux/reduxFun/useQueryFunctions'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'

export default function DoctorsPunchUpload() {
  const queryClient = useQueryClient()
  const fileInputRef = useRef()
  const [files, setFiles] = useState('')
  const [insertArray, setInsertArray] = useState([])

  const { data: doctorlog } = useQuery({
    queryKey: ['doctorLog'],
    queryFn: getDoctorPunchLog,
  })

  const handleUploadClick = () => {
    fileInputRef.current.click()
  }

  function readExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheetName = workbook.SheetNames[0] // First sheet (Sheet1)
        const sheet = workbook.Sheets[sheetName]
        const rows = XLSX.utils.sheet_to_json(sheet)

        // Ensure Attendance ID is string
        const formatted = rows?.map((row) => ({
          sNo: row['S.No'],
          attendanceId: row['Attendance ID']
            ? String(row['Attendance ID']).padStart(8, '0')
            : row['Attendance id']
            ? String(row['Attendance id']).padStart(8, '0')
            : '',
          userName: row['User Name'],
          designation: row['Designation'],
          inTime: row['In Time'],
          outTime: row['Out Time'],
          status: row['Status'],
        }))

        resolve(formatted)
      }
      reader.onerror = (err) => reject(err)
      reader.readAsArrayBuffer(file)
    })
  }

  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0]

      setFiles(file)

      if (!file) {
        warningNofity('No file selected!')
        return
      }

      const data = await readExcel(file) // array of objects

      const arr = data?.map((item) => {
        const newItem = {}
        Object.keys(item).forEach((key) => {
          const newKey = key.replace(/\s+/g, '_')

          // Handle Excel date serial for "In Time" and "Out Time"
          if (['inTime', 'outTime'].includes(key) && typeof item[key] === 'number') {
            const date = XLSX.SSF.parse_date_code(item[key])
            if (date) {
              // Format as "YYYY-MM-DD HH:mm"
              newItem[newKey] = `${date.y}-${String(date.m).padStart(2, '0')}-${String(
                date.d,
              ).padStart(2, '0')} ${String(date.H).padStart(2, '0')}:${String(date.M).padStart(
                2,
                '0',
              )}`
            } else {
              newItem[newKey] = item[key] // fallback
            }
          } else {
            newItem[newKey] = item[key]
          }
        })
        return newItem
      })

      const nmc_regnoList = arr?.map((val) => val?.attendanceId)
       setInsertArray(arr)
    } catch (error) {
      warningNofity(
        'An error occurred while processing the file. Please check the file format and try again.',
      )
    }
  }

  const handleSubmit = useCallback(async () => {
   
    const insertData={
      insertArray:insertArray
    }

    const insertDutyPunch = await axioslogin.post('/DoctorsProcess/insert/doctorpunch', insertData)
    const { success: succ, message,data:doctorData } = insertDutyPunch.data
    if (succ === 1) {
   const newArray = insertArray
  ?.map((i) => {
    const array = doctorData?.find(
      (value) => value?.nmc_regno === i?.attendanceId
    );

    if (!array) return null;

    const date = i?.inTime ? new Date(i.inTime) : null;

    return {
      ...i,
      emp_id: array.em_id,
      em_no: array.em_no,
      duty_day:
        date && isValid(date)
          ? format(date, 'yyyy-MM-dd')
          : null,
    };
  })
  .filter(Boolean);
       const postData = {
      em_id: employeeIdNumber(),
      insertArray: newArray,
    }
      const result = await axioslogin.patch('/DoctorsProcess/nmcPunchupload', postData)
          const { success } = result.data
          if (success === 1) {
            succesNofity(' Inserted Successfully')
          } else {
            errorNofity('Inserting Dutyplan')
          }     
    } else {
      warningNofity(message)
    }
  }, [insertArray, queryClient])

  return (
    <CustomLayout title="NMC Doctor Punch Upload" displayClose={true}>
      <Sheet
        variant="outlined"
        sx={{
          p: 4,
          borderRadius: 'md',
          maxWidth: 500,
          mx: 'auto',
          mt: 8,
          bgcolor: 'background.body',
        }}
      >
        {/* Header */}
        <Typography level="h4" fontWeight="xl" mb={1}>
          Last Update Date :
          {doctorlog === undefined
            ? 'NIL'
            : format(new Date(doctorlog?.last_update_date), 'dd-MM-yyyy HH:mm a ')}
        </Typography>
        <Typography
          level="body-sm"
          textColor="text.tertiary"
          mb={3}
          sx={{ textTransform: 'capitalize' }}
        >
          Last Updated Person : {doctorlog?.em_name}
        </Typography>

        {/* Upload Section */}
        <Box display="flex" flexDirection="row" gap={2} mb={3} alignItems="stretch" flexWrap="wrap">
          {/* Click to upload */}
          <Card
            variant="outlined"
            sx={{
              minWidth: 180,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 2,
              px: 1,
              cursor: 'pointer',
            }}
            onClick={handleUploadClick}
          >
            <input ref={fileInputRef} type="file" hidden onChange={handleFileChange} />
            <Box
              display="flex"
              alignItems="center"
              gap={1}
              fontSize={40}
              sx={{ color: '#056a0dff' }}
            >
              <RiFileExcel2Fill color="primary" />
              <Typography level="body-md">Click to upload</Typography>
            </Box>
          </Card>

          <Card
            variant="soft"
            color={files?.length === 0 ? 'danger' : 'success'}
            sx={{
              minWidth: 200,
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              py: 1.5,
              px: 2,
              gap: 1,
              fontSize: 40,
            }}
          >
            {files?.length === 0 ? <HighlightOffIcon /> : <CheckCircleRoundedIcon />}
            <Box>
              <Typography level="body-sm" fontWeight="md">
                {files?.name}
              </Typography>
              <Typography
                level="body-xs"
                textColor={files?.length === 0 ? 'danger.plainColor' : 'success.plainColor'}
              >
                {files?.length === 0 ? 'No File uploaded' : 'Upload complete'}
              </Typography>
            </Box>
          </Card>
        </Box>

        {/* Upload now button */}
        <Button
          variant="solid"
          color="primary"
          fullWidth
          disabled={files?.length === 0}
          onClick={handleSubmit}
        >
          Upload Now
        </Button>
      </Sheet>
      {/* </Paper> */}
    </CustomLayout>
  )
}
