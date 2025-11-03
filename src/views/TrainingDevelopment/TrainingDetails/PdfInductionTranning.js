import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import { PUBLIC_NAS_FOLDER } from "src/views/Constant/Static";
import logo from '../../../assets/images/logo.png'
import NABH from '../../../assets/images/NABH.png'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// helper: converts imported image URLs to Base64 for pdfMake

const toDataURL = async (url) => {
    try {
        const response = await fetch(url)  // Using `fetch` instead of `XMLHttpRequest` for simplicity
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const blob = await response.blob()  // Get the Blob from the response
        const reader = new FileReader()

        return new Promise((resolve, reject) => {
            reader.onloadend = () => {
                resolve(reader.result)  // Resolve with the Data URL when reading is complete
            }
            reader.onerror = () => reject(new Error('Failed to read file as Data URL'))  // Reject if there's an error while reading
            reader.readAsDataURL(blob)  // Convert the Blob to Data URL
        })

    } catch (error) {
        console.error('Error:', error)  // Handle any errors that happen during the fetch or read process
        throw error  // Re-throw the error to propagate it
    }
}


export const PdfInductionTrannings = async (selected, ShowData) => {
    // convert all images to base64 first
    const [base64logo, base64NABH] = await Promise.all([
        toDataURL(logo),
        toDataURL(NABH),

    ])

    const doc = {
        content: [
            {
                columns: [
                    {
                        image: 'logo',
                        fit: [100, 100],
                        alignment: 'left',
                        flex: 1,

                    },
                    {
                        image: 'NABH',
                        fit: [60, 60],
                        alignment: 'right',
                        width: 'auto'
                    }
                ]
            },
            {
                text: 'INDUCTION TRAINING RECORD',
                fontSize: 18,
                bold: true,
                alignment: 'center',
                margin: [0, 50, 0, 10]
            },
            {
                text: 'Employee Details',
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 10]
            },
            {
                table: {
                    widths: ['25%', '75%'],
                    body: [
                        ['Name:', selected?.em_name || ''],
                        ['Employee ID:', selected?.em_no || ''],
                        ['Designation:', selected?.desg_name || ''],
                        ['Department:', selected?.dept_name || ''],
                        ['Name of the HOD:', selected?.hod || '']
                    ]
                },
                layout: {
                    hLineWidth: () => 0,
                    vLineWidth: () => 0,
                    paddingLeft: () => 10,
                    paddingRight: () => 10,
                    paddingTop: () => 5,
                    paddingBottom: () => 5
                }
            },
            {
                text: 'Training Details',
                fontSize: 14,
                bold: true,
                margin: [0, 30, 0, 10]
            },
            {
                style: 'tableExample',
                table: {
                    widths: [25, 50, 110, 40, 50, 50, '*'],
                    body: [
                        [
                            { text: 'Sl No', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Date', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Training Topic', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Duration', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Pre-Test Mark', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Post-Test Mark', bold: true, fontSize: 10, alignment: 'center' },
                            { text: 'Trainer', bold: true, fontSize: 10, alignment: 'center' }
                        ],
                        ...ShowData.map((val, idx) => ([
                            { text: idx + 1, fontSize: 10, alignment: 'center' },
                            { text: val.date || '', fontSize: 10, alignment: 'center' },
                            { text: val.training_topic_name || '', fontSize: 10, alignment: 'center' },
                            { text: val.hours || '', fontSize: 10, alignment: 'center' },
                            { text: val.induct_pre_mark !== undefined ? val.induct_pre_mark : 'NA', fontSize: 10, alignment: 'center' },
                            { text: val.induct_post_mark !== undefined ? val.induct_post_mark : 'NA', fontSize: 10, alignment: 'center' },
                            { text: val.trainer_name || '', fontSize: 10, alignment: 'center' }
                        ]))
                    ]
                },
                layout: {
                    paddingTop: () => 4,
                    paddingBottom: () => 4
                }
            }
        ],

        images: {
            logo: base64logo,
            NABH: base64NABH
        },
    };

    pdfMake.createPdf(doc).open();
};