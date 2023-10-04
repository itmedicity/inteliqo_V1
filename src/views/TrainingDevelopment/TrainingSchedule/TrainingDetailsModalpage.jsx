import React, { memo, useState, useEffect, Fragment, useCallback, useMemo } from 'react';
import { Box, Button, TextField, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import _ from 'underscore';
import { ToastContainer } from 'react-toastify';
import CommonCheckBox from 'src/views/Component/CommonCheckBox';
import moment from 'moment';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import { axioslogin } from 'src/views/Axios/Axios';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { addDays } from 'date-fns';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';

const TrainingDetailsModalpage = ({ userdata, open, setOpen, count, Setcount }) => {

    //mandatory
    const [selectValue, setSelectValue] = useState([]);
    const [type_name, settype_name] = useState([]);
    const [names, setNames] = useState([]);
    const [checkcat, setCheckCat] = useState(false);
    const [cate, setCate] = useState([]);
    const [mndryduedate, setmndryDuedate] = useState([]);
    const [mscheduleDate, setmScheduleDate] = useState(moment(new Date()));

    //up on requirements
    const [checkreq, setCheckreq] = useState(false);
    const [catereq, setCatereq] = useState([]);
    const [selectrerq, setselectrerq] = useState([]);
    const [reqtype_name, setreqtype_name] = useState([]);
    const [namesreq, setNamesreq] = useState([]);
    const [rqmtduedate, setrqmtDuedate] = useState([]);
    const [rscheduleDate, setrScheduleDate] = useState(new Date());

    //life support
    const [checklife, setChecklife] = useState(false);
    const [catelife, setCatelife] = useState([]);
    const [selectlife, setselectlife] = useState([]);
    const [lifetype_name, setlifetype_name] = useState([]);
    const [nameslife, setNameslife] = useState([]);
    const [lifeduedate, setlifeDuedate] = useState([]);
    const [lscheduleDate, setlScheduleDate] = useState(new Date());

    //proffessionals
    const [checkpro, setCheckpro] = useState(false);
    const [catepro, setCatepro] = useState([]);
    const [selectpro, setselectpro] = useState([]);
    const [protype_name, setprotype_name] = useState([]);
    const [namespro, setNamespro] = useState([]);
    const [produedate, setproDuedate] = useState([]);
    const [pscheduleDate, setpScheduleDate] = useState(new Date());

    const [details, setDetails] = useState(
        {
            dept_id: '',
            dept_name: '',
            em_name: '',
            emp_id: '',
            emp_no: '',
            joining_date: '',
            sect_id: '',
            sect_name: '',
            slno: ''
        }
    );

    const { dept_id, emp_no, joining_date, sect_id } = details;

    const trainingtype = useSelector((state) => state?.gettrainingData?.trainingType?.trainingTypeList);
    const trainingCategory = useSelector((state) => state?.gettrainingData?.trainingCategory?.trainingCategoryList);
    const trainingName = useSelector((state) => state?.gettrainingData?.trainingNames?.trainingNamesList);
    const employeeState = useSelector((state) => state?.getProfileData?.ProfileData, _.isEqual);
    const employeeProfileDetl = useMemo(() => employeeState[0], [employeeState]);
    const { em_id } = employeeProfileDetl;

    useEffect(() => {
        if (Object.keys(userdata).length !== 0) {
            const { dept_id, dept_name, em_name, emp_id, emp_no, joining_date, sect_id, sect_name, slno } = userdata;
            const details = {
                dept_id: dept_id,
                dept_name: dept_name,
                em_name: em_name,
                emp_id: emp_id,
                emp_no: emp_no,
                joining_date: joining_date,
                sect_id: sect_id,
                sect_name: sect_name,
                slno: slno
            }
            setDetails(details)
        } else {
            setDetails({})
        }
    }, [userdata])

    //reset
    const reset = useCallback(() => {
        setCheckCat(false);
        setSelectValue([]);
        setCate([]);
        settype_name([]);
        setNames([]);
        setmndryDuedate('');

        setCheckreq(false);
        setCatereq([]);
        setselectrerq([]);
        setreqtype_name([]);
        setNamesreq([]);
        setrScheduleDate('');

        setChecklife(false);
        setCatelife([]);
        setselectlife([]);
        setlifetype_name([]);
        setNameslife([]);
        setlScheduleDate([]);

        setCheckpro(false);
        setCatepro([]);
        setselectpro([]);
        setprotype_name([]);
        setNamespro([]);
        setpScheduleDate('');
    }, [])


    useEffect(() => {
        //mandatory
        const mandatoryCate = trainingCategory.filter((val) => val.trainingtype_slno === 1);
        setCate(mandatoryCate);
        const mandatoryName = trainingName.filter((val) => val.trainingtype_slno === 1);
        setNames(mandatoryName);

        const mndryDuedateItem = trainingtype.find((typeItem) => typeItem.trainingtype_slno === 1);
        const { count_day } = mndryDuedateItem;
        const joiningdate = moment(joining_date, "DD-MM-YYYY").toDate();
        const datelimit = addDays(joiningdate, count_day);
        const dayswithin = moment(datelimit).format("DD-MM-YYYY");
        setmndryDuedate(dayswithin);

        //requirement
        const reqCate = trainingCategory.filter((val) => val.trainingtype_slno === 2);
        setCatereq(reqCate);
        const reqName = trainingName.filter((val) => val.trainingtype_slno === 2);
        setNamesreq(reqName);
        const rqmtDuedateItem = trainingtype.find((typeItem) => typeItem.trainingtype_slno === 2);

        if (rqmtDuedateItem) {
            const { count_day } = rqmtDuedateItem;
            const joiningdate = moment(joining_date, "DD-MM-YYYY").toDate();
            const datelimit = addDays(joiningdate, count_day);
            const dayswithin = moment(datelimit).format("DD-MM-YYYY");
            setrqmtDuedate(dayswithin);
        }

        //life support
        const lifeCate = trainingCategory.filter((val) => val.trainingtype_slno === 3);
        setCatelife(lifeCate);
        const lifeName = trainingName.filter((val) => val.trainingtype_slno === 3);
        setNameslife(lifeName);
        const lifeDuedateItem = trainingtype.find((typeItem) => typeItem.trainingtype_slno === 3);

        if (lifeDuedateItem) {
            const { count_day } = lifeDuedateItem;
            const joiningdate = moment(joining_date, "DD-MM-YYYY").toDate();
            const datelimit = addDays(joiningdate, count_day);
            const dayswithin = moment(datelimit).format("DD-MM-YYYY");
            setlifeDuedate(dayswithin);
        }
        //pro
        const proCate = trainingCategory.filter((val) => val.trainingtype_slno === 4);
        setCatepro(proCate);
        const proName = trainingName.filter((val) => val.trainingtype_slno === 4);
        setNamespro(proName);
        const proDuedateItem = trainingtype.find((typeItem) => typeItem.trainingtype_slno === 3);

        if (proDuedateItem) {
            const { count_day } = proDuedateItem;
            const joiningdate = moment(joining_date, "DD-MM-YYYY").toDate();
            const datelimit = addDays(joiningdate, count_day);
            const dayswithin = moment(datelimit).format("DD-MM-YYYY");
            setproDuedate(dayswithin);
        }

    }, [trainingCategory, trainingName, trainingtype, joining_date])

    //mandatory
    const handleCate = useCallback((val) => {
        if (selectValue.includes(val.cat_slno)) {
            setSelectValue(selectValue.filter(item => item !== val.cat_slno));
        } else {
            setSelectValue([...selectValue, val.cat_slno]);
        }
    }, [selectValue]);

    const handleName = useCallback((val) => {
        if (type_name.includes(val.name_slno)) {
            settype_name(type_name.filter(item => item !== val.name_slno));
        } else {
            settype_name([...type_name, val.name_slno]);
        }
    }, [type_name])

    //requirement
    const handleCatereq = useCallback((val) => {
        if (selectrerq.includes(val)) {
            setselectrerq(selectrerq.filter(item => item !== val));
        } else {
            setselectrerq([...selectrerq, val]);
        }
    }, [selectrerq]);

    const handleNamereq = useCallback((val) => {
        if (reqtype_name.includes(val)) {
            setreqtype_name(reqtype_name.filter(item => item !== val));
        } else {
            setreqtype_name([...reqtype_name, val]);
        }
    }, [reqtype_name])

    //life support
    const handleCatelife = useCallback((val) => {
        if (selectlife.includes(val)) {
            setselectlife(selectlife.filter(item => item !== val));
        } else {
            setselectlife([...selectlife, val]);
        }
    }, [selectlife]);

    const handleNamelife = useCallback((val) => {
        if (lifetype_name.includes(val)) {
            setlifetype_name(lifetype_name.filter(item => item !== val));
        } else {
            setlifetype_name([...lifetype_name, val]);
        }
    }, [lifetype_name]);

    //pro
    const handleCatepro = useCallback((val) => {
        if (selectpro.includes(val)) {
            setselectpro(selectpro.filter(item => item !== val));
        } else {
            setselectpro([...selectpro, val]);
        }
    }, [selectpro]);

    const handleNamepro = useCallback((val) => {
        if (protype_name.includes(val)) {
            setprotype_name(protype_name.filter(item => item !== val));

        } else {
            setprotype_name([...protype_name, val]);
        }
    }, [protype_name]);

    //postdata
    const postdata = useMemo(() => {
        return {
            tns_emp_id: emp_no,
            tns_dept: dept_id,
            tns_dept_sec: sect_id,
            tns_date: moment(mscheduleDate).format("YYYY-MM-DD HH:mm:ss"),
            create_user: em_id
        }
    }, [emp_no, selectValue, mscheduleDate, em_id])


    //submit
    const handleSubmit = useCallback(async () => {
        const filterMname = names.filter((val) => {
            return type_name.find((item) => {
                return item === val.name_slno;
            });
        });
        const filterRname = namesreq.filter((val) => {
            return reqtype_name.find((item) => {
                return item === val.name_slno
            })
        })
        const filterLname = nameslife.filter((val) => {
            return lifetype_name.find((item) => {
                return item === val.name_slno
            })
        })
        const filterPname = namespro.filter((val) => {
            return protype_name.find((item) => {
                return item === val.name_slno
            })
        })
        const combinedArray = [...filterMname, ...filterRname, ...filterLname, ...filterPname];

        const concatData = combinedArray.map((combinedArray) => ({
            ...combinedArray,
            tnd_emp_id: emp_no,
            create_user: em_id,
            tnd_date: moment(mscheduleDate).format("YYYY-MM-DD HH:mm:ss")
        }));
        const result = await axioslogin.post('/TrainingAfterJoining/insertnewjoinee', postdata)
        const { success, message } = result.data
        if (success === 1) {
            const res = await axioslogin.post('/TrainingAfterJoining/JoineeDetailsInsert', concatData)
            const { successmsg, message } = res.data
            if (successmsg === 1) {
                const patchdata = {
                    emp_no: emp_no


                }
                const result1 = await axioslogin.patch('/TrainingAfterJoining/JoineeDetailsUpdate', patchdata)
                const { message } = result1.data
                if (successmsg === 1) {
                    succesNofity("INSERT SUCCESSFULLY")
                    setOpen(false);
                    reset();
                    Setcount(count + 1)
                }
                else {

                    warningNofity(message)
                }
            } else {
                warningNofity(message)
            }
        }
        else {
            warningNofity(message)
        }

    }, [count, type_name, reqtype_name, lifetype_name, protype_name, names, postdata, namesreq, nameslife, namespro])

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Fragment>
            <ToastContainer />
            <Dialog
                fullScreen
                open={open}
            >
                <Paper >
                    <Paper sx={{ width: "100%", }}>
                        <Typography sx={{ p: 1, textAlign: "center", fontSize: "x-large", fontWeight: "bold" }}>TRAINING DETAILS </Typography>
                        <Box sx={{ display: "flex", flexDirection: "column", p: 1, pl: 5, border: 0.5, borderColor: "#B9B4C7" }}>
                            <Box sx={{ display: "flex", flexDirection: "row" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", minWidth: "350px" }}>
                                    <Box>Em No.</Box>
                                    <Box>Name</Box>
                                    <Box>Department</Box>
                                    <Box>Department Section</Box>
                                </Box>
                                <Box sx={{ display: "flex", flexDirection: "column", textTransform: "capitalize" }}>
                                    <Box>: {userdata?.emp_no}</Box>
                                    <Box>: {userdata?.em_name?.toLowerCase()}</Box>
                                    <Box>: {userdata?.dept_name?.toLowerCase()}</Box>
                                    <Box>: {userdata?.sect_name?.toLowerCase()}</Box>
                                </Box>
                            </Box>
                        </Box>

                        <Paper elevation={0} sx={{ width: "100%", p: 1 }}>

                            <Box sx={{
                                width: '100%', display: 'flex',
                                flexDirection: 'row', px: 10
                            }}>
                                <Box
                                    border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 10 }}>
                                        <CommonCheckBox
                                            name="training names"
                                            label="MANDATORY"
                                            checked={checkcat}
                                            onChange={(e) => setCheckCat(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    border={1} borderColor={"#B9B4C7"}
                                    sx={{
                                        width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                        '::-webkit-scrollbar': { display: "none" }
                                    }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            cate?.map((val, index) => (
                                                <CommonCheckBox
                                                    key={index}
                                                    label={val.trin_cat_name}
                                                    name={val.trin_cat_name}
                                                    value={val.cat_slno}
                                                    checked={selectValue.includes(val.cat_slno)}
                                                    className="ml-1"
                                                    onChange={() => handleCate(val)}
                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box
                                    border={1} borderColor={"#B9B4C7"}
                                    sx={{
                                        width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                        '::-webkit-scrollbar': { display: "none" }
                                    }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            names?.map((val, index) => (
                                                <CommonCheckBox
                                                    key={index}
                                                    name={val.training_name}
                                                    label={val.training_name}
                                                    value={val.name_slno}
                                                    checked={type_name.includes(val.name_slno)}
                                                    onChange={() => handleName(val)}

                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10 }}>
                                        {mndryduedate}
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10, px: 10 }}>
                                        <LocalizationProvider dateAdapter={AdapterMoment} >
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={mscheduleDate}
                                                onChange={setmScheduleDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                width: '100%', display: 'flex',
                                flexDirection: 'row', px: 10
                            }}>
                                <Box
                                    border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", px: 10, pt: 10 }}>
                                        <CommonCheckBox
                                            name="training names"
                                            label="UPON REQUIREMENTS"
                                            checked={checkreq}
                                            onChange={(e) => setCheckreq(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box
                                    border={1} borderColor={"#B9B4C7"} sx={{
                                        width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                        '::-webkit-scrollbar': { display: "none" }
                                    }} >
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            catereq?.map((val, index) => (

                                                <CommonCheckBox
                                                    key={index}
                                                    label={val.trin_cat_name}
                                                    name={val.trin_cat_name}
                                                    value={val.cat_slno}
                                                    checked={selectrerq.includes(val.cat_slno)}
                                                    className="ml-1"
                                                    onChange={() => handleCatereq(val.cat_slno)}

                                                />

                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box
                                    border={1} borderColor={"#B9B4C7"} sx={{
                                        width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                        '::-webkit-scrollbar': { display: "none" }
                                    }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            namesreq?.map((val, index) => (

                                                <CommonCheckBox
                                                    key={index}
                                                    name={val.training_name}
                                                    label={val.training_name}
                                                    value={val.name_slno}
                                                    checked={reqtype_name.includes(val.name_slno)}
                                                    onChange={() => handleNamereq(val.name_slno)}

                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10 }}>
                                        {rqmtduedate}
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10, px: 10 }}>
                                        <LocalizationProvider dateAdapter={AdapterMoment} >
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={rscheduleDate}
                                                onChange={setrScheduleDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                width: '100%', display: 'flex',
                                flexDirection: 'row', px: 10
                            }}>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 10 }}>
                                        <CommonCheckBox
                                            name="training names"
                                            label="LIFE SUPPORT"
                                            checked={checklife}
                                            onChange={(e) => setChecklife(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{
                                    width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            catelife?.map((val, index) => (

                                                <CommonCheckBox
                                                    key={index}
                                                    label={val.trin_cat_name}
                                                    name={val.trin_cat_name}
                                                    value={val.cat_slno}
                                                    checked={selectlife.includes(val.cat_slno)}
                                                    className="ml-1"
                                                    onChange={() => handleCatelife(val.cat_slno)}
                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{
                                    width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            nameslife?.map((val, index) => (
                                                <CommonCheckBox
                                                    key={index}
                                                    name={val.training_name}
                                                    label={val.training_name}
                                                    value={val.name_slno}
                                                    checked={lifetype_name.includes(val.name_slno)}
                                                    onChange={() => handleNamelife(val.name_slno)}

                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10 }}>{lifeduedate}</Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10, px: 10 }}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={lscheduleDate}
                                                onChange={setlScheduleDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                                )}
                                            />
                                        </LocalizationProvider>

                                    </Box>
                                </Box>
                            </Box>

                            <Box sx={{
                                width: '100%', display: 'flex',
                                flexDirection: 'row', px: 10
                            }}>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 10 }}>
                                        <CommonCheckBox
                                            name="training names"
                                            label="PROFFESSIONAL EQUIPMENT"
                                            checked={checkpro}
                                            onChange={(e) => setCheckpro(e.target.checked)}
                                        />
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{
                                    width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            catepro?.map((val, index) => (
                                                <CommonCheckBox
                                                    key={index}
                                                    label={val.trin_cat_name}
                                                    name={val.trin_cat_name}
                                                    value={val.cat_slno}
                                                    checked={selectpro.includes(val.cat_slno)}
                                                    className="ml-1"
                                                    onChange={() => handleCatepro(val.cat_slno)}
                                                />
                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{
                                    width: '100%', height: 180, textAlign: "center", overflow: 'auto',
                                    '::-webkit-scrollbar': { display: "none" }
                                }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 3, px: 10, pt: 5 }}>
                                        {
                                            namespro?.map((val, index) => (
                                                <CommonCheckBox
                                                    key={index}
                                                    name={val.training_name}
                                                    label={val.training_name}
                                                    value={val.name_slno}
                                                    checked={protype_name.includes(val.name_slno)}
                                                    onChange={() => handleNamepro(val.name_slno)}

                                                />

                                            ))
                                        }
                                    </Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10 }}> {produedate}</Box>
                                </Box>
                                <Box border={1} borderColor={"#B9B4C7"} sx={{ width: '100%', height: 180, textAlign: "center" }}>
                                    <Box sx={{ pt: 10, px: 10 }}>
                                        <LocalizationProvider dateAdapter={AdapterMoment}>
                                            <DatePicker
                                                views={['day']}
                                                inputFormat="DD-MM-YYYY"
                                                value={pscheduleDate}
                                                onChange={setpScheduleDate}
                                                renderInput={(params) => (
                                                    <TextField {...params} helperText={null} size="small" sx={{ display: 'flex' }} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </Box>
                                </Box>
                            </Box>

                        </Paper>
                    </Paper>
                </Paper >
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end", mt: 2 }}>
                    <Box sx={{ pr: 2 }}>
                        <Button onClick={handleSubmit} variant="contained" >SAVE</Button>
                    </Box>
                    <Box sx={{ pr: 2 }}>
                        <Button onClick={handleClose} variant="contained" >CLOSE</Button>
                    </Box>
                </Box>
            </Dialog>
        </Fragment >
    )
}

export default memo(TrainingDetailsModalpage)





