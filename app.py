from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import json
from budget.calculator import BudgetCalculator

app = Flask(__name__, static_folder='build')
CORS(app)  # Enable CORS for all routes

# This secret key would be different in production
app.secret_key = os.environ.get('SECRET_KEY', os.urandom(24).hex())

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve the React frontend"""
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

@app.route('/api/calculate', methods=['POST'])
def calculate_budget():
    """Calculate budget recommendations based on user inputs"""
    try:
        data = request.json
        
        # Validate required fields
        required_fields = ['income', 'savings_goal', 'spending_preferences', 
                          'fixed_expenses', 'location', 'time_preference']
        
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        # Validate income amounts
        if data['income']['work_study'] < 0 or data['income']['external'] < 0:
            return jsonify({'error': 'Income amounts cannot be negative'}), 400
            
        # Validate savings percentage
        if not (0 <= data['savings_goal'] <= 50):
            return jsonify({'error': 'Savings percentage must be between 0 and 50%'}), 400
        
        # Validate spending preferences
        for category, preference in data['spending_preferences'].items():
            if not (1 <= preference <= 3):
                return jsonify({'error': f'Invalid preference value for {category}'}), 400
        
        # Validate fixed expenses
        if data['fixed_expenses']['loans'] < 0 or data['fixed_expenses']['other'] < 0:
            return jsonify({'error': 'Fixed expenses cannot be negative'}), 400
            
        # Validate location
        valid_locations = ['San Francisco', 'Berlin', 'Taipei', 
                         'Hyderabad', 'Seoul', 'Buenos Aires']
        if data['location'] not in valid_locations:
            return jsonify({'error': 'Invalid location'}), 400
            
        # Calculate budget recommendations
        calculator = BudgetCalculator()
        recommendations = calculator.calculate_recommendations(data)
        
        # Verify totals
        total_income = data['income']['work_study'] + data['income']['external']
        total_allocated = sum(recommendations.values())
        
        # Prepare chart data
        chart_data = {
            'labels': list(recommendations.keys()),
            'values': list(recommendations.values())
        }
        
        return jsonify({
            'recommendations': recommendations,
            'chart_data': chart_data,
            'time_preference': data['time_preference'],
            'total_income': total_income,
            'total_allocated': total_allocated
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)