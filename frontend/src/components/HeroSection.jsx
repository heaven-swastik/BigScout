import { motion } from 'framer-motion';
import './HeroSection.css';

function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          {/* Left Side - Main Content */}
          <motion.div
            className="hero-main"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-tag">
              <span className="tag-icon">⚡</span>
              <span>AI-POWERED BUSINESS INTELLIGENCE</span>
            </div>

            <h1 className="hero-title">
              <span className="title-line">Launch Smarter.</span>
              <span className="title-line">Grow <span className="text-gradient">Faster.</span></span>
            </h1>

            <p className="hero-desc">
              Deep learning neural networks analyze millions of data points across location,
              competition, economy, and consumer behavior to predict your business success with
              unprecedented accuracy.
            </p>

            <div className="hero-stats">
              <div className="stat-item">
                <div className="stat-number text-gradient">98%</div>
                <div className="stat-label">Accuracy</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number text-gradient">15K+</div>
                <div className="stat-label">Data Points</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <div className="stat-number text-gradient">Real-Time</div>
                <div className="stat-label">Analysis</div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Feature Cards */}
          <motion.div
            className="hero-features"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: '🧠', title: 'PyTorch Deep Learning', desc: 'Neural network predictions' },
              { icon: '🎯', title: 'ML Confidence Scores', desc: 'Uncertainty quantification' },
              { icon: '📊', title: 'Market Intelligence', desc: 'Real-time insights' },
              { icon: '🚀', title: 'Instant Analysis', desc: 'Results in seconds' }
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1 }}
              >
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
                <div className="feature-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;