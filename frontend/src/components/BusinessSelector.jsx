import { motion } from 'framer-motion';
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
