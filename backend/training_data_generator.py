"""
Training Data Generator
=======================
Generates realistic training data based on real business patterns
"""

import pandas as pd
import numpy as np
from typing import List, Dict

class TrainingDataGenerator:
    """Generate realistic training data for revenue prediction"""
    
    # Real industry data (India 2024)
    INDUSTRY_AVERAGES = {
        "Coffee Shop": {
            "base_revenue": 8500, "margin": 0.25, "customers_day": 120,
            "ticket_size": 65, "space": 800, "startup": 80000
        },
        "Tea Stall": {
            "base_revenue": 1200, "margin": 0.35, "customers_day": 80,
            "ticket_size": 15, "space": 200, "startup": 15000
        },
        "Restaurant": {
            "base_revenue": 22000, "margin": 0.15, "customers_day": 85,
            "ticket_size": 280, "space": 1500, "startup": 250000
        },
        "Fast Food": {
            "base_revenue": 14000, "margin": 0.18, "customers_day": 200,
            "ticket_size": 90, "space": 600, "startup": 150000
        },
        "Bakery": {
            "base_revenue": 7500, "margin": 0.22, "customers_day": 90,
            "ticket_size": 80, "space": 500, "startup": 60000
        },
        "Salon": {
            "base_revenue": 6000, "margin": 0.28, "customers_day": 15,
            "ticket_size": 450, "space": 400, "startup": 45000
        },
        "Gym": {
            "base_revenue": 12000, "margin": 0.32, "customers_day": 50,
            "ticket_size": 480, "space": 2000, "startup": 100000
        },
        "Pharmacy": {
            "base_revenue": 11000, "margin": 0.24, "customers_day": 75,
            "ticket_size": 350, "space": 600, "startup": 120000
        },
        "Grocery": {
            "base_revenue": 18000, "margin": 0.12, "customers_day": 150,
            "ticket_size": 320, "space": 1000, "startup": 180000
        },
        "Clothing": {
            "base_revenue": 10000, "margin": 0.35, "customers_day": 40,
            "ticket_size": 650, "space": 800, "startup": 75000
        },
        "Electronics": {
            "base_revenue": 20000, "margin": 0.18, "customers_day": 35,
            "ticket_size": 1800, "space": 1200, "startup": 150000
        }
    }
    
    def generate_training_data(self, n_samples: int = 5000) -> pd.DataFrame:
        """Generate realistic training dataset"""
        
        data = []
        
        for _ in range(n_samples):
            # Random business type
            business_type = np.random.choice(list(self.INDUSTRY_AVERAGES.keys()))
            base_data = self.INDUSTRY_AVERAGES[business_type]
            
            # Features
            competition = np.random.randint(0, 50)
            pois_schools = np.random.randint(0, 30)
            pois_offices = np.random.randint(0, 50)
            pois_colleges = np.random.randint(0, 10)
            pois_hospitals = np.random.randint(0, 8)
            pois_malls = np.random.randint(0, 5)
            pois_transport = np.random.randint(0, 15)
            
            # Income class encoding
            income_class = np.random.choice([1, 2, 3, 4, 5], p=[0.15, 0.25, 0.35, 0.15, 0.10])
            
            # Location tier
            tier = np.random.choice([1, 2, 3], p=[0.20, 0.50, 0.30])
            
            # Rent per sqft
            rent_sqft = {1: np.random.uniform(25, 50), 2: np.random.uniform(12, 25), 3: np.random.uniform(5, 12)}[tier]
            
            # Budget
            budget = np.random.randint(50000, 5000000)
            
            # Calculate actual revenue (ground truth)
            base_rev = base_data["base_revenue"]
            
            # Apply multipliers based on features
            competition_factor = max(0.5, 1 - (competition * 0.015))
            income_factor = 0.7 + (income_class * 0.15)
            poi_factor = 1 + ((pois_schools + pois_offices + pois_colleges) * 0.005)
            tier_factor = {1: 1.3, 2: 1.0, 3: 0.8}[tier]
            
            # Random market variations
            market_noise = np.random.uniform(0.85, 1.15)
            
            # Final revenue
            monthly_revenue = base_rev * competition_factor * income_factor * poi_factor * tier_factor * market_noise
            
            # Confidence (based on data quality)
            data_quality = min(100, 50 + (competition * 0.5) + (sum([pois_schools, pois_offices, pois_colleges]) * 0.3))
            confidence = min(92, max(55, data_quality + np.random.uniform(-5, 5)))
            
            data.append({
                "business_type": business_type,
                "competition_count": competition,
                "pois_schools": pois_schools,
                "pois_offices": pois_offices,
                "pois_colleges": pois_colleges,
                "pois_hospitals": pois_hospitals,
                "pois_malls": pois_malls,
                "pois_transport": pois_transport,
                "income_class": income_class,
                "tier": tier,
                "rent_per_sqft": rent_sqft,
                "budget": budget,
                "space_sqft": base_data["space"],
                "base_revenue": base_rev,
                "profit_margin": base_data["margin"],
                "monthly_revenue": monthly_revenue,
                "confidence": confidence
            })
        
        df = pd.DataFrame(data)
        return df
    
    def save_dataset(self, filepath: str = "training_data.csv"):
        """Generate and save training dataset"""
        df = self.generate_training_data(5000)
        df.to_csv(filepath, index=False)
        print(f"✅ Training data saved: {filepath}")
        print(f"   Samples: {len(df)}")
        print(f"   Features: {len(df.columns)}")
        return df

if __name__ == "__main__":
    generator = TrainingDataGenerator()
    df = generator.save_dataset()
    print("\n📊 Sample data:")
    print(df.head())
    print("\n📈 Statistics:")
    print(df.describe())
