"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface PdfData {
  name: string;
  url: string;
}

const DashboardPage = () => {
  const [pdfs, setPdfs] = useState<PdfData[]>([]);
  const [loading, setLoading] = useState(false);
  const [showPdfs, setShowPdfs] = useState(false);
  const router = useRouter();

  useEffect(() => {

    // Check if "isChecked" in localStorage is true
    const isChecked = localStorage.getItem("isChecked") === "true";
    setShowPdfs(isChecked);

    if (isChecked) {
      // Fetch the PDFs only if "isChecked" is true
      const fetchPdfs = async () => {
        const pdfList: PdfData[] = [
          { name: "Emmanuel's Resume", url: "/pdfs/EmmanuelDavid_Resume.pdf" },
        ];
        setPdfs(pdfList);
      };
      fetchPdfs();
    }
  }, []);

  const handleSignOut = async () => {
    setLoading(true);
    router.push("/"); // Redirect to root after signing out
  };

  const handleNewApplication = () => {
    router.push("/newapplication"); // Redirect to /newapplication
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
      {/* Header */}
      <div className="w-full max-w-6xl flex justify-between items-center mt-6 px-6">
        <h1 className="text-4xl font-extrabold text-gray-800">Your PDFs</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={handleNewApplication}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            New Application
          </button>
          <button
            onClick={handleSignOut}
            className={`flex items-center justify-center rounded-full p-3 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            aria-label="Sign Out"
          >
            <LogOut
              className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${
                !loading
                  ? "hover:scale-110 hover:text-red-500 hover:drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                  : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Content */}
      {showPdfs ? (
        pdfs.length === 0 ? (
          <p className="mt-10 text-gray-600 text-lg">No PDFs available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-10 w-full max-w-7xl mt-10">
            {pdfs.map((pdf, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg p-6 flex flex-col items-start hover:shadow-2xl transition-shadow duration-300"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  {pdf.name}
                </h2>
                <a
                  href={pdf.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300"
                >
                  Open PDF
                </a>
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="mt-10 text-gray-600 text-lg">There are no PDFs</p>
      )}
    </div>
  );
};

export default DashboardPage;