# City-specific baseline percentages for budget categories
CITY_BASELINES = {
    'San Francisco': {
        'food': {'min': 0.30, 'base': 0.35, 'max': 0.60},
        'transportation': {'min': 0.05, 'base': 0.07, 'max': 0.10},
        'entertainment': {'min': 0.00, 'base': 0.15, 'max': 0.30},
        'personal': {'min': 0.05, 'base': 0.07, 'max': 0.10},
        'gym': {'min': 0.00, 'base': 0.05, 'max': 0.15}
    },
    'Taipei': {
        'food': {'min': 0.20, 'base': 0.275, 'max': 0.35},
        'transportation': {'min': 0.05, 'base': 0.10, 'max': 0.15},
        'entertainment': {'min': 0.10, 'base': 0.15, 'max': 0.20},
        'personal': {'min': 0.10, 'base': 0.10, 'max': 0.10},
        'gym': {'min': 0.05, 'base': 0.05, 'max': 0.05},
    },
    'Seoul': {
        'food': {'min': 0.30, 'base': 0.35, 'max': 0.40},
        'transportation': {'min': 0.10, 'base': 0.15, 'max': 0.20},
        'entertainment': {'min': 0.20, 'base': 0.20, 'max': 0.20},
        'personal': {'min': 0.15, 'base': 0.15, 'max': 0.15},
        'gym': {'min': 0.15, 'base': 0.15, 'max': 0.15},
    },
    'Buenos Aires': {
        'food': {'min': 0.20, 'base': 0.30, 'max': 0.40},
        'transportation': {'min': 0.15, 'base': 0.15, 'max': 0.15},
        'entertainment': {'min': 0.10, 'base': 0.20, 'max': 0.30},
        'personal': {'min': 0.15, 'base': 0.20, 'max': 0.25},
        'gym': {'min': 0.00, 'base': 0.03, 'max': 0.06},
    },
    'Berlin': {
        'food': {'min': 0.30, 'base': 0.35, 'max': 0.40},
        'transportation': {'min': 0.15, 'base': 0.15, 'max': 0.15},
        'entertainment': {'min': 0.20, 'base': 0.20, 'max': 0.20},
        'personal': {'min': 0.10, 'base': 0.125, 'max': 0.15},
        'gym': {'min': 0.15, 'base': 0.15, 'max': 0.15},
    },
    'Hyderabad': {
        'food': {'min': 0.15, 'base': 0.25, 'max': 0.35},
        'transportation': {'min': 0.05, 'base': 0.10, 'max': 0.15},
        'entertainment': {'min': 0.05, 'base': 0.10, 'max': 0.20},
        'personal': {'min': 0.05, 'base': 0.08, 'max': 0.12},
        'gym': {'min': 0.00, 'base': 0.02, 'max': 0.05},
    }
}

# Cost of living multipliers relative to San Francisco
CITY_MULTIPLIERS = {
    'San Francisco': 1.0,
    'Berlin': 0.65,
    'Taipei': 0.55,
    'Hyderabad': 0.40,
    'Seoul': 0.70,
    'Buenos Aires': 0.50
}

# Category descriptions for user guidance
CATEGORY_DESCRIPTIONS = {
    'food': "Includes groceries, dining out, and all food-related expenses.",
    'transportation': "Public transit, ride-sharing services, or vehicle expenses including gas.",
    'entertainment': "Movies, concerts, subscriptions, and other leisure activities.",
    'personal': "Shopping, personal care items, and miscellaneous expenses.",
    'gym': "Fitness memberships, classes, and health-related activities.",
    'fixed expenses': "Your essential recurring costs like rent and utilities.",
    'savings': "Money set aside for future goals or emergencies."
}