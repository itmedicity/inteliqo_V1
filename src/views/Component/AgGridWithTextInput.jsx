import React, { Fragment, memo } from 'react'
import { AgGridReact } from 'ag-grid-react'
import { Paper, Typography } from '@mui/material'
import 'ag-grid-community/dist/styles/ag-grid.css'
import 'ag-grid-community/dist/styles/ag-theme-material.css'
import { Box } from '@mui/system'
import TextInput from './TextInput'


const AgGridWithTextInput = ({
    tableData,
    columnDefs,
    onSelectionChanged,
    sx,
    value,
    name,
    label,
    setExpiry
}) => {

    //Table
    const rowHeight = 25
    const headerHeight = 30
    const defaultColDef = {
    }
    // --- On Grid Ready Function ---
    let gridApi
    const onGridReady = (params) => {
        gridApi = params.api
        gridApi.sizeColumnsToFit()
    }
    const style = {
        height: { xs: 540, sm: 540, md: 540, lg: 514, xl: 802 },
        width: '100%',
    }
    const rowStyle = {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }

    const changeText = (e) => {
        setExpiry(e.target.value)
    };
    return (
        <Fragment>
            <Paper
                elevation={0}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    //alignItems: 'flex-start'
                    //justifyContent: 'space-evenly'
                }}
            >
                <Box
                    className="ag-theme-material ListItemScrol"
                    sx={{ ...style, ...sx }}
                >
                    <AgGridReact
                        columnDefs={columnDefs}
                        rowData={tableData}
                        defaultColDef={defaultColDef}
                        rowHeight={rowHeight}
                        headerHeight={headerHeight}
                        rowDragManaged={true}
                        animateRows={true}
                        onGridReady={onGridReady}
                        rowSelection="multiple"
                        onSelectionChanged={onSelectionChanged}
                        rowStyle={rowStyle}
                    ></AgGridReact>
                </Box>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        flex: 1,
                        justifyContent: 'space-evenly'
                    }}
                >
                    <Typography
                        variant='h8'
                    >{'Expiry Days'}
                    </Typography>
                    <TextInput
                        id="outlined-basic"
                        type="number"
                        //label={label}
                        // variant="outlined"
                        // size='small'
                        value={value}
                        name={name}
                        fullWidth
                        changeTextValue={(e) => changeText(e)}
                        style={{
                            width: 50,
                        }}
                    />
                </Box>
            </Paper>
        </Fragment >
    )
}

export default memo(AgGridWithTextInput)