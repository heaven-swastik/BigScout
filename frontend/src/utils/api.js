import axios from 'axios';

const API_BASE = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  timeout: 180000
});

export const apiService = {
  async healthCheck() {
    const res = await api.get('/health');
    return res.data;
  },

  async analyzeLocation(placeName, radiusMeters) {
    const res = await api.post('/api/analyze', {
      place_name: placeName,
      radius_meters: radiusMeters
    });
    return res.data;
  },

  // NEW: Complete analysis with SSE streaming
  createAnalysisStream(placeName, businessType, budget, radiusMeters, onLog, onProgress, onComplete, onError) {
    const params = new URLSearchParams({
      place_name: placeName,
      business_type: businessType,
      budget: budget,
      radius_meters: radiusMeters
    });

    const eventSource = new EventSource(`${API_BASE}/api/analyze-complete?${params}`);

    eventSource.addEventListener('message', (e) => {
      try {
        const data = JSON.parse(e.data);

        if (data.type === 'start') {
          onLog && onLog({ level: 'INFO', message: data.message });
        }

        if (data.type === 'estimate') {
          onLog && onLog({ level: 'INFO', message: data.message });
        }

        if (data.type === 'log') {
          onLog && onLog({ level: data.level, message: data.message });
          onProgress && onProgress(data.progress || 0);
        }

        if (data.type === 'complete') {
          onComplete && onComplete(data.data);
          eventSource.close();
        }

        if (data.type === 'error') {
          onError && onError(data.message);
          eventSource.close();
        }
      } catch (err) {
        console.error('Parse error:', err);
        onError && onError('Failed to parse server response');
      }
    });

    eventSource.onerror = (err) => {
      console.error('EventSource error:', err);
      onError && onError('Connection lost. Please try again.');
      eventSource.close();
    };

    return eventSource;
  }
};

export default api;
