import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
// import { PUBLIC_NAS_FOLDER } from "src/views/Constant/Static";
import logo from '../../../assets/images/logo.png'
import NABH from '../../../assets/images/NABH.png'

pdfMake.vfs = pdfFonts.pdfMake.vfs;

// helper: converts imported image URLs to Base64 for pdfMake
const toDataURL = (url) => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = function () {
            const reader = new FileReader()
            reader.onloadend = function () {
                resolve(reader.result)
            }
            reader.readAsDataURL(xhr.response)
        }
        xhr.onerror = reject
        xhr.open('GET', url)
        xhr.responseType = 'blob'
        xhr.send()
    })
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