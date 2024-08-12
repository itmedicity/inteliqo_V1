import { Box } from '@mui/joy';
import React, { memo } from 'react'
import { PDFReader } from 'reactjs-pdf-reader';


const ImageViewer = ({ fileURL, fileType }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'auto',
                height: '100%',
                width: '100%',
                p: 1
            }}
        >
            {
                fileType === 'application/pdf' ?
                    <PDFReader
                        url={fileURL}
                        scale={1}
                        width="100%"
                    />
                    :
                    <img src={fileURL} alt="Imege url" />
            }
        </Box>
    )
}

export default memo(ImageViewer)