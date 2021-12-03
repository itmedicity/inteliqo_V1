import React from 'react'
// import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
// import { IconButton } from '@material-ui/core';
import { IconButton } from '@mui/material';
import { MdOutlineAddTask } from 'react-icons/md'
import Chip from '@mui/material/Chip'

const FooterProcessbtn = (props) => {
    return (
        <div className="col-md-2 col-lg-1 d-flex flex-row justify-content-md-between">
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton type="submit" className="p-1" >
                            <MdOutlineAddTask className="text-info p-0" size={22} />
                        </IconButton>
                    }
                    label="Process"
                    clickable={true}
                    onClick={props.submit}
                    sx={{
                        minWidth: '100%',
                        maxWidth: '105%',
                        width: '105%'
                    }}
                // color="secondary"
                // variant="outlined"
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton className="p-1" >
                            <WrongLocationOutlinedIcon className="text-info" size={22} />
                        </IconButton>
                    }
                    label="Close"
                    onClick={props.redirect}
                    clickable={true}
                    sx={{
                        minWidth: '100%',
                        maxWidth: '105%',
                        width: '105%'
                    }}
                />
            </div>
        </div>
    )
}

export default FooterProcessbtn
