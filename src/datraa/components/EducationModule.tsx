import { useState } from "react";
import { GraduationCap, Award, Plus, FileText, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function EducationModule({ uid }: { uid: string }) {
  const [activeTab, setActiveTab] = useState<"10th" | "12th" | "Degree">("10th");

  const educationData = {
    "10th": {
      institution: "St. Xavier's High School",
      year: 2016,
      cgpa: 9.8,
      marks: [
        { subject: "Mathematics", score: 98, total: 100 },
        { subject: "Science", score: 95, total: 100 },
        { subject: "English", score: 92, total: 100 },
        { subject: "Social Science", score: 96, total: 100 },
        { subject: "Hindi", score: 94, total: 100 },
      ]
    },
    "12th": {
      institution: "Delhi Public School",
      year: 2018,
      cgpa: 9.5,
      marks: [
        { subject: "Physics", score: 95, total: 100 },
        { subject: "Chemistry", score: 94, total: 100 },
        { subject: "Mathematics", score: 99, total: 100 },
        { subject: "English", score: 90, total: 100 },
        { subject: "Computer Science", score: 98, total: 100 },
      ]
    },
    "Degree": {
      institution: "Indian Institute of Technology, Delhi",
      year: 2022,
      cgpa: 8.9,
      semesters: [
        { sem: "Sem 1", cgpa: 8.5 },
        { sem: "Sem 2", cgpa: 8.7 },
        { sem: "Sem 3", cgpa: 9.0 },
        { sem: "Sem 4", cgpa: 8.8 },
        { sem: "Sem 5", cgpa: 9.2 },
        { sem: "Sem 6", cgpa: 9.1 },
        { sem: "Sem 7", cgpa: 8.9 },
        { sem: "Sem 8", cgpa: 9.0 },
      ]
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px', fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}>
      {/* Top Title Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#111827', margin: 0, letterSpacing: '-0.5px' }}>Education Records</h2>
          <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Verified academic history and certificates.</p>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 20px', background: '#003366', color: '#FFFFFF', borderRadius: '14px', fontWeight: '800', fontSize: '12px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,51,102,0.2)'
        }}>
          <Plus size={16} /> Add Qualification
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#F3F4F6', padding: '4px', borderRadius: '16px', width: 'fit-content' }}>
        {(["10th", "12th", "Degree"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '800',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: activeTab === tab ? '#FFFFFF' : 'transparent',
              color: activeTab === tab ? '#003366' : '#6B7280',
              boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
            }}
          >
            {tab} Details
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}
        >
          {/* Main Info */}
          <div style={{ gridColumn: 'span 2 / span 2' }}>
            <div style={{ background: '#FFFFFF', padding: '32px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                <div style={{ width: '60px', height: '60px', background: '#EFF6FF', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <GraduationCap size={28} color="#003366" />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '900', color: '#111827', margin: 0 }}>{educationData[activeTab].institution}</h3>
                  <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: '600', margin: '4px 0 0 0' }}>Batch of {educationData[activeTab].year}</p>
                </div>
              </div>

              <div style={{ borderRadius: '20px', border: '1px solid #F3F4F6', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ background: '#F9FAFB' }}>
                    <tr>
                      <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        {activeTab === "Degree" ? "Semester" : "Subject"}
                      </th>
                      <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        {activeTab === "Degree" ? "CGPA" : "Marks Obtained"}
                      </th>
                      <th style={{ padding: '16px 24px', fontSize: '10px', fontWeight: '800', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeTab === "Degree" 
                      ? educationData.Degree.semesters.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #F9FAFB' }}>
                            <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '800', color: '#374151' }}>{item.sem}</td>
                            <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '800', color: '#2563EB' }}>{item.cgpa}</td>
                            <td style={{ padding: '16px 24px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '4px 10px', borderRadius: '12px' }}>
                                <CheckCircle2 size={14} /> Verified
                              </span>
                            </td>
                          </tr>
                        ))
                      : educationData[activeTab].marks.map((item, idx) => (
                          <tr key={idx} style={{ borderBottom: '1px solid #F9FAFB' }}>
                            <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '800', color: '#374151' }}>{item.subject}</td>
                            <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '800', color: '#2563EB' }}>{item.score} / {item.total}</td>
                            <td style={{ padding: '16px 24px' }}>
                              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: '800', color: '#16A34A', background: '#F0FDF4', padding: '4px 10px', borderRadius: '12px' }}>
                                <CheckCircle2 size={14} /> Verified
                              </span>
                            </td>
                          </tr>
                        ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: '#003366', padding: '32px', borderRadius: '32px', color: '#FFFFFF', boxShadow: '0 12px 32px rgba(0, 51, 102, 0.25)' }}>
              <p style={{ fontSize: '10px', fontWeight: '800', color: '#BFDBFE', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px 0' }}>Overall Performance</p>
              <div style={{ fontSize: '48px', fontWeight: '900', marginBottom: '16px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                {educationData[activeTab].cgpa}
                <span style={{ fontSize: '18px', fontWeight: '600', color: '#93C5FD' }}>CGPA</span>
              </div>
              <div style={{ height: '8px', background: '#1E3A8A', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(educationData[activeTab].cgpa / 10) * 100}%` }}
                  style={{ height: '100%', background: '#60A5FA', borderRadius: '10px' }}
                ></motion.div>
              </div>
              <p style={{ fontSize: '12px', color: '#BFDBFE', marginTop: '16px', margin: '16px 0 0 0' }}>Top 5% of the batch. Excellent academic standing.</p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '32px', border: '1px solid #F3F4F6', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#111827', margin: '0 0 16px 0' }}>Certificates</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { name: "Marksheet.pdf", size: "1.2 MB" },
                  { name: "Passing_Certificate.pdf", size: "850 KB" },
                  { name: "Migration_Certificate.pdf", size: "1.1 MB" },
                ].map((file, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', background: '#F9FAFB', borderRadius: '14px', border: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <FileText size={18} color="#2563EB" />
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '800', color: '#374151', margin: 0 }}>{file.name}</p>
                        <p style={{ fontSize: '11px', color: '#9CA3AF', margin: '2px 0 0 0' }}>{file.size}</p>
                      </div>
                    </div>
                    <Award size={18} color="#9CA3AF" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
