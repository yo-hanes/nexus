import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';

export default function QuickReportModal({ isOpen, onClose }) {
  const [disasterType, setDisasterType] = useState('Flood');
  const [region, setRegion] = useState('Gambella Region');
  const [severity, setSeverity] = useState('High');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Quick Disaster Report</h3>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <CheckCircle2 size={54} color="#10b981" style={{ marginBottom: '1rem' }} />
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>Report Submitted Successfully!</h4>
            <p style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '0.4rem' }}>
              Negarit Early Warning dispatch center has received your report for verification.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Disaster Type</label>
              <select
                className="form-control"
                value={disasterType}
                onChange={(e) => setDisasterType(e.target.value)}
              >
                <option value="Flood">Flood / Inundation</option>
                <option value="Drought">Drought / Water Scarcity</option>
                <option value="Landslide">Landslide / Mudslide</option>
                <option value="Earthquake">Earthquake / Seismic Activity</option>
                <option value="Wildfire">Wildfire / Bush Fire</option>
              </select>
            </div>

            <div className="form-group">
              <label>Region / Location</label>
              <select
                className="form-control"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
              >
                <option value="Gambella Region">Gambella Region</option>
                <option value="Afar Region">Afar Region</option>
                <option value="Tigray Region">Tigray Region</option>
                <option value="Gamo Zone / Southern">Gamo Zone / Southern Ethiopia</option>
                <option value="Oromia Region">Oromia Region</option>
                <option value="Amhara Region">Amhara Region</option>
                <option value="Addis Ababa">Addis Ababa District</option>
              </select>
            </div>

            <div className="form-group">
              <label>Severity Level</label>
              <select
                className="form-control"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
              >
                <option value="Low">Low - Monitor</option>
                <option value="Medium">Medium - Caution Required</option>
                <option value="High">High - Urgent Action Required</option>
                <option value="Critical">Critical - Life-Threatening Emergency</option>
              </select>
            </div>

            <div className="form-group">
              <label>Field Observations / Notes</label>
              <textarea
                className="form-control"
                placeholder="Describe water level rises, road blockage, affected households, or urgent assistance needed..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="modal-actions">
              <button type="button" className="btn-secondary" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Send size={15} />
                <span>Submit Alert Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
