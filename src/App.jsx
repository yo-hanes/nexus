import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewView from './components/OverviewView';
import SimplePageView from './components/SimplePageView';
import QuickReportModal from './components/QuickReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchVal, setSearchVal] = useState('');
  const [isQuickReportOpen, setIsQuickReportOpen] = useState(false);

  const getPageTitle = (tabId) => {
    switch (tabId) {
      case 'dashboard': return 'Dashboard';
      case 'map': return 'Disaster GIS Map';
      case 'alerts': return 'Early Warning Alerts';
      case 'reports': return 'Incident Reports';
      case 'analytics': return 'Predictive Analytics';
      case 'dispatch': return 'Emergency Dispatch';
      case 'resources': return 'Resource Allocation';
      case 'membership': return 'Trusted Reporters & Membership';
      case 'settings': return 'System Settings';
      default: return 'Overview';
    }
  };

  return (
    <div className="app-container">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQuickReport={() => setIsQuickReportOpen(true)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          activeTab={activeTab}
        />

        {activeTab === 'overview' ? (
          <OverviewView
            onViewFullMap={() => setActiveTab('map')}
            onNavigate={(tab) => setActiveTab(tab)}
          />
        ) : (
          <SimplePageView
            title={getPageTitle(activeTab)}
            pageId={activeTab}
            onBackToOverview={() => setActiveTab('overview')}
          />
        )}

        {/* Footer */}
        <footer className="app-footer">
          <div>
            <strong>Negarit</strong> &ndash; National Disaster Intelligence & Early Warning System
          </div>
          <div>
            &copy; 2025 Negarit. All rights reserved.
          </div>
        </footer>
      </div>

      {/* Quick Report Modal */}
      <QuickReportModal
        isOpen={isQuickReportOpen}
        onClose={() => setIsQuickReportOpen(false)}
      />
    </div>
  );
}
