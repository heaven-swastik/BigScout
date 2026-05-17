import os

COMP = "src/components"

# BusinessSelector
with open(f"{COMP}/BusinessSelector.jsx", 'w') as f:
    f.write('''import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useStore from '../utils/store';
import { apiService } from '../utils/api';
import './BusinessSelector.css';

const BUSINESS_TYPES = [
  { id: 'coffee', name: 'Coffee Shop', icon: '☕', cat: 'Food & Beverage' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️', cat: 'Food & Beverage' },
  { id: 'salon', name: 'Salon/Spa', icon: '💇', cat: 'Personal Care' },
  { id: 'gym', name: 'Gym & Fitness', icon: '💪', cat: 'Health & Wellness' },
  { id: 'grocery', name: 'Grocery Store', icon: '🛒', cat: 'Retail' },
  { id: 'pharmacy', name: 'Pharmacy', icon: '💊', cat: 'Healthcare' },
  { id: 'bakery', name: 'Bakery', icon: '🥖', cat: 'Food & Beverage' },
  { id: 'laundry', name: 'Laundry', icon: '🧺', cat: 'Services' },
  { id: 'bookstore', name: 'Bookstore', icon: '📚', cat: 'Retail' },
  { id: 'electronics', name: 'Electronics', icon: '📱', cat: 'Retail' },
  { id: 'clothing', name: 'Clothing Store', icon: '👔', cat: 'Fashion' },
  { id: 'tutoring', name: 'Tutoring Center', icon: '📖', cat: 'Education' },
];

function BusinessSelector() {
  const { searchLocation, searchRadius, setSelectedBusiness, setStep, setAnalyzing, clearLogs, addLog, setAnalysisResults } = useStore();

  const handleSelect = async (business) => {
    setSelectedBusiness(business.name);
    setStep(3);
    setAnalyzing(true);
    clearLogs();

    try {
      addLog({ level: 'INFO', message: `🚀 Starting AI analysis for ${business.name}...` });
      
      const result = await apiService.analyzeLocation(searchLocation, searchRadius);
      
      if (result.logs) {
        for (const log of result.logs) {
          await new Promise(r => setTimeout(r, 100));
          addLog(log);
        }
      }

      setAnalysisResults(result);
      setAnalyzing(false);
      setStep(4);
      toast.success('Analysis Complete!');
    } catch (error) {
      addLog({ level: 'ERROR', message: `❌ Analysis failed: ${error.message}` });
      setAnalyzing(false);
      toast.error('Analysis Failed');
    }
  };

  return (
    <section className="business-selector">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="selector-content"
        >
          <div className="selector-header">
            <h2>Select <span className="text-gradient">Business Type</span></h2>
            <p>
              <span className="location-tag">{searchLocation}</span>
              <span className="radius-tag">{searchRadius}m radius</span>
            </p>
          </div>

          <div className="business-grid">
            {BUSINESS_TYPES.map((business, i) => (
              <motion.div
                key={business.id}
                className="business-card"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => handleSelect(business)}
                whileTap={{ scale: 0.95 }}
              >
                <div className="business-icon-bg">
                  <span className="business-icon">{business.icon}</span>
                </div>
                <h3>{business.name}</h3>
                <span className="business-cat">{business.cat}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default BusinessSelector;
''')

with open(f"{COMP}/BusinessSelector.css", 'w') as f:
    f.write('''.business-selector {
  padding: var(--space-4xl) 0;
  min-height: 80vh;
}

.selector-header {
  text-align: center;
  margin-bottom: var(--space-3xl);
}

.selector-header h2 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.selector-header p {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-md);
  flex-wrap: wrap;
}

.location-tag,
.radius-tag {
  padding: 8px 20px;
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.1), rgba(255, 0, 64, 0.1));
  border: var(--border-glow);
  border-radius: 100px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--orange-neon);
}

.business-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.business-card {
  padding: var(--space-xl);
  background: linear-gradient(135deg, rgba(255, 69, 0, 0.03), rgba(255, 0, 64, 0.02));
  border: var(--border-glow);
  border-radius: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
}

.business-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--glow-orange-strong);
  border-color: var(--orange-neon);
}

.business-icon-bg {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--space-md);
  background: linear-gradient(135deg, var(--orange-neon), var(--red-neon));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--glow-orange);
}

.business-icon {
  font-size: 2.5rem;
}

.business-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: var(--space-xs);
}

.business-cat {
  font-size: 0.875rem;
  color: var(--text-gray);
}

@media (max-width: 640px) {
  .business-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-md);
  }
}
''')

