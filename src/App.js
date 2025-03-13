import React, { useState } from "react";
import { jsPDF } from "jspdf";

const CertificateGenerator = () => {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");

  const handleDownloadPDF = () => {
    if (!name || !designation) {
      alert("Please enter both name and designation!");
      return;
    }

    const pdf = new jsPDF("landscape", "px", [3508, 2480]); // A4 Landscape Size in pixels
    const img = new Image();
    img.src = "/crt.png"; // Ensure the file is placed in the public folder
    img.onload = () => {
      pdf.addImage(img, "PNG", 0, 0, 3508, 2480); // Full A4 background
      pdf.setFont("times");
      pdf.setFontSize(150);
      pdf.text(name, 1800, 1160, { align: "center" }); // Name position
      pdf.setFontSize(85);
      pdf.text(designation, 2300, 1300, { align: "center" }); // Designation position
      pdf.save(`${name}_certificate.pdf`);
    };
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card shadow p-4 w-50">
        <h2 className="text-center mb-4">Certificate Generator</h2>
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select
          className="form-control mb-3"
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Select Role</option>
          <option value="Core Co-ordinator">Core Co-ordinator</option>
          <option value="Sub Co-ordinator">Sub Co-ordinator</option>
          <option value="Volunteer">Volunteer</option>
        </select>
        <button className="btn btn-primary w-100" onClick={handleDownloadPDF}>
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;
  