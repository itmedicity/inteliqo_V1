import React from 'react'
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import { Chip, IconButton } from '@material-ui/core';
import { MdOutlineAddTask } from 'react-icons/md'

const FooterClosebtn = (props) => {
    return (

        <div className="col-md-2 col-sm-4 d-flex flex-row justify-content-md-between">
            <div style={{ marginRight: "0.5rem" }}>
                {/* <Chip
                    icon={<MdOutlineAddTask
                        className="text-info" size={25} />}
                    label="Save"
                    type="submit"
                /> */}
                <Chip
                    icon={
                        <IconButton type="submit" >
                            <MdOutlineAddTask className="text-info p-0" size={22} />
                        </IconButton>
                    }
                    label="Save"
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={<PageviewOutlinedIcon className="text-info" size={22} />}
                    label="View"
                    style={{ cursor: "pointer" }}
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={<WrongLocationOutlinedIcon
                        className="text-info" size={22} />}
                    label="Close"
                    style={{ cursor: "pointer" }}
                    onClick={props.redirect}
                />
            </div>
        </div>

    )
}

export default FooterClosebtn
