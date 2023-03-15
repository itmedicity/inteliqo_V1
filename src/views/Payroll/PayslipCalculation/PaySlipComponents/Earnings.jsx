import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const Earnings = ({ emno }) => {


  const [earnings, setEarnings] = useState([])

  const postData = {
    em_no: emno
  }

  useEffect(() => {
    // const getFixed = async () => {
    //   const result = await axioslogin.post("/payrollprocess/empEarning", postData)
    //   const { success, data } = result.data;
    //   if (success === 1) {
    //     console.log(data);
    //     setEarnings(data)
    //   } else {
    //     setEarnings([])
    //   }
    // }
    // getFixed()

  }, [postData])


  console.log("Gf");
  return (
    <div>Earnings</div>
  )
}

export default Earnings