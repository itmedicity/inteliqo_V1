import { Box, Card } from '@mui/joy'
import React, { memo } from 'react'

const PdfAndimage = ({ Files }) => {

    return (
        <Box sx={{}}>
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
                                style={{ maxWidth: '100%', }}
                            />
                        </Card>

                    )}
                </Box>
            ))}
        </Box>
    )
}

export default memo(PdfAndimage)