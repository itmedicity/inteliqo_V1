import React from 'react'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import { Chip, IconButton } from '@material-ui/core';
import { MdOutlineAddTask } from 'react-icons/md'

const FooterClosebtn = (props) => {
    return (

        <div className="col-md-2 col-sm-4 d-flex flex-row justify-content-md-between">
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton type="submit" className="p-1"  >
                            <MdOutlineAddTask className="text-info p-0" size={22} />
                        </IconButton>
                    }
                    label="Save"
                    // style={{ cursor: "pointer" }}
                    clickable={true}
                    onClick={props.submit}
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton className="p-1" >
                            <PageviewOutlinedIcon className="text-info" size={22} />
                        </IconButton>
                    }
                    label="View"
                    // style={{ cursor: "pointer" }}
                    clickable={true}
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
                    // style={{ cursor: "pointer" }}
                    onClick={props.redirect}
                    clickable={true}
                />
            </div>
        </div>

    )
}

export default FooterClosebtn
