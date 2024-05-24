import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from 'react';
import { Actiontypes } from 'src/redux/constants/action.type';
import { EmpBasedonDept } from 'src/redux/actions/Training.Action';

const JoyTraineesBasedOnDept = ({ dept, getDeptEmp }) => {
    const dispatch = useDispatch();
    const { FETCH_DEPT_EMP_NAME } = Actiontypes;
    const deptEmp = useSelector((state) => state?.gettrainingData?.deptBasedonEmp?.deptBasedonEmpList)
    const [emp, setEmp] = useState([{ em_id: 0, em_name: 'Select Employees' }])

    const [value, setValue] = useState(dept[0]);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        // console.log(value);
        // if (value !== null) {
        //     dispatch({ type: FETCH_DEPT_EMP_NAME, payload: value.em_id })
        //     getDeptEmp(value.em_id)
        // } else {
        //     dispatch({ type: FETCH_DEPT_EMP_NAME, payload: 0 })
        //     getDeptEmp(0)
        // }
        // return
    }, [value])

    useEffect(() => {
        deptEmp.length > 0 && setEmp(deptEmp)
    }, [deptEmp])

    return (
        <Autocomplete
            placeholder="Select Employee Names"
            value={value}
            clearOnBlur
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            inputValue={inputValue}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            loading={true}
            loadingText="Loading..."
            freeSolo
            isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
            getOptionLabel={option => option.em_name || ''}
            options={emp}
            sx={{ width: '100%' }}
        />
    )
}

export default memo(JoyTraineesBasedOnDept)
// import React, { useEffect, memo, useState, Fragment, useCallback } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import Autocomplete from '@mui/joy/Autocomplete';
// import { CssVarsProvider } from '@mui/joy/'
// import { EmpBasedonDept } from 'src/redux/actions/Training.Action';


// const JoyTraineesBasedOnDept = ({ }) => {
//     const dispatch = useDispatch();
//     const emplist = useSelector((state) => state)
//     console.log(emplist);
//     const [emp, setEmp] = useState([{ em_id: 0, em_name: '' }])
//     const [value, setValue] = useState(emp[0]);
//     const [inputValue, setInputValue] = useState('');

//     const ClickFunction = useCallback((value) => {
//         if (value !== null) {
//             setValue(value);
//             dispatch(EmpBasedonDept(value.em_id))
//             setEmp(value.em_id)
//         } else {
//             setEmp(0)
//         }
//     }, [setEmp, dispatch])

//     useEffect(() => {
//         emplist.length > 0 && setEmp(emplist)
//     }, [emplist])

//     return (
//         <Fragment >
//             <CssVarsProvider>
//                 <Autocomplete
//                     sx={{
//                         "--Input-minHeight": "29px"
//                     }}
//                     value={category === 0 ? categories : value}
//                     placeholder="Select Employees"
//                     clearOnBlur
//                     onChange={(event, newValue) => {
//                         ClickFunction(newValue);
//                     }}
//                     inputValue={inputValue}
//                     onInputChange={(event, newInputValue) => {
//                         setInputValue(newInputValue);
//                     }}
//                     loading={true}
//                     loadingText="Loading..."
//                     freeSolo

//                     isOptionEqualToValue={(option, value) => option.em_name === value.em_name}
//                     getOptionLabel={option => option.em_name || ''}
//                     options={emp}
//                 />
//             </CssVarsProvider>
//         </Fragment>
//     )
// }

// export default memo(JoyTraineesBasedOnDept)

