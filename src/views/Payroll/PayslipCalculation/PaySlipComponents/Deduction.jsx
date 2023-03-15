import React, { useEffect, useState } from 'react'
import { axioslogin } from 'src/views/Axios/Axios'

const Deduction = ({ emno }) => {


  const [deduction, setDeduction] = useState([])

  const postData = {
    em_no: emno
  }

  useEffect(() => {
    // const getFixed = async () => {
    //   const result = await axioslogin.post("/payrollprocess/empDeduction", postData)
    //   const { success, data } = result.data;
    //   if (success === 1) {
    //     console.log(data);
    //     setDeduction(data)
    //   } else {
    //     setDeduction([])
    //   }
    // }
    // getFixed()

  }, [postData])


  console.log("wer");
  return (
    <div>Deduction</div>
  )
}

export default Deduction