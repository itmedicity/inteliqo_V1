import React, { lazy, memo, useCallback, useState } from 'react'
import { Box } from '@mui/joy'
import { FaUserDoctor } from 'react-icons/fa6'
import { IoMdSchool } from 'react-icons/io'
import { FaHandHoldingMedical } from 'react-icons/fa'
import { MdOutlineCoPresent } from 'react-icons/md'
import { MdOutlineHealthAndSafety } from 'react-icons/md'
import { Paper } from '@mui/material'
import { screenInnerHeight } from 'src/views/Constant/Constant'
import {
  accademicdoctorList,
  alldoctorList,
  clinicaldoctorList,
  nmcpunchdoctorList,
  tmcpunchdoctorList,
  todayPresentDoctor,
} from 'src/redux/reduxFun/useQueryFunctions'
import { useQuery } from 'react-query'

const DashboardBox = lazy(() => import('./TileComponent'))
const ActiveDoctor = lazy(() => import('./components/DashboardReport'))

const Doctordashboard = () => {
  const [view, setView] = useState(0)

  const { data: allDoctor } = useQuery({
    queryKey: ['allDoctorList'],
    queryFn: alldoctorList,
  })

  const { data: clinicalDoctor } = useQuery({
    queryKey: ['clinicalDoctorList'],
    queryFn: clinicaldoctorList,
  })

  const { data: accademicDoctor } = useQuery({
    queryKey: ['accademicDoctorList'],
    queryFn: accademicdoctorList,
  })

  const { data: tmcpunchDoctor } = useQuery({
    queryKey: ['tmcpunchDoctorList'],
    queryFn: tmcpunchdoctorList,
  })

  const { data: nmcpunchDoctor } = useQuery({
    queryKey: ['nmcpunchDoctorList'],
    queryFn: nmcpunchdoctorList,
  })

  const { data: presentDoctor } = useQuery({
    queryKey: ['presentDoctorList'],
    queryFn: todayPresentDoctor,
  })

  const doctors = [
    { slno: 1, label: 'Total No of Doctors', value: allDoctor?.length, icon: <FaUserDoctor /> },
    { slno: 2, label: 'Academic Doctors', value: accademicDoctor?.length, icon: <IoMdSchool /> },
    {
      slno: 3,
      label: 'Clinical Doctors',
      value: clinicalDoctor?.length,
      icon: <FaHandHoldingMedical />,
    },
    {
      slno: 4,
      label: 'Today Present Doctors',
      value: presentDoctor?.length,
      icon: <MdOutlineCoPresent />,
    },
    {
      slno: 5,
      label: 'TMC Punched Doctors',
      value: tmcpunchDoctor?.length,
      icon: <MdOutlineCoPresent />,
    },
    {
      slno: 6,
      label: 'NMC Punched Doctors',
      value: nmcpunchDoctor?.length,
      icon: <MdOutlineHealthAndSafety />,
    },
  ]

  const handleOnClick = useCallback((slno) => {
    setView(slno)
  }, [])

  return (
    <>
      {view !== 0 ? (
        <ActiveDoctor
          view={view}
          data={
            view === 1
              ? allDoctor
              : view === 2
              ? accademicDoctor
              : view === 3
              ? clinicalDoctor
              : view === 4
              ? presentDoctor
              : view === 5
              ? tmcpunchDoctor
              : view === 6
              ? nmcpunchDoctor
              : []
          }
          setView={setView}
        />
      ) : (
        <Paper sx={{ p: { xs: 2, md: 4 }, flex: 1, height: screenInnerHeight - 90 }}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: 'center',
            }}
          >
            {doctors?.map((kpi, index) => (
              <DashboardBox key={index} {...kpi} handleOnClick={handleOnClick} />
            ))}
          </Box>
        </Paper>
      )}
    </>
  )
}

export default memo(Doctordashboard)
