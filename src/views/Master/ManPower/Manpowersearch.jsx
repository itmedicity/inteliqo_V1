import React, { useState, useCallback, useMemo, useEffect, lazy, memo } from 'react'
import { Box, Tooltip, Button, } from '@mui/joy'
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc'
import { axioslogin } from 'src/views/Axios/Axios'
import DepartmentDropRedx from 'src/views/Component/ReduxComponent/DepartmentRedx';
import DepartmentSectionRedx from 'src/views/Component/ReduxComponent/DepartmentSectionRedx';
import { useDispatch } from 'react-redux'
import { setDepartment } from 'src/redux/actions/Department.action';
import SearchIcon from '@mui/icons-material/Search';
import SaveIcon from '@mui/icons-material/Save';
import ControlPointIcon from '@mui/icons-material/ControlPoint';


const Modal = lazy(() => import('./Modalmanpower'))
const Viewdata = lazy(() => import('./Viewdata'))

const Manpowersearch = () => {
    const [mincount, setmincount] = useState(0);
    const [maxcount, setmaxcount] = useState(0);
    const [salaryfrom, setsalaryfrom] = useState(0);
    const [salaryto, setsalaryto] = useState(0);

    const [update, setupdate] = useState(0);
    const [dept, changeDept] = useState(0);
    const [flag, setflag] = useState(0);
    const [section, changeSection] = useState(0);
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([])

    const [Data, setData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newdesig, setnewdesig] = useState({})
    // console.log(newdesig);
    // console.log(tableData);
    // dispatch the department data
    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch,])

    const postData = useMemo(() => {
        return {
            dept_id: dept,
            sect_id: section
        }
    }, [dept, section])

    const postDataDept = useMemo(() => {
        return { dept_id: dept }
    }, [dept])




    //  Employee Record List
    const handleOnClickFuntion = useCallback(async (e) => {
        e.preventDefault()
        if (dept !== 0 && section !== 0) {

            // already entered
            const result = await axioslogin.post('/Manpower/getdesgdet', postData)
            const { success, data } = result.data

            if (success === 1) {
                setupdate(1)

                // for adding min and maximum to the array
                const arr = data?.map((val) => {
                    const obj = {
                        ...val,
                        // "mincount": 0,
                        // "maxcount": 0,
                        status: 0,
                        dept_id: dept,
                        sect_id: section
                    }
                    return obj
                })
                setTableData(arr)
                setData(arr)
                setflag(1)
            }
            else {

                // from emp master
                const result = await axioslogin.post('/Manpower/getEmpDet', postData)
                const { success, data } = result.data

                if (success === 1) {
                    setupdate(0)

                    // for adding min and maximum to the array
                    const arr = data.map((val) => {
                        const obj = {
                            ...val,
                            MaxCount: maxcount,
                            MinCount: mincount,
                            salaryfrom: salaryfrom,
                            salaryto: salaryto,
                            status: 0,
                            dept_id: dept,
                            sect_id: section
                        }
                        return obj
                    })
                    setTableData(arr)
                    setData(arr)
                    setflag(1)
                } else {
                    setTableData([])
                }
            }
        }


        else {
            warningNofity("Choose All Option")
        }
        // }
        // submitfunc()
    }, [postDataDept, postData, dept, section, maxcount, mincount, salaryfrom, salaryto])

    // data save
    const submitmanpower = useCallback(async (event) => {
        event.preventDefault()
        if (tableData.length !== 0) {
            let array = tableData.filter((value) => {
                return !Data.find((val) => {
                    return value.em_designation_number === val.em_designation_number;
                })
            })

            if (update === 1) {
                if (array.length === 0) {
                    const result = await axioslogin.post('/Manpower/updatedata', tableData)
                    const { success, message } = result.data
                    if (success === 1) {
                        setflag(0)
                        changeSection(0)
                        changeDept(0)
                        succesNofity(message)
                    }
                    else {
                        warningNofity(message)
                    }
                } else {
                    const result = await axioslogin.post('/Manpower/insertdata', array)
                    const { success, message } = result.data
                    if (success === 1) {
                        const result = await axioslogin.post('/Manpower/updatedata', tableData)
                        const { success, message } = result.data
                        if (success === 1) {
                            setflag(0)
                            changeSection(0)
                        }
                        else {
                            warningNofity(message)
                        }
                        setflag(0)
                        changeSection(0)
                        changeDept(0)
                        succesNofity(message)
                    }
                    else {
                        warningNofity(message)
                    }
                }
            } else {
                const result = await axioslogin.post('/Manpower/insertdata', tableData)
                const { success, message } = result.data
                if (success === 1) {
                    setflag(0)
                    changeSection(0)
                    changeDept(0)
                    succesNofity(message)
                }
                else {
                    warningNofity(message)
                }
            }
        } else {
            warningNofity('no data to save')
        }
    }, [tableData, Data, update],)

    // modal open
    const handlemodalopen = useCallback(() => {

        // setid(item.id)
        // Setitem(item.name)
        setIsModalOpen(true);
        setnewdesig({})
    }, [setnewdesig])

    // for addding new designation to the main array
    useEffect(() => {
        if (Object.keys(newdesig).length > 0) {
            setTableData(prevTableData => [...prevTableData, newdesig]);
        }
    }, [newdesig]);
    return (
        <Box sx={{
            display: 'flex', flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
            flexDirection: 'column',
            width: '100%',

        }}>
            <Box
                sx={{
                    p: 0.5,
                    display: 'flex',
                    flex: { xs: 4, sm: 4, md: 4, lg: 4, xl: 3 },
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: "30%", mt: 0.8, px: 0.2 }}>
                    <DepartmentDropRedx getDept={changeDept} />
                </Box>
                <Box sx={{ width: "30%", mt: 0.8, px: 0.3 }}>
                    <DepartmentSectionRedx getSection={changeSection} />

                </Box>

                <Box sx={{ px: 0.3, mt: 0.7 }}>
                    <Button
                        aria-label="Like"
                        variant="outlined"
                        color="neutral"
                        onClick={handleOnClickFuntion}
                        sx={{
                            color: '#81c784',
                        }}
                    >
                        <SearchIcon />
                    </Button>
                </Box>
                {flag === 1 ? <Box sx={{ px: 0.5, mt: 0.9 }}>
                    <Tooltip title="Save">
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={submitmanpower}
                        >
                            <SaveIcon />
                        </Button>
                    </Tooltip>
                </Box> : null}
                {flag === 1 ? <Box sx={{ px: 0.5, mt: 0.9 }}>
                    <Tooltip title="Add new designation">
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={handlemodalopen}
                        >
                            <ControlPointIcon />
                        </Button></Tooltip>


                </Box> : null}

            </Box>
            {flag === 1 ? <Viewdata salaryfrom={salaryfrom} salaryto={salaryto} newdesig={newdesig} setmincount={setmincount} setmaxcount={setmaxcount} mincount={mincount} maxcount={maxcount} tableData={tableData} setTableData={setTableData} /> : null}
            <Modal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                setmincount={setmincount}
                setmaxcount={setmaxcount}
                mincount={mincount}
                maxcount={maxcount}
                setnewdesig={setnewdesig}
                salaryto={salaryto}
                salaryfrom={salaryfrom}
                section={section}
                dept={dept}
            />
        </Box>
    )
}

export default memo(Manpowersearch)