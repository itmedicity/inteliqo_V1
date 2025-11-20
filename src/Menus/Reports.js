import React, { memo, useEffect, useState } from 'react'
import {
    empRecord_one, empRecord_two, empRecord_three,
    attednane_one, attednane_two, attednane_three,
    leave_One, leave_two, leave_three,
    training_one, tarning_two, traning_three,
    doctor_one,doctor_two,doctor_three
} from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'
import { Box } from '@mui/joy'

const Reports = () => {
    const [emprecordOne, setemprecordOne] = useState()
    const [emprecordTwo, setemprecordTwo] = useState()
    const [emprecordThree, setemprecordThree] = useState()

    const [attendanceOne, setattendanceOne] = useState()
    const [attendanceTwo, setAttendanceTwo] = useState()
    const [attendanceThree, setattendanceThree] = useState()

    const [leaveOne, setLeaveOne] = useState()
    const [leaveTwo, setLeaveTwo] = useState()
    const [leaveThree, setLeaveThree] = useState()

    const [trainingOne, setTrainingOne] = useState()
    const [trainingTwo, setTrainingTwo] = useState()
    const [trainingThree, setTrainingThree] = useState()

    const [doctorOne,setDoctorOne]=useState()
    const [doctorTwo,setDoctorTwo]=useState()
    const [doctorThree,setDoctorThree]=useState()

    const [count, setCount] = useState(0)
    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            const settings_report_one = empRecord_one?.filter(val => menuSlnoArray.includes(val.slno));
            setemprecordOne(settings_report_one)
            const settings_report_two = empRecord_two?.filter(val => menuSlnoArray.includes(val.slno));
            setemprecordTwo(settings_report_two)
            const settings_report_three = empRecord_three?.filter(val => menuSlnoArray.includes(val.slno));
            setemprecordThree(settings_report_three)

            const attendnace1 = attednane_one?.filter(val => menuSlnoArray.includes(val.slno));
            setattendanceOne(attendnace1)
            const attendance2 = attednane_two?.filter(val => menuSlnoArray.includes(val.slno));
            setAttendanceTwo(attendance2)
            const attendnace3 = attednane_three?.filter(val => menuSlnoArray.includes(val.slno));
            setattendanceThree(attendnace3)

            const leave1 = leave_One?.filter(val => menuSlnoArray.includes(val.slno));
            setLeaveOne(leave1)
            const leave2 = leave_two?.filter(val => menuSlnoArray.includes(val.slno));
            setLeaveTwo(leave2)
            const leave3 = leave_three?.filter(val => menuSlnoArray.includes(val.slno));
            setLeaveThree(leave3)

            const tarning1 = training_one?.filter(val => menuSlnoArray.includes(val.slno));
            setTrainingOne(tarning1)
            const traning2 = tarning_two?.filter(val => menuSlnoArray.includes(val.slno));
            setTrainingTwo(traning2)
            const training = traning_three?.filter(val => menuSlnoArray.includes(val.slno));
            setTrainingThree(training)

            const doctorlist = doctor_one?.filter(val => menuSlnoArray.includes(val.slno));
            setDoctorOne(doctorlist)

             const doctorlist1 = doctor_two?.filter(val => menuSlnoArray.includes(val.slno));
            setDoctorTwo(doctorlist1)

             const doctorlist2 = doctor_three?.filter(val => menuSlnoArray.includes(val.slno));
            setDoctorThree(doctorlist2)

            setCount(1)
        })
    }, [count])
    return (
        <Card>
        <CardHeader
        title={'Employee Record'}
        titleTypographyProps={{ variant: 'subtitle1', color: '#ffffffff' }}
        sx={{
          backgroundColor:  '#4f5d73',
          paddingY: 0.5
        }}
      />
        <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-around"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { emprecordOne?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
         <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { emprecordTwo?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { emprecordThree?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
        </Box>
      </CardContent>

      <CardHeader
        title={'Attendance Management'}
        titleTypographyProps={{ variant: 'subtitle1', color: '#ffffffff' }}
        sx={{
          backgroundColor:  '#4f5d73',
          paddingY: 0.5
        }}
      />
        <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-around"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { attendanceOne?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
         <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { attendanceTwo?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { attendanceThree?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
        </Box>
      </CardContent>
    
    <CardHeader
        title={'Leave Management'}
        titleTypographyProps={{ variant: 'subtitle1', color: '#ffffffff' }}
        sx={{
          backgroundColor: '#4f5d73',
          paddingY: 0.5
        }}
      />
        <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-around"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { leaveOne?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
         <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { leaveTwo?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { leaveThree?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
        </Box>
      </CardContent>

     <CardHeader
        title={'Trainig & Development'}
        titleTypographyProps={{ variant: 'subtitle1', color: '#ffffffff' }}
        sx={{
          backgroundColor: '#4f5d73',
          paddingY: 0.5
        }}
      />
        <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-around"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { trainingOne?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
         <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { trainingTwo?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { trainingThree?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
        </Box>
      </CardContent>

      <CardHeader
        title={'Doctor Reports'}
        titleTypographyProps={{ variant: 'subtitle1', color: '#ffffffff' }}
        sx={{
          backgroundColor: '#4f5d73',
          paddingY: 0.5
        }}
      />
      
       <CardContent>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: "space-around"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { doctorOne?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { doctorTwo?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", width: "30%" }}>
            { doctorThree?.map(val => {
                return (
                  <Link to={val.to} 
                    className="list-group-item pb-0"
                    key={val?.slno} 
                    style={{
                    borderTop: "none",
                    borderLeft: "none",
                    borderRight: "none",
                    borderBottom: "1px solid #ddd", // light gray bottom border
                    }}
                  >
                    {val?.name}
                  </Link>
                )
              })}
          </Box>
        </Box>
    </CardContent>
    </Card>       
    )
}

export default Reports