import React from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { memo } from 'react'

const CustmTypo_tow = ({ title, fontSize, style }) => {
    return (
        <CssVarsProvider>
            <Typography
                textColor={`neutral.${fontSize}`} sx={{ ...style, display: 'flex', pl: 1 }} >
                {title}
            </Typography>
        </CssVarsProvider>
    )
}

export default memo(CustmTypo_tow)