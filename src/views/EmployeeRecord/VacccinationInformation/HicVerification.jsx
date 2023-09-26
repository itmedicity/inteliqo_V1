import { Box, Paper, Typography, IconButton } from '@mui/material'
import React, { useCallback } from 'react'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { useState } from 'react'
import { useEffect } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'
import { lazy } from 'react'
import { ToastContainer } from 'react-toastify'
import { memo } from 'react'

const Firstdose = lazy(() => import('./Firstdose'))
const Seconddose = lazy(() => import('./Seconddose'))
const ThirdDose = lazy(() => import('./ThirdDose'))
const Boosterdose = lazy(() => import('./Booster'))
const Modalhic = lazy(() => import('./Modalhic'))

const HicVerification = () => {
  // const [data, setdata] = useState([])
  const [item, setitem] = useState({})
  const [count, setCount] = useState(0)
  const [showGeneral, setShowGeneral] = useState(0)
  const [booster, boosterdosevac] = useState(0)
  const [first, firstvac] = useState(0)
  const [second, secondvac] = useState(0)
  const [third, thirdvac] = useState(0)
  const [flag, setflag] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRowData, setSelectedRowData] = useState({})
  const [hicdata, sethicdata] = useState([])

  const main = [
    { id: 1, name: 'First Dose Verification Pending', count: first },
    { id: 2, name: 'Second Dose Verification Pending', count: second },
    { id: 3, name: 'Third Dose Verification Pending', count: third },
    { id: 4, name: 'Booster Dose  Verification Pending', count: booster },
  ]
  useEffect(() => {
    const loaddata = async () => {
      const result = await axioslogin.get('/Vaccination/get/all')
      const { success, data } = result.data

      if (success === 1) {
        // setdata(data)
        setitem(data)
        // booster dose   vaccinated
        const boosterdose =
          data?.filter((val) => val.booster_dose_status === 1 && val.hic_booster_dose_status === 0)
        boosterdosevac(boosterdose.length)
        // firstdose vaccinated
        const firstdosevac =
          data?.filter((val) => val.first_dose_status === 1 && val.hic_frst_dose_status === 0)
        firstvac(firstdosevac.length)
        // second dose vaccinated
        const seconddosevacc =
          data?.filter(
            (val) =>
              val.first_dose_status === 1 &&
              val.second_dose_status === 1 &&
              val.hic_second_dose_status === 0,
          )
        secondvac(seconddosevacc.length)
        // third dose vaccinated
        const thirddosevac =
          data?.filter(
            (val) =>
              val.third_dose_status === 1 &&
              val.second_dose_status === 1 &&
              val.third_dose_status === 1 &&
              val.hic_third_dose_status === 0,
          )
        thirdvac(thirddosevac.length)
        setCount(0)
      } else {
        setitem([])
      }
    }
    loaddata()
  }, [count])

  const handleClick =useCallback( (e, item) => {
    setShowGeneral(item.id)
    setflag(1)
  },[])
  
  return (
    <Box>
      <ToastContainer />
      {showGeneral === 1 ? (
        <Firstdose
          item={item}
          setCount={setCount}
          count={count}
          setShowGeneral={setShowGeneral}
          flag={flag}
          setIsModalOpen={setIsModalOpen}
          setSelectedRowData={setSelectedRowData}
          selectedRowData={selectedRowData}
          sethicdata={sethicdata}
          hicdata={hicdata}
        />
      ) : showGeneral === 2 ? (
        <Seconddose
          item={item}
          setCount={setCount}
          count={count}
          setShowGeneral={setShowGeneral}
          flag={flag}
          setIsModalOpen={setIsModalOpen}
          setSelectedRowData={setSelectedRowData}
          selectedRowData={selectedRowData}
          sethicdata={sethicdata}
          hicdata={hicdata}
        />
      ) : showGeneral === 3 ? (
        <ThirdDose
          item={item}
          setCount={setCount}
          count={count}
          setShowGeneral={setShowGeneral}
          flag={flag}
          setIsModalOpen={setIsModalOpen}
          setSelectedRowData={setSelectedRowData}
          selectedRowData={selectedRowData}
          sethicdata={sethicdata}
          hicdata={hicdata}
        />
      ) : showGeneral === 4 ? (
        <Boosterdose
          item={item}
          setCount={setCount}
          count={count}
          setShowGeneral={setShowGeneral}
          flag={flag}
          setIsModalOpen={setIsModalOpen}
          setSelectedRowData={setSelectedRowData}
          selectedRowData={selectedRowData}
          sethicdata={sethicdata}
          hicdata={hicdata}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            p: 2,
            justifyContent: 'space-between',

            '@media (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          {main?.map((item, index) => (
            <Paper
              key={index}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 1,
                width: '32.5%',
                '@media (max-width: 600px)': {
                  width: '100%',
                  marginBottom: 1,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    backgroundColor: '#E2F6CA',
                    borderRadius: '50%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.7,
                  }}
                >
                  <VaccinesIcon sx={{ color: '#81c784' }} />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      padding: '4px',
                      borderRadius: '8px',
                      marginRight: 'auto',
                    }}
                  >
                    <Typography sx={{ fontSize: 18 }}>{item.name}</Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    border: '2px solid #E2F6CA',
                    padding: '4px',
                    borderRadius: '8px',
                    width: '15%',
                  }}
                >
                  <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                    {item.count}
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  borderTop: 2,
                  borderColor: '#D6E6F2',
                  marginTop: 1,
                  alignItems: 'center',
                  cursor: 'pointer',
                  mt: 2,
                }}
                onClick={(e) => {
                  handleClick(e, item)
                }}
              >
                <Box sx={{ p: 1, mt: 1 }}>
                  <Typography>Employees</Typography>
                </Box>
                <Box sx={{ ml: 1, mt: 1 }}>
                  <IconButton
                    // variant="outlined"
                    size="small"
                    color="success"
                    // sx={{ width: '50px' }}
                  >
                    <ArrowRightAltIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      )}
      <Modalhic
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedRowData={setSelectedRowData}
        selectedRowData={selectedRowData}
        sethicdata={sethicdata}
        hicdata={hicdata}
        // details={details}
        count={count}
        setCount={setCount}
      />
    </Box>
  )
}

export default memo(HicVerification)
