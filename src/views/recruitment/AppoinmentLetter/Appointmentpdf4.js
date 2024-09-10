import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Appointmentpdf4 = (data) => {
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
                text: '3. There will be an initial appraisal period of three months from the date of your engagement . During the appraisal period if your performance is not statisfactory or not up to the standard and expectation of the Management , this contract will be terminated without any prior notice or compensation .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '4. You will be bound by the shift timings, attendance, holidays and leave rules made applicable to the fixed term employees of this Institution from time to time .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '5. There will be periodic performance evaluation and if your performance is not found to be satisfactory, You will be given report based on your shortfall/deficiencies and if there is no improvement in your performance,the Managment reserves the right to discontinue your employment at any time.',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '6. You are liable to wear uniforms if any prescribed by the Managment.The Managment will have the discretion to prescribe  norms for the issue of uniforms, including charging of the cost, either in part or in full, of the uniforms provided to you .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '7. Accommodation, if provided by the Institute, will be charged as per the prevalling norms/contract.',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '8. You may be transferred to any department of the Institute within the hospital premises or outside, as per the requirements of the Insitute .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },

            {
                text: '21. Any misrepresentation or wrong information given in your application can result in terminating your service from the Institute without any notice or compensation .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '22. You shall strictly abide by the Service & Conduct rule, regulation and procedures in force in the Institute, which may be amended, or added upon from time to time as per the requirements of the Institute .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '23. You will be bound by all the duty shifts assigned by the department .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '24. You are required to unergo BLS training within six months of joining to ensure your continuity in service .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '25. Violation of any above clause shall be deemed to be misconduct and the Management shall have the right to discontinue your service without any prior notice/intimation  .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },

            {
                text: 'This letter supersedes all prior oral or written understanding, if any, given to you.If you accept the terms and condition above mentioned , please sign the declaration in the duplicate and return to us. The original shall be retained by you  .',
                fontSize: 8,
                margin: [0, 5, 0, 10]
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
