import React from 'react';
import {
  LayoutDashboard,
  Building2,
  MapPin,
  Globe,
  Users,
  ShieldCheck,
  FileText,
  Workflow,
  Key,
  History,
  Lock,
  BarChart3,
  Settings,
  UserCheck,
  Briefcase,
  Layers,
  Clock,
  CheckCircle2,
  XCircle,
  FileCheck,
  AlertCircle,
  MessageSquare,
  HelpCircle,
  Award,
  FolderLock,
  Sparkles,
  PhoneCall,
  UserPlus
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { USER_ROLES } from '../../data/govData';

export default function Sidebar({ currentPath, onNavigate }) {
  const { currentRole, applications, complaints } = useAuth();

  // Active Applications Count & Pending Count
  const pendingCount = applications.filter(a => a.status === 'submitted' || a.status === 'assigned' || a.status === 'verifying').length;
  const complaintsCount = complaints.filter(c => c.status === 'submitted' || c.status === 'investigating').length;

  const getNavSections = () => {
    switch (currentRole) {
      case USER_ROLES.ULTRA_SUPER_ADMIN:
        return [
          {
            title: 'COMMAND CENTER',
            items: [
              { label: 'Enterprise Dashboard', path: '/ultra-admin/dashboard', icon: LayoutDashboard },
              { label: 'Government Hierarchy', path: '/ultra-admin/overview', icon: Globe },
              { label: 'States Management (28)', path: '/ultra-admin/states', icon: MapPin },
              { label: 'Districts (100+)', path: '/ultra-admin/districts', icon: Layers },
              { label: 'Departments (35+)', path: '/ultra-admin/departments', icon: Building2 },
              { label: 'Government Offices', path: '/ultra-admin/offices', icon: Briefcase }
            ]
          },
          {
            title: 'USER & ACCESS CONTROL',
            items: [
              { label: 'Super Admins', path: '/ultra-admin/super-admins', icon: ShieldCheck },
              { label: 'Department Admins', path: '/ultra-admin/admins', icon: UserCheck },
              { label: 'Field Agents / Officers', path: '/ultra-admin/agents', icon: Users },
              { label: 'Registered Citizens', path: '/ultra-admin/citizens', icon: UserPlus }
            ]
          },
          {
            title: 'SERVICES & GATEWAY',
            items: [
              { label: 'All Services (200+)', path: '/ultra-admin/services', icon: FileText },
              { label: 'All Applications', path: '/ultra-admin/applications', icon: Layers, badge: applications.length },
              { label: 'Inter-Dept Gateway', path: '/ultra-admin/gateway', icon: Workflow },
              { label: 'API Management', path: '/ultra-admin/api', icon: Key }
            ]
          },
          {
            title: 'SECURITY & ANALYTICS',
            items: [
              { label: 'Global Audit Logs', path: '/ultra-admin/audit', icon: History },
              { label: 'Security & Permissions', path: '/ultra-admin/security', icon: Lock },
              { label: 'Reports & Analytics', path: '/ultra-admin/reports', icon: BarChart3 },
              { label: 'System Settings', path: '/ultra-admin/settings', icon: Settings }
            ]
          }
        ];

      case USER_ROLES.SUPER_ADMIN:
        return [
          {
            title: 'REGIONAL ADMINISTRATION',
            items: [
              { label: 'State Dashboard', path: '/super-admin/dashboard', icon: LayoutDashboard },
              { label: 'Assigned Departments', path: '/super-admin/departments', icon: Building2 },
              { label: 'Admin Management', path: '/super-admin/admins', icon: UserCheck },
              { label: 'Agent Monitoring', path: '/super-admin/agents', icon: Users },
              { label: 'Regional Citizens', path: '/super-admin/citizens', icon: UserPlus }
            ]
          },
          {
            title: 'OPERATIONS & APPROVALS',
            items: [
              { label: 'Services Catalogue', path: '/super-admin/services', icon: FileText },
              { label: 'Applications Queue', path: '/super-admin/applications', icon: Layers, badge: applications.length },
              { label: 'High-Level Approvals', path: '/super-admin/approvals', icon: CheckCircle2, badge: pendingCount },
              { label: 'Inter-Dept Requests', path: '/super-admin/gateway', icon: Workflow }
            ]
          },
          {
            title: 'INTELLIGENCE',
            items: [
              { label: 'State Reports', path: '/super-admin/reports', icon: BarChart3 },
              { label: 'Regional Audit Logs', path: '/super-admin/audit', icon: History },
              { label: 'Official Profile', path: '/super-admin/profile', icon: ShieldCheck }
            ]
          }
        ];

      case USER_ROLES.ADMIN:
        return [
          {
            title: 'DEPARTMENT OPERATIONS',
            items: [
              { label: 'Department Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
              { label: 'Department Services', path: '/admin/services', icon: FileText },
              { label: 'Agents & Workload', path: '/admin/agents', icon: Users }
            ]
          },
          {
            title: 'CITIZEN APPLICATIONS',
            items: [
              { label: 'All Applications', path: '/admin/applications', icon: Layers, badge: applications.length },
              { label: 'Pending Verification', path: '/admin/pending', icon: Clock, badge: pendingCount },
              { label: 'Approvals Queue', path: '/admin/approvals', icon: CheckCircle2 },
              { label: 'Rejections Archive', path: '/admin/rejections', icon: XCircle }
            ]
          },
          {
            title: 'GRIEVANCES & REPORTS',
            items: [
              { label: 'Department Documents', path: '/admin/documents', icon: FileCheck },
              { label: 'Citizen Complaints', path: '/admin/complaints', icon: AlertCircle, badge: complaintsCount },
              { label: 'Department Reports', path: '/admin/reports', icon: BarChart3 }
            ]
          }
        ];

      case USER_ROLES.AGENT:
        return [
          {
            title: 'FIELD WORKSPACE',
            items: [
              { label: 'Agent Workspace', path: '/agent/dashboard', icon: LayoutDashboard },
              { label: 'My Applications', path: '/agent/my-applications', icon: Layers },
              { label: 'Assigned Applications', path: '/agent/assigned', icon: Clock, badge: applications.filter(a => a.status === 'assigned' || a.status === 'verifying').length },
              { label: 'Document Verification', path: '/agent/documents', icon: FileCheck }
            ]
          },
          {
            title: 'CITIZEN ENGAGEMENT',
            items: [
              { label: 'Citizen Requests', path: '/agent/requests', icon: MessageSquare },
              { label: 'Tasks & Due Dates', path: '/agent/tasks', icon: CheckCircle2 },
              { label: 'Official Profile', path: '/agent/profile', icon: ShieldCheck }
            ]
          }
        ];

      case USER_ROLES.CITIZEN:
      default:
        return [
          {
            title: 'CITIZEN SERVICES',
            items: [
              { label: 'Home Dashboard', path: '/dashboard', icon: LayoutDashboard },
              { label: 'Government Departments', path: '/dashboard/departments', icon: Building2 },
              { label: 'All Services (200+)', path: '/dashboard/services', icon: FileText }
            ]
          },
          {
            title: 'MY APPLICATIONS',
            items: [
              { label: 'My Applications', path: '/dashboard/applications', icon: Layers, badge: applications.filter(a => a.citizenId === 'USR-CITIZEN-001').length },
              { label: 'Digital Certificates', path: '/dashboard/certificates', icon: Award },
              { label: 'Grievance / Complaints', path: '/dashboard/complaints', icon: AlertCircle },
              { label: 'DigiLocker Vault', path: '/dashboard/documents', icon: FolderLock }
            ]
          },
          {
            title: 'EXPLORE & ASSISTANCE',
            items: [
              { label: 'Inter-Dept Gateway', path: '/dashboard/gateway', icon: Workflow },
              { label: 'GovAI Assistant', path: '/dashboard/help', icon: Sparkles },
              { label: 'Citizen Profile', path: '/dashboard/profile', icon: UserCheck }
            ]
          }
        ];
    }
  };

  const sections = getNavSections();

  return (
    <aside style={{
      width: '270px',
      minWidth: '270px',
      height: 'calc(100vh - 72px)',
      position: 'sticky',
      top: '72px',
      background: '#ffffff',
      borderRight: '1px solid #e2e8f0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 14px',
      overflowY: 'auto'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {sections.map((section, sIdx) => (
          <div key={sIdx}>
            <div style={{
              fontSize: '11px',
              fontWeight: '800',
              color: '#94a3b8',
              letterSpacing: '0.8px',
              padding: '0 12px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              {section.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {section.items.map((item, iIdx) => {
                const IconComponent = item.icon;
                const isActive = currentPath === item.path || (item.path !== '/dashboard' && currentPath.startsWith(item.path));

                return (
                  <button
                    key={iIdx}
                    onClick={() => onNavigate(item.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: isActive ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.12) 0%, rgba(79, 70, 229, 0.12) 100%)' : 'transparent',
                      color: isActive ? '#6d28d9' : '#475569',
                      border: isActive ? '1px solid #ddd6fe' : '1px solid transparent',
                      fontWeight: isActive ? '700' : '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <IconComponent size={17} color={isActive ? '#6d28d9' : '#64748b'} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '800',
                        padding: '2px 7px',
                        borderRadius: '12px',
                        background: isActive ? '#7c3aed' : '#ede9fe',
                        color: isActive ? '#ffffff' : '#6d28d9'
                      }}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 24x7 Citizen Helpline Widget at Sidebar Bottom */}
      <div style={{
        background: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
        borderRadius: '14px',
        padding: '14px',
        border: '1px solid #ddd6fe',
        marginTop: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <div style={{
            width: '26px',
            height: '26px',
            borderRadius: '6px',
            background: '#7c3aed',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PhoneCall size={14} />
          </div>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#4c1d95' }}>
            24x7 Citizen Helpline
          </span>
        </div>
        <div style={{ fontSize: '15px', fontWeight: '900', color: '#6d28d9', letterSpacing: '0.5px' }}>
          1800-11-2026
        </div>
        <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '2px' }}>
          Toll-Free National Public Services Helpdesk
        </div>
      </div>
    </aside>
  );
}
