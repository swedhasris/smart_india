import React, { useState, useEffect } from 'react';
import DesktopHeader from './components/DesktopHeader';
import DesktopSidebar from './components/DesktopSidebar';
import DashboardView from './components/DashboardView';
import DepartmentsListView from './components/DepartmentsListView';
import DepartmentDetailView from './components/DepartmentDetailView';
import ServiceDetailView from './components/ServiceDetailView';
import ApplicationFormView from './components/ApplicationFormView';
import MyApplicationsView from './components/MyApplicationsView';
import ApplicationTrackingModal from './components/ApplicationTrackingModal';
import InterDeptGatewayView from './components/InterDeptGatewayView';
import GovAIPageView from './components/GovAIPageView';
import GovAIFloatingWidget from './components/GovAIFloatingWidget';
import NotificationsPageView from './components/NotificationsPageView';
import ProfilePageView from './components/ProfilePageView';
import DesktopSearchModal from './components/DesktopSearchModal';
import LoginView from './components/LoginView';

// New Public 3D Landing Page & Login Entry Modals
import India3DLandingPage from './components/India3DLandingPage';
import PublicLandingPage from './components/PublicLandingPage';
import LoginSelectionModal from './components/LoginSelectionModal';
import UserLoginModal from './components/UserLoginModal';
import AdminLoginModal from './components/AdminLoginModal';
import DatraUserPortal from './datraa/DatraUserPortal';
import DatraMainView from './components/datra/DatraMainView';
import AdminAadhaarLookupTab from './components/datra/AdminAadhaarLookupTab';
import QueryManagementModule from './components/queries/QueryManagementModule';
import AdminQueryManagementView from './components/queries/AdminQueryManagementView';
import CrossDepartmentProfileUpdateModule from './components/profile/CrossDepartmentProfileUpdateModule';
import Department2FAVerificationModal from './components/admin/Department2FAVerificationModal';
import DepartmentWorkspaceView from './components/admin/DepartmentWorkspaceView';

import { INITIAL_APPLICATIONS } from './data/initialApplications';
import { DEPARTMENTS, SERVICE_DETAILS } from './data/departmentsData';

