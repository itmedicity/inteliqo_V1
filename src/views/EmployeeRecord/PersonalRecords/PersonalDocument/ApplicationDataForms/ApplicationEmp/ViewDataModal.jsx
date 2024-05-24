import { Box, Button, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useMemo, useState, } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import moment from 'moment';
import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import JoyDesignationSelect from 'src/views/MuiComponents/JoyComponent/JoyDesignationSelect';
import JoyDepartment from 'src/views/MuiComponents/JoyComponent/JoyDepartment';
import { setDepartment } from 'src/redux/actions/Department.action';
import { useDispatch } from 'react-redux';
import { axioslogin } from 'src/views/Axios/Axios';
import { succesNofity, warningNofity } from 'src/views/CommonCode/Commonfunc';

const ViewDataModal = ({ itemname, setid, Empdata, setEmpdata }) => {
    const [Place, setPlace] = useState("")
    const [RelativeName, setRelativeName] = useState("")

    const [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const [desg, changeDesg] = useState(0);
    const [dept, changeDept] = useState(0);
    const [olddept, changeoldDept] = useState(0);
    const dispatch = useDispatch();
    const [UpdateFlag, setUpdateFlag] = useState(0)



    // for updating the data
    useEffect(() => {
        const postdata = {
            emno: Empdata?.em_no,
        };
        const fetchData = async () => {
            // Data to the form page
            const result = await axioslogin.post('/PersonalChecklist/applicationdata', postdata)
            const { applicationsuccess, applicationdata } = result.data
            if (applicationsuccess === 1) {
                if (applicationdata.length > 0) {
                    const { Date_of_Form, Place, Relative_Dept, Relative_DesgId, Old_DeptId, Relative_name } = applicationdata[0]
                    setUpdateFlag(1)
                    setPlace(Place)
                    changeDesg(Relative_DesgId)
                    changeDept(Relative_Dept)
                    setDate(Date_of_Form)
                    changeoldDept(Old_DeptId)
                    setRelativeName(Relative_name)
                }
                else {
                    setPlace("")
                    changeDesg(0)
                    changeDept(0)
                    changeoldDept(0)
                    setRelativeName('')
                    setDate(moment(new Date()).format('YYYY-MM-DD'))
                }

            }
        }
        fetchData()
    }, [setUpdateFlag, Empdata])



    useEffect(() => {
        dispatch(setDepartment());
    }, [dispatch])


    const postdata = useMemo(() => {
        return {
            Place: Place,
            date: date,
            desg: desg,
            dept: dept,
            emno: Empdata?.em_no,
            applicationNo: Empdata?.application_no,
            oldDept: olddept,
            RelativeName: RelativeName
        }
    }, [Place, date, desg, dept, Empdata, olddept, RelativeName])
    //to save
    const handleOnClick = useCallback(async (event) => {
        event.preventDefault()
        if (UpdateFlag === 0) {
            if (Place === "") {
                warningNofity("Please Enter The Fields")
            }
            else {
                const result = await axioslogin.post('/PersonalChecklist/insertdata', postdata)
                const { success } = result.data
                if (success === 1) {
                    succesNofity("Data Inserted Successfully")
                }
                else {
                    warningNofity("Data Not Insert")
                }
            }
        } else {
            const result = await axioslogin.post('/PersonalChecklist/updatetdata', postdata)
            const { success } = result.data
            if (success === 1) {
                succesNofity("Data Updated Successfully")
            }
            else {
                warningNofity("Data Not Insert")
            }
        }


        // setIsModalOpen(true)
    }, [Place, postdata, UpdateFlag])
    return (
        <Box sx={{}}>
            <Paper sx={{ height: window.innerHeight - 150, overflowX: "auto", '::-webkit-scrollbar': { display: "none" }, p: 1 }}>
                <TableContainer sx={{}}>
                    <Table sx={{ p: 0, border: '1px solid #e0e0e0', width: '100%' }}>

                        <TableBody >
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Position Applying For  </Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: "50%" }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.desg_name === '' ? 'Not Updated' : Empdata?.desg_name} </Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Date Of Joining</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_doj === null ? "Not Updated" : moment(Empdata?.em_doj).format('DD-MM-YYYY')} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}> Name</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Qualification</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.edu_desc === '' ? "Not Updated" : Empdata?.edu_desc} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Gender</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>{Empdata?.em_gender === 0 ? "Not Updated" : Empdata?.em_gender === 1 ? "Male" : Empdata?.em_gender === 2 ? "FeMale" : 'Other'}</Typography>

                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Age</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_age_year === '' ? "Not Updated" : Empdata?.em_age_year}  </Typography>

                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Date Of Birth</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.em_dob === null ? "Not Updated" : moment(Empdata?.em_dob).format('DD-MM-YYYY')}  </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Contact Address</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}>{Empdata?.addressPermnt1 === '' ? "Not Updated" : Empdata?.addressPermnt1} ,{Empdata?.addressPermnt2 === '' ? "Not Updated" : Empdata?.addressPermnt2} </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{ p: 0 }}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Phone Number</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                    <Typography level="title-md" sx={{ ml: 1, textTransform: 'capitalize' }}> {Empdata?.em_mobile === 0 ? "Not Updated" : Empdata?.em_mobile} </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table sx={{ mt: 1 }}>
                        <TableBody>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Do you have any relative or friend who is employed in Travancore Medicity ?</Typography>
                                </TableCell>

                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Name</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Designation</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    {Empdata?.relatives_friends_name === '' || Empdata?.relatives_friends_name === null ?
                                        <JoyInput
                                            size="sm"
                                            value={RelativeName}
                                            onchange={setRelativeName}
                                            name="RelativeName"
                                            type="text"
                                        />
                                        : <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>
                                            {Empdata?.relatives_friends_name === '' ? "Not Updated" : Empdata?.relatives_friends_name}
                                        </Typography>}

                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    {/* <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}> */}
                                    <Box sx={{ width: "100%", textAlign: "center" }}>
                                        <JoyDesignationSelect getDesg={changeDesg} desgValue={desg} />
                                    </Box>
                                    {/* </Typography> */}
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    {/* <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}></Typography> */}
                                    <JoyDepartment getDept={changeDept} deptValue={dept} />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table sx={{ mt: 1 }}>
                        <TableBody>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0' }} colSpan={6}>
                                    <Typography level="title-md" sx={{ ml: 1 }}>Have you worked with us before  ?</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Department</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={3}>
                                    {Empdata?.recruitment_unit === '' || Empdata?.recruitment_unit === null ?
                                        <JoyDepartment getDept={changeoldDept} deptValue={olddept} />
                                        : <Typography level="title-md" sx={{ ml: 1, }}>{Empdata?.recruitment_unit === '' ? "Not Updated" : Empdata?.recruitment_unit} </Typography>

                                    }
                                </TableCell>

                            </TableRow>
                        </TableBody>
                    </Table>
                    <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>Self Declaration By the Applicant</Typography>
                    <Typography level="title-md" sx={{ ml: 1, mt: 1 }}>I, Declare that the particulars given above are correct and true to the best of my knowledge
                        and belief and no attempt has been made by me to Conceal or without pertinent information , which you are at liberty to verify at any time .I
                        also understand that any misrepresentation of facts in the application is sufficient cause for termination of my service,if appointed.</Typography>

                    <Table sx={{ mt: 1 }}>
                        <TableBody>

                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Place</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Date</Typography>
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Applicant Signature</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow sx={{}}>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <JoyInput
                                        size="sm"
                                        value={Place}
                                        onchange={setPlace}
                                        name="Place"
                                        type="text"
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <JoyInput
                                        size="sm"
                                        value={date}
                                        onchange={setDate}
                                        name="Date"
                                        type="date"
                                    />
                                </TableCell>
                                <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', }} colSpan={2}>
                                    <Typography level="title-md" sx={{ ml: 1, textAlign: 'center' }}>{Empdata?.em_name === '' ? "Not Updated" : Empdata?.em_name} </Typography>

                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                    <Tooltip title="View">
                        <Button
                            variant="outlined"
                            component="label"
                            size="md"
                            color="primary"
                            onClick={handleOnClick}
                        >
                            Submit Application
                        </Button>
                    </Tooltip>
                </Box>
            </Paper>

        </Box>

    )
}

export default memo(ViewDataModal) 