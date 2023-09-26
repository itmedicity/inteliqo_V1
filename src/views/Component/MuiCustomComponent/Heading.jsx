import React from 'react'
import { CssVarsProvider, Typography } from '@mui/joy'
import { memo } from 'react'

const heading = ({ title }) => {
  return (
     <CssVarsProvider>
            <Typography >
                {title}
            </Typography>
        </CssVarsProvider>
  )
}

export default memo(heading)