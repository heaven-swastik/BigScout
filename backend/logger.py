"""
Real-time Logger with Streaming Support
========================================
"""

import sys
from datetime import datetime
from typing import List, Dict, Callable, Optional


class RealtimeLogger:
    """Real-time logging with streaming callback support"""
    
    def __init__(self, stream_callback: Optional[Callable] = None):
        self.logs = []
        self.stream_callback = stream_callback
    
    def _log(self, level: str, message: str):
        """Internal log method"""
        timestamp = datetime.now().strftime("%H:%M:%S")
        log_entry = {
            "timestamp": timestamp,
            "level": level,
            "message": message
        }
        self.logs.append(log_entry)
        
        # Console output with colors
        colors = {
            "INFO": "\033[94m",
            "SUCCESS": "\033[92m",
            "WARNING": "\033[93m",
            "ERROR": "\033[91m",
            "DEBUG": "\033[90m"
        }
        reset = "\033[0m"
        
        color = colors.get(level, "")
        print(f"{color}[{timestamp}] {level}: {message}{reset}")
        
        # Stream to callback if provided (for SSE)
        if self.stream_callback:
            self.stream_callback(log_entry)
    
    def info(self, message: str):
        self._log("INFO", message)
    
    def success(self, message: str):
        self._log("SUCCESS", message)
    
    def warning(self, message: str):
        self._log("WARNING", message)
    
    def error(self, message: str):
        self._log("ERROR", message)
    
    def debug(self, message: str):
        self._log("DEBUG", message)
    
    def step(self, message: str, current: int, total: int):
        self.info(f"[{current}/{total}] {message}")
    
    def progress(self, percent: int, message: str = ""):
        """Log progress percentage"""
        msg = f"Progress: {percent}%"
        if message:
            msg += f" - {message}"
        self.info(msg)
    
    def get_all_logs(self) -> List[Dict]:
        return self.logs
    
    def clear(self):
        self.logs = []
