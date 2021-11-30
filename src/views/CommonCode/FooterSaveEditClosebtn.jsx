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
                    <IconButton type="submit" >
                        <MdOutlineAddTask className="text-info p-0" size={22} />
                    </IconButton>
                }
                label="Save"
            />
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={<ModeEditIcon className="text-info" size={22} />}
                    label="Edit"
                    style={{ cursor: "pointer" }}
                    type="Button"
                    onClick={edit}
                    value={value}
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={<WrongLocationOutlinedIcon
                        className="text-info" size={22} />}
                    label="Close"
                    style={{ cursor: "pointer" }}
                    onClick={redirect}
                />
            </div>
        </div>
    )
}

export default FooterSaveEditClosebtn
