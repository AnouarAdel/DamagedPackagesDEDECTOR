'use client';
import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

function Homepage() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
      setPrediction(null); 
      setError(null); 
    }
  };

  const handleContinue = async () => {
    if (!selectedImage) {
      setError('Please select an image before continuing.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedImage);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload the image. Please try again.');
      }

      const result = await response.json();
      setPrediction(result.message); 
      setError(null); 
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDownloadReport = async () => {
    const pageElement = document.getElementById('report-content');
    if (!pageElement) return;

    const buttons = document.querySelectorAll('.upload-report-button');
    buttons.forEach((button) => button.classList.add('hide-for-pdf'));

    const canvas = await html2canvas(pageElement);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = canvas.width > canvas.height ? pageWidth : pageWidth * 0.8;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('report.pdf');

    buttons.forEach((button) => button.classList.remove('hide-for-pdf'));
  };

  return (
    <div className="homepage">
      <p id="titre" className="title">
        Package Tampering and Damage Detector
      </p>

      {!prediction && (
        <div className="upload-section">
          <div className="dropzone-container">
            <label htmlFor="dropzone-file" className="dropzone">
              <div className="icon">
                {!selectedImage ? (
                  <svg
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                ) : (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="uploaded-image"
                  />
                )}
              </div>
              {!selectedImage && (
                <>
                  <p className="text-sm">
                    <span className="bold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          <div className="button-container">
            <button
              onClick={() => document.getElementById('dropzone-file')?.click()}
              className="upload-button"
            >
              {!selectedImage ? 'Upload Image' : 'Upload Another Image'}
            </button>

            {selectedImage && (
              <button onClick={handleContinue} className="continue-button">
                Continue
              </button>
            )}
          </div>
        </div>
      )}

      {prediction && (
        <div id="report-content" className="result-section">
          <h2 className="result-title">{prediction}</h2> {/* damage or normal detection*/ }
          <div className="result-content">
          <div className="percentage">
              <p className="percentage-label">Percentage</p>
              <p className="percentage-value">86%</p>
            </div>

            <div className="image-container">
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Uploaded Result"
                  className="selected-image"
                />
              )}
            </div>
          </div>
          <div className="description">
            <p>
              The image shows a package with an 85% match for.
              Please review the details carefully.
            </p>
          </div>
          <button onClick={handleDownloadReport} className="upload-report-button">
            Download Report
          </button>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Homepage;
