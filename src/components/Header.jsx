import React from 'react';
import { Search, Globe, Bell, ChevronDown, Sun } from 'lucide-react';

export default function Header({ searchVal, setSearchVal, activeTab }) {
  return (
    <header>
      {/* Top Bar */}
      <div className="top-header">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search for locations, reports, alerts..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>

        <div className="header-actions">
          <div className="lang-selector">
            <Globe size={16} />
            <span>EN</span>
            <ChevronDown size={14} />
          </div>

          <button className="notification-btn" aria-label="Notifications">
            <Bell size={18} />
            <span className="badge-count">12</span>
          </button>

          <img
            src="/assets/abebe_avatar.jpg"
            alt="Abebe Kebede"
            className="header-avatar"
          />
        </div>
      </div>

      {/* Greeting Banner */}
      {activeTab === 'overview' && (
        <div className="page-greeting">
          <div className="greeting-title">
            <h1>Welcome back, Abebe 👋</h1>
            <p>Here is what's happening with disasters today in Ethiopia.</p>
          </div>

          <div className="greeting-meta">
            <span className="date-stamp">May 26, 2025 &nbsp; 10:30 AM</span>

            <div className="weather-widget">
              <Sun size={20} color="#eab308" />
              <div>
                <div className="weather-temp">22°C</div>
                <div className="weather-city">Addis Ababa</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