# LiveAnalysis  
with open(f"{COMP}/LiveAnalysis.jsx", 'w') as f:
    f.write('''import { motion } from 'framer-motion';
import useStore from '../utils/store';
import './LiveAnalysis.css';

function LiveAnalysis() {
  const { searchLocation, selectedBusiness, logs, isAnalyzing } = useStore();

  return (
    <section className="live-analysis">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="analysis-wrapper"
        >
          <div className="analysis-header">
            <h2>🧠 AI Neural Network <span className="text-gradient">Analyzing</span></h2>
            <p>
              <strong>{selectedBusiness}</strong> at <strong>{searchLocation}</strong>
            </p>
          </div>

          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="terminal-title">BizScout AI Terminal</span>
            </div>

            <div className="terminal-body">
              {logs.map((log, i) => (
                <motion.div
                  key={i}
                  className={`log-line log-${log.level?.toLowerCase()}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <span className="log-time">{new Date().toLocaleTimeString()}</span>
                  <span className="log-level">[{log.level}]</span>
                  <span className="log-msg">{log.message}</span>
                </motion.div>
              ))}

              {isAnalyzing && (
                <motion.div
                  className="log-line log-info"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <span className="log-msg">▊ Processing neural network layers...</span>
                </motion.div>
              )}
            </div>
          </div>

          {isAnalyzing && (
            <div className="progress-status">
              <div className="spinner-ring"></div>
              <p>Deep learning model analyzing market data...</p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export default LiveAnalysis;
''')

with open(f"{COMP}/LiveAnalysis.css", 'w') as f:
    f.write('''.live-analysis {
  padding: var(--space-4xl) 0;
  min-height: 80vh;
}

.analysis-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.analysis-header h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: var(--space-md);
}

.analysis-header p {
  color: var(--text-gray);
  font-size: 1.125rem;
}

.analysis-header strong {
  color: var(--orange-neon);
}

.terminal {
  max-width: 1000px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.8);
  border: var(--border-glow-bright);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--glow-orange-strong);
}

.terminal-header {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  background: rgba(255, 69, 0, 0.05);
  border-bottom: var(--border-glow);
}

.terminal-dots {
  display: flex;
  gap: 6px;
}

.terminal-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.terminal-dots span:nth-child(1) { background: #ff5f56; }
.terminal-dots span:nth-child(2) { background: #ffbd2e; }
.terminal-dots span:nth-child(3) { background: #27c93f; }

.terminal-title {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: var(--text-gray);
  margin-left: auto;
}

.terminal-body {
  padding: var(--space-lg);
  max-height: 500px;
  overflow-y: auto;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  line-height: 1.8;
}

.log-line {
  display: flex;
  gap: var(--space-sm);
  margin-bottom: 4px;
}

.log-time {
  color: var(--text-dim);
  font-size: 0.75rem;
}

.log-level {
  min-width: 80px;
  font-weight: 600;
}

.log-info .log-level { color: #4fc3f7; }
.log-success .log-level { color: #66bb6a; }
.log-warning .log-level { color: #ffa726; }
.log-error .log-level { color: #ef5350; }

.log-msg {
  color: var(--text-gray);
  flex: 1;
}

.progress-status {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  margin-top: var(--space-2xl);
  color: var(--text-gray);
}

.spinner-ring {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 69, 0, 0.2);
  border-top-color: var(--orange-neon);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
''')

print("✅ Created BusinessSelector")
print("✅ Created LiveAnalysis")
