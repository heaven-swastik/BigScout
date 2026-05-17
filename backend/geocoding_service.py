"""
Geocoding Service - Complete Implementation
===========================================
"""

import requests
from typing import Dict, Optional
from logger import RealtimeLogger


class GeocodingService:
    """Geocoding service using Nominatim"""
    
    def __init__(self, logger: RealtimeLogger):
        self.logger = logger
        self.base_url = "https://nominatim.openstreetmap.org/search"
    
    def geocode(self, place_name: str) -> Optional[Dict]:
        """
        Geocode a place name to coordinates
        
        Args:
            place_name: Name of the place
            
        Returns:
            Dictionary with lat, lon, display_name, address
        """
        
        self.logger.info(f"🔍 Geocoding: {place_name}")
        
        try:
            params = {
                "q": place_name,
                "format": "json",
                "limit": 1,
                "addressdetails": 1
            }
            
            headers = {
                "User-Agent": "BizScout/5.0 (Business Analysis Tool)"
            }
            
            response = requests.get(
                self.base_url,
                params=params,
                headers=headers,
                timeout=10
            )
            
            response.raise_for_status()
            data = response.json()
            
            if not data:
                self.logger.error(f"Location not found: {place_name}")
                return None
            
            result = data[0]
            
            location = {
                "lat": float(result["lat"]),
                "lon": float(result["lon"]),
                "display_name": result.get("display_name", place_name),
                "address": result.get("address", {})
            }
            
            self.logger.success(f"✅ Location found: {result['lat']}, {result['lon']}")
            
            return location
            
        except requests.exceptions.RequestException as e:
            self.logger.error(f"Geocoding failed: {str(e)}")
            return None
        except Exception as e:
            self.logger.error(f"Geocoding error: {str(e)}")
            return None
