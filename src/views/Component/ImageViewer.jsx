import { Box } from '@mui/joy';
import React, { memo } from 'react'
import { PDFReader } from 'reactjs-pdf-reader';


const ImageViewer = ({ fileURL, fileType }) => {

    return (
        <Box
            sx={{
                display: 'flex',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'auto',
                // height: '100%',
                width: 800,
                p: 1
            }}
            onContextMenu={(e) => e.preventDefault()}
        >
            {
                fileType === 'application/pdf' ?
                    <PDFReader
                        url={`${fileURL}#toolbar=0&navpanes=0&view=FitH`}
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