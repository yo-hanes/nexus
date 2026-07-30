import React from 'react';
import {
  AlertTriangle,
  Flame,
  Users,
  ShieldCheck,
  UserCheck,
  TrendingUp,
  Waves,
  Mountain,
  Sun,
  Activity
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import EthiopiaMap from './EthiopiaMap';

export default function OverviewView({ onViewFullMap, onNavigate }) {
  // 7-Day Line Chart Data (Matching the Screenshot plot lines)
  const lineChartData = [
    { name: 'May 20', Flood: 52, Drought: 40, Landslide: 25, Earthquake: 5 },
    { name: 'May 21', Flood: 68, Drought: 50, Landslide: 30, Earthquake: 8 },
    { name: 'May 22', Flood: 65, Drought: 45, Landslide: 33, Earthquake: 7 },
    { name: 'May 23', Flood: 75, Drought: 56, Landslide: 31, Earthquake: 9 },
    { name: 'May 24', Flood: 72, Drought: 54, Landslide: 35, Earthquake: 7 },
    { name: 'May 25', Flood: 66, Drought: 44, Landslide: 30, Earthquake: 9 },
    { name: 'May 26', Flood: 82, Drought: 55, Landslide: 28, Earthquake: 10 },
    { name: 'May 27', Flood: 90, Drought: 60, Landslide: 42, Earthquake: 6 }
  ];

  // Donut Chart Data
  const pieData = [
    { name: 'Flood', value: 45, color: '#1e66f5' },
    { name: 'Drought', value: 25, color: '#f97316' },
    { name: 'Landslide', value: 20, color: '#a16207' },
    { name: 'Earthquake', value: 10, color: '#ef4444' },
  ];

  return (
    <div className="dashboard-content">
      {/* 5 Metric Cards */}
      <div className="metrics-grid">
        {/* Card 1 */}
        <div className="metric-card">
          <div className="metric-icon-wrapper alerts">
            <AlertTriangle size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Active Alerts</span>
            <span className="metric-value">156</span>
            <span className="metric-sub up-red">
              <TrendingUp size={12} />
              12% from yesterday
            </span>
          </div>
        </div>

        {/* Card 2 */}
        <div className="metric-card">
          <div className="metric-icon-wrapper risk">
            <Flame size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">High Risk Zones</span>
            <span className="metric-value">28</span>
            <span className="metric-sub up-orange">
              <TrendingUp size={12} />
              8% from yesterday
            </span>
          </div>
        </div>

        {/* Card 3 */}
        <div className="metric-card">
          <div className="metric-icon-wrapper affected">
            <Users size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Affected People</span>
            <span className="metric-value">2.4M</span>
            <span className="metric-sub up-blue">
              <TrendingUp size={12} />
              18% from yesterday
            </span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="metric-card">
          <div className="metric-icon-wrapper status">
            <ShieldCheck size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Response Status</span>
            <span className="metric-value">64%</span>
            <span className="metric-sub up-green">
              <TrendingUp size={12} />
              6% from yesterday
            </span>
          </div>
        </div>

        {/* Card 5 */}
        <div className="metric-card">
          <div className="metric-icon-wrapper members">
            <UserCheck size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-label">Trusted Counters</span>
            <span className="metric-value">1,248</span>
            <span className="metric-sub purple">Active members</span>
          </div>
        </div>
      </div>

      {/* Middle Section: Risk Overview & Live Map */}
      <div className="middle-grid">
        {/* Risk Overview Line Chart */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">Risk Overview</h3>
            <select className="select-filter" defaultValue="7days">
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="year">This Year</option>
            </select>
          </div>

          <div className="chart-legend-container">
            <div className="chart-legend-item">
              <span className="legend-dot flood"></span>
              <span>Flood</span>
            </div>
            <div className="chart-legend-item">
              <span className="legend-dot drought"></span>
              <span>Drought</span>
            </div>
            <div className="chart-legend-item">
              <span className="legend-dot landslide"></span>
              <span>Landslide</span>
            </div>
            <div className="chart-legend-item">
              <span className="legend-dot earthquake"></span>
              <span>Earthquake</span>
            </div>
          </div>

          <div style={{ width: '100%', height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 12 }}
                />
                <Line type="monotone" dataKey="Flood" stroke="#1e66f5" strokeWidth={2.5} dot={{ r: 3, fill: '#1e66f5' }} />
                <Line type="monotone" dataKey="Drought" stroke="#f97316" strokeWidth={2.5} dot={{ r: 3, fill: '#f97316' }} />
                <Line type="monotone" dataKey="Landslide" stroke="#a16207" strokeWidth={2.5} dot={{ r: 3, fill: '#a16207' }} />
                <Line type="monotone" dataKey="Earthquake" stroke="#ef4444" strokeWidth={2.5} dot={{ r: 3, fill: '#ef4444' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Live Map Box */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">Live Map</h3>
          </div>
          <EthiopiaMap onViewFullMap={onViewFullMap} />
        </div>
      </div>

      {/* Bottom Section: 4 Grid Cards */}
      <div className="bottom-grid">
        {/* Disaster Distribution (Donut Chart) */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">Disaster Distribution</h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 210 }}>
            <div style={{ width: 140, height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={42}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="donut-legend">
              {pieData.map((item) => (
                <div key={item.name} className="donut-legend-item">
                  <div className="donut-legend-left">
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                    <span>{item.name}</span>
                  </div>
                  <span style={{ fontWeight: 800, marginLeft: 12 }}>{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Alerts */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">Recent Alerts</h3>
            <span className="view-all-link" onClick={() => onNavigate('alerts')}>View All</span>
          </div>

          <div className="item-list-container">
            {/* Item 1 */}
            <div className="alert-row-item">
              <div className="alert-icon-box flood">
                <Waves size={18} />
              </div>
              <div className="alert-content">
                <h5>Flash Flood Warning</h5>
                <p>Gambella Region</p>
              </div>
              <span className="alert-time">10 min ago</span>
            </div>

            {/* Item 2 */}
            <div className="alert-row-item">
              <div className="alert-icon-box landslide">
                <Mountain size={18} />
              </div>
              <div className="alert-content">
                <h5>Landslide Risk</h5>
                <p>Southern Ethiopia</p>
              </div>
              <span className="alert-time">25 min ago</span>
            </div>

            {/* Item 3 */}
            <div className="alert-row-item">
              <div className="alert-icon-box drought">
                <Sun size={18} />
              </div>
              <div className="alert-content">
                <h5>Drought Alert</h5>
                <p>Afar Region</p>
              </div>
              <span className="alert-time">1 hr ago</span>
            </div>

            {/* Item 4 */}
            <div className="alert-row-item">
              <div className="alert-icon-box earthquake">
                <AlertTriangle size={18} />
              </div>
              <div className="alert-content">
                <h5>Earthquake Detected</h5>
                <p>Tigray Region</p>
              </div>
              <span className="alert-time">2 hr ago</span>
            </div>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">Recent Reports</h3>
            <span className="view-all-link" onClick={() => onNavigate('reports')}>View All</span>
          </div>

          <div className="item-list-container">
            {/* Item 1 */}
            <div className="report-row-item">
              <img src="/assets/baro_river_flood.jpg" alt="Flood" className="report-thumb" />
              <div className="report-content">
                <h5>Flood in Baro River</h5>
                <p>Gambella Region</p>
              </div>
              <span className="status-badge-tag pending">Pending Verification</span>
              <span className="alert-time" style={{ marginLeft: 4 }}>10 min ago</span>
            </div>

            {/* Item 2 */}
            <div className="report-row-item">
              <img src="/assets/gofa_landslide.jpg" alt="Landslide" className="report-thumb" />
              <div className="report-content">
                <h5>Landslide in Gofa</h5>
                <p>Gamo Zone</p>
              </div>
              <span className="status-badge-tag verified">Verified</span>
              <span className="alert-time" style={{ marginLeft: 4 }}>35 min ago</span>
            </div>

            {/* Item 3 */}
            <div className="report-row-item">
              <img src="/assets/afar_drought.jpg" alt="Drought" className="report-thumb" />
              <div className="report-content">
                <h5>Drought in Afar</h5>
                <p>Afar Region</p>
              </div>
              <span className="status-badge-tag verified">Verified</span>
              <span className="alert-time" style={{ marginLeft: 4 }}>1 hr ago</span>
            </div>

            {/* Item 4 */}
            <div className="report-row-item">
              <img src="/assets/mekele_earthquake.jpg" alt="Earthquake" className="report-thumb" />
              <div className="report-content">
                <h5>Earthquake Felt</h5>
                <p>Mekele City</p>
              </div>
              <span className="status-badge-tag review">Under Review</span>
              <span className="alert-time" style={{ marginLeft: 4 }}>2 hr ago</span>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="card-box">
          <div className="card-header">
            <h3 className="card-title">System Status</h3>
          </div>

          <div className="system-status-list">
            <div className="status-row-item">
              <span>Data Sources</span>
              <div className="status-indicator">
                <span className="status-dot-pulse"></span>
                <span>Operational</span>
              </div>
            </div>

            <div className="status-row-item">
              <span>AI Risk Engine</span>
              <div className="status-indicator">
                <span className="status-dot-pulse"></span>
                <span>Operational</span>
              </div>
            </div>

            <div className="status-row-item">
              <span>Alert System</span>
              <div className="status-indicator">
                <span className="status-dot-pulse"></span>
                <span>Operational</span>
              </div>
            </div>

            <div className="status-row-item">
              <span>Mobile Network</span>
              <div className="status-indicator">
                <span className="status-dot-pulse"></span>
                <span>Operational</span>
              </div>
            </div>

            <div className="status-row-item">
              <span>Satellite Data</span>
              <div className="status-indicator">
                <span className="status-dot-pulse"></span>
                <span>Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
