import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Upload,
  FileCheck,
  Download,
  ShieldCheck,
  User,
  MapPin,
  FileText,
  Check
} from 'lucide-react';

export default function ApplicationFormView({
  service,
  user,
  onBack,
  onSubmitComplete,
  onTrackNow
}) {
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Rajesh',
    lastName: user?.name && user.name.split(' ')[1] ? user.name.split(' ')[1] : 'Sharma',
    dob: '1992-05-14',
    mobile: user?.mobile || '+91 98765 43210',
    email: user?.email || 'rajesh.sharma@example.gov.in',
    aadhaar: '8921-4501-9982',
    state: 'Tamil Nadu',
    district: 'Chennai',
    taluk: 'Mylapore',
    village: 'Mylapore Central Ward 14',
    pincode: '600004',
    addressLine: '14, Temple Street, South Mada Road'
  });

  const [uploadedFiles, setUploadedFiles] = useState([
    { id: '1', name: 'Aadhaar_Card_Front_Back.pdf', size: '1.4 MB', type: 'Identity Proof', status: 'Verified' },
    { id: '2', name: 'Income_Declaration_Affidavit.pdf', size: '920 KB', type: 'Income Statement', status: 'Verified' }
  ]);

  const [submittedAppId, setSubmittedAppId] = useState(null);

  const handleInputChange = (field, val) => {
    setFormData(prev => ({ ...prev, [field]: val }));
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
          type: 'Supporting Document',
          status: 'Verified'
        }
      ]);
    }
  };

  const handleSubmitFinal = () => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const newId = `GOV-2026-${randomNum}`;
    setSubmittedAppId(newId);

    const newApp = {
      id: newId,
      serviceId: service?.id || 'income-cert',
      serviceName: service?.name || 'Income Certificate',
      departmentName: service?.departmentName || 'Revenue Department',
      icon: service?.icon || '💰',
      applicantName: `${formData.firstName} ${formData.lastName}`,
      appliedDate: '25 Aug 2026',
      status: 'Under Verification',
      assignedOfficer: 'K. Ramesh (Tahsildar / VAO Office)',
      timeline: [
        { title: 'Application Submitted', date: '25 Aug 2026, 10:30 AM', completed: true, note: 'Digital application received on government gateway' },
        { title: 'Document Verification', date: '25 Aug 2026, 11:15 AM', completed: true, note: 'Aadhaar and income proofs validated via API' },
        { title: 'Revenue Officer Review', date: 'In Progress', completed: false, note: 'Pending VAO field inspection clearance' },
        { title: 'Approved & Certificate Generated', date: 'Pending', completed: false, note: 'Final e-Sign and QR dispatch' }
      ]
    };

    onSubmitComplete(newApp);
    setCurrentStep(5);
  };

  return (
    <div className="application-form-desktop-page">
      {/* Breadcrumb / Back button */}
      {currentStep < 5 && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <button
            onClick={() => (currentStep > 1 ? setCurrentStep(currentStep - 1) : onBack())}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '13px' }}
          >
            <ArrowLeft size={16} /> Back
          </button>
          <span style={{ color: '#9CA3AF' }}>/</span>
          <span style={{ color: '#6B7280', fontSize: '14px', fontWeight: '600' }}>{service?.departmentName || 'Revenue'}</span>
          <span style={{ color: '#9CA3AF' }}>/</span>
          <span style={{ color: '#673AB7', fontSize: '14px', fontWeight: '800' }}>Application Form: {service?.name || 'Income Certificate'}</span>
        </div>
      )}

      {/* Progress Steps Header */}
      {currentStep < 5 && (
        <div className="content-card" style={{ padding: '20px 32px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
            {[
              { num: 1, label: 'Personal Information' },
              { num: 2, label: 'Address Details' },
              { num: 3, label: 'Upload Documents' },
              { num: 4, label: 'Review & Confirm' }
            ].map((st) => {
              const isCurrent = currentStep === st.num;
              const isPast = currentStep > st.num;
              return (
                <div
                  key={st.num}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    opacity: isCurrent || isPast ? 1 : 0.45,
                    cursor: isPast ? 'pointer' : 'default'
                  }}
                  onClick={() => isPast && setCurrentStep(st.num)}
                >
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: isPast ? '#10B981' : isCurrent ? '#673AB7' : '#E5E7EB',
                    color: isPast || isCurrent ? 'white' : '#6B7280',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '14px',
                    boxShadow: isCurrent ? '0 0 0 4px rgba(103, 58, 183, 0.2)' : 'none'
                  }}>
                    {isPast ? <Check size={18} /> : st.num}
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', color: isCurrent ? '#673AB7' : '#6B7280' }}>
                      Step {st.num}
                    </div>
                    <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>
                      {st.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* STEP 1: PERSONAL INFORMATION */}
      {currentStep === 1 && (
        <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            Step 1 — Personal Information
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            Enter official citizen demographic details matching your Aadhaar / National ID.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Date of Birth</label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => handleInputChange('dob', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Mobile Number</label>
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => handleInputChange('mobile', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Aadhaar / National ID Number</label>
              <input
                type="text"
                value={formData.aadhaar}
                onChange={(e) => handleInputChange('aadhaar', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
            <button className="btn-primary" onClick={() => setCurrentStep(2)}>
              Proceed to Address Details <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: ADDRESS */}
      {currentStep === 2 && (
        <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            Step 2 — Residence Address
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            Specify permanent residence jurisdiction for field verification assignment.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>State</label>
              <select
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>District</label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => handleInputChange('district', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Taluk / Revenue Division</label>
              <input
                type="text"
                value={formData.taluk}
                onChange={(e) => handleInputChange('taluk', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Village / City Ward</label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => handleInputChange('village', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Pincode</label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', marginBottom: '6px' }}>Full Street Address</label>
              <input
                type="text"
                value={formData.addressLine}
                onChange={(e) => handleInputChange('addressLine', e.target.value)}
                style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #E5E7EB', fontSize: '14px' }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <button className="btn-secondary" onClick={() => setCurrentStep(1)}>
              Back
            </button>
            <button className="btn-primary" onClick={() => setCurrentStep(3)}>
              Upload Documents <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: DOCUMENTS */}
      {currentStep === 3 && (
        <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            Step 3 — Document Uploads
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            Upload digital scanned copies in PDF, JPG, or PNG (Max 5MB per document).
          </p>

          <label
            htmlFor="fileInputDesktop"
            style={{
              display: 'block',
              border: '2px dashed #673AB7',
              borderRadius: '16px',
              padding: '40px',
              textAlign: 'center',
              background: '#F8F9FD',
              cursor: 'pointer',
              marginBottom: '24px'
            }}
          >
            <Upload size={36} color="#673AB7" style={{ margin: '0 auto 12px auto' }} />
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#111827' }}>
              Drag & Drop files or Browse from your Computer
            </div>
            <div style={{ fontSize: '13px', color: '#6B7280', marginTop: '4px' }}>
              Supported formats: PDF, PNG, JPG, JPEG
            </div>
            <input
              id="fileInputDesktop"
              type="file"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
            />
          </label>

          <h3 style={{ fontSize: '15px', fontWeight: '800', marginBottom: '12px' }}>
            Attached Documents ({uploadedFiles.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {uploadedFiles.map((file) => (
              <div key={file.id} style={{
                background: '#F8F9FD',
                border: '1px solid #E5E7EB',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <FileCheck size={24} color="#10B981" />
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: '#111827' }}>{file.name}</div>
                    <div style={{ fontSize: '12px', color: '#6B7280' }}>{file.size} • {file.type}</div>
                  </div>
                </div>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#047857', background: '#ECFDF5', padding: '4px 10px', borderRadius: '8px' }}>
                  ✓ Uploaded & Scanned
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '32px' }}>
            <button className="btn-secondary" onClick={() => setCurrentStep(2)}>
              Back
            </button>
            <button className="btn-primary" onClick={() => setCurrentStep(4)}>
              Review Application Details <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: REVIEW */}
      {currentStep === 4 && (
        <div className="content-card" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '22px', fontWeight: '800', color: '#111827', marginBottom: '8px' }}>
            Step 4 — Review & Verification
          </h2>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>
            Please confirm all entered details before formal submission to the department officer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
            {/* Personal Info Box */}
            <div style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#673AB7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <User size={16} /> Personal Information
              </h4>
              <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                <div><strong>Full Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>DOB:</strong> {formData.dob}</div>
                <div><strong>Mobile:</strong> {formData.mobile}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Aadhaar:</strong> {formData.aadhaar}</div>
              </div>
            </div>

            {/* Address Info Box */}
            <div style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '20px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#673AB7', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} /> Residence Address
              </h4>
              <div style={{ fontSize: '13px', lineHeight: 1.8 }}>
                <div><strong>Street:</strong> {formData.addressLine}</div>
                <div><strong>Village/City:</strong> {formData.village}</div>
                <div><strong>Taluk:</strong> {formData.taluk}</div>
                <div><strong>District / State:</strong> {formData.district}, {formData.state}</div>
                <div><strong>Pincode:</strong> {formData.pincode}</div>
              </div>
            </div>
          </div>

          <div style={{ background: '#F8F9FD', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '20px', marginBottom: '28px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#673AB7', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={16} /> Uploaded Documents ({uploadedFiles.length})
            </h4>
            <div style={{ fontSize: '13px', color: '#4B5563' }}>
              {uploadedFiles.map(f => (
                <div key={f.id}>• {f.name} ({f.size})</div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn-secondary" onClick={() => setCurrentStep(3)}>
              Edit Details
            </button>
            <button
              className="btn-primary"
              style={{ padding: '16px 36px', fontSize: '16px' }}
              onClick={handleSubmitFinal}
            >
              <ShieldCheck size={20} /> Submit Application
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUBMITTED SUCCESS */}
      {currentStep === 5 && (
        <div className="content-card" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', padding: '48px 36px' }}>
          <div style={{
            width: '88px',
            height: '88px',
            borderRadius: '50%',
            background: '#ECFDF5',
            color: '#10B981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}>
            <CheckCircle2 size={56} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '28px', fontWeight: '800', color: '#111827' }}>
            ✅ Application Submitted Successfully
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280', marginTop: '6px', maxWidth: '520px', margin: '6px auto 0 auto' }}>
            Your application has been routed directly to the designated department officer for field review.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #F3E5F5 0%, #EDE7F6 100%)',
            border: '2px dashed #673AB7',
            borderRadius: '20px',
            padding: '24px',
            maxWidth: '480px',
            margin: '32px auto'
          }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: '#673AB7', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
              Unique Application Reference ID
            </span>
            <div style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: '800', color: '#311B92', marginTop: '6px' }}>
              {submittedAppId}
            </div>
            <p style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              Keep this reference ID handy for real-time tracking across all channels.
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
            <button
              className="btn-primary"
              onClick={() => onTrackNow(submittedAppId)}
            >
              Track Application
            </button>
            <button
              className="btn-secondary"
              onClick={() => alert(`Downloading official stamped acknowledgement receipt for ${submittedAppId}...`)}
            >
              <Download size={16} /> Download Acknowledgement
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
