import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect } from 'react'
import CusIconButton from './CusIconButton'
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import CustomeToolTip from './CustomeToolTip'
import DownloadIcon from '@mui/icons-material/Download'
import CustomAgGridMenuSelection from './CustomAgGridMenuSelection'
import CustomAgGridRptFormatOne from './CustomAgGridRptFormatOne'
import { useDispatch } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import { warningNofity } from '../CommonCode/Commonfunc'
import { ToastContainer } from 'react-toastify'
import { memo } from 'react'
import { useHistory } from 'react-router-dom'
import TextInput from './TextInput'

const CustomReportWithOneDateField = ({ secondMenu,
    ShowSecondMenu,
    ShowthirdMenu,
    menu3,
    menu2,
    columnDefs,
    tableData,
    tableDataMain,
    columnDefMain,
    onClick,
    columnDefMenu2,
    tableDataMenu2,
    onSelectionChanged,
    onSelectionChanged2,
    onSelectionChanged3,
    thirdmenu,
    tableDataMenu3,
    columnDefMenu3,
    onChange,
    onChange2 }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    const onExportClick = useCallback(() => {
        if (tableDataMain.length === 0) {
            warningNofity("Please Click The Search Button After Selecting the Options")
        } else {

            dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 1 })
        }
    }, [tableDataMain.length, dispatch])

    const CloseReport = async () => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 1 })
        history.push(`/Home/Reports`)
    }
    //setting the state to default
    useEffect(() => {
        return (
            dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        )
    }, [dispatch])
    return (
        <Box>
            <ToastContainer />
            <Paper
                square
                sx={{
                    height: { xs: 550, sm: 550, md: 550, lg: 558, xl: 850 },
                    p: 0.5,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {/* first menu selection */}
                    <Paper
                        square
                        sx={{
                            backgroundColor: 'white',
                            width: { md: '20%', lg: '20%', xl: '15%' },
                            height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 },
                            flexDirection: 'row'
                        }}
                    >
                        {/* Top Left Menu Section Start */}
                        <Paper
                            square
                            sx={{
                                backgroundColor: '#f0f3f5',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: 0.1,
                                p: 0.3,
                            }}
                        >
                            <CusIconButton variant="outlined" size="sm" color="success" onClick={onClick}>
                                <SearchIcon />
                            </CusIconButton>
                            <CustomeToolTip title={menu2} placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success">
                                        <ContentPasteSearchIcon onClick={ShowSecondMenu} />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                            <CustomeToolTip title={menu3} placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success">
                                        <ContentPasteSearchIcon onClick={ShowthirdMenu} />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                        </Paper>
                        <CustomAgGridMenuSelection
                            sx={{
                                height: { xs: 270, sm: 270, md: 270, lg: 257, xl: 401 },
                                width: '100%',
                            }}
                            columnDefs={columnDefs}
                            onSelectionChanged={onSelectionChanged}
                            tableData={tableData}
                        />

                        {/* second menu selection */}
                        {secondMenu === 1 ?
                            <CustomAgGridMenuSelection
                                sx={{
                                    width: '100%',
                                    height: { xs: 270, sm: 270, md: 270, lg: 257, xl: 401 },

                                }}
                                columnDefs={columnDefMenu2}
                                onSelectionChanged={onSelectionChanged2}
                                tableData={tableDataMenu2}>

                            </CustomAgGridMenuSelection>
                            : null}
                    </Paper>

                    {/* third menu selection */}
                    {thirdmenu === 1 ?
                        <Paper
                            square
                            sx={{
                                backgroundColor: 'white',
                                width: { md: '20%', lg: '20%', xl: '15%' },
                                height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 },
                            }}
                        >
                            <Paper
                                square
                                sx={{
                                    //backgroundColor: '#f0f3f5',
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flexDirection: 'row',
                                    alignItems: 'flex-start',
                                    gap: 0.1,
                                    p: 0.3,

                                }}
                            >

                            </Paper>
                            <CustomAgGridMenuSelection
                                sx={{
                                    width: '100%',
                                    height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
                                }}
                                columnDefs={columnDefMenu3}
                                onSelectionChanged={onSelectionChanged3}
                                tableData={tableDataMenu3}
                            />
                        </Paper>
                        : null}
                    {/* Rigth Side Section Start */}
                    <Paper
                        square
                        sx={{
                            backgroundColor: 'lightGrey',
                            width: { md: '80%', lg: '80%', xl: '85%' },
                            height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 },
                        }}
                    >
                        {/* Rigth Side Menu  */}
                        <Paper
                            square
                            sx={{
                                backgroundColor: '#f0f3f5',
                                //backgroundColor: 'red',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                // alignItems: "",
                                gap: 0.1,
                                p: 0.3,
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            {/* from text input */}
                            <Box sx={{ display: "flex", flex: 0, flexDirection: "row", flexWrap: 'nowrap' }} >
                                <Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse", }}  >
                                    <Typography variant="h8">
                                        {"From"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flex: 0, pl: 2 }}>
                                    <TextInput style={{ width: 150, display: "flex" }} type="date"
                                        changeTextValue={onChange}
                                    />
                                </Box>
                            </Box>

                            <Box sx={{
                                display: "flex", flex: 0, flexDirection: "row", flexWrap: 'nowrap', pl: 2
                            }}>
                                <Box sx={{ display: "flex", flex: 2, flexDirection: "row-reverse", }}>
                                    <Typography variant="h8">
                                        {"To"}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flex: 2, pl: 2 }}>
                                    <TextInput style={{ width: 150, pl: 100 }} type="date"
                                        changeTextValue={onChange2}
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                    flex: 1
                                }}
                            >
                                <CustomeToolTip title="Download" placement="bottom">
                                    <Box>
                                        <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                            <DownloadIcon />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                                <CustomeToolTip title="Close" placement="bottom">
                                    <Box>
                                        <CusIconButton variant="outlined" size="sm" color="success" onClick={CloseReport}>
                                            <CloseIcon />
                                        </CusIconButton>
                                    </Box>
                                </CustomeToolTip>
                            </Box>
                        </Paper>
                        <Box
                            sx={{
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            {/* Table Component */}
                            <CustomAgGridRptFormatOne
                                tableDataMain={tableDataMain}
                                columnDefMain={columnDefMain}
                                onSelectionChanged={onSelectionChanged2}
                            />
                        </Box>
                        {/* Rigth Side Menu  */}
                    </Paper>
                    {/* Rigth Side Section End */}
                </Box>
                {/* <Paper square sx={{ backgroundColor: "lightpink" }}  >sdfsdfsdf</Paper> */}
            </Paper >
        </Box >
    )
}

export default memo(CustomReportWithOneDateField) 