import React, { useState } from "react";

function App() {
  const [files, setFiles] = useState([]);
  const [similarity, setSimilarity] = useState(null);

  const handleFileUpload = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmit = async () => {
    if (files.length !== 2) {
      alert("Please upload exactly two documents.");
      return;
    }

    const formData = new FormData();
    formData.append("files", files[0]);
    formData.append("files", files[1]);

    const response = await fetch("http://localhost:5001/api/documents/compare", {
      method: "POST",
      body: formData,
    });

    // Ensure response is in JSON format and contains the similarity property
    const data = await response.json();
    if (data && data.similarity !== undefined) {
      setSimilarity(data.similarity);
    } else {
      console.error("No similarity value in response", data);
      alert("Error comparing documents. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center">Document Similarity Checker</h1>

        <input type="file" multiple className="mt-4 w-full" onChange={handleFileUpload} />
        <button
          onClick={handleSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Compare Documents
        </button>

        {similarity !== null && (
          <p className="mt-4 text-center text-xl font-semibold">
            Similarity Score: <span className="text-blue-600">{similarity.toFixed(2)}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;