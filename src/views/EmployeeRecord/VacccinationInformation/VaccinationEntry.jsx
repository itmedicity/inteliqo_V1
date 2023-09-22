import { Box, Paper, TextField, Tooltip } from '@mui/material'
import React, { lazy, useCallback, useState } from 'react'
import CustomLayout from 'src/views/Component/MuiCustomComponent/CustomLayout'
import SearchIcon from '@mui/icons-material/Search'
import { Button } from '@mui/joy'
import { axioslogin } from 'src/views/Axios/Axios'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { warningNofity } from 'src/views/CommonCode/Commonfunc'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'underscore'
import { setVaccination } from 'src/redux/actions/Vaccination.Action'
import { memo } from 'react'

const Entryinformation = lazy(() => import('./EntryInformation'))
const Modalentry = lazy(() => import('./Modalentry'))

const VaccinationEntry = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [emid, getEmno] = useState(0)
  const [details, setDetails] = useState({})
  const [count, setcount] = useState(0)
  const [searchId, setSearchId] = useState(0)
  // const [data, setdata] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    if (searchId !== 0) {
      dispatch(setVaccination(searchId))
    } else {
      dispatch(setVaccination())
    }
  }, [searchId, count, dispatch])

  const vaccinationList = useSelector((state) => state.setVaccinationemp.VaccinationList, _.isEqual)

  const handleIconClick = useCallback(async () => {
    const response = await axioslogin.get(`/Vaccination/getdataVaccination/${emid}`)
    const { success, data } = response.data

    // setdata(data)

    if (data === undefined || data.length === 0) {
      warningNofity('Employee not found')
    } else {
      const { first_dose_given_status, booster_dose_given_status } = data[0]

      if (success === 1) {
        if (first_dose_given_status === 1 || booster_dose_given_status === 1) {
          setSearchId(emid)
          // setdata(data)
        } else {
          warningNofity('Vaccination date not given by HR')
        }
      } else {
        warningNofity('Employee not found')
      }
    }
  }, [emid])

  useEffect(() => {
    if (Object.keys(vaccinationList).length !== 0) {
      const {
        booster_dose_due_date,
        booster_dose_given_date,
        firstdose_date,
        second_dose_due_date,
        second_dose_given_date,
        third_dose_due_date,
        third_dose_given_date,
        em_name,
        dept_name,
        group_name,
        em_mobile,
        em_no,
        sect_name,
        first_dose_status,
        second_dose_status,
        booster_dose_given_status,
        third_dose_status,
        first_dose_given_status,
        first_dose_given_date,
        booster_dose_status,
        booster_dose_date_given,
        vaccin_slno,
        em_id,
        remark,
        remarksecond,
        remarkthird,
        remarkbooster,
        hic_frst_dose_status,
        hic_second_dose_status,
        hic_third_dose_status,
        hic_booster_dose_status,
      } = vaccinationList[0]
      const details = {
        em_name: em_name,
        dept_name: dept_name,
        group_name: group_name,
        em_mobile: em_mobile,
        booster_dose_due_date: booster_dose_due_date,
        booster_dose_given_date: booster_dose_given_date,
        firstdose_date: firstdose_date,
        second_dose_due_date: second_dose_due_date,
        second_dose_given_date: second_dose_given_date,
        third_dose_due_date: third_dose_due_date,
        third_dose_given_date: third_dose_given_date,
        em_no: em_no,
        sect_name: sect_name,
        first_dose_status: first_dose_status,
        second_dose_status: second_dose_status,
        third_dose_status: third_dose_status,
        first_dose_given_status: first_dose_given_status,
        booster_dose_given_status: booster_dose_given_status,
        first_dose_given_date: first_dose_given_date,
        booster_dose_status: booster_dose_status,
        booster_dose_date_given: booster_dose_date_given,
        vaccin_slno: vaccin_slno,
        em_id: em_id,
        remark: remark,
        remarksecond: remarksecond,
        remarkthird: remarkthird,
        remarkbooster: remarkbooster,
        hic_frst_dose_status: hic_frst_dose_status,
        hic_second_dose_status: hic_second_dose_status,
        hic_third_dose_status: hic_third_dose_status,
        hic_booster_dose_status: hic_booster_dose_status,
      }
      setDetails(details)
      setcount(0)
    } else {
      setDetails({})
    }
  }, [vaccinationList, count])

  return (
    <CustomLayout title="Vacccination entry" displayClose={true}>
      <ToastContainer />
      <Box sx={{ display: 'flex', flexDirection: 'column', mt: 1, width: '100%' }}>
        <Paper
          sx={{
            display: 'flex',
            flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
            flexDirection: 'row',
            width: '100%',
            p: 1,
          }}
        >
          <Box sx={{ width: '30%' }}>
            <Tooltip title="Employee Number" followCursor placement="top" arrow>
              <Box sx={{ mt: 0.5, px: 0.3 }}>
                <TextField
                  fullWidth
                  id="fullWidth"
                  size="small"
                  value={emid}
                  // label="employee number"
                  onChange={(e) => getEmno(e.target.value)}
                />
              </Box>
            </Tooltip>
          </Box>

          <Box sx={{ flex: 1, px: 0.3, ml: 1 }}>
            <Button
              aria-label="Like"
              variant="outlined"
              color="neutral"
              onClick={() => handleIconClick()}
              sx={{
                color: '#81c784',
              }}
            >
              <SearchIcon />
            </Button>
          </Box>
        </Paper>

        {/* modal part */}

        <Modalentry
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          details={details}
          count={count}
          setcount={setcount}
        />

        {/* entry information part */}

        <Box>
          <Entryinformation details={details} setIsModalOpen={setIsModalOpen} />{' '}
        </Box>
      </Box>
    </CustomLayout>
  )
}

export default memo(VaccinationEntry)
