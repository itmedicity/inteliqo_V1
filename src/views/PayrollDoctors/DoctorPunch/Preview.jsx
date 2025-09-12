import React from 'react';
import {
    Table,
    Typography,
    Sheet,
    Box,
    Chip
} from '@mui/joy';

// Status to color mapping
const statusColorMap = {
    P: 'success',
    LC: 'warning',
    WOFF: 'neutral',
    CL: 'primary',
    SL: 'primary',
    OHP: 'primary',
    H: 'danger',
};

// Render status chip
const getStatusChip = (status) => {
    const color = statusColorMap[status] || 'neutral';
    return <Chip size="sm" color={color} variant="soft">{status}</Chip>;
};

// Get day number (e.g., 02)
const getDay = (dateString) => {
    const date = new Date(dateString);
    return date.getDate().toString().padStart(2, '0');
};

// Get weekday (e.g., Mon)
const getWeekday = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' });
};

const Preview = ({ empData }) => {
    if (!Array.isArray(empData) || empData.length === 0) {
        return <Typography level="body1">No employee data available.</Typography>;
    }

    // Step 1: Get all unique dates
    const allDatesSet = new Set();
    empData.forEach(employee => {
        employee.punchMaster.forEach(entry => allDatesSet.add(entry.attDate));
    });

    const allDates = Array.from(allDatesSet).sort(); // Sort for consistent order

    return (
        <Sheet variant="outlined" sx={{ overflow: 'auto', p: 2 }}>

            <Box sx={{ overflow: 'auto' }}>
                <Table
                    stickyHeader
                    borderAxis="bothBetween"
                    variant="outlined"
                    size="sm"
                    sx={{
                        tableLayout: 'fixed',
                        minWidth: 800,
                    }}
                >
                    <thead>
                        <tr>
                            <th
                                style={{
                                    width: 200,
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 999,
                                    backgroundColor: 'white',
                                }}
                            >
                                Employee
                            </th>
                            {allDates?.map(date => (
                                <th
                                    key={`day-${date}`}
                                    style={{ width: 100, textAlign: 'center' }}
                                >
                                    {getDay(date)}
                                </th>
                            ))}
                        </tr>
                        <tr>
                            <th
                                style={{
                                    position: 'sticky',
                                    left: 0,
                                    zIndex: 2,
                                    backgroundColor: 'white',
                                }}
                            ></th>
                            {allDates.map(date => (
                                <th key={`weekday-${date}`} style={{ textAlign: 'center' }}>
                                    {getWeekday(date)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {empData.map((employee, index) => {
                            const { emName, em_no, punchMaster } = employee;

                            const statusByDate = punchMaster.reduce((acc, entry) => {
                                acc[entry.attDate] = entry.duty_desc;
                                return acc;
                            }, {});

                            return (
                                <tr key={index}>
                                    <td
                                        style={{
                                            width: 200,
                                            position: 'sticky',
                                            left: 0,
                                            zIndex: 1, // Lower than header
                                            backgroundColor: 'white',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {emName} ({em_no})
                                    </td>
                                    {allDates.map(date => (
                                        <td
                                            key={`status-${index}-${date}`}
                                            style={{ textAlign: 'center' }}
                                        >
                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1 }}>
                                                <Typography sx={{ fontWeight: 600 }}>{statusByDate[date] || ''}</Typography>
                                                <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
                                                    <Box sx={{
                                                        px: 1,
                                                        borderRadius: 5,
                                                        bgcolor: '#b7e4c7'
                                                    }}>in</Box>
                                                    <Box sx={{
                                                        px: 1,
                                                        bgcolor: '#e28080',
                                                        borderRadius: 5,
                                                    }}>out</Box>
                                                </Box>
                                            </Box>

                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </Box>
        </Sheet >
    );
};

export default Preview;
