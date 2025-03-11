from .config import CITY_MULTIPLIERS, CITY_BASELINES, CATEGORY_DESCRIPTIONS

class BudgetCalculator:
    def __init__(self):
        self.city_multipliers = CITY_MULTIPLIERS
        self.city_baselines = CITY_BASELINES
        self.category_descriptions = CATEGORY_DESCRIPTIONS

    def calculate_recommendations(self, user_data):
        """Calculate budget recommendations based on user inputs"""
        # Calculate total income and deductions
        total_income = user_data['income']['work_study'] + user_data['income']['external']
        
        # Adjust values based on time preference
        if user_data['time_preference'] == 'weekly':
            total_income = total_income * 12 / 52  # Convert to weekly
        
        savings_amount = total_income * (user_data['savings_goal'] / 100)
        fixed_expenses = user_data['fixed_expenses']['loans'] + user_data['fixed_expenses']['other']
        
        # Verify we don't exceed total income
        if savings_amount + fixed_expenses > total_income:
            savings_amount = max(0, total_income - fixed_expenses)
            fixed_expenses = min(total_income, fixed_expenses)

        # Calculate available money for flexible spending
        available_money = total_income - savings_amount - fixed_expenses
        
        if available_money <= 0:
            # If no discretionary spending available, allocate everything to fixed costs
            return {
                'Fixed Expenses': fixed_expenses,
                'Savings': savings_amount,
                'Food': 0,
                'Transportation': 0,
                'Entertainment': 0,
                'Personal': 0,
                'Gym': 0
            }

        # Get city adjustment or use specific city baseline
        city = user_data['location']
        allocations = {}
        
        # Use city-specific baselines if available, otherwise apply multiplier to SF baseline
        if city in self.city_baselines:
            city_values = self.city_baselines[city]
            
            for category, ranges in city_values.items():
                preference = user_data['spending_preferences'].get(category.lower(), 2)
                
                if preference == 1:
                    percentage = ranges['min']
                elif preference == 3:
                    percentage = ranges['max']
                else:
                    percentage = ranges['base']
                    
                allocations[category.capitalize()] = available_money * percentage
        else:
            # Fall back to SF baseline with multiplier
            multiplier = self.city_multipliers.get(city, 1.0)
            sf_baseline = self.city_baselines.get('San Francisco', self.city_baselines['San Francisco'])
            
            for category, ranges in sf_baseline.items():
                preference = user_data['spending_preferences'].get(category.lower(), 2)
                
                if preference == 1:
                    percentage = ranges['min']
                elif preference == 3:
                    percentage = ranges['max']
                else:
                    percentage = ranges['base']
                    
                adjusted_percentage = percentage * multiplier
                allocations[category.capitalize()] = available_money * adjusted_percentage
        
        # Normalize allocations to available money
        total_allocated = sum(allocations.values())
        if total_allocated > available_money:
            ratio = available_money / total_allocated
            allocations = {k: v * ratio for k, v in allocations.items()}
        
        # Add fixed expenses and savings with better labels
        allocations['Fixed Expenses'] = fixed_expenses
        allocations['Savings'] = savings_amount
        
        # Final verification to ensure everything adds up to total income
        total = sum(allocations.values())
        if abs(total - total_income) > 0.01:
            # Adjust savings to balance the budget precisely
            allocations['Savings'] += (total_income - total)
        
        # Round all values to 2 decimal places
        recommendations = {k: round(v, 2) for k, v in allocations.items()}
        
        # Add category descriptions and recommended amounts to the output
        recommendations_with_info = {}
        for category, amount in recommendations.items():
            category_key = category.lower()
            recommendations_with_info[category] = {
                'amount': amount,
                'description': self.category_descriptions.get(category_key, "")
            }
        
        # Convert back to simple dictionary for backward compatibility
        return {k: v['amount'] for k, v in recommendations_with_info.items()}