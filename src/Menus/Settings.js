import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { py_setting_one, py_setting_two, py_setting_three, userManagement_one } from './SettingMenu';
import { getMenuSlno } from '../views/Constant/Constant'

const Settings = () => {

    const [pyrol_secOne, setpyrol_secOne] = useState();
    const [pyrol_secTwo, setpyrol_secTwo] = useState();
    const [pyrol_secThree, setpyrol_secThree] = useState();
    const [user_secOne, setuser_secOne] = useState();
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
            setCount(1)
        })
    }, [count])


    return (
        <div>
            {/* Payroll Master */}
            <div className="card"  >

                {/* Payroll Master User Rights Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >Payroll Master</h5>
                </div>
                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secOne && pyrol_secOne.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secTwo && pyrol_secTwo.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    pyrol_secThree && pyrol_secThree.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

                {/* User Management Start Here */}

                <div className="card-header bg-dark pb-0 border border-secondary text-white" >
                    <h5 >User Management</h5>
                </div>

                <div className="card-body">
                    <div className="row" >
                        <div className="col-4">
                            <ul className="list-group list-group-flush">
                                {
                                    user_secOne && user_secOne.map((val) => {
                                        return <Link to={val.to} className="list-group-item pt-1 pb-1" key={val.slno}  >{val.name}</Link>;
                                    })
                                }
                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">

                            </ul>
                        </div>
                        <div className="col-4">
                            <ul className="list-group list-group-flush">

                            </ul>
                        </div>
                    </div>
                </div>

                {/* Another User rights Start Here */}

            </div>

        </div>
    )
}

export default Settings
