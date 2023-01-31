import { CssVarsProvider, Typography } from '@mui/joy'
import React from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const CustomTypoThree = () => {
    return (
        <CssVarsProvider>
            <Typography
                level="body2"
                startDecorator={<InfoOutlined />}
                sx={{ alignItems: 'flex-start', wordBreak: 'break-all' }}
            >
                This example demonstrates multiple lines of the text.
            </Typography>
        </CssVarsProvider>
    )
}

export default CustomTypoThree