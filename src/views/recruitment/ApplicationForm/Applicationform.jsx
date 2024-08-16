import { Box, } from '@mui/joy';
import React, { memo, lazy, useCallback, useMemo, useEffect } from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
import { getApplicationnum } from 'src/views/Constant/Constant'
import moment from 'moment'


const ContactInformation = lazy(() => import('./ContactInformation'))
const MainModal = lazy(() => import('./MainModal'))

const Applicationform = () => {
    const [expdata, expdataset] = useState([])
    const [edudata, edudataset] = useState([])
    const [value, setValue] = useState(0)
    const [count, setcount] = useState(0)
    const [data, setdata] = useState([])
    const [eduname, seteduname] = useState([])
    const [vacancydata, setvacancydata] = useState([])
    const [selectedVacancies, setSelectedVacancies] = useState([]);
    const [education, seteducation] = useState(0)
    const [Regionexp, setRegionexp] = useState(0);
    const [Regionedu, setRegionedu] = useState(0);
    const [Religion, setReligion] = useState(0);
    const [Region, setRegion] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [addressPermnt1, setaddressPermnt1] = useState('')
    const [addressPermnt2, setaddressPermnt2] = useState('')
    const [gender, setGender] = useState(0)
    const [applicationSlno, setApplicationno] = useState(0)
    const [bloodgrp, setBloodgrp] = useState(0)
    const [experience, setexprience] = useState({
        Employer: "", expstartdate: moment(new Date()).format('YYYY-MM-DD'), expenddate: moment(new Date()).format('YYYY-MM-DD'),
        Workingstatus: false, Responsibilities: "", jobexp: "", SupervisorName: '', Additionalinf: '', Other: ''
    });
    const [education_details, seteducation_details] = useState({
        schoolname: "", edustartdate: moment(new Date()).format('YYYY-MM-DD'), eduenddate: moment(new Date()).format('YYYY-MM-DD'),
        Graduated: false, AvgGrade: "", gpa: "", DateAcquired: moment(new Date()).format('YYYY-MM-DD'), ProjectedDate: moment(new Date()).format('YYYY-MM-DD'),
    });

    const [formdata, setformdata] = useState({
        name: '',
        lname: '',
        mname: '',
        email: '',
        reemail: '',
        mobile: 0,
        date: moment(new Date()).format('YYYY-MM-DD'),
        permnt_pin: 0,
        status_yes: false,
        status_no: false,
        Health_statusyes: false,
        Health_statusno: false,
        criminal_statusyes: false,
        criminal_statusno: false,
        obligation_status_yes: false,
        obligation_status_no: false,
        relatives_status_yes: false,
        relatives_status_no: false,
        recruitment_status_yes: false,
        recruitment_status_no: false,
        vaccinated_statusyes: false,
        vaccinated_statusno: false,
        vaccinated_statuspar: false,
        criminal: '',
        obligation: '',
        recruitment: '',
        Health: "",
        job: "",
        empemail: "",
        empname: '',
        empno: "",
        agreestatus: false,
        agreestatus_marketing: false,
        education: 0,
    });

    const resetForm = useMemo(() => {
        return {
            name: '',
            lname: '',
            mname: '',
            email: '',
            reemail: '',
            mobile: 0,
            date: moment(new Date()).format('YYYY-MM-DD'),
            permnt_pin: 0,
            status_yes: false,
            status_no: false,
            Health_statusyes: false,
            Health_statusno: false,
            criminal_statusyes: false,
            criminal_statusno: false,
            obligation_status_yes: false,
            obligation_status_no: false,
            relatives_status_yes: false,
            relatives_status_no: false,
            recruitment_status_yes: false,
            recruitment_status_no: false,
            vaccinated_statusyes: false,
            vaccinated_statusno: false,
            vaccinated_statuspar: false,
            criminal: '',
            obligation: '',
            recruitment: '',
            Health: "",
            job: "",
            empemail: "",
            empname: '',
            empno: "",
            agreestatus: false,
            agreestatus_marketing: false,
            education: 0,
        }
    }, [])
    const { status_yes, status_no, Health_statusyes, Health_statusno, criminal_statusyes,
        criminal_statusno, obligation_status_yes, obligation_status_no, relatives_status_yes,
        relatives_status_no, recruitment_status_yes, recruitment_status_no, vaccinated_statusyes,
        vaccinated_statusno, vaccinated_statuspar, agreestatus_marketing,
        agreestatus, name, lname, mname, email, mobile, date, permnt_pin, criminal, obligation,
        recruitment, Health, job, empemail, empname, empno } = formdata


    const history = useHistory();
    const toRedirectToHome = () => {
        history.push('/Home');
    }
    useEffect(() => {
        //new process serial number
        getApplicationnum().then((val) => {
            setApplicationno(val)
            setcount(0)
        })
    }, [count])

    const postdata = useMemo(() => {
        return {
            expdata: expdata,
            edudata: edudata,
            name: name, lname: lname, mname: mname, email: email, mobile: mobile, dob: date, permnt_pin: permnt_pin, criminal: criminal,
            obligation: obligation,
            recruitment: recruitment, Health: Health, job: job, empemail: empemail, empname: empname,
            empno: empno,
            value: value,
            Religion: Religion,
            Region: Region,
            opportunity_status: status_yes === true ? 1 : status_no === true ? 2 : 0,
            vaccination_status: vaccinated_statusyes === true ? 1 : vaccinated_statusno === true ? 2 : vaccinated_statuspar === true ? 3 : 0,
            helath_status: Health_statusyes === true ? 1 : Health_statusno === true ? 2 : 0,
            criminal_status: criminal_statusyes === true ? 1 : criminal_statusno === true ? 2 : 0,
            legal_obligation_status: obligation_status_yes === true ? 1 : obligation_status_no === true ? 2 : 0,
            relatives_friends_status: relatives_status_yes === true ? 1 : relatives_status_no === true ? 2 : 0,
            recruitment_sts: recruitment_status_yes === true ? 1 : recruitment_status_no === true ? 2 : 0,
            agree_status: agreestatus === true ? 1 : 0,
            agree_marketing_status: agreestatus_marketing === true ? 1 : 0,
            applicationSlno: applicationSlno,
            selectedVacancies: selectedVacancies,
            addressPermnt1: addressPermnt1,
            addressPermnt2: addressPermnt2,
            gender: gender,
            bloodgrp: bloodgrp

        }
    }, [status_yes, vaccinated_statusyes, Health_statusyes, criminal_statusyes, obligation_status_yes, recruitment_status_yes, addressPermnt1, addressPermnt2,
        relatives_status_yes, agreestatus, agreestatus_marketing, applicationSlno, expdata, edudata, value, Religion, criminal_statusno, gender, bloodgrp,
        Region, date, email, mobile, criminal, Health, Health_statusno, vaccinated_statuspar, mname, lname, name, permnt_pin, obligation_status_no,
        relatives_status_no, recruitment_status_no, vaccinated_statusno, status_no, empno, recruitment, job, empemail, empname, obligation, selectedVacancies
    ])
    const qualification = useMemo(() => {
        return {
            education: education
        }
    }, [education])

    const education1 = useMemo(() => eduname, [eduname])


    //to show the education name and show in the workexperience page
    useEffect(() => {
        if (education === null || education === 0) {
            setdata([])
        } else {
            const fetchData = async () => {
                const result = await axioslogin.post('/Applicationform/eduname', qualification)
                const { success, data1 } = result.data
                if (success === 1) {
                    const newdata = [...eduname, ...data1]
                    seteduname(newdata)
                    const result = await axioslogin.post('/Applicationform/list', qualification)
                    const { success, data } = result.data
                    if (success === 1) {
                        const newdatas = [...vacancydata, ...data]
                        const keys = ['desg_id'];
                        const filteredData = newdatas.filter((value, index, self) =>
                            self.findIndex(v => keys.every(k => v[k] === value[k])) === index
                        );

                        setvacancydata(filteredData)

                    } else {
                        setvacancydata([])
                    }
                } else {
                    seteduname([])
                }
            }
            fetchData()
        }

    }, [setdata, qualification, education, setvacancydata,])

    //to open the main modal
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        setIsModalOpen(true)
    }, [setIsModalOpen])

    //to save the all details in the application form
    const handleOnSave = useCallback(async (event) => {
        event.preventDefault()
        if (Object.keys(edudata).length === 0) {
            warningNofity("Please Enter All Field in the Education Information")
            setIsModalOpen(false)
        } else if (agreestatus === false && agreestatus_marketing === false) {
            warningNofity("Please Tick the Agreement ")
            setIsModalOpen(false)
        }
        else {
            const result = await axioslogin.post('/Applicationform/insertdata', postdata)
            const { success, message } = result.data
            if (success === 1) {
                setcount(count + 1)
                succesNofity(message)
                setIsModalOpen(false)
                expdataset([])
                edudataset([])
                setValue(0)
                setRegionexp(0)
                setRegionedu(0)
                setReligion(0)
                setRegion(0)
                setaddressPermnt1('')
                setaddressPermnt2('')
                setformdata(resetForm)
                setGender(0)
                setBloodgrp(0)
            } else {
                warningNofity(message)
                setIsModalOpen(false)
            }
        }

    }, [postdata, edudata, agreestatus, agreestatus_marketing, setIsModalOpen, resetForm, count])

    return (
        <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column', }} >
            <DasboardCustomLayout title={"Application Form"} displayClose={true} setClose={toRedirectToHome} >
                <Box sx={{ display: 'flex', flex: 1, py: 0.5, height: window.innerHeight - 120 }} >

                    <ContactInformation
                        setformdata={setformdata} formdata={formdata} setValue={setValue} value={value}
                        setReligion={setReligion} setRegion={setRegion} Religion={Religion} Region={Region}
                        seteducation={seteducation} Regionexp={Regionexp} setRegionexp={setRegionexp} Regionedu={Regionedu} handleOnClick={handleOnClick}
                        setRegionedu={setRegionedu} education={education} expdata={expdata} expdataset={expdataset} experience={experience}
                        setexprience={setexprience} education_details={education_details} seteducation_details={seteducation_details}
                        edudata={edudata} edudataset={edudataset} eduname={education1} addressPermnt1={addressPermnt1} setaddressPermnt1={setaddressPermnt1}
                        addressPermnt2={addressPermnt2} setaddressPermnt2={setaddressPermnt2} gender={gender} setGender={setGender}
                        bloodgrp={bloodgrp} setBloodgrp={setBloodgrp}
                    />

                </Box>

            </DasboardCustomLayout>
            <MainModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                formdata={formdata}
                expdata={expdata}
                edudata={edudata}
                education={education}
                handleOnSave={handleOnSave}
                vacancydata={vacancydata}
                selectedVacancies={selectedVacancies}
                setSelectedVacancies={setSelectedVacancies}
                eduname={education1}
                data={data}
            />

        </Box>
    )
}

export default memo(Applicationform)