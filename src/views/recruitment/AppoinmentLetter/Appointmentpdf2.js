import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Appointmentpdf2 = (data) => {
    var doc = {

        pageMargins: [50, 50, 50, 50],
        header: {
            margin: [10, 10, 10, 20],
            columns: [
                {
                    stack: [
                        { text: 'TMCH/HRD/OL/MM/YY/REF: NO', fontSize: 8, bold: true },
                    ],
                    width: '*',
                    alignment: 'left',
                    margin: [30, 0, 0, 0],
                },

                {
                    stack: [
                        { text: 'DATE:', fontSize: 8, bold: true },
                    ],
                    width: '*',
                    alignment: 'right',
                    margin: [0, 0, 50, 0],
                },

            ]
        },
        content: [

            {
                stack: [
                    { text: 'APPOINTMENT LETTER', fontSize: 11, bold: true },

                ],
                width: '*',
                alignment: 'center',
                margin: [0, 20, 0, 10]

            },
            {
                text: 'To ,',
                fontSize: 8,
                margin: [0, 20, 0, 10]
            },
            {
                text: 'Ms',
                fontSize: 8,
                margin: [0, 0, 0, 10]
            },
            {
                text: data?.name,
                fontSize: 8,
                margin: [0, 0, 0, 10]
            },
            {
                text: 'We are pleased to engage you as ' + data?.desg_name + ' in this establishment on the following  terms and condition for a fixed of One year , commencing from ' + data?.date_of_join,
                fontSize: 8,
                margin: [0, 5, 0, 10]

            },
            {
                text: '1. Your place of engagment is presently at ' + data?.department + ' of Travancore Medical College Hospital ,Kerala.However you are liable to be transferred to any other units of the establishment/associates.',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '2. You will be entitled for an all inclusive remuneration of ' + data?.salary + '/- (Rupees only) per month subject to statutory deductions if any.The Managment is free to alter or refix the remuneration subject to the performance appraisals.',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                stack: [
                    { image: 'logo', fit: [150, 150] },

                ],
                width: '*',
                alignment: 'right',
                // margin: [0, 50, 0, 0],
            },
            {
                text: 'G Ganesh Potti',
                fontSize: 10,
                bold: true,
                margin: [0, 45, 0, 10]
            },
            {
                text: 'General Manager HR',
                fontSize: 10,
                bold: true,
                margin: [0, 5, 0, 10]
            },

            {
                text: 'I agree to accept this fixed term engagement on the term and condition above mentioned. The original of this letter is in my possession .',
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },
            {
                text: 'Name : ' + data?.name,
                fontSize: 10,
                bold: true,
                margin: [0, 25, 0, 10]
            },
            {
                text: 'Signature :',
                fontSize: 10,
                bold: true,
                margin: [0, 15, 0, 10]
            },
            {
                text: 'Date :' + data?.date_appointment,
                fontSize: 10,
                bold: true,
                margin: [0, 15, 0, 10]
            },
            {
                stack: [
                    { image: 'logo', fit: [150, 150] },

                ],
                width: '*',
                alignment: 'right',
                // margin: [0, 50, 0, 0],
            },
        ],
        images: {
            logo: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
        }
    };

    pdfMake.createPdf(doc).open();
}
