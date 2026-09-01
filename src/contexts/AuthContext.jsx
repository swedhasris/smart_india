import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEMO_USERS, USER_ROLES, AUDIT_LOGS, INITIAL_APPLICATIONS, INITIAL_COMPLAINTS, GATEWAY_REQUESTS } from '../data/govData';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Current Logged-in User
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gov_rbac_current_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEMO_USERS[0]; // Default to Ultra Super Admin for rich demonstration
      }
    }
    return DEMO_USERS[0]; // Default to Ultra Super Admin
  });

  // Global Applications Store (Shared between all roles)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('gov_rbac_applications');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Global Audit Logs Store
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('gov_rbac_audit_logs');
    return saved ? JSON.parse(saved) : AUDIT_LOGS;
  });

  // Global Complaints Store
  const [complaints, setComplaints] = useState(() => {
    const saved = localStorage.getItem('gov_rbac_complaints');
    return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
  });

  // Global Inter-Dept Gateway Requests
  const [gatewayRequests, setGatewayRequests] = useState(() => {
    const saved = localStorage.getItem('gov_rbac_gateway');
    return saved ? JSON.parse(saved) : GATEWAY_REQUESTS;
  });

  // Persist State Changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('gov_rbac_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('gov_rbac_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gov_rbac_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('gov_rbac_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('gov_rbac_complaints', JSON.stringify(complaints));
  }, [complaints]);

  useEffect(() => {
    localStorage.setItem('gov_rbac_gateway', JSON.stringify(gatewayRequests));
  }, [gatewayRequests]);

  // Login handler
  const login = (email, password) => {
    const found = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
    );

    if (found) {
      setCurrentUser(found);
      addAuditLog('User Login', `Session initiated for ${found.name} (${found.role})`, 'Authentication', 'success');
      return { success: true, user: found };
    }

    // Default citizen account creation or fallback
    if (email && password) {
      const genericCitizen = {
        id: `USR-CITIZEN-${Math.floor(100 + Math.random() * 900)}`,
        name: email.split('@')[0],
        email: email,
        phone: '+91 98765 00000',
        role: USER_ROLES.CITIZEN,
        title: 'Citizen',
        state: 'Tamil Nadu',
        district: 'Chennai',
        office: 'City Zone',
        status: 'active',
        avatar: '👤',
        lastLogin: 'Just now'
      };
      setCurrentUser(genericCitizen);
      addAuditLog('User Login', `Session initiated for ${genericCitizen.name}`, 'Authentication', 'success');
      return { success: true, user: genericCitizen };
    }

    return { success: false, error: 'Invalid credentials. Please select one of the Demo Accounts.' };
  };

  // Quick Demo Account Switcher
  const switchRole = (roleKey) => {
    const targetUser = DEMO_USERS.find(u => u.role === roleKey);
    if (targetUser) {
      setCurrentUser(targetUser);
      addAuditLog('Switched Role Perspective', `Switched view to ${targetUser.name} [${targetUser.role}]`, 'RBAC Switcher', 'success');
      return targetUser;
    }
  };

  // Logout
  const logout = () => {
    if (currentUser) {
      addAuditLog('User Logout', `Session ended for ${currentUser.name}`, 'Authentication', 'success');
    }
    setCurrentUser(null);
  };

  // Add Audit Log Entry
  const addAuditLog = (action, target, targetType = 'General', status = 'success') => {
    const newEntry = {
      id: `LOG-${Math.floor(10000 + Math.random() * 90000)}`,
      actorName: currentUser ? currentUser.name : 'Anonymous User',
      actorRole: currentUser ? currentUser.role : 'GUEST',
      action,
      target,
      targetType,
      timestamp: 'Just now',
      ip: '192.168.1.10 (Secure SSL Gateway)',
      status
    };
    setAuditLogs(prev => [newEntry, ...prev]);
  };

  // Smart Application Assignment (Admin assigns to Agent)
  const assignApplicationToAgent = (appId, agentId, agentName) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTimeline = [
          ...app.timeline,
          {
            step: 3,
            title: `Admin Assigned Application to ${agentName}`,
            status: 'completed',
            timestamp: 'Just now',
            actor: currentUser?.name || 'Department Admin'
          },
          {
            step: 4,
            title: 'Agent Document Scrutiny & Field Verification',
            status: 'current',
            actor: agentName
          }
        ];
        return {
          ...app,
          assignedAgentId: agentId,
          assignedAgentName: agentName,
          status: 'assigned',
          updatedAt: 'Just now',
          timeline: updatedTimeline
        };
      }
      return app;
    }));
    addAuditLog('Smart Agent Assignment', `Assigned application ${appId} to ${agentName}`, 'Workflow Assignment', 'success');
  };

  // Agent Document Verification Action
  const updateDocumentStatus = (appId, docId, newStatus, remark) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedDocs = app.documents.map(doc => doc.id === docId ? { ...doc, verified: newStatus } : doc);
        const updatedRemarks = remark ? [...app.remarks, `[Agent Scrutiny]: ${remark}`] : app.remarks;
        return {
          ...app,
          documents: updatedDocs,
          remarks: updatedRemarks,
          updatedAt: 'Just now'
        };
      }
      return app;
    }));
    addAuditLog('Document Scrutiny Update', `Updated document ${docId} on app ${appId} to [${newStatus}]`, 'Document Verification', 'success');
  };

  // Agent Forwards Application to Admin with Recommendation
  const forwardApplication = (appId, recommendation, agentRemarks) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTimeline = [
          ...app.timeline,
          {
            step: 6,
            title: `Agent Forwarded with Recommendation: ${recommendation.toUpperCase()}`,
            status: 'completed',
            timestamp: 'Just now',
            actor: currentUser?.name || 'Verification Agent',
            remark: agentRemarks
          },
          {
            step: 7,
            title: 'Admin Final Scrutiny & Order Signature',
            status: 'current',
            actor: 'Competent Authority (Admin)'
          }
        ];
        return {
          ...app,
          status: 'reviewing',
          remarks: [...app.remarks, `[Agent Recommendation]: ${recommendation.toUpperCase()} - ${agentRemarks}`],
          updatedAt: 'Just now',
          timeline: updatedTimeline
        };
      }
      return app;
    }));
    addAuditLog('Application Forwarded', `Forwarded ${appId} with recommendation [${recommendation}]`, 'Workflow Progress', 'success');
  };

  // Admin Final Approval / Rejection
  const finalizeApplication = (appId, decision, adminRemarks) => {
    const certNum = decision === 'approved' ? `TN-REV-INC-2026-${Math.floor(10000 + Math.random() * 90000)}` : null;

    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedTimeline = [
          ...app.timeline,
          {
            step: 8,
            title: decision === 'approved' ? 'Approved by Competent Authority' : 'Application Rejected with Reason',
            status: 'completed',
            timestamp: 'Just now',
            actor: currentUser?.name || 'District Revenue Officer',
            remark: adminRemarks
          },
          ...(decision === 'approved' ? [
            {
              step: 9,
              title: 'Digitally Signed Certificate Generated (Cryptographic Seal)',
              status: 'completed',
              timestamp: 'Just now',
              actor: 'Automated Certificate Engine'
            },
            {
              step: 10,
              title: 'Citizen Notified via SMS & E-Mail Portal',
              status: 'completed',
              timestamp: 'Just now',
              actor: 'SMS Gateway (GOVSMS)'
            }
          ] : [])
        ];
        return {
          ...app,
          status: decision,
          certificateId: certNum,
          remarks: [...app.remarks, `[Admin Order]: ${decision.toUpperCase()} - ${adminRemarks}`],
          updatedAt: 'Just now',
          timeline: updatedTimeline
        };
      }
      return app;
    }));
    addAuditLog(`Application ${decision.toUpperCase()}`, `Application ${appId} marked as [${decision}]`, 'Administrative Decision', 'success');
  };

  // Citizen New Application Submission
  const submitNewApplication = (appData) => {
    const newId = `GOV-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApp = {
      id: newId,
      citizenId: currentUser?.id || 'USR-CITIZEN-001',
      citizenName: currentUser?.name || appData.fullName || 'Rajesh Sharma',
      citizenEmail: currentUser?.email || 'citizen@gov.in',
      serviceId: appData.serviceId,
      serviceName: appData.serviceName,
      departmentId: appData.departmentId,
      departmentName: appData.departmentName,
      assignedAgentId: null,
      assignedAgentName: 'Pending Assignment',
      status: 'submitted',
      submittedAt: 'Just now',
      updatedAt: 'Just now',
      remarks: ['Application successfully received via Citizen One-Stop Portal.'],
      documents: appData.documents || [
        { id: 'doc-upload-1', name: 'Identity_Proof_Aadhaar.pdf', size: '1.2 MB', verified: 'pending' },
        { id: 'doc-upload-2', name: 'Address_Proof.pdf', size: '980 KB', verified: 'pending' }
      ],
      timeline: [
        { step: 1, title: 'Application Submitted Online', status: 'completed', timestamp: 'Just now', actor: currentUser?.name || 'Citizen' },
        { step: 2, title: 'Department Received', status: 'completed', timestamp: 'Just now', actor: `${appData.departmentName} Gateway` },
        { step: 3, title: 'Admin Assigning Verification Agent', status: 'current', actor: 'Department Admin' },
        { step: 4, title: 'Agent Document Scrutiny & Field Verification', status: 'pending' },
        { step: 5, title: 'Field Inspection & Verification Report', status: 'pending' },
        { step: 6, title: 'Forwarded to Tahsildar / DRO with Remarks', status: 'pending' },
        { step: 7, title: 'Admin Final Scrutiny & Order Signature', status: 'pending' },
        { step: 8, title: 'Approval / Rejection Decision', status: 'pending' },
        { step: 9, title: 'Digitally Signed Certificate Generated', status: 'pending' },
        { step: 10, title: 'Citizen Notified via SMS & E-Mail', status: 'pending' }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    addAuditLog('Citizen Application Submitted', `New application ${newId} for ${appData.serviceName}`, 'Public Service Application', 'success');
    return newApp;
  };

  // Submit New Complaint
  const submitComplaint = (complaintData) => {
    const newComplaint = {
      id: `CMP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      citizenId: currentUser?.id || 'USR-CITIZEN-001',
      citizenName: currentUser?.name || 'Rajesh Sharma',
      departmentId: complaintData.departmentId,
      departmentName: complaintData.departmentName,
      type: complaintData.type,
      description: complaintData.description,
      priority: complaintData.priority || 'medium',
      location: complaintData.location || 'Chennai',
      status: 'submitted',
      submittedAt: 'Just now',
      assignedAgent: 'Under Assignment'
    };
    setComplaints(prev => [newComplaint, ...prev]);
    addAuditLog('Public Grievance Lodged', `Grievance ${newComplaint.id} submitted for ${complaintData.departmentName}`, 'Grievance Portal', 'success');
    return newComplaint;
  };

  // Send Inter-Department Verification Request
  const sendGatewayRequest = (fromDeptId, fromDeptName, toDeptId, toDeptName, requestType, appId, citizenAadhaar) => {
    const newReq = {
      id: `REQ-GW-${Math.floor(1000 + Math.random() * 9000)}`,
      fromDepartmentId: fromDeptId,
      fromDepartmentName: fromDeptName,
      toDepartmentId: toDeptId,
      toDepartmentName: toDeptName,
      requestType,
      applicationId: appId,
      citizenAadhaar: citizenAadhaar || 'XXXX-XXXX-8921',
      status: 'verified', // simulate instant zero-visit verified response
      requestedAt: 'Just now',
      respondedAt: 'Just now (Instant API Sync)',
      responseData: `Cross-department verification approved: Record validated against State Central Repository for ${toDeptName}.`
    };
    setGatewayRequests(prev => [newReq, ...prev]);
    addAuditLog('Inter-Department Request Sent', `Request ${newReq.id} from ${fromDeptName} to ${toDeptName}`, 'Inter-Dept Gateway', 'success');
    return newReq;
  };

  const role = currentUser ? currentUser.role : null;

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        currentRole: role,
        login,
        logout,
        switchRole,
        applications,
        auditLogs,
        complaints,
        gatewayRequests,
        assignApplicationToAgent,
        updateDocumentStatus,
        forwardApplication,
        finalizeApplication,
        submitNewApplication,
        submitComplaint,
        sendGatewayRequest,
        addAuditLog
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
