import { create } from 'zustand';

const useStore = create((set) => ({
  step: 1,
  searchLocation: '',
  searchRadius: 1000,
  selectedBusiness: null,
  budget: null,
  analysisResults: null,
  logs: [],
  isAnalyzing: false,
  progress: 0,
  error: null,
  
  setStep: (step) => set({ step }),
  setSearchData: (location, radius) => set({ searchLocation: location, searchRadius: radius }),
  setSelectedBusiness: (business) => set({ selectedBusiness: business }),
  setBudget: (budget) => set({ budget }),
  setAnalysisResults: (results) => set({ analysisResults: results }),
  addLog: (log) => set((state) => ({ logs: [...state.logs, log] })),
  clearLogs: () => set({ logs: [] }),
  setAnalyzing: (status) => set({ isAnalyzing: status }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  reset: () => set({
    step: 1,
    searchLocation: '',
    searchRadius: 1000,
    selectedBusiness: null,
    budget: null,
    analysisResults: null,
    logs: [],
    isAnalyzing: false,
    progress: 0,
    error: null
  }),
}));

export default useStore;
