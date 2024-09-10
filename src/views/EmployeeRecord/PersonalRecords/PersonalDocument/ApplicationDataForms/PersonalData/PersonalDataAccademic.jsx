import { Box, IconButton, Input, Table, Tooltip, Typography } from '@mui/joy'
import React, { memo, useCallback, useEffect, useState } from 'react'
import CustmTypog from 'src/views/Component/MuiCustomComponent/CustmTypog'
import { TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import moment from 'moment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import JoyInput from 'src/views/MuiComponents/JoyComponent/JoyInput';
import InputComponent from 'src/views/MuiComponents/JoyComponent/InputComponent';
import JoyCourse from 'src/views/MuiComponents/JoyComponent/JoyCourse';
import JoyEducation from 'src/views/MuiComponents/JoyComponent/JoyEducation';
import JoySpecialization from 'src/views/MuiComponents/JoyComponent/JoySpecialization';
import JoyBoardSelection from 'src/views/MuiComponents/JoyComponent/JoyBoardSelection';
import JoyUniversitySelect from 'src/views/MuiComponents/JoyComponent/JoyUniversitySelect';
// import EducationSelectRedux from 'src/views/MuiComponents/EducationSelectRedux';

const PersonalDataAccademic = ({ EduData, CommonSettings, Value, setValue, Employee, educaton, HighData, HighLightSettings, FormData }) => {
    const { edu } = FormData;
    const [rowCount, setRowCount] = useState(1);
    const [eduName, seteduName] = useState('')
    const [courseName, setcourseName] = useState('')
    const [SslcInsti, setSslcInsti] = useState('')
    const [SslcRank, setSslcRank] = useState('')
    // const [SslcYear, setSslcYear] = useState('')
    const [boardName, setboardName] = useState('')
    const [universityName, setuniversityName] = useState('')
    const [specialName, setspecialName] = useState('')
    const [education, setEducation] = useState(0)
    const [course, setCourse] = useState(0)
    const [Specialization, setSpecialization] = useState(0)
    const [university, setUniversity] = useState(0)
    const [board, setBoard] = useState(0)
    const [coursedisable, setcoursedisable] = useState(false)
    const [specdisable, setspecdisable] = useState(false)
    const [boarddisable, setBoarddisable] = useState(false)
    const [unidisable, setunidisable] = useState(false)
    const { SslcYear } = EduData

    const {
        computer
    } = HighData
    useEffect(() => {
        if (education === 4) {
            setunidisable(true)
            setBoarddisable(false)
            setcoursedisable(false)
            setspecdisable(false)
            // setregTypedisable(true)
            // setregNodisable(true)
        }
        else if (education === 5) {
            setBoarddisable(false)
            setunidisable(true)
            setcoursedisable(true)
            setspecdisable(true)
            // setregTypedisable(true)
            // setregNodisable(true)
        } else {
            setcoursedisable(false)
            setspecdisable(false)
            setunidisable(false)
            setBoarddisable(true)
            // setregTypedisable(false)
            // setregNodisable(false)
        }
    }, [education])


    const handleAddMore = useCallback(async (event) => {
        setRowCount(rowCount + 1);
        setEducation(0)
        setCourse(0)
        setSpecialization(0)
        setUniversity(0)
        setBoard(0)
        setcourseName('')
        setboardName('')
        setuniversityName('')
        setspecialName('')
        // Create a new object with default values
        const newData = {
            education: education === 0 ? null : education,
            course: course === 0 ? null : course,
            Specialization: Specialization === 0 ? null : Specialization,
            university: university === 0 ? null : university,
            board: board === 0 ? null : board,
            eduName: eduName,
            courseName: courseName,
            boardName: boardName,
            universityName: universityName,
            specialName: specialName,
            SslcInsti: SslcInsti,
            SslcYear: SslcYear,
            SslcRank: SslcRank,
            em_no: Employee?.em_no,
            em_id: Employee?.em_id

        };

        // Check if Value is an array
        if (!Array.isArray(Value)) {
            setValue([newData]);
        } else {
            const newDataArray = [...Value, newData];
            setValue(newDataArray);
        }
    }, [setValue, rowCount, education, course, Specialization, university, board, Value, SslcInsti, SslcYear, SslcRank, Employee, boardName, courseName,
        eduName, universityName, specialName
    ]);


    return (
        <Box sx={{}}>
            <CustmTypog title={"Academic Details"} />

            <TableContainer sx={{}}>

                <Table>
                    <thead >
                        <tr>
                            <th>Education</th>
                            <th>School Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Graduated</th>
                            <th>Grade</th>
                            <th>Gpa</th>

                        </tr>
                    </thead>
                    <tbody>
                        {edu?.map((item, index) => (
                            <tr key={index}>
                                <td> {item?.education === "" ? "not updated" :
                                    item?.education === 1 ? "DOCTORATE/PHD" :
                                        item?.education === 2 ? "MASTERS/POST-GRADUATION" :
                                            item?.education === 3 ? "GRADUATION/DIPLOMA" :
                                                item?.education === 4 ? "12TH" :
                                                    item?.education === 5 ? "10TH" :
                                                        item?.education === 6 ? "TRAINING COURSES" :
                                                            item?.education === 7 ? "CERTIFICATION" :
                                                                item?.education === 8 ? "INTERNATIONAL TRAINING" :
                                                                    item?.education === 9 ? "INTERNATIONAL CERTIFICATION" :
                                                                        item?.education
                                }</td>
                                <td> {item?.schoolname === "" ? "not updated" : item?.schoolname}</td>
                                <td> {item?.edustartdate === 0 ? "not updated" : moment(item?.edustartdate).format('DD-MM-YYYY')}</td>
                                <td>  {item?.eduenddate === 0 ? "not updated" : moment(item?.eduenddate).format('DD-MM-YYYY')}</td>
                                <td>  {item?.Graduated === false ? "No" : item?.Graduated === true ? "Yes" : "not updated"}</td>
                                <td>{item?.AvgGrade === "" ? "not updated" : item?.AvgGrade}</td>
                                <td> {item?.gpa === "" ? "not updated" : item?.gpa}</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </TableContainer>

            <Box sx={{ overflowX: "auto" }}>
                <Table sx={{ mt: 1 }}>
                    <thead >
                        <tr sx={{ p: 0 }}>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}> Qualification </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Institution </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Course </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Specialization </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Board </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>University </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Year of Passing </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Rank / % Of Mark </Typography>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0' }}>
                                <Typography level="title-md" sx={{ ml: 1, textAlign: "center" }}>Save & Add More </Typography>
                            </th>

                        </tr>
                        {/* {[...Array(rowCount)].map((_, index) => ( */}

                        <tr sx={{ p: 0 }}>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <JoyEducation value={education} setValue={setEducation} setSectName={seteduName} />

                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                {/* <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="SslcInsti"
                                    value={SslcInsti}
                                    onchange={(e) => setSslcInsti(e)}
                                /> */}
                                <JoyInput
                                    size="sm"
                                    value={SslcInsti}
                                    onchange={setSslcInsti}
                                    name="SslcInsti"
                                    type="text"
                                />
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>

                                <JoyCourse value={course} setValue={setCourse} education={education} coursedisable={coursedisable} setSectName={setcourseName} />

                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                <JoySpecialization value={Specialization} setValue={setSpecialization}
                                    course={course} specdisable={specdisable} setSectName={setspecialName} />
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', p: .5 }}>
                                <JoyBoardSelection value={board} setValue={setBoard} education={education} boarddisable={boarddisable} setSectName={setboardName} />
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', p: .5 }}>
                                <JoyUniversitySelect value={university} setValue={setUniversity} unidisable={unidisable} setSectName={setuniversityName} />
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', p: .5 }}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    < DatePicker
                                        // disableFuture={true}
                                        views={['year']}
                                        value={SslcYear}
                                        // maxDate={new Date()}
                                        size="small"
                                        onChange={(date) => {
                                            CommonSettings({ target: { name: 'SslcYear', value: moment(date).format("YYYY") } });
                                        }}
                                        renderInput={({ inputRef, inputProps, InputProps }) => (
                                            <Box sx={{ display: 'flex', alignItems: 'center', }}>

                                                <Input ref={inputRef} {...inputProps} disabled={true} style={{ width: "100%" }} />

                                                {InputProps?.endAdornment}
                                            </Box>
                                        )}
                                    />
                                </LocalizationProvider>
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                {/* <InputComponent
                                    // placeholder={'other'}
                                    type="text"
                                    size="sm"
                                    name="SslcRank"
                                    value={SslcRank}
                                    onchange={(e) => CommonSettings(e)}
                                /> */}
                                <JoyInput
                                    size="sm"
                                    value={SslcRank}
                                    onchange={setSslcRank}
                                    name="SslcRank"
                                    type="text"
                                />
                            </th>
                            <th padding='none' sx={{ border: '1px solid #e0e0e0', }}>
                                {/* {index === rowCount - 1 && ( */}

                                <Tooltip title="Add More Experience" followCursor placement='top' arrow>
                                    <IconButton sx={{ paddingY: 0.5, ml: 2, color: '#5BBCFF' }} onClick={handleAddMore}>
                                        <AddCircleOutlineIcon />
                                    </IconButton>
                                </Tooltip>
                                {/* )} */}
                            </th>

                        </tr>
                        {/* ))} */}
                    </thead>
                </Table>
            </Box>
            {rowCount >= 2 ?
                <Table>
                    <thead >
                        <tr>
                            <th>Qualification</th>
                            <th>Institution</th>
                            <th>Course</th>
                            <th>Specialization</th>
                            <th>Board</th>
                            <th>University</th>
                            <th>Year Of passing</th>
                            <th>Rank</th>

                        </tr>
                    </thead>
                    <tbody>
                        {Value.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.eduName === "" ? "not updated" : item?.eduName}</td>
                                <td>{item?.SslcInsti === "" ? "not updated" : item?.SslcInsti}</td>
                                <td>{item?.courseName === '' ? "not updated" : item?.courseName}</td>
                                <td>{item?.specialName === '' ? "not updated" : item?.specialName}</td>
                                <td>{item?.boardName === "" ? "not updated" : item?.boardName}</td>
                                <td>{item?.universityName === "" ? "not updated" : item?.universityName}</td>
                                <td>{item?.SslcYear === "" ? "not updated" : item?.SslcYear}</td>
                                <td>{item?.SslcRank === "" ? "not updated" : item?.SslcRank}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                : null}
            {educaton?.length > 0 ?
                <Table>
                    <thead >
                        <tr>
                            <th>Qualification</th>
                            <th>Institution</th>
                            <th>Course</th>
                            <th>Specialization</th>
                            <th>Board</th>
                            <th>University</th>
                            <th>Year Of passing</th>
                            <th>Rank</th>

                        </tr>
                    </thead>
                    <tbody>
                        {educaton?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.edu_desc === null ? "not updated" : item?.edu_desc}</td>
                                <td>{item?.institution_name === null ? "not updated" : item?.institution_name}</td>
                                <td>{item?.cour_desc === null ? "not updated" : item?.cour_desc}</td>
                                <td>{item?.spec_desc === null ? "not updated" : item?.spec_desc}</td>
                                <td>{item?.board_name === null ? "not updated" : item?.board_name}</td>
                                <td>{item?.unver_name === null ? "not updated" : item?.unver_name}</td>
                                <td>{item?.em_year === null ? "not updated" : item?.em_year}</td>
                                <td>{item?.em_mark_grade === null ? "not updated" : item?.em_mark_grade}</td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
                : null}
            <CustmTypog title={"Computer awareness"} />
            <Table sx={{ mt: 1 }}>
                <TableBody >
                    <TableRow sx={{ p: 0 }}>
                        <TableCell padding='none' sx={{ border: '1px solid #e0e0e0', width: '100%' }}>
                            <InputComponent
                                // placeholder={'other'}
                                type="text"
                                size="sm"
                                name="computer"
                                value={computer}
                                onchange={(e) => HighLightSettings(e)}
                            />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </Box>
    )
}

export default memo(PersonalDataAccademic)