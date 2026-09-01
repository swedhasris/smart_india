import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle2, Upload, FileCheck, Download, Home, ClipboardList, Shield } from 'lucide-react';

export default function ApplicationWizard({ service, user, onBack, onSubmitComplete, onTrackNow, onGoHome }) {
  const [step, setStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Rajesh Sharma',
    dob: '1992-05-14',
    mobile: user?.mobile || '+91 98765 43210',
    email: user?.email || 'rajesh.sharma@example.com',
    aadhaar: '8921-4501-9982',
    state: 'Tamil Nadu',
    district: 'Chennai',
    taluk: 'Mylapore',
    village: 'Mylapore Central',
    pincode: '600004'
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    { id: '1', name: 'Aadhaar_Card_Front_Back.pdf', size: '1.2 MB', status: 'Uploaded' },
    { id: '2', name: 'Income_Declaration_Self.pdf', size: '850 KB', status: 'Uploaded' }
  ]);

  const [createdApplicationId, setCreatedApplicationId] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadedFiles(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          name: file.name,
          size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
          status: 'Uploaded'
        }
      ]);
    }
  };

  const handleFinalSubmit = () => {
    // Generate random GOV-XXXXXX ID
    const randomId = `GOV-${Math.floor(100000 + Math.random() * 900000)}`;
    setCreatedApplicationId(randomId);

    const newAppObj = {
      id: randomId,
      serviceId: service?.id || 'income-cert',
      serviceName: service?.name || 'Income Certificate',
      departmentName: service?.departmentName || 'Revenue Department',
      icon: service?.icon || '💰',
      applicantName: formData.fullName,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      currentStep: 1,
      timeline: [
        { status: 'Submitted', date: new Date().toLocaleString(), completed: true, note: 'Application registered on Government Gateway' },
        { status: 'Under Verification', date: 'In Progress', completed: false, note: 'Awaiting digital document screening' },
        { status: 'Officer Review', date: 'Pending', completed: false, note: 'Tahsildar clearance' },
        { status: 'Approved', date: 'Pending', completed: false, note: 'Certificate issuance' }
      ]
    };

    onSubmitComplete(newAppObj);
    setStep(5);
  };

  return (
    <div className="application-wizard-page">
      {/* Top Navigation */}
      {step < 5 && (
        <div className="page-header-nav">
          <button className="back-btn" onClick={() => step > 1 ? setStep(step - 1) : onBack()}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <div style={{ fontSize: '11px', fontWeight: '700', color: '#673AB7' }}>
              Online Form Application
            </div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', color: '#1a1a2e' }}>
              {service?.name || 'Service Application'}
            </h1>
          </div>
        </div>
      )}

      {/* Step Indicator Progress Bar */}
      {step < 5 && (
        <div className="wizard-steps">
          {[
            { num: 1, label: 'Personal' },
            { num: 2, label: 'Address' },
            { num: 3, label: 'Documents' },
            { num: 4, label: 'Review' }
          ].map((s) => {
            const isActive = step === s.num;
            const isCompleted = step > s.num;
            return (
              <div
                key={s.num}
                className={`step-indicator ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
              >
                <div className="step-bubble">
                  {isCompleted ? <CheckCircle2 size={16} /> : s.num}
                </div>
                <span className="step-label">{s.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* STEP 1: PERSONAL INFORMATION */}
      {step === 1 && (
        <div className="detail-card">
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#673AB7' }}>
            Step 1: Personal Information
          </h3>

          <div className="form-group">
            <label className="form-label">Full Name (As per Aadhaar)</label>
            <input
              type="text"
              className="form-control"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-control"
              value={formData.dob}
              onChange={(e) => handleInputChange('dob', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Mobile Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.mobile}
              onChange={(e) => handleInputChange('mobile', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email ID</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Aadhaar / National ID Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.aadhaar}
              onChange={(e) => handleInputChange('aadhaar', e.target.value)}
            />
          </div>

          <button className="primary-btn" onClick={() => setStep(2)}>
            Continue to Address <ArrowRight size={18} />
          </button>
        </div>
      )}

      {/* STEP 2: ADDRESS */}
      {step === 2 && (
        <div className="detail-card">
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#673AB7' }}>
            Step 2: Residence Address
          </h3>

          <div className="form-group">
            <label className="form-label">State</label>
            <select
              className="form-control"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
            >
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Karnataka">Karnataka</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Delhi">Delhi</option>
              <option value="Telangana">Telangana</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">District</label>
            <input
              type="text"
              className="form-control"
              value={formData.district}
              onChange={(e) => handleInputChange('district', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Taluk / Subdivision</label>
            <input
              type="text"
              className="form-control"
              value={formData.taluk}
              onChange={(e) => handleInputChange('taluk', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Village / City Ward</label>
            <input
              type="text"
              className="form-control"
              value={formData.village}
              onChange={(e) => handleInputChange('village', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Pincode</label>
            <input
              type="text"
              className="form-control"
              value={formData.pincode}
              onChange={(e) => handleInputChange('pincode', e.target.value)}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <button className="secondary-btn" onClick={() => setStep(1)}>Back</button>
            <button className="primary-btn" onClick={() => setStep(3)}>
              Upload Documents <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOCUMENTS */}
      {step === 3 && (
        <div className="detail-card">
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#673AB7' }}>
            Step 3: Upload Documents
          </h3>

          <label className="file-upload-zone" htmlFor="fileInput">
            <Upload size={32} color="#673AB7" style={{ margin: '0 auto 8px auto' }} />
            <p style={{ fontSize: '14px', fontWeight: '700', color: '#1a1a2e' }}>
              Click to upload or drag & drop files
            </p>
            <p style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
              PDF, JPG, PNG (Max file size: 5MB)
            </p>
            <input
              id="fileInput"
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <h4 style={{ fontSize: '13px', fontWeight: '700', margin: '16px 0 8px 0' }}>Uploaded Files:</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
            {uploadedFiles.map((file) => (
              <div key={file.id} style={{
                background: '#F4F5FA',
                padding: '12px 14px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileCheck color="#2e7d32" size={20} />
                  <div>
                    <p style={{ fontSize: '13px', fontWeight: '700', color: '#1a1a2e' }}>{file.name}</p>
                    <p style={{ fontSize: '11px', color: '#6c757d' }}>{file.size} • {file.status}</p>
                  </div>
                </div>
                <span style={{ fontSize: '11px', color: '#2e7d32', fontWeight: '700' }}>✓ Verified</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <button className="secondary-btn" onClick={() => setStep(2)}>Back</button>
            <button className="primary-btn" onClick={() => setStep(4)}>
              Review Form <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW */}
      {step === 4 && (
        <div className="detail-card">
          <h3 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '16px', color: '#673AB7' }}>
            Step 4: Review Your Details
          </h3>

          <div style={{ background: '#F4F5FA', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7', marginBottom: '8px' }}>
              Personal Info
            </h4>
            <p style={{ fontSize: '12px' }}><strong>Name:</strong> {formData.fullName}</p>
            <p style={{ fontSize: '12px' }}><strong>DOB:</strong> {formData.dob}</p>
            <p style={{ fontSize: '12px' }}><strong>Mobile:</strong> {formData.mobile}</p>
            <p style={{ fontSize: '12px' }}><strong>Aadhaar:</strong> {formData.aadhaar}</p>
          </div>

          <div style={{ background: '#F4F5FA', borderRadius: '14px', padding: '14px', marginBottom: '14px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7', marginBottom: '8px' }}>
              Address Details
            </h4>
            <p style={{ fontSize: '12px' }}>{formData.village}, {formData.taluk}, {formData.district}, {formData.state} - {formData.pincode}</p>
          </div>

          <div style={{ background: '#F4F5FA', borderRadius: '14px', padding: '14px', marginBottom: '20px' }}>
            <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#673AB7', marginBottom: '8px' }}>
              Attached Documents ({uploadedFiles.length})
            </h4>
            {uploadedFiles.map(f => (
              <p key={f.id} style={{ fontSize: '12px', color: '#4b5563' }}>• {f.name}</p>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
            <button className="secondary-btn" onClick={() => setStep(3)}>Edit Details</button>
            <button className="primary-btn" onClick={handleFinalSubmit}>
              Submit Application <Shield size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUBMITTED SUCCESS SCREEN */}
      {step === 5 && (
        <div style={{ textAlign: 'center', padding: '30px 16px', background: 'white', borderRadius: '24px', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: '#e8f5e9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
            animation: 'scale-up 0.4s ease'
          }}>
            <CheckCircle2 size={52} color="#2e7d32" />
          </div>

          <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1a1a2e' }}>
            Application Submitted Successfully!
          </h2>
          <p style={{ fontSize: '13px', color: '#6c757d', marginTop: '6px' }}>
            Your request has been routed to the official departmental processing officer.
          </p>

          {/* Application Reference ID Box */}
          <div style={{
            background: 'linear-gradient(135deg, #F3E5F5 0%, #EDE7F6 100%)',
            border: '2px dashed #673AB7',
            borderRadius: '16px',
            padding: '16px',
            margin: '24px 0',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '12px', fontWeight: '700', color: '#673AB7', textTransform: 'uppercase' }}>
              Your Unique Application Reference ID
            </span>
            <div style={{ fontSize: '26px', fontWeight: '800', color: '#311b92', marginTop: '4px', letterSpacing: '1px' }}>
              {createdApplicationId}
            </div>
            <p style={{ fontSize: '11px', color: '#6c757d', marginTop: '4px' }}>
              Save this reference ID to track your status or download the certificate later.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="btn-group">
            <button className="primary-btn" onClick={() => onTrackNow(createdApplicationId)}>
              <ClipboardList size={18} /> Track Application Status
            </button>
            <button
              className="secondary-btn"
              onClick={() => alert(`Downloading official acknowledgement PDF for ${createdApplicationId}...`)}
              style={{ justifyContent: 'center' }}
            >
              <Download size={18} /> Download Acknowledgement PDF
            </button>
            <button
              className="secondary-btn"
              onClick={onGoHome}
              style={{ justifyContent: 'center' }}
            >
              <Home size={18} /> Back to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
