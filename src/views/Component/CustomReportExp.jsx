import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useCallback } from 'react'
import CusIconButton from './CusIconButton'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'
import CustomeToolTip from './CustomeToolTip'
import DownloadIcon from '@mui/icons-material/Download'
import CustomAgGridMenuSelection from './CustomAgGridMenuSelection'
import CustomAgGridRptFormatOne from './CustomAgGridRptFormatOne'
import { useDispatch } from 'react-redux'
import { Actiontypes } from 'src/redux/constants/action.type'
import { warningNofity } from '../CommonCode/Commonfunc'
import { useHistory } from 'react-router-dom'
import TextInput from './TextInput'
import MenuSelection from '../HrReports/DesignatiopnExpeReport/MenuSelection'
import { DragHandle, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons'

const CustomReportExp = ({ columnDefs,
    tableData,
    onSelectionChanged,
    tableDataMain,
    columnDefMain,
    onClick,
    onChange,
    onChange2,
    getvalue,
    Setgetvalue
}) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const onExportClick = useCallback(() => {
        if (tableDataMain.length === 0) {
            warningNofity("Please Click The Search Button After Selecting the Options")
        }
        else {
            dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 1 })
        }
    }, [tableDataMain.length, dispatch])

    /** To close the report page and back to the report list */
    const CloseReport = async () => {
        dispatch({ type: Actiontypes.FETCH_CHANGE_STATE, aggridstate: 0 })
        history.push(`/Home/Reports`)
    }
    return (
        <Box>
            <Paper
                square
                sx={{
                    height: { xs: 550, sm: 550, md: 550, lg: 558, xl: 860 },
                    p: 0.3,
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                    }}
                >
                    {/* Left Side Section Start */}
                    <Paper
                        square
                        sx={{
                            backgroundColor: 'white',
                            width: { md: '20%', lg: '20%', xl: '15%' },
                            height: { xs: 540, sm: 540, md: 540, lg: 548, xl: 840 },
                        }}
                    >
                        {/* Top Left Menu Section Start */}
                        <Paper
                            square
                            sx={{
                                backgroundColor: '#f0f3f5',
                                // backgroundColor: 'green',
                                display: 'flex',
                                flexWrap: 'wrap',
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                gap: 0.1,
                                p: 2.1,
                            }}
                        >
                        </Paper>
                        {/* Table Component */}
                        <CustomAgGridMenuSelection
                            columnDefs={columnDefs}
                            onSelectionChanged={onSelectionChanged}
                            tableData={tableData}
                            sx={{
                                height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
                                width: '100%',
                            }}
                        />
                        {/* Top Left Menu Section End */}
                    </Paper>
                    {/* Left Side Section End */}

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
                                display: 'flex',
                                // flexWrap: 'wrap',
                                flexDirection: 'row',
                                // gap: 0.1,
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                                // pb: 0.2,
                                p: 0.1,
                                alignItems: "center",
                            }}
                        >
                            {/* for drop down selection */}
                            <Box
                                style={{
                                    alignItems: 'center',
                                    pr: 5,
                                }}
                            >
                                <MenuSelection
                                    value={getvalue}
                                    updatefn={Setgetvalue}
                                />
                            </Box>

                            {/* first text field  */}
                            <Box sx={{ display: "flex", flex: 1, flexDirection: "row", flexWrap: 'nowrap' }} >
                                <Box sx={{ display: "flex", flex: 1, flexDirection: "row-reverse", }}  >
                                    <Typography variant="h8">
                                        {"Experience"}
                                        <KeyboardArrowLeft
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'nowrap'
                                            }}
                                            fontSize="medium" />
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flex: 0, }}>
                                    <TextInput style={{ width: 50, pl: 100, display: "flex" }} type="number" changeTextValue={onChange} />
                                </Box>
                            </Box>

                            {/* second text field  */}
                            <Box sx={{
                                display: "flex", flex: 2, flexDirection: "row", flexWrap: 'nowrap',
                            }}>
                                <Box sx={{ display: "flex", flex: 2, flexDirection: "row-reverse", }}>
                                    <Typography variant="h8">
                                        {"Experience"}
                                        <DragHandle
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'nowrap',
                                                flex: 2
                                            }}
                                            fontSize="small" />
                                        <KeyboardArrowRight
                                            sx={{
                                                display: 'flex',
                                                flexWrap: 'nowrap',
                                                flex: 2
                                            }}
                                            fontSize="medium" />
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", flex: 2 }}>
                                    <TextInput style={{ width: 50 }} type="number" changeTextValue={onChange2} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexdirection: 'row',
                                }}
                            >
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={onClick}>
                                        <SearchIcon />
                                    </CusIconButton>
                                </Box>
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
                                // pb: 0.1
                            }}
                        >
                            {/* Table Component */}
                            <CustomAgGridRptFormatOne tableDataMain={tableDataMain} columnDefMain={columnDefMain} />
                        </Box>
                        {/* Rigth Side Menu  */}
                    </Paper>
                    {/* Rigth Side Selection End */}
                </Box>
            </Paper >
        </Box >
    )
}

export default memo(CustomReportExp)