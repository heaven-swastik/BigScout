import { motion } from 'framer-motion';
import useStore from '../utils/store';
import './LiveAnalysis.css';

function LiveAnalysis() {
  const { searchLocation, selectedBusiness, budget, logs, isAnalyzing, progress } = useStore();

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
              {budget && <> • Budget: ₹{(budget / 100000).toFixed(2)}L</>}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              >
                <span className="progress-text">{progress}%</span>
              </motion.div>
            </div>
            <p className="progress-status">
              {progress < 10 && 'Geocoding location...'}
              {progress >= 10 && progress < 50 && 'Deep research in progress...'}
              {progress >= 50 && progress < 60 && 'AI analyzing data...'}
              {progress >= 60 && progress < 70 && 'Generating business guide...'}
              {progress >= 70 && progress < 95 && 'Researching alternatives...'}
              {progress >= 95 && 'Finalizing results...'}
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
