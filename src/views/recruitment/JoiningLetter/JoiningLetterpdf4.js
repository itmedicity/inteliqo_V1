
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const JoiningLetterpdf4 = (data) => {
    var doc = {

        pageMargins: [50, 50, 50, 50],
        header: {
            margin: [10, 10, 10, 20],
            columns: [

                {
                    stack: [
                        { image: 'logo', fit: [150, 150] },

                    ],
                    width: '*',
                    alignment: 'left'
                },


            ]
        },
        content: [
            {
                stack: [
                    { text: 'TMCH/HRD/JL/..../..../....', fontSize: 8, bold: true },
                ],
                width: '*',
                alignment: 'left',
                margin: [30, 60, 0, 0],
            },

            {
                stack: [
                    { text: 'DATE:' + data?.currentdate, fontSize: 8, bold: true },
                ],
                width: '*',
                alignment: 'right',
                margin: [0, 0, 40, 0],
            },
            {
                stack: [
                    { text: 'JOINING LETTER', fontSize: 11, bold: true },

                ],
                width: '*',
                alignment: 'center',
                margin: [0, 40, 0, 10]

            },
            {
                text: 'To ,',
                fontSize: 10,
                margin: [0, 20, 0, 10]
            },
            {
                text: 'The H.R. Department',
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },
            {
                text: 'TMCH',
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },
            {
                text: 'Dear Sir ,',
                fontSize: 10,
                margin: [0, 10, 0, 10]

            },
            {
                text: ' With due respect, I ' + data?.name + ' Emp.ID: ' + data?.em_no + ' would like to inform you that I am joining in Travancore ',
                fontSize: 10,
                margin: [0, 20, 0, 10]
            },
            {
                text: 'Medical Hospital as ' + data?.desg_name + ' in the department of ' + data?.department + ' on ',
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },
            {
                text: data?.date_of_join + " .",
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },
            {
                text: ' I hope you will accept my joining as ' + data?.desg_name,
                fontSize: 10,
                margin: [0, 5, 0, 10]
            },



            {
                text: 'Name :' + data?.name,
                fontSize: 10,
                bold: true,
                margin: [0, 5, 0, 10]
            },
            {
                text: 'Designation : ' + data?.desg_name,
                fontSize: 10,
                bold: true,
                margin: [0, 5, 0, 10]
            },

            {
                text: 'Signature :',
                fontSize: 10,
                bold: true,
                margin: [0, 5, 0, 10]
            },

        ],
        images: {
            logo: 'http://192.168.10.88:9090/Inteliqo/PersonalRecords/logo/logo.png',
        }
    };

    pdfMake.createPdf(doc).open();
}
