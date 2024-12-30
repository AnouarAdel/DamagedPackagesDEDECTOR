"use client" //
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://127.0.0.1:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      setPrediction(data.prediction);
    } catch (err) {
      console.error('Error uploading file:', err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Package Detection</h1>
      <input type="file" onChange={handleFileChange} className="my-4" />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Upload Image
      </button>
      {prediction && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Prediction Results:</h2>
          <ul>
            <li>Tampered: {prediction.tampered * 100}%</li>
            <li>Damaged: {prediction.damaged * 100}%</li>
            <li>Intact: {prediction.intact * 100}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
