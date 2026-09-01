import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from './AccessDenied';

export default function RoleGuard({ allowedRoles, children, onNavigateBack }) {
  const { currentUser, currentRole } = useAuth();

  if (!currentUser) {
    return <AccessDenied requiredRole={allowedRoles.join(' or ')} onGoBack={onNavigateBack} />;
  }

  if (!allowedRoles.includes(currentRole)) {
    return (
      <AccessDenied
        requiredRole={allowedRoles.map(r => r.replace(/_/g, ' ')).join(' / ')}
        onGoBack={onNavigateBack}
      />
    );
  }

  return children;
}
