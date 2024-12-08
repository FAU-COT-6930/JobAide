"use client";

import { useEffect, useState } from "react";

interface PdfData {
  name: string;
  url: string;
}

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState<PdfData[]>([]);

  useEffect(() => {
    // Fetch the list of PDFs dynamically
    const fetchPdfs = async () => {
      const pdfList: PdfData[] = [
        { name: "Emmanuel's PDF", url: "/pdfs/EmmanuelDavid_Resume.pdf" }
      ];

      setPdfs(pdfList);
    };

    fetchPdfs();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      <h1 className="text-3xl font-bold text-gray-800 mt-10">Available PDFs</h1>

      {pdfs.length === 0 ? (
        <p className="mt-6 text-gray-600 text-lg">No PDFs available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-10 w-full max-w-6xl">
          {pdfs.map((pdf, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-start"
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                {pdf.name}
              </h2>
              <a
                href={pdf.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Open PDF
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;