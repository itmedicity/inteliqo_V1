import React from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import { Chip, IconButton } from '@material-ui/core';
import { MdOutlineAddTask } from 'react-icons/md'

const FooterSaveEditClosebtn = (props) => {
    const { edit, value, redirect } = props;
    return (
        <div className="col-md-2 col-sm-4 d-flex flex-row justify-content-md-between">
            <Chip
                icon={
                    <IconButton type="submit" className="p-1" >
                        <MdOutlineAddTask className="text-info p-0" size={22} />
                    </IconButton>
                }
                label="Save"
                clickable={true}
            />
            <div style={{ marginRight: "0.5rem", marginLeft: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton className="p-1" >
                            <ModeEditIcon className="text-info" size={22} />
                        </IconButton>
                    }
                    label="Edit"
                    onClick={edit}
                    value={value}
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
                    onClick={redirect}
                    clickable={true}
                />
            </div>
        </div>
    )
}

export default FooterSaveEditClosebtn
