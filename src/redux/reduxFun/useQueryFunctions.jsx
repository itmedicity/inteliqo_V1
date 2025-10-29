import JSZip from 'jszip'
import { axioslogin } from 'src/views/Axios/Axios'

export const getEmployeeSalary = async (deptSection) => {
  return await axioslogin.get(`/common/getgrossSalaryByEmployeeNo/${deptSection}`).then((res) => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getLeaveRequestType = async () => {
  return await axioslogin.get('/leaveRequestType/select').then((res) => {
    const { success, data } = res.data
    if (success === 1) {
      return data
    } else {
      return []
    }
  })
}

export const getHospitalImage = async () => {
  try {
    const result = await axioslogin.get(`/upload/getHospitalImage`, {
      responseType: 'blob',
    })

    const contentType = result.headers['content-type'] || ''

    // If backend returns JSON (e.g., logo not found), stop here
    if (contentType.includes('application/json')) {
      console.warn('No logo found')
      return
    }

    // Determine MIME type (optional — usually already in headers)
    let mimeType = contentType
    if (!mimeType || mimeType === '') {
      mimeType = 'application/octet-stream'
    }

    // Create URL for the image blob
    const blobWithType = new Blob([result.data], { type: mimeType })
    const url = URL.createObjectURL(blobWithType)

    // Extract filename from content-disposition header (optional)
    const contentDisposition = result.headers['content-disposition']
    let fileName = 'logo'
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/)
      if (match && match[1]) fileName = match[1]
    }

    // Create a single image object
    const image = {
      imageName: fileName,
      url,
      blob: blobWithType,
    }
    return image?.url
  } catch (error) {
    console.error('Error fetching or processing profile image:', error)
  }
}

export const getEmpProfileImage = async (no) => {
  try {
    const result = await axioslogin.get(`/upload/getProfileimage/${no}`, {
      responseType: 'blob',
    })
   
    const contentType = result.headers['content-type'] || ''

    if (contentType.includes('application/json')) {
          return
    }

    const zip = await JSZip.loadAsync(result.data)

    // Extract image files (e.g., .jpg, .png, .gif, .pdf)
    const imageEntries = Object.entries(zip.files).filter(([filename]) =>
      /\.(jpe?g|png|gif|pdf)$/i.test(filename),
    )

    const imagePromises = imageEntries.map(async ([filename, fileObj]) => {
      const originalBlob = await fileObj.async('blob')

      // Determine MIME type
      let mimeType = ''
      if (filename.endsWith('.pdf')) {
        mimeType = 'application/pdf'
      } else if (filename.endsWith('.png')) {
        mimeType = 'image/png'
      } else if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
        mimeType = 'image/jpeg'
      } else {
        mimeType = 'application/octet-stream'
      }

      const blobWithType = new Blob([originalBlob], { type: mimeType })
      const url = URL.createObjectURL(blobWithType)

      return { imageName: filename, url, blob: blobWithType }
    })

    const images = await Promise.all(imagePromises)
    return images[0]?.url
  } catch (error) {
    console.error('Error fetching or processing profile image:', error)
  
  }
}

export const getHospitalLogo = async () => {
  try {
    const result = await axioslogin.get(`/upload/getLogo`, {
      responseType: 'blob',
    })

    const contentType = result.headers['content-type'] || ''

    // If backend returns JSON (e.g., logo not found), stop here
    if (contentType.includes('application/json')) {
      return
    }

    // Determine MIME type (optional — usually already in headers)
    let mimeType = contentType
    if (!mimeType || mimeType === '') {
      mimeType = 'application/octet-stream'
    }

    // Create URL for the image blob
    const blobWithType = new Blob([result.data], { type: mimeType })
    const url = URL.createObjectURL(blobWithType)

    // Extract filename from content-disposition header (optional)
    const contentDisposition = result.headers['content-disposition']
    let fileName = 'logo'
    if (contentDisposition) {
      const match = contentDisposition.match(/filename="(.+)"/)
      if (match && match[1]) fileName = match[1]
    }

    // Create a single image object
    const image = {
      imageName: fileName,
      url,
      blob: blobWithType,
    }
    return image?.url
  } catch (error) {
    console.error('Error fetching or processing profile image:', error)
  }
}
