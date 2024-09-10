import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export const Appointmentpdf3 = (data) => {
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
                text: '9. You must notify the departmental head within one hour of the start of your duty time if you are unable to report for work .If you are absent without intimating your departmental head for more than eight days on any account, your employment in the Institute will be deemed as terminated .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '10. You shall report for work at your place of work in time according to your shift schedule or schedule of working hours. Late coming for work beyond the time of commencement of the shift or working hours without permission from the Management or Departmental head will be treated as misconduct on your part. You shall be liable to appropriate actions against you for such late-coming  .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '11. You will be eligible for leaves as applicable to the fixed term employees subject to administrative exigencies .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '12. Absence from work without getting the leave sanctioned or without obtaining permission for such absence from the leave sanctioning authority or Managment will amount to unauthorized absence from work , for which you will be liable to appropriate action, in addition to loss of wages for the period of such absence .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },

            {
                text: '13. If You along with other employed persons acting in concert absent yourself without due notice and without reasonable cause, the Management will be at liberty to deduct 8 days wages for such concerted absence  .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },


            {
                text: '14. In case of extreme emergency the telephonic leave may be treated as elligible leave provided a proper leave application is submitted and sanctioned within 24 hours. Leave sanctioning authorities have the right to refuse, revoke leave request or sanctioned leave at any time due to exigencies of work .',
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
                text: '15. If you absent yourself from work without obtaining the leave sanctioned or without taking permission for such absence from work for a continuos period of 8 days and more during the period of your service or overstay for 8 days or more beyond the period of leave already sanctioned without obtaining sanction for extension of leave or without obtaining the permission of the leave sanctioning authority, you shall be deemed to have voluntarity abandoned the service under the Management and your name will be struck off from the rolls of the establishment without any further notice  .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '16. During the course of appointment , you shall not enter into the service of any other organization, institution,body,or person or engage yourself in any self-employment, whether for remuneration or not  .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '17. You are not permitted to accept any incentives from suppliers or any other associates of the Institute  .',
                fontSize: 8,
                // bold: true,
                margin: [10, 5, 0, 10]
            },
            {
                text: '18. Any confidential information related to the job or the Institute, which you may come across during your service,must be kept in strict confidence even after the cessation of your employment with the Institute .',
                fontSize: 8,
                margin: [10, 5, 0, 10]
            },
            {
                text: '19. You shall,during the period of your appointment as above in this Hospital, handle all equipments,tools and/or instruments of the hospital with utmost care and attention and shall not cause any loss or damage to the Hospital or its properties.The Managment of the Hospital has got the right to recover such losses or damage from the monthly wages/remuneration payable to you from the Hospital .',
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
