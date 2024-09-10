import { Box, Button, Modal, ModalClose, Typography } from '@mui/joy'
import React, { useMemo, useCallback, memo } from 'react'
import { employeeNumber } from 'src/views/Constant/Constant'
import moment from 'moment'
import {
    errorNofity,
    infoNofity,
    succesNofity,
    warningNofity
} from 'src/views/CommonCode/Commonfunc'
import { useSelector } from 'react-redux'
import { axioslogin } from 'src/views/Axios/Axios'
import _ from 'underscore'



const ConvertionSubmitModal = ({ modalopen, setModalOpen, empname, gender, bloodgrp, grade, doctortype, doct, dateofbirth, empno, details,
    mobileno, email, permantPin, retirementyear, cont_gracedate, probationendDate, cont_perioddate, contractflag, prob_status, item,
    clinictype, doctor, landphone, region1, addressPresent1, addressPresent2, addressPermnt1, addressPermnt2, dept, deptSect, institute, designation,
    category, Salary, empstatus, branch, application_no, yearage, mnthage, dayge, setIsModalOpen }) => {

    const { dateofjoing, edu, exp } = details;

    // data for sumbimssion
    const submitdata = useMemo(() => {
        return {
            em_no: empno,
            em_salutation: item?.salutation,
            em_name: empname,
            em_gender: gender,
            em_dob: item?.dob,
            em_age_year: yearage,
            em_doj: dateofjoing,
            em_mobile: item?.mobile_num,
            em_phone: landphone,
            em_email: item?.email,
            em_branch: branch,
            em_department: dept,
            em_dept_section: deptSect,
            em_institution_type: institute,
            em_designation: designation,
            em_doc_type: doctortype === true ? doct : null,
            em_category: category,
            em_prob_end_date: moment(probationendDate).format('YYYY-MM-DD'),
            em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
            em_retirement_date: moment(retirementyear).format('YYYY-MM-DD'),
            em_contract_end_date: moment(cont_perioddate).format('YYYY-MM-DD'),
            em_status: empstatus === true ? 1 : 0,
            create_user: employeeNumber(),
            addressPermnt1: addressPermnt1,
            addressPermnt2: addressPermnt2,
            perPincode: item.reg_pincode,
            em_region: item.region,
            addressPresent1: addressPresent1,
            addressPresent2: addressPresent2,
            presPincode: item.reg_pincode,
            hrm_region2: item.region,
            blood_slno: bloodgrp,
            em_age_month: mnthage,
            em_age_day: dayge,
            hrm_religion: item.religion,
            contractflag: contractflag,
            probation_status: prob_status,
            recomend_salary: Salary,
            clinicaltype: clinictype,
            doctor_status: doctor === true ? 1 : 0
        }
    }, [
        item, gender, branch, dept, deptSect, institute, doct, empno,
        cont_gracedate, category, retirementyear, cont_perioddate, dateofjoing,
        yearage, landphone, designation, bloodgrp, mnthage, dayge,
        Salary, empstatus, addressPermnt1, addressPermnt2, addressPresent1, addressPresent2, doctortype,
        probationendDate, prob_status, contractflag, clinictype, doctor, empname
    ])

    const state = useSelector((state) => state?.getCommonSettings, _.isEqual)

    // for submition
    const submitemployeerecord = useCallback(
        (e) => {
            e.preventDefault()
            setModalOpen(true)
            const contractEmployee = async () => {
                const result = await axioslogin.post('/empmast', submitdata)
                const { success, message } = result.data
                if (success === 1) {
                    const result = await axioslogin.get(`/empmast/${empno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        const { em_id } = data[0]

                        const submitemployee = {
                            emp_no: empno,
                            emp_id: em_id,
                            emp_status: empstatus === true ? 1 : 0,
                            emp_email: item?.email,
                            emp_username: empno,
                            emp_password: empno,
                            create_user: employeeNumber(),
                        }
                        // update hrm_employee table
                        const resultemployee = await axioslogin.post('/employee', submitemployee)
                        const { success } = resultemployee.data
                        if (success === 1) {
                            const postdataverify = {
                                em_id: em_id,
                                verification_required: state?.verification_level === 1 || state?.verification_level === 2 ? 1 : 0,
                                second_level_required: state?.verification_level === 2 ? 1 : 0,
                            }
                            //inserting details hrm_emp_verification table
                            const result = await axioslogin.post('/empVerification', postdataverify)
                            const { success } = result.data
                            if (success === 1) {
                                const postContractDetl = {
                                    em_id: em_id,
                                    em_no: empno,
                                    em_cont_start: dateofjoing,
                                    em_cont_end: moment(cont_perioddate).format('YYYY-MM-DD'),
                                    em_prob_end_date: moment(probationendDate).format('YYYY-MM-DD'),
                                    em_conf_end_date: moment(cont_gracedate).format('YYYY-MM-DD'),
                                }
                                const result = await axioslogin.post('/empmast/createContract', postContractDetl)
                                const { success, message } = result.data
                                if (success === 1) {
                                    const result = await axioslogin.post('/Vaccination/vaccinentry', submitemployee)
                                    const { success, message } = result.data
                                    if (success === 1) {
                                        const postdata = {
                                            em_id: em_id,
                                            em_no: empno,
                                            application_no: application_no,
                                            designation: designation,
                                            Salary: Salary,
                                            em_cont_end: moment(cont_perioddate).format('YYYY-MM-DD'),
                                        }
                                        const result = await axioslogin.post('/EmailandPdf/em_noUpdate', postdata)
                                        const { success } = result.data
                                        if (success === 1) {
                                            const mappedEduArray = edu.map((eduItem) => {
                                                return {
                                                    ...eduItem,
                                                    em_id: em_id,
                                                    em_no: empno,
                                                    create_user: employeeNumber(),
                                                };
                                            });
                                            const result = await axioslogin.post('/Manpower/insertdataedu', mappedEduArray)
                                            const { success, } = result.data
                                            if (success === 1) {
                                                const mappedExpArray = exp.map((expItem) => {
                                                    return {
                                                        ...expItem,
                                                        em_id: em_id,
                                                        em_no: empno,
                                                        create_user: employeeNumber(),
                                                    };
                                                });
                                                const result = await axioslogin.post('/Manpower/insertdataexp', mappedExpArray)
                                                const { success } = result.data
                                                if (success === 1) {
                                                    const personaldata = {
                                                        em_id: em_id,
                                                        em_no: empno,
                                                        addressPermnt1: addressPermnt1,
                                                        addressPermnt2: addressPermnt2,
                                                        perPincode: item.reg_pincode,
                                                        em_region: item.region,
                                                        addressPresent1: addressPresent1,
                                                        addressPresent2: addressPresent2,
                                                        presPincode: item.reg_pincode,
                                                        blood_slno: bloodgrp,
                                                        em_mobile: item?.mobile_num,
                                                        create_user: employeeNumber(),
                                                        em_dob: item?.dob,
                                                        em_email: item?.email,
                                                        hrm_religion: item?.religion,
                                                    }
                                                    const result = await axioslogin.post('/Manpower/personaldata', personaldata)
                                                    const { success, message } = result.data
                                                    if (success === 1) {
                                                        succesNofity(message)
                                                        setIsModalOpen(false)
                                                        setModalOpen(false)
                                                    }
                                                }

                                            }
                                        }
                                        // history.push(`/Home/Prfle/${empno}/${em_id}`)

                                    } else {
                                        infoNofity(message)
                                    }
                                } else {
                                    errorNofity(message)
                                }
                            } else {
                                errorNofity('Error Occured!!Please Contact ED')
                            }
                        } else if (success === 0) {
                            errorNofity(message)
                        } else if (success === 2) {
                            infoNofity(message)
                        }
                    } else {
                        errorNofity('Error Occured!!Please Contact EDP')
                    }
                } else if (success === 0) {
                    warningNofity(message)
                } else if (success === 2) {
                    infoNofity(message)
                } else {
                    infoNofity(message)
                }
            }

            const permanentEmployee = async () => {
                const result = await axioslogin.post('/empmast', submitdata)
                const { success, message } = result.data
                if (success === 1) {
                    const result = await axioslogin.get(`/empmast/${empno}`)
                    const { success, data } = result.data
                    if (success === 1) {
                        const { em_id } = data[0]
                        const submitemployee = {
                            emp_no: empno,
                            emp_id: em_id,
                            emp_status: empstatus === true ? 1 : 0,
                            emp_email: item?.email,
                            emp_username: empno,
                            emp_password: empno,
                            create_user: employeeNumber(),
                        }
                        // update hrm_employee table
                        const resultemployee = await axioslogin.post('/employee', submitemployee)
                        const { success } = resultemployee.data
                        if (success === 1) {
                            const postdataverify = {
                                em_id: em_id,
                                verification_required: state?.verification_level === 1 || state?.verification_level === 2 ? 1 : 0,
                                second_level_required: state?.verification_level === 2 ? 1 : 0,
                            }
                            const result = await axioslogin.post('/empVerification', postdataverify)
                            const { success, message } = result.data
                            if (success === 1) {
                                const result = await axioslogin.post('/Vaccination/vaccinentry', submitemployee)
                                const { success, message } = result.data
                                if (success === 1) {
                                    const postdata = {
                                        em_id: em_id,
                                        em_no: empno,
                                        application_no: application_no,
                                        designation: designation,
                                        Salary: Salary
                                    }
                                    const result = await axioslogin.post('/EmailandPdf/em_noUpdate', postdata)
                                    const { success } = result.data
                                    if (success === 1) {
                                        const mappedEduArray = edu.map((eduItem) => {
                                            return {
                                                ...eduItem,
                                                em_id: em_id,
                                                em_no: empno,
                                                create_user: employeeNumber(),
                                            };
                                        });
                                        const result = await axioslogin.post('/Manpower/insertdataedu', mappedEduArray)
                                        const { success } = result.data
                                        if (success === 1) {
                                            const mappedExpArray = exp.map((expItem) => {
                                                return {
                                                    ...expItem,
                                                    em_id: em_id,
                                                    em_no: empno,
                                                    create_user: employeeNumber(),
                                                };
                                            });
                                            const result = await axioslogin.post('/Manpower/insertdataexp', mappedExpArray)
                                            const { success } = result.data
                                            if (success === 1) {
                                                const personaldata = {
                                                    em_id: em_id,
                                                    em_no: empno,
                                                    addressPermnt1: addressPermnt1,
                                                    addressPermnt2: addressPermnt2,
                                                    perPincode: item.reg_pincode,
                                                    em_region: item.region,
                                                    addressPresent1: addressPresent1,
                                                    addressPresent2: addressPresent2,
                                                    presPincode: item.reg_pincode,
                                                    blood_slno: bloodgrp,
                                                    em_mobile: item?.mobile_num,
                                                    create_user: employeeNumber(),
                                                    em_dob: item?.dob,
                                                    em_email: item?.email,
                                                    hrm_religion: item?.religion,
                                                }
                                                const result = await axioslogin.post('/Manpower/personaldata', personaldata)
                                                const { success, message } = result.data
                                                if (success === 1) {
                                                    succesNofity(message)
                                                    setIsModalOpen(false)
                                                    setModalOpen(false)
                                                }
                                            }
                                        }

                                    }
                                } else {
                                    errorNofity(message)
                                }
                            } else {
                                errorNofity(message)
                            }
                        } else if (success === 0) {
                            errorNofity(message)
                        } else if (success === 2) {
                            infoNofity(message)
                        }
                    } else {
                        errorNofity('Error Occured!!Please Contact EDP')
                    }
                } else if (success === 0) {
                    warningNofity(message)
                } else if (success === 2) {
                    infoNofity(message)
                } else {
                    setIsModalOpen(false)
                    setModalOpen(false)
                    infoNofity(message)
                }
            }
            if (contractflag === 1) {
                contractEmployee(submitdata)
            } else {
                permanentEmployee(submitdata)
            }
        }, [submitdata, item, probationendDate, cont_perioddate, dateofjoing, Salary, addressPermnt1, application_no, bloodgrp,
        addressPermnt2, addressPresent1, addressPresent2,
        cont_gracedate, setIsModalOpen, contractflag, empstatus, state, empno, exp, designation, setModalOpen, edu])

    const closeModal = useCallback(async () => {
        setModalOpen(false)
    }, [setModalOpen]);

    return (
        <Box>
            <Modal open={modalopen} onClose={() => setModalOpen(false)}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 500,
                        bgcolor: 'white',
                        boxShadow: 24,
                        p: 3,
                        borderRadius: 10,
                        border: 1
                    }}
                >
                    <ModalClose
                        variant="outlined"
                        sx={{
                            top: 'calc(-1/4 * var(--IconButton-size))',
                            right: 'calc(-1/4 * var(--IconButton-size))',
                            boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                            borderRadius: '50%',
                            bgcolor: 'background.body',
                        }}
                    />
                    {/* submitemployeerecord */}
                    <Box sx={{}}>
                        <Typography > Are You Sure Want to Continue ?</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "end", mt: 3 }}>
                        <Button sx={{ p: 0, width: "40%", mr: .5 }} size='sm' variant="outlined" color="danger" onClick={closeModal} >
                            No
                        </Button>
                        <Button sx={{ p: 0, width: "40%" }} size='sm' variant="outlined" color="success" onClick={submitemployeerecord} >
                            Yes
                        </Button>

                    </Box>
                </Box>
            </Modal>
        </Box>
    )
}

export default memo(ConvertionSubmitModal) 