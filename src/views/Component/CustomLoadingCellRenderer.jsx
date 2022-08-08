import React from 'react'

const CustomLoadingCellRenderer = ({ props }) => {
    return (
        // <div
        //     className="ag-custom-loading-cell"
        //     style={{ paddingLeft: 10, lineHeight: 150 }}
        // >
        //     <i className="fas fa-spinner fa-pulse"></i>{' '}
        //     <span> {props.loadingMessage}</span>
        // </div>
        // <Typography>{props.loadingMessage}</Typography>
        <div className="ag-overlay-loading-center" style={{ backgroundColor: 'lightsteelblue', height: '9%' }}>
            <i className="fas fa-hourglass-half"> {props.loadingMessage} </i>
        </div>
    )
}

export default CustomLoadingCellRenderer