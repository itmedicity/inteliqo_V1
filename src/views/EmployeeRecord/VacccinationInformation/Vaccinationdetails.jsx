import React, { memo, useEffect, useState } from 'react'
import Paper from '@mui/material/Paper'
import { Box, IconButton, Typography, CardContent, Grid } from '@mui/material'
import { axioslogin } from 'src/views/Axios/Axios'
import VaccinesIcon from '@mui/icons-material/Vaccines'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { PieChart } from '@mui/x-charts/PieChart'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import AddModeratorIcon from '@mui/icons-material/AddModerator'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import BloodtypeIcon from '@mui/icons-material/Bloodtype'
import MedicationIcon from '@mui/icons-material/Medication'
import MasksIcon from '@mui/icons-material/Masks'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import HealingIcon from '@mui/icons-material/Healing'
import LocalPharmacyIcon from '@mui/icons-material/LocalPharmacy'
import HotelIcon from '@mui/icons-material/Hotel'
import ApprovalIcon from '@mui/icons-material/Approval'
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload'

const Vaccinationdetails = ({ setShowGeneral, setitem, count, setCount }) => {
  const [data1, setdata] = useState([])
  const [notvacc, setlen] = useState(0)
  const [firstnotvac, firstvacnot] = useState(0)
  const [secondnotvac, secondvacnot] = useState(0)
  const [thirdnotvac, thirdvacnot] = useState(0)
  const [boosternot, boosterdosevacnot] = useState(0)
  const [first, firstvac] = useState(0)
  const [second, secondvac] = useState(0)
  const [third, thirdvac] = useState(0)
  const [annualcount, annualpen] = useState(0)
  const [firstpend, firstvacpen] = useState(0)
  const [boosterpend, boostervacpen] = useState(0)
  const [departmentInfo, setdptinfo] = useState([])

  let pieChartData = []
  if (departmentInfo) {
    // Check if departmentInfo is available
    pieChartData = Object.entries(departmentInfo).map(([department, info]) => ({
      label: department,
      value: info.vaccinatedEmployees,
      totalEmployees: info.totalEmployees,
      unvaccinatedEmployees: info.unvaccinatedEmployees,
      icon: <VaccinesIcon />,
    }))
  }

  const main = [
    {
      id: 2,
      name: ' Not Vaccinated Employee',
      count: firstnotvac,
      icon: <LocalHospitalIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 9,
      name: 'Pending First Dose',
      count: firstpend,
      icon: <BloodtypeIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 3,
      name: 'Pending SecondDose',
      count: secondnotvac,
      icon: <MedicationIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 4,
      name: 'Pending Thirddose',
      count: thirdnotvac,
      icon: <MasksIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 5,
      name: 'Pending BoosterDose',
      count: boosternot,
      icon: <VaccinesIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 10,
      name: 'Annual Health Check',
      count: boosterpend,
      icon: <MedicationLiquidIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 6,
      name: 'First Dose Vaccinated',
      count: first,
      icon: <HealingIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 7,
      name: 'Second Dose Vaccinated',
      count: second,
      icon: <LocalPharmacyIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 8,
      name: 'Third Dose Vaccinated',
      count: third,
      icon: <HotelIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 1,
      name: 'Vaccinated Employee ',
      count: notvacc,
      icon: <ApprovalIcon sx={{ color: '#81c784' }} />,
    },
    {
      id: 11,
      name: 'Pending Annual Dose ',
      count: annualcount,
      icon: <AssuredWorkloadIcon sx={{ color: '#81c784' }} />,
    },
  ]
  useEffect(() => {
    const fetchData = async () => {
      const result = await axioslogin.get('/Vaccination/get/all')
      const { success, data } = result.data

      if (success === 1) {
        setdata(data)
        setitem(data)
      } else {
        setdata([])
      }
    }

    fetchData()
  }, [setitem])

  useEffect(() => {
    const departmentInfo = data1
      ?.filter((person) => person.em_status === 1)
      ?.reduce((info, person) => {
        const department = person.dept_name
        if (!info[department]) {
          info[department] = {
            totalEmployees: 0,
            vaccinatedEmployees: 0,
            unvaccinatedEmployees: 0,
          }
        }
        info[department].totalEmployees++

        if (person.third_dose_status === 1) {
          info[department].vaccinatedEmployees++
        } else {
          info[department].unvaccinatedEmployees++
        }

        return info
      }, {})

    setdptinfo(departmentInfo)
    const notvaccinated =
      data1?.filter(
        (val) =>
          val.first_dose_status === 1 &&
          val.second_dose_status === 1 &&
          val.third_dose_status === 1 &&
          val.booster_dose_status === 1,
      )
    setlen(notvaccinated.length)
    // firstdose not vaccinated
    const firstdose =
       data1?.filter((val) => val.booster_dose_status === 0 && val.first_dose_status === 0)
    firstvacnot(firstdose.length)
    // second dose not vaccinated
    const seconddose =  data1?.filter((val) => val.second_dose_status === 0)
    secondvacnot(seconddose.length)
    // third dose not vaccinated
    const thirddose =  data1?.filter((val) => val.third_dose_status === 0)
    thirdvacnot(thirddose.length)
    // booster dose  not vaccinated
    const boosterdose =
      data1?.filter((val) => val.booster_dose_status === 0 && val.booster_dose_given_status === 1)
    boosterdosevacnot(boosterdose.length)
    // firstdose vaccinated
    const firstdosevac =  data1?.filter((val) => val.first_dose_status === 1)
    firstvac(firstdosevac.length)
    // second dose vaccinated
    const seconddosevacc =
    data1?.filter((val) => val.first_dose_status === 1 && val.second_dose_status === 1)
    secondvac(seconddosevacc.length)
    // third dose vaccinated
    const thirddosevac =
    
      data1?.filter(
        (val) =>
          val.third_dose_status === 1 &&
          val.second_dose_status === 1 &&
          val.third_dose_status === 1,
      )
    thirdvac(thirddosevac.length)
    // pending first dose
    const penfirstdose =
    
      data1?.filter((val) => val.first_dose_status === 0 && val.first_dose_given_status === 1)
    firstvacpen(penfirstdose.length)
    // pending booster dose annual health check
    const currentDate = new Date()
    const penbooster =
      data1?.filter((val) => {
        const annualDoseDate = new Date(val.annual_dose)
        return val.annual_dose !== null && annualDoseDate <= currentDate
      })

    boostervacpen(penbooster.length)
    // annual pending status
    const annualpending =  data1?.filter((val) => val.pending_status === 1)
    annualpen(annualpending.length)
    setCount(0)
  }, [data1, setCount, count])

  const handleClick = (e, item) => {
    setShowGeneral(item.id)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      <Grid sx={{ p: 1 }} container spacing={2}>
        {main.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Paper
              key={index}
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                p: 1,
                width: '100%',
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
                  {item.icon}
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
                  marginTop: 3,
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={(e) => {
                  handleClick(e, item)
                }}
              >
                <Box sx={{ p: 1, mt: 1 }}>
                  <Typography>Employees</Typography>
                </Box>
                <Box sx={{ ml: 1, mt: 1 }}>
                  <IconButton size="small" color="success">
                    <ArrowRightAltIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* pie chart */}

      <Paper
        sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, width: '66%', ml: 1 }}
      >
        <Box sx={{ width: { xs: '100%', md: '40%' }, p: 2, mb: { xs: 2, md: 0 } }}>
          <Typography sx={{ opacity: '.5' }}>Department Wise Vaccination Count</Typography>
          <PieChart
            sx={{ mt: 1 }}
            series={[
              {
                innerRadius: 60,
                outerRadius: 80,
                data: pieChartData,
              },
            ]}
            width={350}
            height={200}
            legend={{ hidden: true }}
          />
        </Box>
        <Box
          sx={{
            maxHeight: '250px',
            overflow: 'auto',
            p: 1,
            '&::-webkit-scrollbar': {
              width: '0',
            },
          }}
        >
          <Grid container spacing={2}>
            {pieChartData.map((row) => (
              <Grid item xs={12} key={row.label}>
                <Box sx={{ height: '100%' }}>
                  <Box sx={{}}>
                    <Typography sx={{ opacity: '.5', ml: 3 }} variant="subtitle1">
                      {row.label}
                    </Typography>
                  </Box>

                  <CardContent sx={{}}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
                        <PeopleAltIcon sx={{ color: '#81c784' }} />
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
                          <Typography sx={{ fontSize: 18 }}>Total Employees:</Typography>
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
                          width: '10%',
                        }}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                          {row.totalEmployees}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
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
                        <AddModeratorIcon sx={{ color: '#81c784' }} />
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
                          <Typography sx={{ fontSize: 18 }}>Vaccinated Employees:</Typography>
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
                          width: '10%',
                        }}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                          {row.value}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
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
                        <PrivacyTipIcon sx={{ color: '#81c784' }} />
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
                          <Typography sx={{ fontSize: 18 }}>Not Vaccinated Employees:</Typography>
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
                          width: '10%',
                        }}
                      >
                        <Typography sx={{ fontWeight: 'bold', fontSize: 17, color: '#81c784' }}>
                          {row.unvaccinatedEmployees}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Paper>
    </Box>
  )
}

export default memo(Vaccinationdetails)
