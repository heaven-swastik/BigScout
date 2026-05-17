"""
ML Model Trainer - REAL Production Model
=========================================
Train actual neural network on business data
"""

import numpy as np
import pandas as pd
import pickle
from typing import Dict, Tuple, List
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics import mean_absolute_error, r2_score


class SimpleNeuralNetwork:
    """Simple neural network implemented from scratch"""
    
    def __init__(self, input_size: int, hidden_sizes: List[int], output_size: int):
        self.layers = []
        
        # Initialize weights and biases
        prev_size = input_size
        for hidden_size in hidden_sizes:
            self.layers.append({
                'W': np.random.randn(prev_size, hidden_size) * 0.01,
                'b': np.zeros((1, hidden_size))
            })
            prev_size = hidden_size
        
        # Output layer
        self.layers.append({
            'W': np.random.randn(prev_size, output_size) * 0.01,
            'b': np.zeros((1, output_size))
        })
    
    def relu(self, x):
        return np.maximum(0, x)
    
    def relu_derivative(self, x):
        return (x > 0).astype(float)
    
    def forward(self, X):
        """Forward pass"""
        self.activations = [X]
        self.z_values = []
        
        for i, layer in enumerate(self.layers):
            z = np.dot(self.activations[-1], layer['W']) + layer['b']
            self.z_values.append(z)
            
            if i < len(self.layers) - 1:
                a = self.relu(z)
            else:
                a = z
            
            self.activations.append(a)
        
        return self.activations[-1]
    
    def backward(self, X, y, learning_rate=0.01):
        """Backward pass"""
        m = X.shape[0]
        dz = self.activations[-1] - y
        
        for i in range(len(self.layers) - 1, -1, -1):
            dW = (1/m) * np.dot(self.activations[i].T, dz)
            db = (1/m) * np.sum(dz, axis=0, keepdims=True)
            
            self.layers[i]['W'] -= learning_rate * dW
            self.layers[i]['b'] -= learning_rate * db
            
            if i > 0:
                dz = np.dot(dz, self.layers[i]['W'].T) * self.relu_derivative(self.z_values[i-1])
    
    def train(self, X, y, epochs=100, learning_rate=0.01, verbose=True):
        """Train the network"""
        losses = []
        
        for epoch in range(epochs):
            predictions = self.forward(X)
            loss = np.mean((predictions - y) ** 2)
            losses.append(loss)
            
            self.backward(X, y, learning_rate)
            
            if verbose and (epoch + 1) % 10 == 0:
                print(f"Epoch {epoch + 1}/{epochs}, Loss: {loss:.4f}")
        
        return losses
    
    def predict(self, X):
        return self.forward(X)


class RevenuePredictor:
    """Complete revenue prediction model"""
    
    def __init__(self):
        self.model = None
        self.scaler_X = StandardScaler()
        self.scaler_y = StandardScaler()
        self.label_encoder = LabelEncoder()
        self.feature_names = []
        self.is_trained = False
    
    def prepare_data(self, df: pd.DataFrame) -> Tuple:
        df['business_encoded'] = self.label_encoder.fit_transform(df['business_type'])
        
        feature_cols = [
            'business_encoded', 'competition_count', 'pois_schools',
            'pois_offices', 'pois_colleges', 'pois_hospitals',
            'pois_malls', 'pois_transport', 'income_class',
            'tier', 'rent_per_sqft', 'budget', 'space_sqft',
            'base_revenue', 'profit_margin'
        ]
        
        self.feature_names = feature_cols
        X = df[feature_cols].values
        y = df[['monthly_revenue', 'confidence']].values
        
        return X, y
    
    def train_model(self, df: pd.DataFrame, test_size=0.2):
        print("=" * 60)
        print("🤖 TRAINING ML MODEL")
        print("=" * 60)
        
        X, y = self.prepare_data(df)
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=test_size, random_state=42)
        
        print(f"Training samples: {len(X_train)}")
        
        X_train_scaled = self.scaler_X.fit_transform(X_train)
        X_test_scaled = self.scaler_X.transform(X_test)
        y_train_scaled = self.scaler_y.fit_transform(y_train)
        y_test_scaled = self.scaler_y.transform(y_test)
        
        self.model = SimpleNeuralNetwork(
            input_size=X_train_scaled.shape[1],
            hidden_sizes=[64, 128, 64, 32],
            output_size=2
        )
        
        print("\n🏋️ Training...")
        self.model.train(X_train_scaled, y_train_scaled, epochs=200, learning_rate=0.01)
        
        train_pred = self.scaler_y.inverse_transform(self.model.predict(X_train_scaled))
        test_pred = self.scaler_y.inverse_transform(self.model.predict(X_test_scaled))
        
        test_mae = mean_absolute_error(y_test, test_pred)
        test_r2 = r2_score(y_test[:, 0], test_pred[:, 0])
        
        print(f"\n✅ Training complete!")
        print(f"   Test MAE: ₹{test_mae:.2f}")
        print(f"   Test R²: {test_r2:.4f}")
        
        self.is_trained = True
        return {'test_mae': test_mae, 'test_r2': test_r2}
    
    def predict_revenue(self, features: Dict) -> Dict:
        if not self.is_trained:
            raise Exception("Model not trained!")
        
        X = np.array([[
            features['business_encoded'], features['competition_count'],
            features['pois_schools'], features['pois_offices'],
            features['pois_colleges'], features['pois_hospitals'],
            features['pois_malls'], features['pois_transport'],
            features['income_class'], features['tier'],
            features['rent_per_sqft'], features['budget'],
            features['space_sqft'], features['base_revenue'],
            features['profit_margin']
        ]])
        
        X_scaled = self.scaler_X.transform(X)
        pred_scaled = self.model.predict(X_scaled)
        pred = self.scaler_y.inverse_transform(pred_scaled)
        
        monthly_revenue = float(pred[0, 0])
        confidence = max(55, min(92, float(pred[0, 1])))
        
        return {
            'monthly_revenue': round(monthly_revenue, 2),
            'yearly_revenue': round(monthly_revenue * 12, 2),
            'confidence': round(confidence, 1)
        }
    
    def save_model(self, filepath='revenue_model.pkl'):
        if not self.is_trained:
            raise Exception("Model not trained!")
        
        with open(filepath, 'wb') as f:
            pickle.dump({
                'model': self.model,
                'scaler_X': self.scaler_X,
                'scaler_y': self.scaler_y,
                'label_encoder': self.label_encoder,
                'feature_names': self.feature_names
            }, f)
        
        print(f"✅ Model saved: {filepath}")
    
    @classmethod
    def load_model(cls, filepath='revenue_model.pkl'):
        predictor = cls()
        
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
        
        predictor.model = data['model']
        predictor.scaler_X = data['scaler_X']
        predictor.scaler_y = data['scaler_y']
        predictor.label_encoder = data['label_encoder']
        predictor.feature_names = data['feature_names']
        predictor.is_trained = True
        
        print(f"✅ Model loaded: {filepath}")
        return predictor
