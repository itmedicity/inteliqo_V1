import { Paper } from '@mui/material';
import React, { useCallback, useState } from 'react'
import DasboardCustomLayout from 'src/views/MuiComponents/DasboardCustomLayout';
import CommonAgGrid from 'src/views/Component/CommonAgGrid'

const Vacancylistshow = ({ setShowGeneral, showGeneral, data }) => {
    const toRedirectToHome = useCallback(() => {
        setShowGeneral(0)
    }, [showGeneral, setShowGeneral])

    const [columnDef] = useState([
        { headerName: 'Department', field: 'dept_name', filter: true },
        { headerName: 'Designation', field: 'desg_name', filter: true },
        { headerName: 'Required No', field: 'manpower_required_no', filter: true },

    ])
    return (
        <DasboardCustomLayout
            title={"Vacancy List"}
            displayClose={true}
            setClose={toRedirectToHome}
        >
            <Paper sx={{ flex: 1 }}>
                <CommonAgGrid
                    columnDefs={columnDef}
                    tableData={data}
                    sx={{
                        height: window.innerHeight - 120,
                        width: '100%',
                        p: 1,
                    }}
                    rowHeight={30}
                    headerHeight={30}
                />

            </Paper>
        </DasboardCustomLayout>
    )
}

export default Vacancylistshow