const insertDutyPlanning = async (e) => {
    setCount(count + 1)
    //checking whether shift is assigned for this department and department section
    const postData = {
        em_department: selectedDept,
        em_dept_section: selectDeptSection
    }
    const results = await axioslogin.post("/departmentshift/checkshift", postData);
    const { successs } = results.data
    if (successs === 1) {
        setdisable(false)

    }
    else {
        setdisable(true)
        setDuty(0)
        warningNofity("Please Map Shift For This Department Section")
    }
    //getting employee details from redux
    if (Object.keys(empdetl).length > 0) {
        setempData(empdetl)
    }
    else {

    }
    //finding the dates between start date and end date
    const rage = eachDayOfInterval(
        { start: new Date(startDate), end: new Date(endDate) }
    )
    //finding the dates between start date and end date
    const newDateFormat = rage.map((val) => { return { date: moment(val).format('MMM-D-dd'), sunday: moment(val).format('d') } })
    setdateFormat(newDateFormat)
    const newDateFormat2 = rage.map((val) => { return { date: moment(val).format('YYYY-MM-DD') } })
    //checking wheher duty plan is already setted in thse dates
    const empidata = empData && empData.map((val) => {
        return val.em_id
    })
    const postDate = {
        start_date: moment(startDate).format('YYYY-MM-DD'),
        end_date: moment(endDate).format('YYYY-MM-DD'),
        empData: empidata
    }
    const result = await axioslogin.post("/plan/check", postDate)
    const { success, data } = result.data
    if (success === 1) {
        const dutyday = empData.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
                return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
        })
        const dutyplanarray = dutyday.flat(Infinity)
        //filtering the data from the data base and inserting dates and finding the new array to insert
        const newdutyplanarray = dutyplanarray.filter((val) => {
            return data.filter((data) => {
                return val.emp_id === data.emp_id && val.date === moment(data.duty_day).format('YYYY-MM-DD')
            }).length === 0
        })
        //inserting duty plan based on date of join
        const insertnewdutyplanarray = newdutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? 0 : 1000 }
        })
        //if new array lenth is zero no need to inset
        if (newdutyplanarray.length === 0) {
            setDuty(1)
        }

        //if new array length not eqal to zero inserting the new array
        else {
            //inserting the duty plan
            const results = await axioslogin.post("/plan/insert", insertnewdutyplanarray)
            const { success1 } = results.data
            if (success1 === 1) {
                setDuty(1)
            }
            else {
                errorNofity("Error Occured!!Please Contact EDP")
            }
        }
    }
    //if the no dates are inserted betwen the start date and end date inserting the dates
    else {
        const dutyday = empData.map((val) => {
            const dutydate = newDateFormat2.map((value) => {
                return { date: value.date, emp_id: val.em_id, doj: val.em_doj }
            })
            return dutydate
        })
        const dutyplanarray = dutyday.flat(Infinity)
        //inserting duty plan based on date of join
        const insertdutyplanarray = dutyplanarray.map((val) => {
            return { date: val.date, emp_id: val.emp_id, shift: val.date >= val.doj ? 0 : 1000 }
        })
        //inserting the duty plan
        const results = await axioslogin.post("/plan/insert", insertdutyplanarray)
        const { success1 } = results.data
        if (success1 === 1) {
            setDuty(1)
        }
        else {
            errorNofity("Error Occured!!Please Contact EDP")
        }
    }

}