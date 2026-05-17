import { useState } from 'react';
import { motion } from 'framer-motion';
import useStore from '../utils/store';
import { apiService } from '../utils/api';
import './BudgetInput.css';

function BudgetInput() {
  const { 
    searchLocation, 
    selectedBusiness, 
    searchRadius,
    setStep, 
    setBudget,
    addLog,
    clearLogs,
    setAnalyzing,
    setProgress,
    setAnalysisResults,
    setError
  } = useStore();

  const [budgetInput, setBudgetInput] = useState('');
  const [localError, setLocalError] = useState('');

  const formatCurrency = (value) => {
    if (!value) return '';
    const num = parseInt(value);
    if (isNaN(num)) return value;

    if (num >= 10000000) {
      return `₹${(num / 10000000).toFixed(2)} Cr`;
    } else if (num >= 100000) {
      return `₹${(num / 100000).toFixed(2)} L`;
    } else if (num >= 1000) {
      return `₹${(num / 1000).toFixed(1)} K`;
    } else {
      return `₹${num.toLocaleString('en-IN')}`;
    }
  };

  const presets = [
    { label: '₹50K', value: 50000, icon: '💰' },
    { label: '₹1L', value: 100000, icon: '💵' },
    { label: '₹2L', value: 200000, icon: '💸' },
    { label: '₹5L', value: 500000, icon: '💴' },
    { label: '₹10L', value: 1000000, icon: '💷' },
    { label: '₹25L', value: 2500000, icon: '🏦' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(budgetInput);

    if (isNaN(amount) || amount < 10000) {
      setLocalError('Budget must be at least ₹10,000');
      return;
    }

    if (amount > 100000000) {
      setLocalError('Budget seems too high. Please enter a realistic amount.');
      return;
    }

    setLocalError('');
    setBudget(amount);
    startAnalysis(amount);
  };

  const startAnalysis = (budgetAmount) => {
    setStep(4);
    clearLogs();
    setAnalyzing(true);
    setProgress(0);
    setError(null);

    addLog({ level: 'INFO', message: '🚀 Starting complete analysis...' });

    // Create SSE stream
    const stream = apiService.createAnalysisStream(
      searchLocation,
      selectedBusiness,
      budgetAmount,
      searchRadius,
      // onLog
      (log) => {
        addLog(log);
      },
      // onProgress
      (progress) => {
        setProgress(progress);
      },
      // onComplete
      (results) => {
        setAnalysisResults(results);
        setAnalyzing(false);
        setProgress(100);
        setStep(5);
      },
      // onError
      (error) => {
        setError(error);
        setAnalyzing(false);
        addLog({ level: 'ERROR', message: error });
      }
    );
  };

  return (
    <section className="budget-input">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="budget-card"
        >
          {/* Header */}
          <div className="budget-header">
            <motion.div
              className="step-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              STEP 3
            </motion.div>
            <h2>
              💰 Enter Your <span className="text-gradient">Budget</span>
            </h2>
            <p className="subtitle">
              For <strong>{selectedBusiness}</strong> in <strong>{searchLocation}</strong>
            </p>
          </div>

          {/* Main Form */}
          <form onSubmit={handleSubmit} className="budget-form">
            {/* Budget Input */}
            <div className="form-group">
              <label htmlFor="budget">
                <span className="label-icon">💵</span>
                Investment Amount (INR)
              </label>
              <div className="input-wrapper">
                <input
                  type="number"
                  id="budget"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  placeholder="Enter your budget..."
                  className="budget-field"
                  min="10000"
                  max="100000000"
                  required
                />
                {budgetInput && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="budget-preview"
                  >
                    {formatCurrency(budgetInput)}
                  </motion.div>
                )}
              </div>
              {localError && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="error-badge"
                >
                  ⚠️ {localError}
                </motion.div>
              )}
            </div>

            {/* Quick Presets */}
            <div className="preset-section">
              <p className="preset-title">⚡ Quick Select</p>
              <div className="preset-grid">
                {presets.map((preset, idx) => (
                  <motion.button
                    key={preset.value}
                    type="button"
                    onClick={() => setBudgetInput(preset.value.toString())}
                    className={`preset-btn ${budgetInput == preset.value ? 'active' : ''}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="preset-icon">{preset.icon}</span>
                    <span className="preset-label">{preset.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Budget Breakdown */}
            <motion.div
              className="breakdown-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h4>💡 Typical Budget Breakdown</h4>
              <div className="breakdown-grid">
                <div className="breakdown-item">
                  <span className="breakdown-icon">🏢</span>
                  <span className="breakdown-label">Rent & Setup</span>
                  <span className="breakdown-value">40%</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-icon">📦</span>
                  <span className="breakdown-label">Inventory</span>
                  <span className="breakdown-value">25%</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-icon">📄</span>
                  <span className="breakdown-label">Licenses</span>
                  <span className="breakdown-value">10%</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-icon">📣</span>
                  <span className="breakdown-label">Marketing</span>
                  <span className="breakdown-value">10%</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-icon">💰</span>
                  <span className="breakdown-label">Working Capital</span>
                  <span className="breakdown-value">15%</span>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <div className="button-group">
              <motion.button
                type="button"
                onClick={() => setStep(2)}
                className="btn-back"
                whileHover={{ x: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>←</span> Back
              </motion.button>
              <motion.button
                type="submit"
                className="btn-analyze"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Start Analysis</span>
                <span className="btn-icon">🚀</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export default BudgetInput;