import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { useCallback, useEffect, memo } from 'react'
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
import { useHistory } from 'react-router-dom'
import AgGridWithTextInput from './AgGridWithTextInput'

const CustomCheckboxNew = ({
    secondMenu,
    ShowSecondMenu,
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
    value,
    name,
    label,
    setExpiry
}) => {

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
                            {/* <CustomeToolTip title={menu3} placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success">
                                        <ContentPasteSearchIcon onClick={ShowthirdMenu} />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip> */}
                        </Paper>
                        <CustomAgGridMenuSelection
                            sx={{
                                height: { xs: 180, sm: 180, md: 180, lg: 183, xl: 280 },
                                width: '100%',
                            }}
                            columnDefs={columnDefs}
                            onSelectionChanged={onSelectionChanged}
                            tableData={tableData}
                        />

                        {/* second menu selection */}
                        {secondMenu === 1 ?
                            <AgGridWithTextInput
                                sx={{
                                    width: '100%',
                                    height: { xs: 180, sm: 180, md: 180, lg: 183, xl: 280 },

                                }}
                                columnDefs={columnDefMenu2}
                                onSelectionChanged={onSelectionChanged2}
                                tableData={tableDataMenu2}
                                //changeText={changeText}
                                value={value}
                                name={name}
                                label={label}
                                setExpiry={setExpiry}
                            >

                            </AgGridWithTextInput>

                            : null}

                    </Paper>
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
                                flexWrap: 'wrap',
                                flexDirection: 'row-reverse',
                                // alignItems: "",
                                gap: 0.1,
                                p: 0.3,
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            <CustomeToolTip title="Close" placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={CloseReport}>
                                        <CloseIcon />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>

                            <CustomeToolTip title="Download" placement="bottom">
                                <Box>
                                    <CusIconButton variant="outlined" size="sm" color="success" onClick={onExportClick}>
                                        <DownloadIcon />
                                    </CusIconButton>
                                </Box>
                            </CustomeToolTip>
                        </Paper>
                        <Box
                            sx={{
                                borderLeft: 2,
                                borderColor: '#d3d3d3',
                            }}
                        >
                            {/* Table Component */}
                            {/* <AgGridReportDynamic */}
                            <CustomAgGridRptFormatOne
                                tableDataMain={tableDataMain}
                                columnDefMain={columnDefMain}
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

export default memo(CustomCheckboxNew)