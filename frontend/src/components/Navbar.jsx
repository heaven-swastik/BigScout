import { motion } from 'framer-motion';
import useStore from '../utils/store';
import './Navbar.css';

function Navbar() {
  const { step, reset } = useStore();

  return (
    <motion.nav 
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }}
    >
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo" onClick={reset}>
            <div className="logo-icon">⬡</div>
            <span className="text-gradient">BizScout</span>
            <span className="ai-badge">AI</span>
          </div>

          {step > 1 && (
            <div className="progress-bar">
              <div className="progress-track">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className={`progress-node ${step >= s ? 'active' : ''}`}>
                    <div className="node-circle">{s}</div>
                    {s < 4 && <div className="node-line"></div>}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="navbar-actions">
            {step > 1 && (
              <button className="btn-reset" onClick={reset}>
                <span>↻</span>
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;