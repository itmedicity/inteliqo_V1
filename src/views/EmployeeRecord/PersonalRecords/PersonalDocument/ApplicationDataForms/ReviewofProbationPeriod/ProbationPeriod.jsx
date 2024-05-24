import { Box, Card } from '@mui/joy'
import React, { memo } from 'react'

const ProbationPeriod = ({ Files }) => {
    return (
        <>
            {/* for pdf View */}
            {Files.length !== 0 ?

                <Box sx={{
                    mt: 1,

                    overflowX: 'auto',
                    height: window.innerHeight - 160,
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                        width: 0,
                    },
                }}>
                    {Files.map((file, index) => (
                        <Box key={index} sx={{ p: 1 }}>
                            {file.endsWith('.pdf') ? (
                                <Card>
                                    <embed
                                        src={file}
                                        type="application/pdf"
                                        height={window.innerHeight - 200}
                                        width="100%"
                                    />
                                </Card>

                            ) : (
                                <Card>
                                    <img
                                        src={file}
                                        height={window.innerHeight - 200}
                                        alt=''
                                        style={{ maxWidth: '100%', maxHeight: '100%' }}
                                    />
                                </Card>

                            )}
                        </Box>
                    ))}
                </Box>
                : null}

        </>
    )
}

export default memo(ProbationPeriod)