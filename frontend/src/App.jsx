import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useStore from './utils/store';
import { apiService } from './utils/api';
import toast from 'react-hot-toast';
import './App.css';

import AnimatedBackground from './components/AnimatedBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import LocationSearch from './components/LocationSearch';
import BusinessSelector from './components/BusinessSelector';
import BudgetInput from './components/BudgetInput';
import LiveAnalysis from './components/LiveAnalysis';
import Dashboard from './components/Dashboard';

function App() {
  const { step } = useStore();

  useEffect(() => {
    apiService.healthCheck()
      .then(data => {
        console.log('✅ Backend:', data);
        toast.success('🧠 Backend Connected');
      })
      .catch(() => toast.error('❌ Backend Offline - Check if server is running on port 8000'));
  }, []);

  return (
    <div className="app">
      {/* Animated Background with Fast Globs & World Map */}
      <AnimatedBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {/* Step 1: Location Search */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <HeroSection />
              <LocationSearch />
            </motion.div>
          )}

          {/* Step 2: Business Selection */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <BusinessSelector />
            </motion.div>
          )}

          {/* Step 3: Budget Input */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
            >
              <BudgetInput />
            </motion.div>
          )}

          {/* Step 4: Live Analysis */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <LiveAnalysis />
            </motion.div>
          )}

          {/* Step 5: Results Dashboard */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Dashboard />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="text-gradient">BizScout</span>
              <span className="footer-version">v6.0 COMPLETE</span>
            </div>
            <div className="footer-tech">
              <span>REAL Neural Network</span>
              <span>•</span>
              <span>SSE Streaming</span>
              <span>•</span>
              <span>AI-Powered</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
