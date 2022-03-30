import React from 'react'
import Employeedetails from '../CommonCode/Employeedetails'
import { useSelector } from 'react-redux';

const Home = () => {

    const login = useSelector((state) => {
        console.log(state)
    })

    return (
        <div>
            <h1>This is the home page for hrm</h1>
            {/* <Employeedetails /> */}
        </div>
    )
}

export default Home
