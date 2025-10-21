import React, { memo } from 'react'
import { Table, Typography, Sheet, Box, Tooltip } from '@mui/joy'

// Get day number (e.g., 02)
const getDay = (dateString) => {
  const date = new Date(dateString)
  return date.getDate().toString().padStart(2, '0')
}

// Get weekday (e.g., Mon)
const getWeekday = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', { weekday: 'short' })
}

const Preview = ({ empData }) => {
  if (!Array.isArray(empData) || empData.length === 0) {
    return <Typography level="body1">No employee data available.</Typography>
  }

  // Step 1: Get all unique dates using array functions (no forEach)
  const allDates = Array.from(
    new Set(empData.flatMap((employee) => employee.punchMaster.map((entry) => entry.attDate))),
  ).sort()

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        p: 0.5,
        overflow: 'auto',
        '::-webkit-scrollbar': { display: 'none', backgroundColor: 'lightgoldenrodyellow' },
      }}
    >
      <Sheet
        variant="outlined"
        invertedColors
        sx={{
          '--TableRow-stripeBackground': 'rgba(0 0 0 / 0.04)',
          '--TableRow-hoverBackground': 'rgba(0 0 0 / 0.08)',
          overflow: 'auto',
          borderRadius: 5,
          width: '100%',
        }}
      >
        <Table
          borderAxis="bothBetween"
          stripe="odd"
          hoverRow
          stickyHeader
          size="sm"
          sx={{
            '& tr > *:first-of-type': {
              position: 'sticky',
              left: 0,
              boxShadow: '1px 0 var(--TableCell-borderColor)',
              bgcolor: 'background.surface',
              zIndex: 4,
              width: '100%',
            },
            '& tr > *:last-child': {
              position: 'sticky',
              right: 0,
              bgcolor: 'var(--TableCell-headBackground)',
            },
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#f9fafb' }}>
              <th
                style={{
                  width: 200,
                  position: 'sticky',
                  left: 0,
                  zIndex: 999,
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                Employee
              </th>
              {allDates?.map((date) => (
                <th key={`day-${date}`} style={{ width: 100, textAlign: 'center' }}>
                  {getDay(date)}
                </th>
              ))}
              <th style={{ width: 60, backgroundColor: '#f9fafb' }}></th>
              <th style={{ width: 60, backgroundColor: '#f9fafb' }}></th>
              <th style={{ width: 60, backgroundColor: '#f9fafb' }}></th>
            </tr>
            <tr>
              <th
                style={{
                  position: 'sticky',
                  left: 0,
                  zIndex: 999,
                  backgroundColor: 'white',
                  fontWeight: 'bold',
                  fontSize: '13px',
                }}
              >
                Days
              </th>
              {allDates?.map((date) => (
                <th key={`weekday-${date}`} style={{ textAlign: 'center' }}>
                  {getWeekday(date)}
                </th>
              ))}
              <th style={{ textAlign: 'center', backgroundColor: '#f9fafb', color: '#635bff' }}>
                {' '}
                TMC - P
              </th>
              <th style={{ textAlign: 'center', backgroundColor: '#f9fafb', color: '#635bff' }}>
                {' '}
                NMC - P
              </th>
              <th style={{ textAlign: 'center', backgroundColor: '#f9fafb', color: '#635bff' }}>
                {' '}
                Tot. Days
              </th>
            </tr>
          </thead>
          <tbody>
            {empData?.map((employee, index) => {
              const { emName, em_no, punchMaster } = employee

              const statusByDate = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.duty_desc
                return acc
              }, {})

              const punch_in = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.punch_in
                return acc
              }, {})

              const punch_out = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.punch_out

                return acc
              }, {})

              const nmcStatus = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.nmc_punch_status
                return acc
              }, {})

              const nmcPunchin = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.nmc_punchin
                return acc
              }, {})

              const nmcPunchout = punchMaster?.reduce((acc, entry) => {
                acc[entry.attDate] = entry?.nmc_punchout
                return acc
              }, {})

              return (
                <tr key={index}>
                  <td
                    style={{
                      width: 220,
                      position: 'sticky',
                      left: 0,
                      zIndex: 1,
                      backgroundColor: '#fff',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      borderRight: '1px solid #e0e0e0',
                      boxShadow: '2px 0 5px -2px rgba(0,0,0,0.1)', // subtle shadow
                      padding: '0 12px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        height: '100%',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                          width: '100%',
                          fontSize: '0.80rem',
                          fontWeight: 500,
                          color: '#333',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        title={`${emName} (${em_no})`} // Tooltip on hover
                      >
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {emName} ({em_no})
                        </span>
                      </Box>
                    </Box>
                  </td>

                  {allDates?.map((date) => (
                    <td
                      key={`status-${index}-${date}`}
                      style={{
                        padding: 5,
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: '100%',
                          alignItems: 'center',
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: '#f5f5f5', // 👈 Light neutral background (can be themed)
                            width: 'fit-content', // 👈 Shrinks to fit content like a chip
                          }}
                        >
                          <Tooltip title="TMC Punch" followCursor placement="top" arrow>
                            <Box
                              sx={{
                                display: 'flex',
                                gap: 1,
                                flexDirection: 'column',
                                width: '50%',
                                bgcolor: 'red',
                                px: 2,
                                py: 0.5,
                                borderTopLeftRadius: '999px',
                                borderBottomLeftRadius: '999px',
                                background: `linear-gradient(
                            to bottom,
                            ${punch_in[date] === null ? '#e28080' : '#b7e4c7'} 50%,
                            ${punch_out[date] === null ? '#e28080' : '#b7e4c7'} 50%
                              )`,
                              }}
                            >
                              <Typography sx={{ fontWeight: 600 }}>
                                {statusByDate[date] || ''}
                              </Typography>
                            </Box>
                          </Tooltip>
                           <Tooltip title="NMC Punch" followCursor placement="top" arrow>
                          <Box
                            sx={{
                              borderTopRightRadius: '999px',
                              borderBottomRightRadius: '999px',
                              px: 2,
                              py: 0.5,
                              display: 'flex',
                              width: '50%',
                              borderLeft: 1,
                              background: `linear-gradient(
                            to bottom,
                            ${nmcPunchin[date] === null ? '#e28080' : '#b7e4c7'} 50%,
                            ${nmcPunchout[date] === null ? '#e28080' : '#b7e4c7'} 50%
                              )`,
                            }}
                          >
                            <Typography sx={{ fontWeight: 600 }}>
                              {nmcStatus[date] || ''}
                            </Typography>
                          </Box>
                          </Tooltip>
                        </Box>
                      </Box>
                    </td>
                  ))}
                  <td
                    style={{
                      textAlign: 'center',
                      height: 10,
                      color: '#344767',
                      fontWeight: 900,
                    }}
                  >
                    {employee?.totalP}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      height: 10,
                      color: '#344767',
                      fontWeight: 900,
                    }}
                  >
                    {employee?.totalNMCP}
                  </td>
                  <td
                    style={{
                      textAlign: 'center',
                      height: 10,
                      color: '#344767',
                      fontWeight: 900,
                    }}
                  >
                    {employee?.totalDays}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </Sheet>
    </Box>
  )
}

export default memo(Preview)
