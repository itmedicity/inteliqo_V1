import { Paper } from '@mui/material'
import { Box } from '@mui/system'
import React, { memo, useCallback, useState, useEffect } from 'react'
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

const CustomReportTwo = ({ secondMenu, ShowSecondMenu, menu2, columnDefs, tableData, onSelectionChanged, tableDataMain, columnDefMain, onClick, columnDefMenu2,
    tableDataMenu2, onSelectionChangedMenu2, onChange }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [pageHeight, setPageHeight] = useState(window.innerHeight - 85);

    useEffect(() => {
        const handleResize = () => {
            setPageHeight(window.innerHeight - 85);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    /** To download ag grid report list, if there is no value or not clicked on the search button it shows warning. otherwise it dispatch */
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
            <ToastContainer />
            <Paper
                square
                sx={{
                    height: pageHeight,
                    p: 0.5,
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
                            backgroundColor: 'lightBlue',
                            width: { md: '20%', lg: '20%', xl: '15%' },
                            height: pageHeight - 10,
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
                        </Paper>

                        <CustomAgGridMenuSelection
                            columnDefs={columnDefs}
                            onSelectionChanged={onSelectionChanged}
                            tableData={tableData}
                            sx={{
                                height: pageHeight - 45,
                                width: '100%',
                            }}
                        />

                        {/* Table Component */}

                        {/* Top Left Menu Section End */}
                    </Paper>
                    {/* Left Side Section End */}

                    {/* Second Left Menu Section start */}
                    {secondMenu === 1 ?
                        <Paper
                            square
                            sx={{
                                backgroundColor: 'white',
                                width: { md: '20%', lg: '20%', xl: '15%' },
                                height: pageHeight - 10,
                            }}
                        >
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
                            </Paper>
                            <CustomAgGridMenuSelection
                                columnDefs={columnDefMenu2}
                                onSelectionChanged={onSelectionChangedMenu2}
                                tableData={tableDataMenu2}
                                sx={{
                                    height: pageHeight - 45,
                                    width: '100%',
                                }}
                            />
                        </Paper>
                        : null}
                    {/* Second Left Menu Section End */}

                    {/* Rigth Side Section Start */}
                    <Paper
                        square
                        sx={{
                            backgroundColor: 'lightGrey',
                            width: { md: '80%', lg: '80%', xl: '85%' },
                            height: pageHeight - 10,
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
                            <CustomAgGridRptFormatOne
                                tableDataMain={tableDataMain}
                                columnDefMain={columnDefMain}
                                onSelectionChanged={onSelectionChangedMenu2}
                                sx={{
                                    height: pageHeight - 45,
                                    width: '100%',
                                }}
                            />
                        </Box>
                        {/* Rigth Side Menu  */}
                    </Paper>
                    {/* Rigth Side Section End */}
                </Box>
            </Paper >
        </Box >
    )
}

export default memo(CustomReportTwo) 