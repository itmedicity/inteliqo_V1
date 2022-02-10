import { IconButton, Typography } from '@mui/material';
import React, { Fragment, useContext, useState } from 'react';
import { useEffect } from 'react';
import Salutation from 'src/views/CommonCode/Salutation';
import TestSelectComponent from 'src/views/CommonCode/TestSelectComponent';
import { SELECT_CMP_STYLE } from 'src/views/Constant/Constant';
import TestCasulLeave from './Component/TestCasulLeave';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import TestLeaveType from './Component/TestLeaveType';
import TestHalfday from './Component/TestHalfday'
import { errorNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { ToastContainer } from 'react-toastify';
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from 'src/views/Axios/Axios';
import FestivalLeaveComponent from './Component/FestivalLeaveComponent';
import { format } from 'date-fns';
import EsiLeaveComponent from './Component/EsiLeaveComponent';

const LeaveDateSelection = ({
    casualLevee,//array of object for leave data
    setCasualLevee,//array of object for leave data set function
    index,//key of array
    date,//leave days
    setLeveData,
    leveData,
    leaveDetails,// for main page details of leave 
    leaveretypeid,// type of request half,leave,latecoming
    setholidayLevestore,
    setfestivalholidayLevestore//holiday leave set data
}) => {
    const { emergencynumber, fromDate, resonforleave } = leaveDetails
    const { employeedetails, updateemployeedetails } = useContext(PayrolMasterContext)
    const { em_id, em_no, em_department, em_dept_section } = employeedetails
    const [leavetype, settype] = useState(0)//set leave type wheather casual leave or other type
    const [creditedleave, setcreditedleave] = useState(0)//credited leave

    const [casualLeve, setCasualLeve] = useState({})//array of object for leave
    const [holidayleave, setHolidayleave] = useState({})//array of object for festival HOLIDAY
    const [festivalleave, setfestivalleave] = useState({})//array of object for NATIONAL HOLIDAY


    const [nameselect, setnameselect] = useState({})

    const [casualLeve2, setCasualLeve2] = useState({})
    const [postData, setPostData] = useState({})
    const [casualLeavesallowable, setcasualleaveallowable] = useState([])// allowable casual leave 
    const [allowableholiday, setavailholiday] = useState([])// available holiday
    const [allowablefestivalholiday, setfesivalavailholiday] = useState([])// available festival holiday
    const [allowableearnholiday, setearnholiday] = useState([])// available festival holiday
    const [applyBtn, setAppleBtn] = useState(0) //apply butto n colour
    const [getcasleave, updatecasleaveusestate] = useState({
        dsname: '',
        getvalvalue: 0
    });
    const { dsname, getvalvalue } = getcasleave

    const [gethldleave, updategethldleave] = useState({
        hldname: '',
        gethldvalvalue: 0
    });
    const [getfestivalleave, updategetfestivalleave] = useState({
        festivalname: '',
        getfestivalvalue: 0
    });

    const [getEarnleave, updategetEarnleave] = useState({
        earnname: '',
        getEarnvalue: 0
    });

    const { hldname, gethldvalvalue } = gethldleave

    // on change of allowable leave 
    const handleChange = ({ target: { name, value }, nativeEvent }) => {
        //casual leave
        if (leavetype === 1) {

            updatecasleaveusestate({ ...getcasleave, dsname: name, getvalvalue: value })
            setcreditedleave(value)

            setCasualLeve({
                ...casualLeve,
                caulmnth: value,
                levtypename: 'CASUAL LEAVE',
                lveDate: format(new Date(date), "yyyy-MM-dd"),
                lveType: leavetype,
                leave: nativeEvent.target.innerTextveEvent,
                index: index
            })

            if (casualLevee.length > 0) {
                const calfind = casualLevee.find((val) => {

                    return val.caulmnth === value
                })
                if (calfind !== undefined) {
                    if (calfind.length === 0) {
                        setCasualLevee((casualLeve) => [...casualLeve, {
                            caulmnth: value,
                            levtypename: 'CASUAL LEAVE',
                            lveDate: format(new Date(date), "yyyy-MM-dd"),
                            lveType: nativeEvent.target.innerText,
                            index: index
                        }])
                    }
                    else {
                        warningNofity('Already selected')
                        updatecasleaveusestate({ ...getcasleave, dsname: name, getvalvalue: 0 })
                        const filtedLeave = casualLevee.filter((val) => {
                            return (val.caulmnth !== casualLevee.caulmnth && val.index !== casualLeve.index)
                        })
                        setCasualLevee(filtedLeave)
                    }
                }
                else {
                    setCasualLevee((casualLeve) => [...casualLeve, {
                        caulmnth: value,
                        levtypename: 'CASUAL LEAVE',
                        lveDate: format(new Date(date), "yyyy-MM-dd"),
                        lveType: leavetype,
                        leave: nativeEvent.target.innerText,
                        index: index
                    }])
                }
            }
            else {
                setCasualLevee((casualLeve) => [...casualLeve, {
                    caulmnth: value,
                    lveDate: format(new Date(date), "yyyy-MM-dd"),
                    levtypename: 'CASUAL LEAVE',
                    lveType: leavetype,
                    leave: nativeEvent.target.innerText,
                    index: index
                }])

            }
            setAppleBtn(0)

        }
        // national holiday
        else if (leavetype === 3) {
            updategethldleave({ ...gethldleave, hldname: name, gethldvalvalue: value })
            setcreditedleave(value)
            setCasualLeve({
                ...casualLeve,
                caulmnth: value,
                levtypename: 'CASUAL LEAVE',
                lveDate: format(new Date(), "yyyy-MM-dd"),
                lveType: leavetype,
                leave: nativeEvent.target.innerTextveEvent,
                index: index
            })

            if (casualLevee.length > 0) {
                const calfind = casualLevee.find((val) => {

                    return val.caulmnth === value
                })

                if (calfind !== undefined) {
                    if (calfind.length === 0) {
                        setCasualLevee((casualLeve) => [...casualLeve, {
                            caulmnth: value,
                            levtypename: 'NATIONAL HOLIDAY ',
                            lveDate: format(new Date(), "yyyy-MM-dd"),
                            lveType: leavetype,
                            leave: nativeEvent.target.innerText,
                            index: index
                        }])
                    }
                    else {
                        warningNofity('Already selected')
                        updategethldleave({ ...gethldleave, hldname: name, gethldvalvalue: 0 })
                        const filtedLeave = casualLevee.filter((val) => {
                            return (val.caulmnth !== casualLevee.caulmnth && val.index !== casualLeve.index)
                        })
                        setCasualLevee(filtedLeave)
                    }
                }
                else {
                    setCasualLevee((casualLeve) => [...casualLeve, {
                        caulmnth: value,
                        levtypename: 'NATIONAL HOLIDAY ',
                        lveDate: format(new Date(), "yyyy-MM-dd"),
                        lveType: leavetype,
                        leave: nativeEvent.target.innerText,
                        index: index
                    }])
                }
            }
            else {
                setCasualLevee((casualLeve) => [...casualLeve, {
                    caulmnth: value,
                    levtypename: 'NATIONAL HOLIDAY ',
                    lveDate: format(new Date(), "yyyy-MM-dd"),
                    lveType: leavetype,
                    leave: nativeEvent.target.innerText,
                    index: index
                }])

            }
        }

        else if (leavetype === 4) {
            updategetfestivalleave({ ...getfestivalleave, festivalname: name, getfestivalvalue: value })
            setcreditedleave(value)
            if (casualLevee.length > 0) {
                const calfind = casualLevee.find((val) => {

                    return val.caulmnth === value
                })

                if (calfind !== undefined) {
                    if (calfind.length === 0) {
                        setCasualLevee((casualLeve) => [...casualLeve, {
                            caulmnth: value,
                            levtypename: 'FESTIVAL LEAVE',
                            lveDate: format(new Date(date), "yyyy-MM-dd"),
                            lveType: leavetype,
                            leave: nativeEvent.target.innerText,
                            index: index
                        }])
                    }
                    else {
                        warningNofity('Already selected')
                        updategetfestivalleave({ ...getfestivalleave, festivalname: name, getfestivalvalue: 0 })

                        const filtedLeave = casualLevee.filter((val) => {
                            return (val.caulmnth !== casualLevee.caulmnth && val.index !== casualLeve.index)
                        })
                        setCasualLevee(filtedLeave)
                    }
                }
                else {
                    setCasualLevee((casualLeve) => [...casualLeve, {
                        caulmnth: value,
                        levtypename: 'FESTIVAL LEAVE',
                        lveDate: format(new Date(date), "yyyy-MM-dd"),
                        lveType: leavetype,
                        leave: nativeEvent.target.innerText,
                        index: index
                    }])
                }
            }
            else {
                setCasualLevee((casualLeve) => [...casualLeve, {
                    caulmnth: value,
                    levtypename: 'FESTIVAL LEAVE',
                    lveDate: format(new Date(date), "yyyy-MM-dd"),
                    lveType: leavetype,
                    leave: nativeEvent.target.innerText,
                    index: index
                }])

            }




        }
        else if (leavetype === 8) {
            updategetEarnleave({ ...getEarnleave, earnname: name, getEarnvalue: value })
            setcreditedleave(value)
            if (casualLevee.length > 0) {
                const calfind = casualLevee.find((val) => {

                    return val.caulmnth === value
                })

                if (calfind !== undefined) {
                    if (calfind.length === 0) {
                        setCasualLevee((casualLeve) => [...casualLeve, {
                            caulmnth: value,
                            levtypename: 'Earn LEAVE',
                            lveDate: format(new Date(date), "yyyy-MM-dd"),
                            lveType: leavetype,
                            leave: nativeEvent.target.innerText,
                            index: index
                        }])
                    }
                    else {
                        warningNofity('Already selected')
                        updategetEarnleave({ ...getEarnleave, earnname: name, getEarnvalue: 0 })

                        const filtedLeave = casualLevee.filter((val) => {
                            return (val.caulmnth !== casualLevee.caulmnth && val.index !== casualLeve.index)
                        })
                        setCasualLevee(filtedLeave)
                    }
                }
                else {
                    setCasualLevee((casualLeve) => [...casualLeve, {
                        caulmnth: value,
                        levtypename: 'Earn LEAVE',
                        lveDate: format(new Date(date), "yyyy-MM-dd"),
                        lveType: leavetype,
                        leave: nativeEvent.target.innerText,
                        index: index
                    }])
                }
            }
            else {
                setCasualLevee((casualLeve) => [...casualLeve, {
                    caulmnth: value,
                    levtypename: 'Earn LEAVE',
                    lveDate: format(new Date(date), "yyyy-MM-dd"),
                    lveType: leavetype,
                    leave: nativeEvent.target.innerText,
                    index: index
                }])

            }

        }






    }
    // on select leave type
    const handleLveType = async ({ target: { name, value }, nativeEvent }) => {

        settype(value)
        //   if casual leave 
        if (value === 1) {
            const result = await axioslogin.get(`/yearleaveprocess/allwbleCL/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setcasualleaveallowable(data)
                settype(value)
            }
            else if (success === 2) {
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        else if (value === 2 || value === 5 || value === 6 || value === 7 || value === 9 || value === 10 || value === 11) {

            setcreditedleave(value)
            setCasualLevee((casualLeve) => [...casualLeve, {
                caulmnth: value,
                levtypename: value === 2 ? 'Maternity Leave' : value === 5 ?
                    "LOP" : value === 6 ? "ESI" : value === 7 ? "SICK LEAVE" : value === 9 ? "DAY OFF" : value === 10 ? "WORK  OFF" : 'CONFERRANCE LEAVE',
                lveDate: format(new Date(date), "yyyy-MM-dd"),
                lveType: value,
                leave: nativeEvent.target.innerText,
                index: index

            }])

        }


        else if (value === 3) {
            const result = await axioslogin.get(`/yearleaveprocess/allowableholiday/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setavailholiday(data)
                settype(value)
            }
            else if (success === 2) {
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        else if (value === 4) {
            const result = await axioslogin.get(`/yearleaveprocess/allowableholiday/allowablefesitval/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setfesivalavailholiday(data)
                settype(value)
            }
            else if (success === 2) {
                warningNofity("There Is No Casual Leave Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
        else if (value === 8) {
            const result = await axioslogin.get(`/yearleaveprocess/allowableholiday/allowableearnleave/data/${em_id}`)
            const { success, data } = result.data
            if (success === 1) {
                setearnholiday(data)
                settype(value)
            }
            else if (success === 2) {
                warningNofity("There Is No Earn  Left For This Employee")
            }
            else {
                errorNofity("Error Occured!!!!Please Contact EDP")
            }
        }
    }


    useEffect(() => {
        if (leavetype === 1 || leavetype === 3) {
            setPostData(casualLeve)
        } else {
            setPostData(casualLeve2)
        }
    }, [casualLeve, casualLeve2, leavetype])


    const validateSubmit = async () => {
        const filtedLeave = leveData.filter((val) => {
            return val.index !== postData.index
        })
        if (leavetype === 0 || leavetype === 0 && creditedleave === 0) {
            warningNofity("Select The Leave Type")
        } else {
            setLeveData([...filtedLeave, postData])
            setAppleBtn(1)
        }
    }

    return (
        <Fragment>
            <ToastContainer />
            <div className="col-md-12 mb-2">
                <div className="row g-1">
                    <div className="col-md-3">
                        <Typography variant="button" display="block" gutterBottom align='justify' >
                            {date}
                        </Typography>
                    </div>
                    <div className="col-md-3">
                        <TestLeaveType
                            style={SELECT_CMP_STYLE}
                            name="type"
                            select="Leave Request Type"
                            onChange={handleLveType}//Leave Request Type on chnge
                            em_id={em_id}

                        />
                    </div>
                    {/* allowable leaves */}
                    {

                        leavetype === 1 ?
                            <div className="col-md-3">
                                <TestCasulLeave
                                    style={SELECT_CMP_STYLE}
                                    className="mb-0"
                                    name={index}
                                    select="casual Leave"
                                    onChange={handleChange}//on change of allowable leaves
                                    CL={casualLeavesallowable}
                                    getcasleave={getcasleave}
                                    updatecasleaveusestate={updatecasleaveusestate}
                                />
                            </div> : leavetype === 3 ?//NATIONAL holidaychange
                                <div className="col-md-3" >
                                    <TestHalfday
                                        style={SELECT_CMP_STYLE}
                                        className="mb-0"
                                        name={index}
                                        select="Holiday"
                                        onChange={handleChange}
                                        NL={allowableholiday}
                                        hldname={hldname}
                                        gethldleave={gethldleave}
                                        setnameselect={setnameselect}
                                        updategethldleave={updategethldleave}
                                    />
                                </div> : leavetype === 4 ?//NATIONAL holidaychange
                                    <div className="col-md-3" >
                                        <FestivalLeaveComponent
                                            style={SELECT_CMP_STYLE}
                                            className="mb-0"
                                            name={index}
                                            select="Holiday"
                                            onChange={handleChange}
                                            FL={allowablefestivalholiday}
                                            hldname={hldname}
                                            gethldleave={getfestivalleave}
                                        />
                                    </div> : leavetype === 8 ?//Earn Leave
                                        <div className="col-md-3" >
                                            <EsiLeaveComponent
                                                style={SELECT_CMP_STYLE}
                                                className="mb-0"
                                                name={index}
                                                select="Holiday"
                                                onChange={handleChange}
                                                eL={allowableearnholiday}
                                                hldname={hldname}
                                                getEarnleave={getEarnleave}
                                            />
                                        </div> : null
                    }
                    <div className='col-md-1'  >
                        <IconButton
                            edge="end"
                            className='py-1'
                            style={applyBtn === 0 ? { color: 'red' } : { color: 'green' }}
                            onClick={validateSubmit}  >
                            <ExitToAppIcon className='p-0' />
                        </IconButton>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default LeaveDateSelection
