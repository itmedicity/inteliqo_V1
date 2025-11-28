import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { py_setting_one, py_setting_two, py_setting_three, userManagement_one,
    userManagement_two,userManagement_three
 } from './SettingMenu';
import { getMenuSlno } from '../views/Constant/Constant'
import { Box, Card, CardContent } from '@mui/joy';
import { CardHeader } from '@mui/material';

const Settings = () => {

    const [pyrol_secOne, setpyrol_secOne] = useState();
    const [pyrol_secTwo, setpyrol_secTwo] = useState();
    const [pyrol_secThree, setpyrol_secThree] = useState();
    const [user_secOne, setuser_secOne] = useState();
    const [user2,setUser2]=useState()
    const [user3,setuser4]=useState()
    const [count, setCount] = useState(0)

    useEffect(() => {
        getMenuSlno().then((val) => {
            const menuSlnoArray = val[0].map((value) => {
                return value.menu_slno;
            })
            const setting_section_one = py_setting_one.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secOne(setting_section_one)
            const setting_section_two = py_setting_two.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secTwo(setting_section_two)
            const setting_section_three = py_setting_three.filter(val => menuSlnoArray.includes(val.slno));
            setpyrol_secThree(setting_section_three)
            const setting_section_usermngt = userManagement_one.filter(val => menuSlnoArray.includes(val.slno));
            setuser_secOne(setting_section_usermngt)
            const setting_section_usermngt2 = userManagement_two.filter(val => menuSlnoArray.includes(val.slno));
            setUser2(setting_section_usermngt2)
            const setting_section_usermngt3 = userManagement_three.filter(val => menuSlnoArray.includes(val.slno));
            setuser4(setting_section_usermngt3)
            setCount(1)
        })
    }, [count])


    return (
            <Card>
        <CardHeader
        title={'Payroll Master'}
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
            { pyrol_secOne?.map(val => {
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
            { pyrol_secTwo?.map(val => {
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
            { pyrol_secThree?.map(val => {
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
        title={'User Management'}
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
            { user_secOne?.map(val => {
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
            { user2?.map(val => {
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
            { user3?.map(val => {
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

export default Settings
