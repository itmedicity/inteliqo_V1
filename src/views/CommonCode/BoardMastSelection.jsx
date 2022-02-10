import { FormControl, MenuItem, Select } from '@material-ui/core'
import React, { useContext, memo, useEffect, Fragment, useState } from 'react'
import { PayrolMasterContext } from 'src/Context/MasterContext';
import { axioslogin } from '../Axios/Axios';


const BoardMastSelection = (props) => {
    const [board, setBoard] = useState([]);
    const { selectBoard, updateBoard, selectEducation } = useContext(PayrolMasterContext)

    useEffect(() => {
        const getBoard = async () => {
            const result = await axioslogin.get(`/common/getBoard/${selectEducation}`);
            const { data } = await result.data;
            setBoard(data)
        }
        getBoard()
        return (
            updateBoard(0)
        )
    }, [updateBoard, selectEducation]);


    return (
        <Fragment>
            <FormControl
                fullWidth
                margin="dense"
            >
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    name="selectboard"
                    fullWidth
                    variant="outlined"
                    className="ml-1"
                    value={selectBoard}
                    onChange={(e) => updateBoard(e.target.value)}
                    defaultValue={0}
                    style={props.style}
                    disabled={props.disable}


                >
                    <MenuItem value='0' disabled>
                        Select Board
                    </MenuItem>
                    {
                        board && board.map((val, index) => {
                            return <MenuItem key={index} value={val.board_slno}>{val.board_name}
                            </MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Fragment>
    )
}

export default memo(BoardMastSelection)
