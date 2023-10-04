import React from 'react'

const RecycleBin = () => {
    return (
        <div>
            <td>
                {/* schedule date */}

                {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
    <DatePicker
        views={['day']}
        value={ScheduleDate}
        onChange={(newValue) => {
            setScheduleDate(newValue);
        }}
        renderInput={({ inputRef, inputProps, InputProps }) => (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CssVarsProvider>
                    <Input ref={inputRef} {...inputProps} disabled={false} />
                </CssVarsProvider>
                {InputProps?.endAdornment}
            </Box>
        )}
    />
</LocalizationProvider> */}
            </td>


            {/* month push */}
            {/* // useEffect(() => {
    //     const groupedByMonth = tabledata.reduce((acc, val) => {
    //         // console.log(val.date);
    //         const month = val.month;
    //         if (!acc[month]) {
    //             acc[month] = [];
    //         }
    //         acc[month].push(val);
    //         return acc;
    //     }, { });
    //     setViewmonth(groupedByMonth);
    // }, [tabledata]); */}


            {/* //table header in joy */}
            {/* <Table
                    stickyHeader
                >
                    <thead>
                        <tr>
                            <th style={{ width: '20%', textAlign: "center" }}>Month and Year</th>
                            <th style={{ width: '20%', textAlign: "center" }}>Training Topics</th>
                            <th style={{ width: '20%', textAlign: "center" }}>Trainers Name</th>
                            <th style={{ width: '20%', textAlign: "center" }}>Schedule Date</th>
                        </tr>
                    </thead>
                    <DeptTrainingRows tabledata={tabledata} setTabledata={setTabledata} />
                </Table> */}




            {/* mui joy table rows */}
            {/* <tbody>
                {Object.entries(viewmonth).map(([month, data], index) => (
                    <tr style={{ height: 150, textAlign: "center", border: "1px", borderColor: "black" }} key={index}>
                        <td>{monthNames[parseInt(month, 10) - 1]}</td>
                        <td>
                            {data.map((item, itemIndex) => (
                                <Box key={itemIndex}>
                                    {itemIndex + 1}. {item.topic_name}
                                    {itemIndex !== data.length - 1 && <br />}
                                </Box>
                            ))}
                        </td>
                        <td>
                            {data.map((item, itemIndex) => (
                                <Box key={itemIndex}>
                                    {item.traineer_name}
                                    {itemIndex !== data.length - 1 && <br />}
                                </Box>
                            ))}
                        </td>
                        <td>
                            {data.map((item, itemIndex) => (
                                <Box key={itemIndex}>
                                    {item.date}
                                    {itemIndex !== data.length - 1 && <br />}
                                </Box>
                            ))}
                        </td>
                    </tr>
                ))}
            </tbody> */}
            {/* <Grid
                                        container
                                        spacing={{ xs: 1, md: 1, md: 1, lg: 0.8, xl: 0.8 }}
                                        columns={{ xs: 1, sm: 8, md: 8, lg: 8, xl: 12 }}
                                        sx={{ width: '100%' }} > */}

            {/* {itemsList.map((val, index) => (
                                            <Grid item xs={2} sm={4} md={4} lg={2} xl={3} key={index}>
                                                <Paper sx={{ width: "100%", height: 150, flex: 2, p: 2, display: "flex", flexDirection: "column", gap: 5, flexWrap: "wrap" }}
                                                    key={index}>
                                                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                                                            <Box sx={{
                                                                width: 40,
                                                                p: 1,
                                                                height: 40,
                                                                backgroundColor: '#E2F6CA',
                                                                borderRadius: '50%',
                                                                display: 'flex',
                                                                justifyContent: 'center',
                                                                alignItems: 'center',
                                                                opacity: 0.7
                                                            }}>
                                                                {val.icons}
                                                            </Box>

                                                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", width: "80%", fontFamily: "sans-serif", fontSize: "large" }}>
                                                                <Box sx={{ color: "#61677A" }}>
                                                                    {val.itemname}
                                                                </Box>
                                                                <Box sx={{ fontSize: "x-large", fontWeight: "bold" }}>
                                                                    {val.count}
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                        <Box sx={{ display: "flex", flexDirection: "row", gap: 3, borderTop: 1, borderColor: "#E4F1FF", mt: 2, cursor: "pointer" }} onClick={(e) => {
                                                            ViewList(e, val)
                                                        }}>
                                                            <Box sx={{ mt: 1, fontWeight: "bold", color: "#5C5470" }}>View more</Box>
                                                            <Box sx={{ mt: 1 }}><ArrowRightAltIcon /></Box>
                                                        </Box>
                                                    </Box>
                                                </Paper>
                                            </Grid>
                                        ))} */}
            {/* </Grid> */}


            {/* {
                    tabledata?.map((val, index) => (
                        <TableRow key={index}>
                            <TableCell sx={{ textAlign: "center" }}>
                              
                                {[parseInt(val.months, "MMM")]}
                            </TableCell>
                            <TableCell onClick={() => handleClick(val)} sx={{
                                textDecoration: "underline",
                                textAlign: "center",
                                color: "blue",
                                cursor: "pointer"
                            }}>
                                {val.training_topic_name}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {val.traineer_name}
                            </TableCell>
                            <TableCell sx={{ textAlign: "center" }}>
                                {val.date}
                            </TableCell>
                        </TableRow>
                    ))
                } */}


            {/* table */}

            <Paper elevation={0} sx={{
                mt: 1,
                width: "100%", height: 200, overflow: 'auto',
                '::-webkit-scrollbar': { display: "none" }
            }}>
                <TableContainer sx={{}}>
                    <Table size="small" >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center"> Choose Topics</TableCell>
                                <TableCell align="center"> Choose Trainers</TableCell>
                                <TableCell align="center"> Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                dates?.map((val, ind) => {
                                    return <TableRow key={ind}>
                                        <TableCell align="center">{val.date}</TableCell>

                                        <TableCell><TrainingTopicsRdx getTopic={setTopic} /></TableCell>
                                        <TableCell><TrainerNamesRxd getTrainers={setTrainer} /></TableCell>
                                        <TableCell align="center"><CommonCheckBox
                                            checked={val?.inValue || false}
                                            onChange={(e) => {
                                                getValue(e.target.checked, val)
                                            }}
                                        /></TableCell>
                                        <TableCell>
                                            <Box sx={{ p: 0.5 }}>
                                                <IconButton size="md" onClick={AddRow}>
                                                    <AddCircleIcon />
                                                </IconButton>
                                            </Box>
                                        </TableCell>

                                    </TableRow>


                                })

                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            //date mapping
            // console.log(val);
            // console.log(arr);


            {/* const xx = arr.filter((value) => {
                    if (value.date === val.date) {
                        const obj = {
                            date: val.date,
                            topic: topic.topic_slno,
                            trainer: trainer

                        }
                        return obj

                    }

                }) */}

            {/* //const xx = arr.find((value) => value.date === val.date ? { ...val, topic: topic.topic_slno } : { ...val }) */}

                //console.log(xx);
            useEffect

            {/* const groupedByMonth = tabledata.reduce((acc, val) => {
        //     const month = val.month;
        //     return {
        //         ...acc,
        //         [month]: [...(acc[month] || []), val],
        //     };
        // }, {});
        // setViewmonth(groupedByMonth); */}
        </div>
    )
}

export default RecycleBin
