import * as XLSX from "xlsx";
import dsaData from "../data/problems";
import { useState } from "react";

const DownloadButton = () => {
  const [success, setSuccess] = useState(false);

  const generateExcel = () => {
    const shuffled = dsaData.sort(() => 0.5 - Math.random()).slice(0, 75);
    const worksheet = XLSX.utils.json_to_sheet(shuffled);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Blind 75");
    XLSX.writeFile(workbook, "Blind_75_Problems.xlsx");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <>
      {/* Button */}
      <div className="text-center mt-10">
        <button
          onClick={generateExcel}
          className="inline-flex items-center justify-center rounded-full bg-gradient-to-tr from-fuchsia-800 to-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg ring-1 ring-white/10 backdrop-blur transition-all duration-300 hover:scale-105 hover:brightness-110"
        >
          📊 Generate 'Blind 75' Spreadsheet
        </button>
      </div>

      {/* Toast */}
      {success && (
        <div className="fixed inset-x-0 bottom-8 flex justify-center z-50 pointer-events-none">
          <div className="max-w-sm w-full bg-green-600/90 text-white px-6 py-3 rounded-full shadow-lg backdrop-blur-sm flex items-center space-x-3 animate-fade-in">
            <span>✅</span>
            <span>File generated successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadButton;
