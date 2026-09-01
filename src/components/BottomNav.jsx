import React from 'react';
import { Home, Layers, ClipboardList, Bell, User } from 'lucide-react';

export default function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'services', label: 'Services', icon: Layers },
    { id: 'applications', label: 'Applications', icon: ClipboardList },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'account', label: 'Account', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-tab ${isActive ? 'active' : ''}`}
            onClick={() => onSelectTab(tab.id)}
          >
            <IconComponent size={20} color={isActive ? '#673AB7' : '#6c757d'} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
