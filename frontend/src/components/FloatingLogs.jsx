import { motion, AnimatePresence } from 'framer-motion';
import useStore from '../utils/store';
import './FloatingLogs.css';

function FloatingLogs() {
  const { logs } = useStore();
  
  // Logic: Show only the last 5 logs to prevent overcrowding
  const recentLogs = logs.slice(-5).reverse();

  return (
    <motion.div className="floating-logs" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}>
      <div className="logs-header">
        <span>Live Logs</span>
        <span className="logs-count">{logs.length}</span>
      </div>
      <div className="logs-body">
        <AnimatePresence mode="popLayout">
          {recentLogs.map((log) => (
            <motion.div 
              key={log.id} 
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, opacity: 0 }}
              className={`log-line log-${log.level?.toLowerCase()}`}
            >
              {log.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default FloatingLogs;