import React from 'react'
import { Box } from '@mui/material';
import { memo } from 'react';
import { Button, CssVarsProvider } from '@mui/joy';
import CloseIcon from '@mui/icons-material/Close';

const FooterCloseOnly = (props) => {
    return (
        <Box sx={{ display: "flex" }} >
            <CssVarsProvider>
                <Button
                    aria-label="Like"
                    variant="outlined"
                    color="danger"
                    onClick={props.redirect}
                >
                    <CloseIcon />
                </Button>
            </CssVarsProvider>
        </Box>
    )
}

export default memo(FooterCloseOnly) 
