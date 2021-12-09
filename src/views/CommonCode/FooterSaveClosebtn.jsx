import React from 'react'
import WrongLocationOutlinedIcon from '@mui/icons-material/WrongLocationOutlined';
import { Chip, IconButton } from '@material-ui/core';
import { MdOutlineAddTask } from 'react-icons/md'

const FooterSaveClosebtn = (props) => {
    return (

        <div className="col-md-2 col-sm-4 d-flex flex-row justify-content-md-between">
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={
                        <IconButton type="submit" >
                            <MdOutlineAddTask className="text-info p-0" size={22} />
                        </IconButton>
                    }
                    label="Save"
                    disabled={props.disable}
                    clickable={true}
                />
            </div>
            <div style={{ marginRight: "0.5rem" }}>
                <Chip
                    icon={<IconButton className="p-1" >
                        <WrongLocationOutlinedIcon className="text-info" size={22} />
                    </IconButton>}
                    label="Close"
                    onClick={props.redirect}
                    clickable={true}
                />
            </div>
        </div>

    )
}

export default FooterSaveClosebtn