export default function App() {
  // User Authentication State (Persisted in LocalStorage)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('gov_desktop_user');
    return saved ? JSON.parse(saved) : null; // Defaults to null to present public landing page
  });

  // Current Route State
  const [currentPath, setCurrentPath] = useState('/dashboard');

  // Selected Department / Service Context
  const [selectedDeptId, setSelectedDeptId] = useState('revenue');
  const [selectedServiceId, setSelectedServiceId] = useState('income-cert');
  const [selectedServiceObj, setSelectedServiceObj] = useState(null);

  // Applications List State (Persisted in LocalStorage)
  const [applications, setApplications] = useState(() => {
    const saved = localStorage.getItem('gov_desktop_apps');
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  // Modal Flow States for Landing & Login Entry
  const [showLoginSelectionModal, setShowLoginSelectionModal] = useState(false);
  const [showUserLoginModal, setShowUserLoginModal] = useState(false);
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  // Right Click Prevention & Security Handler
  const [showRightClickAlert, setShowRightClickAlert] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      setShowRightClickAlert(true);
      setTimeout(() => {
        setShowRightClickAlert(false);
      }, 2500);
    };

    document.addEventListener('contextmenu', handleContextMenu);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('gov_desktop_apps', JSON.stringify(applications));
  }, [applications]);

  // Modals state
  const [activeTrackingApp, setActiveTrackingApp] = useState(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Login Handler (redirects to dashboard after authentication)
  const handleLogin = (userObj) => {
    setCurrentUser(userObj);
    localStorage.setItem('gov_desktop_user', JSON.stringify(userObj));
    setShowLoginSelectionModal(false);
    setShowUserLoginModal(false);
    setShowAdminLoginModal(false);
    setCurrentPath('/dashboard');
    window.scrollTo(0, 0);
  };

  // Logout Handler (returns to new public landing page)
  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('gov_desktop_user');
    setShowLoginSelectionModal(false);
    setShowUserLoginModal(false);
    setShowAdminLoginModal(false);
    setCurrentPath('/dashboard');
    window.scrollTo(0, 0);
  };

  const handleNavigate = (path) => {
    setCurrentPath(path);
    window.scrollTo(0, 0);
  };

  const handleOpenDepartment = (deptId) => {
    setSelectedDeptId(deptId);
    setCurrentPath(`/departments/${deptId}`);
    window.scrollTo(0, 0);
  };

  const handleOpenService = (serviceId, deptId) => {
    if (deptId) setSelectedDeptId(deptId);
    setSelectedServiceId(serviceId);
    setCurrentPath(`/service/${serviceId}`);
    window.scrollTo(0, 0);
  };

  const handleApplyNow = (serviceDetail) => {
    setSelectedServiceObj(serviceDetail);
    setCurrentPath(`/apply/${serviceDetail.id}`);
    window.scrollTo(0, 0);
  };

  const handleApplicationCreated = (newApp) => {
    setApplications(prev => [newApp, ...prev]);
  };

  const handleOpenTrackingFromForm = (appId) => {
    const found = applications.find(a => a.id === appId);
    if (found) {
      setActiveTrackingApp(found);
    }
    setCurrentPath('/applications');
  };

  const handleOpenSearchModal = (prefill = '') => {
    setSearchInitialQuery(prefill);
    setShowSearchModal(true);
  };

  // If user is NOT logged in, present the NEW PUBLIC LANDING PAGE with Login Selection & Login Modals
  if (!currentUser) {
    return (
      <>
        <India3DLandingPage
          onOpenLoginSelection={() => setShowLoginSelectionModal(true)}
          onOpenDepartments={() => handleLogin({ name: 'Rajesh Sharma', mobile: '+91 98765 43210', email: 'rajesh.sharma@example.gov.in', aadhaar: 'XXXX-XXXX-8921', role: 'CITIZEN' })}
          onOpenServices={() => handleLogin({ name: 'Rajesh Sharma', mobile: '+91 98765 43210', email: 'rajesh.sharma@example.gov.in', aadhaar: 'XXXX-XXXX-8921', role: 'CITIZEN' })}
        />

        {/* Login Selection Modal */}
        {showLoginSelectionModal && (
          <LoginSelectionModal
            onClose={() => setShowLoginSelectionModal(false)}
            onSelectUserLogin={() => {
              setShowLoginSelectionModal(false);
              setShowUserLoginModal(true);
            }}
            onSelectAdminLogin={() => {
              setShowLoginSelectionModal(false);
              setShowAdminLoginModal(true);
            }}
          />
        )}

        {/* Citizen / User Login Modal */}
        {showUserLoginModal && (
          <UserLoginModal
            onClose={() => setShowUserLoginModal(false)}
            onLoginSuccess={handleLogin}
          />
        )}

        {/* Administrator Login Modal (Connected to Existing RBAC System) */}
        {showAdminLoginModal && (
          <AdminLoginModal
            onClose={() => setShowAdminLoginModal(false)}
            onLoginSuccess={handleLogin}
          />
        )}
      </>
    );
  }

  // Check if logged in user is a Citizen / User
  const isCitizen = !currentUser.role || currentUser.role === 'CITIZEN' || currentUser.role === 'citizen';

  // For Citizen User, render full DATRA Portal Experience
  if (isCitizen) {
    return <DatraUserPortal user={currentUser} onLogout={handleLogout} />;
  }

  // When User is Authenticated, render Existing Full Portal Application Shell
  return (
    <div className="app-layout">
      {/* 1. Full-Width Desktop Header */}
      <DesktopHeader
        currentPath={currentPath}
        onNavigate={handleNavigate}
        onOpenSearch={() => handleOpenSearchModal('')}
        unreadNotifsCount={2}
        user={currentUser}
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* 2. Full-Width Desktop Body (Sidebar + Remaining Width Main Viewport) */}
      <div className="desktop-body">
        {/* Desktop Sidebar Navigation */}
        <DesktopSidebar
          currentPath={currentPath}
          onNavigate={handleNavigate}
          onLogout={handleLogout}
          applicationsCount={applications.length}
          notificationsCount={2}
        />

        {/* Main Content Area (100% Remaining Width) */}
        <main className="main-viewport">
          {/* Route: /dashboard */}
          {currentPath === '/dashboard' && (
            <DashboardView
              user={currentUser}
              onNavigate={handleNavigate}
              onOpenDepartment={handleOpenDepartment}
              onOpenService={handleOpenService}
              onOpenSearchModal={handleOpenSearchModal}
            />
          )}

          {/* Route: /departments */}
          {currentPath === '/departments' && (
            <DepartmentsListView
              onOpenDepartment={handleOpenDepartment}
            />
          )}

          {/* Route: /departments/:id */}
          {currentPath.startsWith('/departments/') && (
            <DepartmentDetailView
              departmentId={selectedDeptId}
              onBack={() => handleNavigate('/dashboard')}
              onOpenService={handleOpenService}
              onOpenDeptWorkspace={() => handleNavigate('/dept-workspace')}
            />
          )}

          {/* Route: /service/:id */}
          {currentPath.startsWith('/service/') && (
            <ServiceDetailView
              serviceId={selectedServiceId}
              departmentId={selectedDeptId}
              onBack={() => handleNavigate(`/departments/${selectedDeptId}`)}
              onApplyNow={handleApplyNow}
              onTrackApplication={() => handleNavigate('/applications')}
              onOpenDeptWorkspace={() => handleNavigate('/dept-workspace')}
            />
          )}

          {/* Route: /apply/:id */}
          {currentPath.startsWith('/apply/') && (
            <ApplicationFormView
              service={selectedServiceObj || SERVICE_DETAILS[selectedServiceId] || { name: 'Income Certificate', departmentName: 'Revenue Department', icon: '💰' }}
              user={currentUser}
              onBack={() => handleNavigate(`/service/${selectedServiceId}`)}
              onSubmitComplete={handleApplicationCreated}
              onTrackNow={handleOpenTrackingFromForm}
            />
          )}

          {/* Route: /applications */}
          {currentPath === '/applications' && (
            <MyApplicationsView
              applications={applications}
              onOpenTrackingModal={(app) => setActiveTrackingApp(app)}
              onApplyNew={() => handleNavigate('/departments/revenue')}
            />
          )}

          {/* Route: /inter-department */}
          {currentPath === '/inter-department' && (
            <InterDeptGatewayView
              onApplyHousing={() => handleOpenService('tnhb-flat', 'housing')}
            />
          )}

          {/* Route: /ai-assistant */}
          {currentPath === '/ai-assistant' && (
            <GovAIPageView
              onOpenService={handleOpenService}
              onNavigateToApplications={() => handleNavigate('/applications')}
            />
          )}

          {/* Route: /notifications */}
          {currentPath === '/notifications' && (
            <NotificationsPageView
              onOpenTracking={() => handleNavigate('/applications')}
              onOpenService={handleOpenService}
              onOpenGateway={() => handleNavigate('/inter-department')}
            />
          )}

          {/* Route: /profile */}
          {currentPath === '/profile' && (
            <ProfilePageView
              user={currentUser}
              onLogout={handleLogout}
              onNavigateToApplications={() => handleNavigate('/applications')}
            />
          )}

          {/* Route: /datra */}
          {currentPath === '/datra' && (
            <DatraMainView
              user={currentUser}
              applications={applications}
              onUpdateApplications={setApplications}
              onNavigateToApplications={() => handleNavigate('/applications')}
            />
          )}

          {/* Route: /aadhaar-lookup */}
          {currentPath === '/aadhaar-lookup' && (
            <div style={{ padding: '24px 32px' }}>
              <AdminAadhaarLookupTab />
            </div>
          )}

          {/* Route: /queries */}
          {currentPath === '/queries' && (
            <div style={{ padding: '24px 32px' }}>
              <QueryManagementModule profile={{ uid: currentUser?.id || 'citizen-101', name: currentUser?.name || 'Swedha Sri', email: currentUser?.email || 'swedhasrisathish@gmail.com', phone: currentUser?.phone || '+91 98765 43211' }} />
            </div>
          )}

          {/* Route: /admin-queries */}
          {currentPath === '/admin-queries' && (
            <div style={{ padding: '24px 32px' }}>
              <AdminQueryManagementView />
            </div>
          )}

          {/* Route: /profile-updates */}
          {currentPath === '/profile-updates' && (
            <div style={{ padding: '24px 32px' }}>
              <CrossDepartmentProfileUpdateModule profile={{ uid: currentUser?.id || 'citizen-101', name: currentUser?.name || 'Swedha Sri', email: currentUser?.email || 'swedhasrisathish@gmail.com', phone: currentUser?.phone || '+91 98765 43211' }} />
            </div>
          )}

          {/* Route: /dept-workspace */}
          {currentPath === '/dept-workspace' && (
            <div style={{ padding: '24px 32px' }}>
              <DepartmentWorkspaceView deptId="revenue" />
            </div>
          )}
        </main>
      </div>

      {/* Floating Search Modal */}
      {showSearchModal && (
        <DesktopSearchModal
          initialQuery={searchInitialQuery}
          onClose={() => setShowSearchModal(false)}
          onOpenService={(srvId, deptId) => {
            setShowSearchModal(false);
            handleOpenService(srvId, deptId);
          }}
          onOpenDepartment={(deptId) => {
            setShowSearchModal(false);
            handleOpenDepartment(deptId);
          }}
        />
      )}

      {/* Floating GovAI Widget at Desktop Bottom Right */}
      {currentPath !== '/ai-assistant' && (
        <GovAIFloatingWidget
          onOpenService={handleOpenService}
          onNavigateToApplications={() => handleNavigate('/applications')}
        />
      )}

      {/* Real-time Tracking Modal */}
      {activeTrackingApp && (
        <ApplicationTrackingModal
          application={activeTrackingApp}
          onClose={() => setActiveTrackingApp(null)}
        />
      )}

      {/* Right Click Security Toast Notification */}
      {showRightClickAlert && (
        <div style={{
          position: 'fixed',
          top: '84px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(17, 24, 39, 0.95)',
          backdropFilter: 'blur(8px)',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          zIndex: 9999,
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          fontSize: '13px',
          fontWeight: '700',
          animation: 'fadeIn 0.2s ease'
        }}>
          <span>🛡️</span>
          <span>Right-click context menu is disabled for citizen portal security.</span>
        </div>
      )}
    </div>
  );
}
