import React from 'react';
import {
  LayoutDashboard,
  BarChart3,
  MapPin,
  Bell,
  FileText,
  TrendingUp,
  Truck,
  Package,
  Users,
  Settings,
  Send,
  Shield,
  ChevronUp
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, onOpenQuickReport }) {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'dispatch', label: 'Dispatch', icon: Truck },
    { id: 'resources', label: 'Resources', icon: Package },
    { id: 'membership', label: 'Membership', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="sidebar">
      <div>
        {/* Brand Logo */}
        <div className="sidebar-header">
          <div className="brand-icon">
            <Shield size={22} strokeWidth={2.5} />
          </div>
          <div className="brand-text">
            <h2>Negarit</h2>
            <p>Early Warning • Early Action</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="nav-list">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <IconComponent size={19} strokeWidth={isActive ? 2.5 : 2} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div>
        {/* Quick Report Callout Card */}
        <div className="quick-report-card">
          <h4>Quick Report</h4>
          <p>Report a disaster in less than a minute.</p>
          <button className="btn-quick-report" onClick={onOpenQuickReport}>
            <span>Report Now</span>
            <Send size={14} />
          </button>
        </div>

        {/* User Profile Pill */}
        <div className="user-profile-pill">
          <img
            src="/assets/abebe_avatar.jpg"
            alt="Abebe Kebede"
            className="user-avatar-small"
          />
          <div className="user-details">
            <span className="user-name">Abebe Kebede</span>
            <span className="user-role">Administrator</span>
          </div>
          <ChevronUp size={16} color="#64748b" />
        </div>
      </div>
    </aside>
  );
}
