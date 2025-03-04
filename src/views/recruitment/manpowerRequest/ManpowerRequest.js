import React, { Fragment } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
//import { axioslogin } from 'src/views/Axios/Axios';

function ManpowerRequest() {

    const [name, setName] = useState()
    const [file, setFile] = useState()

    const uploadFile = async () => {
        const data = new FormData();
        data.append("em_id", name)
        data.append("file", file)


        //const result = await axioslogin.post('/upload/upload', data)

    }

    return (
        <Fragment>
            <div className="container">
                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className='d-flex justify-content-evenly'>
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input type="text" id="name" onChange={(e) => setName(e.target.value)} autoComplete='off' />
                                </div>
                                <div>
                                    <label htmlFor="file">File</label>
                                    <input type="file" id="file" accept='.jpg' onChange={
                                        (e) => {
                                            const file = e.target.files[0]
                                            setFile(file)
                                        }
                                    }
                                    />
                                </div>
                                <div>
                                    <Button onClick={uploadFile} >Upload</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Fragment >
    )
}

export default ManpowerRequest
