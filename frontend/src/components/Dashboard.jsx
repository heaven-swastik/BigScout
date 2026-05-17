import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import useStore from '../utils/store';
import './Dashboard.css';

function Dashboard() {
  const { analysisResults, searchLocation, selectedBusiness, budget, reset } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAlt, setSelectedAlt] = useState(null);

  if (!analysisResults) {
    return (
      <div className="dashboard-loading">
        <div className="spinner-large"></div>
        <p>Loading results...</p>
      </div>
    );
  }

  // Extract data from backend response
  const mainAnswer = analysisResults.main_answer;
  const selectedBiz = analysisResults.selected_business;
  const alternatives = analysisResults.alternatives || [];

  return (
    <section className="dashboard">
      <div className="dashboard-bg-effects">
        <div className="glow-orb glow-1"></div>
        <div className="glow-orb glow-2"></div>
        <div className="glow-orb glow-3"></div>
      </div>

      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header with Stats Bar */}
          <div className="dash-header">
            <motion.div
              className="header-content"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="title-section">
                <h1>
                  <span className="title-icon">🎯</span>
                  AI Analysis <span className="text-gradient">Complete</span>
                </h1>
                <p className="subtitle">
                  <strong>{selectedBusiness}</strong> • {searchLocation} • Budget: ₹{(budget / 100000).toFixed(2)}L
                </p>
              </div>
              
              <div className="header-stats">
                <div className="quick-stat">
                  <div className="stat-icon">💰</div>
                  <div className="stat-info">
                    <div className="stat-value">₹{mainAnswer.monthly_revenue.toLocaleString('en-IN')}</div>
                    <div className="stat-label">Monthly Revenue</div>
                  </div>
                </div>
                <div className="quick-stat">
                  <div className="stat-icon">🎲</div>
                  <div className="stat-info">
                    <div className="stat-value confidence-value">{mainAnswer.confidence}%</div>
                    <div className="stat-label">Confidence</div>
                  </div>
                </div>
                <div className="quick-stat">
                  <div className="stat-icon">🏪</div>
                  <div className="stat-info">
                    <div className="stat-value">{selectedBiz.research.competitors.total}</div>
                    <div className="stat-label">Competitors</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Main Answer Card */}
          <motion.div
            className="hero-card"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="hero-card-inner">
              <div className="hero-badge">
                <span className="badge-icon">🏆</span>
                <span>AI Recommendation</span>
              </div>
              
              <h2 className="hero-statement">{mainAnswer.statement}</h2>
              
              <div className="hero-metrics">
                <div className="metric-card">
                  <div className="metric-icon-wrapper">
                    <div className="metric-icon">💵</div>
                  </div>
                  <div className="metric-content">
                    <div className="metric-label">Monthly Revenue</div>
                    <div className="metric-value">₹{mainAnswer.monthly_revenue.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="metric-card">
                  <div className="metric-icon-wrapper">
                    <div className="metric-icon">📈</div>
                  </div>
                  <div className="metric-content">
                    <div className="metric-label">Yearly Revenue</div>
                    <div className="metric-value">₹{mainAnswer.yearly_revenue.toLocaleString('en-IN')}</div>
                  </div>
                </div>

                <div className="metric-card confidence-card">
                  <div className="metric-icon-wrapper">
                    <div className="metric-icon">🎯</div>
                  </div>
                  <div className="metric-content">
                    <div className="metric-label">AI Confidence</div>
                    <div className="metric-value confidence-big">{mainAnswer.confidence}%</div>
                  </div>
                  <div className="confidence-bar">
                    <motion.div 
                      className="confidence-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${mainAnswer.confidence}%` }}
                      transition={{ delay: 0.5, duration: 1 }}
                    />
                  </div>
                </div>
              </div>

              <div className="hero-explanation">
                <h4>📊 AI Analysis Summary</h4>
                <p>{mainAnswer.explanation.summary}</p>
                
                <div className="key-factors">
                  <h5>🔑 Key Success Factors:</h5>
                  <div className="factors-grid">
                    {mainAnswer.explanation.key_factors.map((factor, i) => (
                      <motion.div
                        key={i}
                        className="factor-chip"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + i * 0.1 }}
                      >
                        <span className="chip-icon">✓</span>
                        {factor}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <motion.div
            className="tabs-nav"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {['overview', 'research', 'guide', 'alternatives'].map((tab) => (
              <button
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'research' && '🔬 Deep Research'}
                {tab === 'guide' && '📖 Business Guide'}
                {tab === 'alternatives' && '💡 Alternatives'}
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="stats-grid-advanced">
                  <div className="stat-card-adv">
                    <div className="stat-card-header">
                      <span className="stat-icon-adv">🏪</span>
                      <span className="stat-title-adv">Competition</span>
                    </div>
                    <div className="stat-main-value">{selectedBiz.research.competitors.total}</div>
                    <div className="stat-sub-info">
                      <div className="sub-stat">
                        <span>Your Level:</span>
                        <strong>{selectedBiz.research.competitors.relevant_competitors}</strong>
                      </div>
                      <div className="sub-stat">
                        <span>Budget Level:</span>
                        <strong className="badge-sm">{selectedBiz.research.competitors.budget_level.toUpperCase()}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-adv">
                    <div className="stat-card-header">
                      <span className="stat-icon-adv">💰</span>
                      <span className="stat-title-adv">Market</span>
                    </div>
                    <div className="stat-main-value">{selectedBiz.research.economy.income_class}</div>
                    <div className="stat-sub-info">
                      <div className="sub-stat">
                        <span>Lifestyle:</span>
                        <strong>{selectedBiz.research.economy.lifestyle}</strong>
                      </div>
                      <div className="sub-stat">
                        <span>Score:</span>
                        <strong>{selectedBiz.research.economy.economic_score}/100</strong>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-adv">
                    <div className="stat-card-header">
                      <span className="stat-icon-adv">🏘️</span>
                      <span className="stat-title-adv">Real Estate</span>
                    </div>
                    <div className="stat-main-value">₹{selectedBiz.research.real_estate.monthly_rent.toLocaleString('en-IN')}</div>
                    <div className="stat-sub-info">
                      <div className="sub-stat">
                        <span>Monthly Rent</span>
                      </div>
                      <div className="sub-stat">
                        <span>Tier {selectedBiz.research.real_estate.tier}</span>
                        <strong className={selectedBiz.research.real_estate.affordable ? 'text-success' : 'text-error'}>
                          {selectedBiz.research.real_estate.affordable ? '✅ Affordable' : '❌ High'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="stat-card-adv">
                    <div className="stat-card-header">
                      <span className="stat-icon-adv">📍</span>
                      <span className="stat-title-adv">POIs Nearby</span>
                    </div>
                    <div className="stat-main-value">
                      {Object.values(selectedBiz.research.pois).reduce((a, b) => a + b, 0)}
                    </div>
                    <div className="stat-sub-info pois-grid">
                      <div className="poi-item">🏫 {selectedBiz.research.pois.schools}</div>
                      <div className="poi-item">🎓 {selectedBiz.research.pois.colleges}</div>
                      <div className="poi-item">🏢 {selectedBiz.research.pois.offices}</div>
                      <div className="poi-item">🏥 {selectedBiz.research.pois.hospitals}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'research' && (
              <motion.div
                key="research"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="research-detailed">
                  <div className="research-card-full">
                    <h3>🎯 Competition Breakdown</h3>
                    <div className="competition-viz">
                      <div className="comp-level">
                        <div className="comp-bar low" style={{ width: `${(selectedBiz.research.competitors.low_level / selectedBiz.research.competitors.total) * 100}%` }}>
                          <span className="comp-label">Low: {selectedBiz.research.competitors.low_level}</span>
                        </div>
                      </div>
                      <div className="comp-level">
                        <div className="comp-bar mid" style={{ width: `${(selectedBiz.research.competitors.mid_level / selectedBiz.research.competitors.total) * 100}%` }}>
                          <span className="comp-label">Mid: {selectedBiz.research.competitors.mid_level}</span>
                        </div>
                      </div>
                      <div className="comp-level">
                        <div className="comp-bar high" style={{ width: `${(selectedBiz.research.competitors.high_level / selectedBiz.research.competitors.total) * 100}%` }}>
                          <span className="comp-label">High: {selectedBiz.research.competitors.high_level}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="research-card-full">
                    <h3>📊 Market Saturation</h3>
                    <div className="saturation-display">
                      <div className="saturation-level">{selectedBiz.research.saturation.level}</div>
                      <p>{selectedBiz.research.saturation.description}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'guide' && selectedBiz.guide && (
              <motion.div
                key="guide"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="guide-header-section">
                  <h2>{selectedBiz.guide.title}</h2>
                  <p>{selectedBiz.guide.subtitle}</p>
                </div>

                <div className="guide-steps-grid">
                  {selectedBiz.guide.steps.map((step, i) => (
                    <motion.div
                      key={i}
                      className="guide-step-modern"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <div className="step-number-modern">{step.id}</div>
                      <div className="step-content-modern">
                        <h4>{step.title}</h4>
                        <p>{step.description}</p>
                        <div className="step-action-modern">
                          💡 {step.action}
                        </div>
                        {step.gamification && (
                          <div className="step-rewards-modern">
                            <span className="points-badge">+{step.gamification.points} pts</span>
                            <span className="achievement-badge">{step.gamification.badge}</span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {selectedBiz.guide.success_tips && (
                  <div className="success-tips-section">
                    <h3>💡 Pro Tips for Success</h3>
                    <div className="tips-grid">
                      {selectedBiz.guide.success_tips.map((tip, i) => (
                        <div key={i} className="tip-card">
                          <span className="tip-icon">✨</span>
                          <p>{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'alternatives' && (
              <motion.div
                key="alternatives"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="tab-content"
              >
                <div className="alternatives-header">
                  <h2>💡 Top 3 Alternative Business Ideas</h2>
                  <p>Based on the same location and budget</p>
                </div>

                <div className="alternatives-advanced-grid">
                  {alternatives.map((alt, i) => (
                    <motion.div
                      key={i}
                      className="alternative-card-modern"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div className="alt-rank-badge">#{alt.rank}</div>
                      
                      <div className="alt-header">
                        <h3>{alt.business_type}</h3>
                        <div className="alt-confidence-badge">
                          {alt.revenue.confidence}% confidence
                        </div>
                      </div>

                      <div className="alt-revenue-section">
                        <div className="alt-revenue-item">
                          <span className="alt-label">Monthly</span>
                          <span className="alt-value">₹{alt.revenue.monthly_revenue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="alt-revenue-item">
                          <span className="alt-label">Yearly</span>
                          <span className="alt-value">₹{alt.revenue.yearly_revenue.toLocaleString('en-IN')}</span>
                        </div>
                      </div>

                      <div className="alt-stats-section">
                        <div className="alt-stat-item">
                          <span className="alt-stat-icon">🏪</span>
                          <div className="alt-stat-content">
                            <span className="alt-stat-label">Competitors</span>
                            <span className="alt-stat-value">{alt.research.competitors.total}</span>
                          </div>
                        </div>
                        <div className="alt-stat-item">
                          <span className="alt-stat-icon">💰</span>
                          <div className="alt-stat-content">
                            <span className="alt-stat-label">Income Level</span>
                            <span className="alt-stat-value">{alt.research.economy.income_class}</span>
                          </div>
                        </div>
                        <div className="alt-stat-item">
                          <span className="alt-stat-icon">🏘️</span>
                          <div className="alt-stat-content">
                            <span className="alt-stat-label">Rent</span>
                            <span className="alt-stat-value">₹{(alt.research.real_estate.monthly_rent / 1000).toFixed(0)}K</span>
                          </div>
                        </div>
                      </div>

                      <button
                        className="view-details-btn"
                        onClick={() => setSelectedAlt(selectedAlt === i ? null : i)}
                      >
                        {selectedAlt === i ? 'Hide Details' : 'View Full Details'}
                      </button>

                      <AnimatePresence>
                        {selectedAlt === i && (
                          <motion.div
                            className="alt-expanded"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                          >
                            <div className="alt-expanded-content">
                              <h4>Competition Breakdown</h4>
                              <div className="mini-comp-grid">
                                <div className="mini-comp-item">
                                  <span>Low:</span>
                                  <strong>{alt.research.competitors.low_level}</strong>
                                </div>
                                <div className="mini-comp-item">
                                  <span>Mid:</span>
                                  <strong>{alt.research.competitors.mid_level}</strong>
                                </div>
                                <div className="mini-comp-item">
                                  <span>High:</span>
                                  <strong>{alt.research.competitors.high_level}</strong>
                                </div>
                              </div>

                              <h4>Market Details</h4>
                              <div className="alt-market-details">
                                <div><span>Lifestyle:</span> <strong>{alt.research.economy.lifestyle}</strong></div>
                                <div><span>Saturation:</span> <strong>{alt.research.saturation.level}</strong></div>
                                <div><span>Affordable:</span> <strong className={alt.research.real_estate.affordable ? 'text-success' : 'text-error'}>
                                  {alt.research.real_estate.affordable ? '✅ Yes' : '❌ No'}
                                </strong></div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Footer */}
          <motion.div
            className="dashboard-footer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <button className="btn-new-analysis-modern" onClick={reset}>
              <span className="btn-icon">🔄</span>
              <span>Start New Analysis</span>
              <span className="btn-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Dashboard;