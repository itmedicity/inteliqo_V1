import React, { useEffect, useState } from 'react'
import {
    empRecord_one, empRecord_two, empRecord_three,
    attednane_one, attednane_two, attednane_three,
    leave_One, leave_two, leave_three,
    training_one, tarning_two, traning_three
} from './ReportsMenu'
import { getMenuSlno } from '../views/Constant/Constant'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader } from '@mui/material'

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

            setCount(1)
        })
    }, [count])
    return (
        <Card>
            {/* <CardHeader title={"Employee Record"}
                titleTypographyProps={{ variant: "subtitle1", color: '#FFFFFF' }}
                sx={{
                    paddingY: 0.5,
                    bgcolor: '#7FA1C3'
                }} /> */}
            <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                <h6 >Employee Record</h6>
            </div>
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                emprecordOne?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                emprecordTwo?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                emprecordThree?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            {/* <CardHeader title={"Attendance Management"}
                titleTypographyProps={{ variant: "subtitle1", color: '#FFFFFF' }}
                sx={{
                    bgcolor: '#7FA1C3',
                    paddingY: 0.5,
                }} /> */}
            <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                <h6 >Attendance Management</h6>
            </div>
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                attendanceOne?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                attendanceTwo?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                attendanceThree?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            {/* <CardHeader title={"Leave Management"}
                titleTypographyProps={{ variant: "subtitle1", color: '#FFFFFF' }}
                sx={{
                    bgcolor: '#7FA1C3',
                    paddingY: 0.5,
                }} /> */}
            <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                <h6 >Leave Managment</h6>
            </div>
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                leaveOne?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                leaveTwo?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                leaveThree?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
            {/* <CardHeader title={"Trainig & Development"}
                titleTypographyProps={{ variant: "subtitle1", color: '#FFFFFF' }}
                sx={{
                    bgcolor: '#7FA1C3',
                    paddingY: 0.5,
                }} /> */}
            <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                <h6 >Training and Development</h6>
            </div>
            <CardContent>
                <div className="row" >
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                trainingOne?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                trainingTwo?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="col-4">
                        <ul className="list-group list-group-flush">
                            {
                                trainingThree?.map((val) => {
                                    return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                })
                            }
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default Reports