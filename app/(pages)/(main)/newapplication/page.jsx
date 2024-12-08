// app/application/page.js

"use client";

import { useState, useEffect } from "react";

export default function NewApplication() {
  const [hasUploaded, setHasUploaded] = useState(false);
  const [showOmar2, setShowOmar2] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isRemaking, setIsRemaking] = useState(false);

  const handleUpload = (e) => {
    if (e.target.files.length > 0) {
      setHasUploaded(true);
    }
  };

  const handleRemake = () => {
    setIsRemaking(true);
    setTimeout(() => {
      setShowOmar2(true);
      setIsRemaking(false);
    }, 5000);
  };

  useEffect(() => {
    if (showOmar2) {
      localStorage.setItem("isChecked", "true");
    }
  }, [showOmar2]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 p-6">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Application Page
        </h1>
        {!hasUploaded ? (
          <div className="mb-4">
            <p className="text-gray-700 mb-4">
              Please upload a PDF to proceed:
            </p>
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              className="w-full border border-gray-300 rounded-md p-2 mb-4"
            />
          </div>
        ) : !showOmar2 ? (
          <>
            <div className="border border-gray-300 rounded-md shadow-sm mb-4">
              <iframe
                src="http://localhost:3000/Omar-Khan-Resume.pdf"
                className="rounded-xl hover:cursor-pointer w-[100%] h-[70%]"
              />
            </div>
            <input
              type="text"
              placeholder="Enter text here"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleRemake}
              disabled={isRemaking}
              className={`w-full px-4 py-2 rounded-md font-semibold text-white ${
                isRemaking
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {isRemaking ? "Remaking..." : "Remake"}
            </button>
          </>
        ) : (
          <>
            <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm mb-4">
              <iframe
                src="/Copy-Omar-Khan-Resume.pdf"
                title="omar2.pdf"
                className="w-full h-64"
              ></iframe>
            </div>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="w-full px-4 py-2 mt-4 rounded-md font-semibold text-white bg-green-600 hover:bg-green-700"
            >
              Return to Dashboard
            </button>
          </>
        )}
      </div>
    </div>
  );
}
