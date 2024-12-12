import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";




export const ExporttoExcel = async (excelData, fileName) => {
    // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    // Helper function to convert string to ArrayBuffer
    const s2ab = s => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    };
    const wb = XLSX.utils.book_new();

    // Add worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Attendance Report");

    // Convert workbook to binary Excel file
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Save binary Excel file
    const dataBlob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    FileSaver.saveAs(dataBlob, fileName + fileExtension);



}

export const exportToWOFFExcel = async (excelData, fileName) => {
    // const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    // Helper function to convert string to ArrayBuffer
    const s2ab = s => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
        return buf;
    };
    const wb = XLSX.utils.book_new();

    // Add worksheet
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Week Off Report");

    // Convert workbook to binary Excel file
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });

    // Save binary Excel file
    const dataBlob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    FileSaver.saveAs(dataBlob, fileName + fileExtension);



}

