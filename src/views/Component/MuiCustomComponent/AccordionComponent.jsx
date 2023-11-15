import { Accordion, AccordionDetails, AccordionSummary } from '@mui/joy'
import React, { memo } from 'react'

const AccordionComponent = ({ children, titile }) => {
    return (
        <Accordion>
            <AccordionSummary>{titile}</AccordionSummary>
            <AccordionDetails>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default memo(AccordionComponent) 