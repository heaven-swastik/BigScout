import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useStore from '../utils/store';
import './LocationSearch.css';

function LocationSearch() {
  const [location, setLocation] = useState('');
  const [radius, setRadius] = useState(1000);
  const { setSearchData, setStep } = useStore();

  const handleSearch = () => {
    if (!location.trim()) {
      toast.error('Enter a location');
      return;
    }
    
    toast.success(`Analyzing ${location}`);
    setSearchData(location, radius);
    setStep(2);
  };

  return (
    <section className="location-search">
      <div className="container">
        <motion.div
          className="search-wrapper"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="search-header">
            <h2>Start Your <span className="text-gradient">AI Analysis</span></h2>
            <p>Enter your target location and let our neural network analyze market potential</p>
          </div>

          <div className="search-card">
            <div className="search-grid">
              {/* Location Input */}
              <div className="input-section">
                <label className="input-label">
                  <span className="label-icon">📍</span>
                  <span>TARGET LOCATION</span>
                </label>
                <div className="input-glow-wrapper">
                  <input
                    type="text"
                    className="glow-input"
                    placeholder="Enter city or area (e.g., Bally, Howrah)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <div className="input-glow"></div>
                </div>
              </div>

              {/* Radius Slider */}
              <div className="input-section">
                <label className="input-label">
                  <span className="label-icon">🎯</span>
                  <span>ANALYSIS RADIUS: {radius}M</span>
                </label>
                <div className="slider-wrapper">
                  <input
                    type="range"
                    className="glow-slider"
                    min="500"
                    max="5000"
                    step="100"
                    value={radius}
                    onChange={(e) => setRadius(parseInt(e.target.value))}
                  />
                  <div className="slider-labels">
                    <span>500m</span>
                    <span>2.5km</span>
                    <span>5km</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <button className="btn-analyze" onClick={handleSearch}>
              <span className="btn-text">ANALYZE WITH AI</span>
              <span className="btn-icon">→</span>
            </button>

            {/* Quick Examples */}
            <div className="quick-access">
              <span className="quick-label">Quick Start:</span>
              <div className="quick-chips">
                {['Bally, Howrah', 'Connaught Place, Delhi', 'MG Road, Bangalore', 'Park Street, Kolkata'].map(ex => (
                  <button key={ex} className="quick-chip" onClick={() => setLocation(ex)}>
                    {ex}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default LocationSearch;