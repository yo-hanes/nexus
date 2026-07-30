import React from 'react';
import EthiopiaMap from './EthiopiaMap';
import { LayoutDashboard, MapPin, Bell, FileText, BarChart3, Truck, Package, Users, Settings } from 'lucide-react';

export default function SimplePageView({ title, pageId, onBackToOverview }) {
  const getIcon = () => {
    switch (pageId) {
      case 'dashboard': return <BarChart3 size={28} color="#1e66f5" />;
      case 'map': return <MapPin size={28} color="#1e66f5" />;
      case 'alerts': return <Bell size={28} color="#ef4444" />;
      case 'reports': return <FileText size={28} color="#1e66f5" />;
      case 'analytics': return <BarChart3 size={28} color="#8b5cf6" />;
      case 'dispatch': return <Truck size={28} color="#f97316" />;
      case 'resources': return <Package size={28} color="#10b981" />;
      case 'membership': return <Users size={28} color="#1e66f5" />;
      case 'settings': return <Settings size={28} color="#64748b" />;
      default: return <LayoutDashboard size={28} color="#1e66f5" />;
    }
  };

  return (
    <div className="dashboard-content">
      {/* Simple Page Top Title Card */}
      <div className="card-box" style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: '#e0f2fe', padding: '0.75rem', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {getIcon()}
            </div>
            <div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>{title}</h1>
              <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.2rem' }}>
                National Disaster Intelligence & Early Warning System – {title} Module
              </p>
            </div>
          </div>

          <button className="btn-secondary" onClick={onBackToOverview}>
            &larr; Return to Overview
          </button>
        </div>
      </div>

      {/* Special Full Map view for 'map' tab */}
      {pageId === 'map' ? (
        <div className="card-box" style={{ height: '620px', padding: '1rem' }}>
          <h3 className="card-title" style={{ marginBottom: '0.75rem' }}>Full GIS Map of Ethiopia</h3>
          <div style={{ flex: 1, position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
            <EthiopiaMap onViewFullMap={() => {}} />
          </div>
        </div>
      ) : (
        /* Simple Clean Placeholder Card for other pages */
        <div className="card-box" style={{ minHeight: '380px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '1rem', background: '#ffffff' }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {getIcon()}
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1e293b' }}>{title} Module Active</h3>
          <p style={{ color: '#64748b', maxWidth: '420px', fontSize: '0.9rem', lineHeight: '1.5' }}>
            This section is part of Negarit early warning system. Full telemetry, automated dispatching, and management features will be connected here.
          </p>
          <button className="btn-primary" onClick={onBackToOverview} style={{ marginTop: '0.5rem' }}>
            View National Overview
          </button>
        </div>
      )}
    </div>
  );
}
